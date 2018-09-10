<template>
  <div class="layout">
      <div class="appMain">
        <appMain></appMain>
      </div>
      <div class="bottom">
        <mt-tabbar v-model="selected" style="background:#fff" @click.native="message">
            <mt-tab-item id="/layout/selfCheck">
                <img slot="icon" src="../../assets/image/login/LOGO.png">
                自查
            </mt-tab-item>
            <mt-tab-item id="/layout/supervise">
                <img slot="icon" src="../../assets/image/login/LOGO.png">
                督办
            </mt-tab-item>
            <mt-tab-item id="/layout/count">
                <img slot="icon" src="../../assets/image/login/LOGO.png">
                 统计
            </mt-tab-item>
            <mt-tab-item id="/layout/warning">
                <img slot="icon" src="../../assets/image/login/LOGO.png">
               预警
            </mt-tab-item>
             <mt-tab-item id="/layout/me">
                <img slot="icon" src="../../assets/image/login/LOGO.png">
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
        selected:"/layout/selfCheck",
    };
  },
  methods:{
    message(val){
      console.log(this.selected)
      
      this.$router.push(this.selected);

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
  .appMain {
    flex: 1;
  }
  .bottom {
      width: 100%;
      height: 55px;
    //   background: red;
  }
}
</style>
