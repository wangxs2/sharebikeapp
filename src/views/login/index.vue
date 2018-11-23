<template>
  <div class="login">
    <div class="header">
      <div class="title">
        <img src="../../assets/image/login/LOGO@3x.png" width="150" height="132" alt="" srcset="">
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
        <mt-button @click="submitForm()" class="btn">登 录 </mt-button>
      </div>
    </div>
    <div class="bottom">
      上海产业技术研究院
    </div>
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
      loginMess: {
        username: "",
        password: ""
      }
    };
  },
  beforeCreate() {},
  mounted() {
    console.log(this.$store.getters.password);
    if (localStorage.getItem("passWord")) {
      this.loginMess.password = localStorage.getItem("passWord");
      this.loginMess.username = localStorage.getItem("userName");
      this.forget=2
    }
    // if()
  },
  created() {
    this.downApp();
    window.getLogin = this.getLogin;
  },
  methods: {
    getLogin(val) {
      this.loginId = val;
    },
    getMap(user) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            this.$fetchPut("user/updateByUser", {
              longitude: r.point.lng,
              latitude: r.point.lat
            }).then(data => {
            });
          } else {
          }
        },
        { enableHighAccuracy: true }
      );
    },
    iconReturn(){
      this.$router.push({path: "/forget"});
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
      }else{
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
      this.$fetchPost("login", data)
        .then(res => {
          Indicator.close();
          if (res.status == "success") {
            localStorage.setItem("roleCode", res.info.roleCode);
            document.cookie = "userId=" + res.info.id;
             
            this.$router.push("/layout/selfCheck");
          } else if (res.status == "fail") {
            localStorage.clear("passWord")
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
