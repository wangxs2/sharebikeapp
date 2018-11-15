
<template>
  <div class="container">
      <mt-popup
      class="imgMask"
        v-model="popupVisible"
        position="right">
        <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible=false"></span>
        <img :src="Ip+bigImage" alt="" srcset="" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" width="100%">
        <img src="../../assets/image/login/rotate.svg" alt="" srcset="" width="50" height="50" style="position:fixed;right:44%;bottom:15px;" @click="rotate()">
      </mt-popup>
      <div class="header">
       
        <mt-header title="自查处理详情">
           <router-link to="/layout/selfCheck" slot="left">
                <mt-button icon="back" style="font-size:24px"></mt-button>
            </router-link>  
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamList">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>单号：</span>
                <span>{{iteamList.sheetCode}}</span>
                
              </div>

        </div>
        <div class="iteamList">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>时间：</span>
                <span>{{FormatDate(iteamList.createTime)}}</span>
                
              </div>
              <div :class="iteamList.status == 1 ? 'green' : 'red'">{{iteamList.status == 1 ? '处理中' : "已处理"}}</div>

        </div>
        <div class="iteamList">
           <div class="moreText">
                <span><img style="margin-top:-0.1rem" src="../../assets/image/selfcheck/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span style="width:17%;margin-left:0.1rem">地点：</span>
                <span class="textFont">{{iteamList.handleAddr}}</span>                
            </div>
              <!-- <div>
                <span><img src="../../assets/image/selfcheck/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>地点：</span>
                <span>{{iteamList.handleAddr}}</span>
                
              </div> -->

        </div>
        <div class="imageClean" style="padding:0.3rem 0.213333rem">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>处理前</span>                                
              </div>
              <div class="imageList">
                <img v-for="(iteam,index) in iteamList.handleBeforeURLs" :src="Ip+iteam" :key="index" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
              </div>

        </div>
        <div class="imageClean" style="padding:0.3rem 0.213333rem">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>处理后</span>                                
              </div>
              <div class="imageList">
                <img v-for="(iteam,index) in iteamList.handleAfterURLs" :src="Ip+iteam" :key="index" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
              </div>
        </div>
        <div class="iteamList">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>整理数：</span>
                <span>{{iteamList.arrangeNum}}</span>                
              </div>
        </div>
        <div class="iteamList">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_6_num2@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>清运数：</span>
                <span>{{iteamList.cleanNum}}</span>
                
              </div>

        </div>
        <div class="iteamList">
              <div class="moreText">
                <span><img style="margin-top:-0.1rem" src="../../assets/image/selfcheck/icon_7_note@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span style="width:17%;margin-left:0.1rem">备注：</span>
                <span class="textFont">{{iteamList.remark}}</span>                
              </div>
        </div>
        <div class="iteamList">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_8_processor@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>处理人：</span>
                <span>{{iteamList.handleUserName}}</span>                
              </div>
        </div>
        <div class="iteamList">
              <div>
                <span><img src="../../assets/image/selfcheck/icon_9_dealtime@3x.png" width="22" height="22" alt="" srcset=""></span>
                <span>处理时间：</span>
                <span>{{FormatDate(iteamList.handleTime)}}</span>                
              </div>

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
      this.rotateS=0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", "");
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

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
    overflow: hidden;
    overflow-y: scroll;
    .iteamImage {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.213333rem;
      flex-direction: column;
    }
    .iteamList {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.213333rem;
      justify-content: space-between;
      .moreText {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        .textFont {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    .imageList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 0.2rem;
      img {
        margin-right: 5px;
        box-shadow: 0 0 010px #ccc;
      }
    }
  }
}
</style>



