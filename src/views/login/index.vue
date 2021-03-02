<template>
  <div class="login">
    <van-overlay :show="showversion">
      <div class="wrapper" @click.stop>
        <div class="myvwelist">
          <h4 style="text-align:center">更新列表</h4>
          <div style="margin-bottom:0.3rem">
            <div
              style="line-height:26px"
              v-for="(item, index) in newList"
              :key="index"
            >{{index+1}}、{{item}}</div>
          </div>
          <van-slider v-show="ispercentage" v-model="percentage" active-color="#5076ff">
            <template #button>
              <div class="custom-button">{{ percentage }}</div>
            </template>
          </van-slider>
          <div class="btnbar">
            <div style="color:grey;" @click="showversion=false">取消</div>

            <div style="color:#5076ff;" @click="downmyapp">下载</div>
          </div>
        </div>
      </div>
    </van-overlay>
    <div class="header">
      <div class="title">
        <img src="../../assets/image/login/LOGO@3x.png" width="150" height="132" alt srcset />
        <p>共享单车治理</p>
      </div>
    </div>
    <div class="content">
      <p style="height:0.3rem;"></p>
      <div class="formList">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="loginMess.username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="loginMess.password"></mt-field>
      </div>
      <div class="forget">
        <p>
          <span v-if="forget==1" class="iconfont icon-bugouxuan" @click="forget=2"></span>
          <span v-if="forget!==1" class="iconfont icon-fangkuaigouxuan" @click="forget=1"></span>
          记住密码
        </p>
        <p @click="iconReturn()">忘记密码?</p>
      </div>
      <div style="width:100%">
        <mt-button @click="submitForm()" class="btn">登 录</mt-button>
      </div>
    </div>
    <div class="bottom">上海产业技术研究院</div>
  </div>
</template>
<script>
import base64 from "@/libs/base.js";
import { MessageBox } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  data() {
    return {
      loginId: "",
      forget: 1,
      myvison: "",
      newList: [],
      apkurl: "",
      showversion: false,
      ispercentage: false,
      percentage:0,
      loginMess: {
        username: "",
        password: ""
      }
    };
  },
  beforeCreate() {},
  mounted() {
    document.addEventListener("plusready", () => {
      plus.runtime.getProperty(plus.runtime.appid, inf => {
        console.log(inf.version);
        this.myvison = "V" + inf.version;
      });
    });
    if (localStorage.getItem("passWord")) {
      this.loginMess.password = localStorage.getItem("passWord");
      this.loginMess.username = localStorage.getItem("userName");
      this.forget = 2;
    }
    // if()
  },
  created() {
    this.downApp();
    window.getLogin = this.getLogin;
  },
  methods: {
    installApk(url) {
      console.log(url);
      var dtask = plus.downloader.createDownload(url, {}, (d, status) => {
        console.log(88);
        console.log(d);
        if (status == 200) {
          plus.nativeUI.toast("正在准备环境，请稍后！");
          this.sleep(1000);
          var path = d.filename;
          console.log(d.filename);
          plus.runtime.install(path);
          this.percentage = 100;
        } else {
          alert("Download failed:" + status);
        }
      });
      dtask.start();
    },
    sleep(numberMillis) {
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime) return;
      }
    },
    clicktime() {
      //定义定时器开始时间为0

      var progressnuw = 0; //顶一个定时器

      var timer = setInterval(() => {
        //变量一直++

        progressnuw++; //清楚定时器

        if (progressnuw >= 100) {
          clearInterval(timer);
        } //获取重新赋值

        this.percentage = progressnuw;
      }, 80);
    },

    getLogin(val) {
      this.loginId = val;
    },
    downApp() {
      this.$fetchGet("sysInfo/getAPPversion").then(res => {
        console.log(res.version);
        this.showversion = true;
        if (res.version !== this.myvison) {
          this.newList = res.list;
          this.apkurl = res.apk;
        }
      });
    },
    downmyapp() {
      // window.location.href=this.apkurl
      //  window.open(this.apkurl)
      this.ispercentage = true;
      this.clicktime()
      this.installApk(this.apkurl);
    },
    iconReturn() {
      this.$router.push({ path: "/forget" });
    },
    submitForm() {
      Indicator.open({
        text: "登录...",
        spinnerType: "fading-circle"
      });
      if (this.forget == 2) {
        localStorage.setItem("passWord", this.loginMess.password);
        localStorage.setItem("userName", this.loginMess.username);
        localStorage.setItem("forget", this.forget);
      } else {
        localStorage.setItem("passWord", "");
        localStorage.setItem("userName", "");
      }
      let timeNumber = new Date().getTime();
      let b = new base64();
      let data = {
        username: this.loginMess.username + "&" + this.loginId,
        password: b.encode(
          timeNumber +
            "&" +
            b.encode(this.loginMess.password) +
            "&" +
            timeNumber
        )
      };
      // this.$axios({
      //     method: 'post',
      //     withCredentials: true, // 是否允许带cookie这些
      //     headers: {
      //       "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      //     },
      //     url:'http://10.1.4.42:8090/sharebikesclean',
      //     params: data
      // }).then((res)=>{

      // })
      this.$fetchPost("login", data)
        .then(res => {
          Indicator.close();
          if (res.status == "success") {
            this.$store.commit("SET_CACHE", true);
            localStorage.setItem("roleCode", res.info.roleCode);
            document.cookie = "userId=" + res.info.id;

            if (res.info.roleCode == "clean" || res.info.roleCode == "manage") {
              this.$router.push("/layout/needtodo");
            } else {
              this.$router.push("/layout/supervise");
            }
          } else if (res.status == "fail") {
            localStorage.clear("passWord");
            MessageBox.alert("", {
              message: res.info,
              title: "提示"
            }).then(action => {});
          }
        })
        .catch(res => {
          Indicator.close();
          MessageBox.alert("", {
            message: "登录超时",
            title: "提示"
          }).then(action => {});
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
    .custom-button {
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 18px;
    text-align: center;
    background-color: #5076ff;
    border-radius: 100px;
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 40px;
    .myvwelist {
      width: 100%;
      display: flex;
      flex-direction: column;
      background: rgb(255, 255, 255);
      border-radius: 8px;
      box-sizing: border-box;
      padding: 20px 20px;
      padding-top: 0px;
    }
    .btnbar {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      div {
        flex: 1;
        text-align: center;
      }
    }
  }
  .header {
    width: 100%;
    // line-height: 1;
    flex-direction: column;
    box-sizing: border-box;
    .title {
      width: 100%;
      height: 4.7rem;
      padding-top: 0.2rem;
      box-sizing: border-box;
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
      text-align: center;
      color: #fff;
      p {
        font-size: 0.5rem;
        padding: 0;
        margin: 0;
        margin-top: 0.2rem;
        box-sizing: border-box;
      }
    }
  }
  .content {
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    .formList {
      margin: 0.5rem;
      margin-bottom: 0;
    }
    .forget {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 0.5rem;
      color: #5076ff;
      .forgetps {
        width: 1rem;
        height: 1rem;
        background: #fff;
      }
    }
    .btn {
      width: 88%;
      height: 1.173333rem;
      margin-left: 6%;
      margin-top: 0.6rem;
      border-radius: 20px;
      background: #5076ff;
      color: #fff;
    }
  }
  .bottom {
    text-align: center;
    color: #aeaeae;
    box-sizing: border-box;
    padding-bottom: 0.5rem;
    // position: fixed;
    // bottom: 0;
    // height: 2rem;
  }
}
</style>

<style lang="scss">
</style>
