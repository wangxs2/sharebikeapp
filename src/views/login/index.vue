<template>
  <div class="login">
    <div class="header">
      <div class="title">
        <img src="../../assets/image/login/LOGO@3x.png" width="150" height="132" alt="" srcset="">
        <p>共享单车清运</p>
      </div>
    </div>
    <div class="content">
      <p style="height:0.8rem;"></p>
      <div class="formList">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="loginMess.username"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="loginMess.password"></mt-field>
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
      loginMess: {
        username: "",
        password: ""
      }
    };
  },
  beforeCreate() {},
  mounted() {
  },
  created() {
    this.downApp();
    window.getLogin = this.getLogin;
    window.getTest = this.getTest;
  },
  methods: {
    getLogin(val) {
      this.loginId = val;
      //   MessageBox.alert("", {
      //   message: val,
      //   title: "提示"
      // }).then(action => {});
    },
    getTest() {
      MessageBox.alert("", {
        message: "测试",
        title: "提示"
      }).then(action => {});
    },
    submitForm() {
      Indicator.open({
        text: "登录...",
        spinnerType: "fading-circle"
      });
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
            // this.$store.commit("SET_USERINFO", res.info);
            document.cookie = "userId=" + res.info.id;
            this.$router.push("/layout/selfCheck");
          } else if (res.status == "fail") {
            MessageBox.alert("", {
              message: res.info,
              title: "提示"
            }).then(action => {});
          }
        })
        .catch(res => {
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
    line-height: 1;
    flex-direction: column;
    box-sizing: border-box;
    .title {
      width: 100%;
      height:5.6rem;
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
    .formList {
      margin: 0.5rem;
    }
    .forget {
      margin: 1.2rem;
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
      margin-top: 1.333333rem;
      border-radius: 20px;
      background: #5076ff;
      color: #fff;
    }
  }
  .bottom {
    text-align: center;
    color: #aeaeae;
    height: 2rem;
  }
}
</style>

<style lang="scss">
</style>
