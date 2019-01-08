<template>
  <div id="app">
    <!-- <div id="allmap"></div>
    <router-view/>-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 page3 -->
    </router-view>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import base64 from "@/libs/base.js";
export default {
  name: "App",
  data() {
    return {
      routeArr: []
    };
  },

  mounted() {},
  created() {
    window.onAndroidHome=this.backWXS(data);
    window.getPush = this.getPush;
    // Android.onAndroidHome()=this.backWXS;
    console.log(window.onAndroidHome);
  },
  // beforeRouteLeave(to, from, next) {

  // },
  methods: {
    backWXS(data){
      console.log(data); 
      this.$router.go(-1);
    },
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
              console.log(12);
              localStorage.setItem("roleCode", res.info.roleCode);
              document.cookie = "userId=" + res.info.id;
              if (
                res.info.roleCode == "clean" ||
                res.info.roleCode == "manage"
              ) {
                console.log(13);
                this.$router.push({
                  path: "/needtodoAdd",
                  query: {
                    id: url
                  }
                });
              } else if (
                res.info.roleCode == "admin" ||
                res.info.roleCode == "global" ||
                res.info.roleCode == "dispatch"
              ) {
                // console.log(655555);
                // console.log(url);
                this.$router.push({
                  path: "/layout/supervise",
                  query: {
                    supervise: url,
                    statuSa: 2
                  }
                });
              } else {
                console.log(14);
                this.$router.push({
                  path: "/layout/selfCheck"
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
.mint-cell {
  background-color: transparent;
}
</style>
