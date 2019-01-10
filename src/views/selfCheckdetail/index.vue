
<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible=false"
      ></span>
      <mt-swipe style="width:100%;height:64%" :continuous='false' :touchstart='true' :speed ='10'	:auto="0" :defaultIndex='indexImage'>
        <mt-swipe-item v-for="(iteam,index) in lageImg" :key="index" >
          <img
            :src="Ip+iteam"
            alt
            srcset
            v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
            width="100%"
          >
        </mt-swipe-item>
      </mt-swipe>
      <!-- <img
        src="../../assets/image/login/rotate.svg"
        alt
        srcset
        width="50"
        height="50"
        style="position:fixed;right:44%;bottom:15px;"
        @click="rotate()"
      > -->
    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toHome">
      <div class="header-title">自查处理详情</div>
      <div></div>
    </div>
    <div class="content">
      <div class="selfcheckList" style="border-bottom:1px solid #f2f2f2;">
        <div class="iteamsa">
          <img v-if="iteamList.orgId==1007" src="../../assets/image/OFO.png" width="59" height="58">
          <img
            v-if="iteamList.orgId==1006"
            src="../../assets/image/mobike.png"
            width="59"
            height="58"
          >
          <img
            v-if="iteamList.orgId==1014"
            src="../../assets/image/jiujiu.png"
            width="59"
            height="58"
          >
          <img
            v-if="iteamList.orgId==1015"
            src="../../assets/image/haluo.png"
            width="59"
            height="58"
          >
          <img
            v-if="iteamList.orgId==1059"
            src="../../assets/image/xiangqi.png"
            width="59"
            height="58"
          >
          <img
            v-if="iteamList.orgId!==1006&&iteamList.orgId!==1007&&iteamList.orgId!==1014&&iteamList.orgId!==1015&&iteamList.orgId!==1059"
            src="../../assets/image/jiedao.png"
            width="59"
            height="58"
          >
          <div style="width:70%;margin-left:0.3rem;display: flex;flex-direction:column;">
            <p style="display: flex;justify-content: space-between;width:100%;flex:1">
              <span>{{iteamList.orgName}}</span>
              <span
                :class="iteamList.status == 1 ? 'green' : 'red'"
              >{{iteamList.status == 1 ? '处理中' : "已处理"}}</span>
            </p>
            <p style="color:#666666;width:100%;">单号：{{iteamList.sheetCode}}</p>
          </div>
        </div>
      </div>
      <div class="selfcheckList" style="margin-bottom:0.3rem">
        <div class="iteamsa">
          <img
            src="../../assets/image/selfcheck/icon_2_address@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <p style="margin-left:0.2rem;margin-top:0.1rem">{{iteamList.handleAddr}}</p>
        </div>
      </div>
      <p
        style="background: #fff;box-sizing: border-box;padding:0.2rem 0.3rem;"
      >处理人：{{iteamList.handleUserName}}</p>
      <p
        style="background: #fff;box-sizing: border-box;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2"
      >处理时长：{{iteamList.dealTimeHour}}</p>
      <div class="selfcheckList" style="margin-bottom:0.3rem">
        <div class="iteamsa">
          <div class="timesa">
            <p style="display: flex;flex:1;margin-top:0.1rem;color:#666666;font-size:0.35rem">处理完成</p>
            <p style="margin-bottom:-0.05rem;color:#666666;font-size:0.35rem">开始处理</p>
          </div>
          <div class="timesa" style="margin-left:0.2rem">
            <img src="../../assets/image/icon_完成@2x.png" width="20" height="20" alt srcset>
            <p
              style="display: flex;flex:1;width:2px;height:1rem;background:#5076FF;margin-left:8px"
            ></p>
            <p style="width:10px;height:10px;border-radius: 50%;background:#5076FF;margin-left:4px"></p>
          </div>
          <div class="timesa" style="margin-left:0.2rem">
            <p style="display: flex;flex:1;margin-top:0.05rem;">{{FormatDate(iteamList.handleTime)}}</p>
            <p style="margin-bottom:-0.1rem;">{{FormatDate(iteamList.createTime)}}</p>
          </div>
        </div>
      </div>
      <p
        style="background: #fff;box-sizing: border-box;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2"
      >处理统计</p>
      <!-- <div class="iteamList" style="margin-top:0px;margin-bottom:1px">处理统计</div> -->
      <div class="selfcheckList" style="margin-bottom:0.3rem">
        <div class="iteamsa">
          <div style="width:50%;text-align: center">
            <p style="font-size:0.5rem">{{iteamList.arrangeNum}}</p>
            <p style="font-size:0.3rem;color:#666666;margin-top:0.1rem">整理数</p>
          </div>
          <div style="width:50%;text-align: center">
            <p style="font-size:0.5rem">{{iteamList.cleanNum}}</p>
            <p style="font-size:0.3rem;color:#666666;margin-top:0.1rem">清运数</p>
          </div>
        </div>
      </div>
      <p
        style="background: #fff;box-sizing: border-box;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2"
      >现场照片</p>
      <div class="iteamListsa">
        <p style="font-size:0.3rem;color:#666666;padding-bottom:0.2rem">处理前</p>
        <div class="imageList">
          <img
            v-for="(iteam,index) in iteamList.handleBeforeURLs"
            :src="Ip+iteam"
            :key="index"
            alt
            srcset
            style="width:2.6rem;height:2.6rem"
            @click="handOpen(iteamList.handleBeforeURLs,index)"
          >
        </div>
        <p style="font-size:0.3rem;color:#666666;padding-bottom:0.2rem;padding-top:0.2rem;">处理后</p>
        <div class="imageList">
          <img
            v-for="(iteam,index) in iteamList.handleAfterURLs"
            :src="Ip+iteam"
            :key="index"
            alt
            srcset
            style="width:2.6rem;height:2.6rem"
            @click="handOpen(iteamList.handleAfterURLs,index)"
          >
        </div>
      </div>
      <div class="selfcheckList" style="margin-bottom:0.1rem;">
        <div class="iteamsa">
          <p style="display: flex;">备注：</p>
          <p class="textFont" style="margin-left:0.2rem;flex:1">{{iteamList.remark}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
import { setTimeout } from 'timers';
export default {
  computed: {},
  data() {
    return {
      slide: [],
      slide1: [],
      searchCondition: {},
      menuListTop: [],
      downIcon: -1,
      sheetCode: "",
      rotateS: 0,
      bigImage: "",
      indexImage:-1,//轮播默认图片
      lageImg: [],
      popupVisible: false,
      iteamList: {},
      areakids: [],
      areaarr: []
    };
  },
  components: {},
  mounted() {},
  created() {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.searchCondition = this.$route.query.searchCondition;
      this.menuListTop = this.$route.query.menuListTop;
      this.downIcon = this.$route.query.downIcon;
      this.areakids = this.$route.query.areakids;
      this.areaarr = this.$route.query.areaarr;
      this.getMessage(this.sheetCode);
    }
    window.watchBackWXS = this.watchBackWXS;
  },
  mounted() {},
  methods: {
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    watchBackWXS() {
      this.toHome();
    },
    toHome() {
      this.$router.push({
        path: "/layout/selfCheck",
        query: {
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areaarr: this.areaarr,
          areakids: this.areakids
        }
      });
    },
    handOpen(val,index) {
      console.log(index);
      this.rotateS = 0;
      this.lageImg=[];
      this.popupVisible = true;
      val.forEach(iteam => {
        iteam = iteam.replace(".400x400.jpg", ".square.jpg");
        this.lageImg.push(iteam);
      });
      this.indexImage=index;
     
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
<style>

</style>

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
    height: 1.173333rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    color: #fff;
    font-size: 0.48rem;
    padding: 0 0.32rem;
    box-sizing: border-box;
    flex-shrink: 0;
    img {
      height: 0.48rem;
      width: 0.266667rem;
    }
  }
  .content {
    width: 100%;
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    padding: 0.3rem;
    box-sizing: border-box;
    flex-direction: column;
    p {
      margin: 0;
      padding: 0;
    }
    .selfcheckList {
      width: 100%;
      box-sizing: border-box;
      background: #fff;
      border-radius: 2px;

      .iteamsa {
        box-sizing: border-box;
        padding: 0.3rem;
        flex: 1;
        display: flex;
        justify-content: flex-start;
        .timesa {
          display: flex;
          flex-direction: column;
        }
      }
    }
    .iteamListsa {
      background: #fff;
      box-sizing: border-box;
      margin-bottom: 0.3rem;
      border-radius: 2px;
      padding: 0.3rem;
      .imageList {
        img {
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>



