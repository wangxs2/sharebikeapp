<template>
  <div id="app">
    <div id="allmap"></div>
    <router-view/>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import base64 from "@/libs/base.js";
export default {
  name: "App",
  return: {
    
  },
  // watch:
  mounted() {

    
  },
  created() {
    window.getPush = this.getPush;
  },
  methods: {
    // watchBackWXS() {
    //   console.log("点击了返回键");
    //   if (
    //     this.$route.path == "/" ||
    //     this.$route.path == "/login" ||
    //     this.$route.path == "/layout/selfCheck" ||
    //     this.$route.path == "/layout/supervise" ||
    //     this.$route.path == "/layout/needtodo" ||
    //     this.$route.path == "/layout/count" ||
    //     this.$route.path == "/layout/warning" ||
    //     this.$route.path == "/layout/me"
    //   ) {
    //     return;
    //   } else {
    //     this.$router.go(-1);
    //   }
    // },
    // getMap1() {},
    getPush(userName, password, url) {
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
                this.$router.push({
                  path: "/needtodoAdd",
                  query: {
                    id: url
                  }
                });
              } else if (res.info.roleCode == "admin") {
                console.log(655555);
                console.log(url);
                this.$router.push({
                  path: "/layout/supervise",
                  query: {
                    supervise: url,
                    statuSa: 2
                  }
                });
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
