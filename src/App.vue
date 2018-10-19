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
  mounted() {

    
  },
  created() {
    window.getPush = this.getPush;
  },
  methods: {
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
