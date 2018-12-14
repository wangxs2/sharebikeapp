<template>
  <div class="layout">
    <div class="appMain">
      <appMain></appMain>
    </div>
    <div class="bottom">
      <mt-tabbar v-model="selected" style="background:#fff" @click.native="message">
        <mt-tab-item id="/layout/selfCheck">
          <img slot="icon" :src="imgUrl[0]">
          自查
        </mt-tab-item>
        <mt-tab-item id="/layout/supervise">
          <img slot="icon" :src="imgUrl[1]">
          督办
        </mt-tab-item>
        <mt-tab-item id="/layout/count">
          <img slot="icon" :src="imgUrl[2]">
          统计
        </mt-tab-item>
        <mt-tab-item id="/layout/warning">
          <img slot="icon" :src="imgUrl[3]">
          预警
        </mt-tab-item>
        <mt-tab-item id="/layout/me">
          <img slot="icon" :src="imgUrl[4]">
          <!-- <img slot="icon" src="../../assets/image/login/LOGO.png"> -->
          <!-- <i class="iconfont icon-zhanghao"></i> -->
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import appMain from "./components/appMain";
export default {
  components: {
    appMain
  },
  computed: {},
  data() {
    return {
      longitude: "",
      latitude: "",
      selected: "",
      roleCode: "",
      imgUrl: [
        require("../../assets/image/login/icon_tab_1_nor@3x.png"),
        require("../../assets/image/login/icon_tab_2_nor@3x.png"),
        require("../../assets/image/login/icon_tab_3_nor@3x.png"),
        require("../../assets/image/login/icon_tab_4_nor@3x.png"),
        require("../../assets/image/login/icon_tab_5_nor@3x.png")
      ]
      //imgUrls:[require("../../assets/image/login/icon_tab_1_pre@3x.png"),require("../../assets/image/login/icon_tab_2_pre@3x.png"),require("../../assets/image/login/icon_tab_3_pre@3x.png"),require("../../assets/image/login/icon_tab_4_pre@3x.png"),require("../../assets/image/login/icon_tab_5_pre@3x.png")],
    };
  },
  mounted() {
    // this.getMap();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "自查" || to.name == "待办" || to.name == "督办") {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true;
      } else {
        next();
      }
    } else {
      from.meta.keepAlive = false;
      to.meta.keepAlive = false;
      next();
    }
  },
  created() {
    this.roleCode = localStorage.roleCode;
    this.selected = this.$route.path;
    if (this.$route.path == "/layout/needtodo") {
      this.selected = "/layout/supervise";
      this.changeImage("/layout/needtodo");
    } else {
      if (this.$route.path == "/layout/supervise") {
        this.selected = "/layout/supervise";
        this.changeImage("/layout/needtodo");
      } else {
        this.selected = this.$route.path;
        this.changeImage(this.$route.path);
      }
    }

    // this
  },
  methods: {
    getMap() {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            that
              .$fetchPut("user/updateByUser", {
                longitude: r.point.lng,
                latitude: r.point.lat
              })
              .then(data => {});
          } else {
            MessageBox.alert("", {
              message: "failed" + this.getStatus(),
              title: "提示"
            }).then(action => {});
          }
        },
        { enableHighAccuracy: true }
      );
      setTimeout(() => {
        this.getMap();
      }, 300000);
    },
    changeImage(val) {
      if (val == "/layout/selfCheck") {
        this.imgUrl[0] = require("../../assets/image/login/icon_tab_1_pre@3x.png");
      } else {
        this.imgUrl[0] = require("../../assets/image/login/icon_tab_1_nor@3x.png");
      }
      if (val == "/layout/supervise") {
        this.imgUrl[1] = require("../../assets/image/login/icon_tab_2_pre@3x.png");
      } else {
        this.imgUrl[1] = require("../../assets/image/login/icon_tab_2_nor@3x.png");
      }
      if (val == "/layout/needtodo") {
        this.imgUrl[1] = require("../../assets/image/login/icon_tab_2_pre@3x.png");
      } else {
        this.imgUrl[1] = require("../../assets/image/login/icon_tab_2_nor@3x.png");
      }
      if (val == "/layout/count") {
        this.imgUrl[2] = require("../../assets/image/login/icon_tab_3_pre@3x.png");
      } else {
        this.imgUrl[2] = require("../../assets/image/login/icon_tab_3_nor@3x.png");
      }
      if (val == "/layout/warning") {
        this.imgUrl[3] = require("../../assets/image/login/icon_tab_4_pre@3x.png");
      } else {
        this.imgUrl[3] = require("../../assets/image/login/icon_tab_4_nor@3x.png");
      }
      if (val == "/layout/me") {
        this.imgUrl[4] = require("../../assets/image/login/icon_tab_5_pre@3x.png");
      } else {
        this.imgUrl[4] = require("../../assets/image/login/icon_tab_5_nor@3x.png");
      }
    },
    message() {
      if (
        (this.roleCode == "clean" || this.roleCode == "manage") &&
        this.selected == "/layout/supervise"
      ) {
        this.changeImage("/layout/needtodo");
        this.$router.push("/layout/needtodo");
      } else {
        if (this.selected == "/layout/supervise") {
          this.$router.push(this.selected);
          this.changeImage("/layout/needtodo");
        } else {
          this.$router.push(this.selected);
          this.changeImage(this.selected);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .appMain {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
  }
  .bottom {
    display: flex;
    width: 100%;
    height: 55px;
    border-top: 1px solid #f6f6f6;
    z-index: 8887;
  }
}
</style>
