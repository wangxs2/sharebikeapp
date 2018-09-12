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
      selected: "/layout/selfCheck",
      // selected:"",
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
  created() {
    this.roleCode = localStorage.roleCode;
    console.log(this.selected);
    // this.message();
  },
  methods: {
    message() {
      if (this.selected == "/layout/selfCheck") {
        this.imgUrl[0] = require("../../assets/image/login/icon_tab_1_pre@3x.png");
      } else {
        this.imgUrl[0] = require("../../assets/image/login/icon_tab_1_nor@3x.png");
      }
      if (this.selected == "/layout/supervise") {
        this.imgUrl[1] = require("../../assets/image/login/icon_tab_2_pre@3x.png");
      } else {
        this.imgUrl[1] = require("../../assets/image/login/icon_tab_2_nor@3x.png");
      }
      if (this.selected == "/layout/count") {
        this.imgUrl[2] = require("../../assets/image/login/icon_tab_3_pre@3x.png");
      } else {
        this.imgUrl[2] = require("../../assets/image/login/icon_tab_3_nor@3x.png");
      }
      if (this.selected == "/layout/warning") {
        this.imgUrl[3] = require("../../assets/image/login/icon_tab_4_pre@3x.png");
      } else {
        this.imgUrl[3] = require("../../assets/image/login/icon_tab_4_nor@3x.png");
      }
      if (this.selected == "/layout/me") {
        this.imgUrl[4] = require("../../assets/image/login/icon_tab_5_pre@3x.png");
      } else {
        this.imgUrl[4] = require("../../assets/image/login/icon_tab_5_nor@3x.png");
      }

      if (this.roleCode == "clean" && this.selected == "/layout/supervise") {
        this.$router.push("/layout/needtodo");
      } else {
        this.$router.push(this.selected);
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
    //   background: red;
  }
}
</style>
