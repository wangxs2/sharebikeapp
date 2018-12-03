
<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible=false"
      ></span>
      <img
        :src="Ip+bigImage"
        alt
        srcset
        v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
        width="100%"
      >
      <img
        src="../../assets/image/login/rotate.svg"
        alt
        srcset
        width="50"
        height="50"
        style="position:fixed;right:44%;bottom:15px;"
        @click="rotate()"
      >
    </mt-popup>
    <div class="header">
      <mt-header title="自查处理详情">
        <router-link to="/layout/selfCheck" slot="left">
          <mt-button icon="back" style="font-size:24px"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="content">
      <div class="iteamList" style="margin-bottom:1px">
        <img src="../../assets/image/OFO.png" width="59" height="58" alt srcset>
        <div
          class="topright"
          style="width:100%;margin-left:0.3rem;display: flex;flex-direction:column;"
        >
          <p style="display: flex;justify-content: space-between;width:100%;flex:1">
            <span>OFO</span>
            <span
              :class="iteamList.status == 1 ? 'green' : 'red'"
            >{{iteamList.status == 1 ? '处理中' : "已处理"}}</span>
          </p>
          <p style="color:#666666;width:100%;">单号：{{iteamList.sheetCode}}</p>
        </div>
      </div>
      <div class="iteamList" style="margin-top:0px">
        <img
          src="../../assets/image/selfcheck/icon_2_address@3x.png"
          width="24"
          height="24"
          alt
          srcset
        >
        <p class="textFont" style="margin-left:0.2rem;margin-top:0.1rem">{{iteamList.handleAddr}}</p>
      </div>
      <div class="iteamList" style="margin-top:0px;margin-bottom:1px">处理时长：{{iteamList.dealTime}}</div>
      <div class="iteamList" style="margin-top:0px">
        <div class="timesa">
          <p style="display: flex;flex:1;margin-top:0.1rem;color:#666666;font-size:0.3rem">开始处理</p>
          <p style="margin-bottom:-0.05rem;color:#666666;font-size:0.3rem">处理完成</p>
        </div>
        <div class="timesa" style="margin-left:0.2rem">
          <img src="../../assets/image/icon_完成@2x.png" width="20" height="20" alt srcset>
          <p style="display: flex;flex:1;width:2px;height:1rem;background:#5076FF;margin-left:8px"></p>
          <p style="width:10px;height:10px;border-radius: 50%;background:#5076FF;margin-left:4px"></p>
        </div>
        <div class="timesa" style="margin-left:0.2rem">
          <p style="display: flex;flex:1;margin-top:0.05rem;">{{FormatDate(iteamList.handleTime)}}</p>
          <p style="margin-bottom:-0.1rem;">{{FormatDate(iteamList.updateTime)}}</p>
        </div>
      </div>
      <div class="iteamList" style="margin-top:0px;margin-bottom:1px">处理统计</div>
      <div class="iteamList" style="margin-top:0px;">
        <div style="width:50%;text-align: center">
          <p style="font-size:0.5rem">21</p>
          <p style="font-size:0.3rem;color:#666666;margin-top:0.1rem">整理数</p>
        </div>
        <div style="width:50%;text-align: center">
          <p style="font-size:0.5rem">22</p>
          <p style="font-size:0.3rem;color:#666666;margin-top:0.1rem">清运数</p>
        </div>
      </div>
      <div class="iteamList" style="margin-top:0px;margin-bottom:1px">现场照片</div>
      <div class="iteamListsa" style="margin-top:0px;">
        <p style="font-size:0.3rem;color:#666666;">处理前</p>
        <div class="imageList">
          <img
            v-for="(iteam,index) in iteamList.handleBeforeURLs"
            :src="Ip+iteam"
            :key="index"
            alt
            srcset
            width="100"
            height="100"
            @click="handOpen(iteam)"
          >
        </div>
        <p style="font-size:0.3rem;color:#666666;">处理后</p>
        <div class="imageList">
          <img
            v-for="(iteam,index) in iteamList.handleAfterURLs"
            :src="Ip+iteam"
            :key="index"
            alt
            srcset
            width="100"
            height="100"
            @click="handOpen(iteam)"
          >
        </div>
      </div>
      <div class="iteamList" style="margin-top:0px;margin-bottom:0.1rem;">
        <p style="display: flex;">备注：</p>
        <p class="textFont" style="margin-left:0.2rem;flex:1">{{iteamList.remark}}</p>
      </div>
     
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      slide: [],
      slide1: [],
      sheetCode: "",
      rotateS: 0,
      bigImage: "",
      popupVisible: false,
      iteamList: {}
    };
  },
  components: {},
  mounted() {},
  created() {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.getMessage(this.sheetCode);
    }
  },
  mounted() {},
  methods: {
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    handOpen(val) {
      this.rotateS = 0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    getMessage(val) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("selfcheck/selfCheck", {
        sheetCode: val
      })
        .then(res => {
          Indicator.close();

          this.iteamList = res;
        })
        .catch(res => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: #ffc000;
}
.red {
  color: #41cd76;
}
.textFont {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // overflow: hidden;
  background-color: #f2f2f2;
  .imgMask {
    width: 100%;
    height: 100%;
    line-height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header {
    width: 100%;
    height: 1.173333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1.173333rem;
    color: #fff;
  }
  .content {
    flex: 1;
    // overflow: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    p {
      margin: 0;
      padding: 0;
    }
    .iteamList {
      background: #fff;
      display: flex;
      justify-content: flex-start;
      box-sizing: border-box;
      margin: 0.3rem;
      border-radius: 2px;
      padding: 0.3rem;
      .timesa {
        display: flex;
        flex-direction: column;
      }
    }
    .iteamListsa {
      background: #fff;
      // display: flex;
      // flex-direction: column;
      box-sizing: border-box;
      margin: 0.3rem;
      border-radius: 2px;
      padding: 0.3rem;
      .imageList {
       
      }
    }
  }
}
</style>



