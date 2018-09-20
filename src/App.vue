<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import base64 from "@/libs/base.js";
export default {
  name: "App",
  // watch:
  mounted() {
    window.watchBackWXS = this.watchBackWXS;
  },
  created() {
    window.getPush = this.getPush;
    // MessageBox.alert("", {
    //     message: "跳转进来了登录页面",
    //     title: "提示"
    //   }).then(action => {

    //   });
  },
  methods: {
    watchBackWXS() {
      console.log("点击了返回键");
      console.log(this.$route.path);
      if(this.$route.path=="/login"||this.$route.path=="/layout/selfCheck"||this.$route.path=="/layout/supervise"||this.$route.path=="/layout/needtodo"||this.$route.path=="/layout/count"||this.$route.path=="/layout/warning"||this.$route.path=="/layout/me"){
        return
      }else{
        this.$router.go(-1)
      }

    },
    getPush(userName, password, url) {
      // console.log(655555);

      if (userName) {
        let b = new base64();
        let data = {
          username: userName,
          password: b.encode(password)
        };
        this.$fetchPost("login", data)
          .then(res => {
            if (res.status == "success") {
              localStorage.setItem("roleCode", res.info.roleCode);
              document.cookie = "userId=" + res.info.id;
              if (
                res.info.roleCode == "clean" ||
                res.info.roleCode == "manage"
              ) {
                // console.log("跳转");
                this.$router.push("/layout/needtodo");
              } else {
                this.$router.push("/layout/supervise");
              }
            } else if (res.status == "fail") {
              MessageBox.alert("", {
                message: res.info,
                title: "提示"
              }).then(action => {});
            }
          })
          .catch(res => {
            MessageBox.alert("", {
              message: res,
              title: "提示"
            }).then(action => {});
          });
      } else {
        return;
      }
    },
    getSa(userName, password) {}
  }
};
</script>

<style>
</style>
