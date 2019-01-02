

<template>
  <div class="container">
    <span v-if="buttonScroll" @click="toTop" class="scroll-top"></span>
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
      <div class="header-header">
        <div class="header-setting">
          <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="iconClick">
        </div>
        <div class="header-tittle">2018年12月考评列表</div>
        <div></div>
      </div>
      <div class="header-content">
        <div
          style="width:100%;height:1rem;background: -webkit-linear-gradient(left, #6698ff, #5076ff);"
        >
          <div
            style="width:100%;height:100%;display:flex;justify-content: space-between;padding: 0 0.346667rem;box-sizing: border-box;"
          >
            <span style="font-size:0.36rem">{{FormatDate(dataList.evaluateEndTime)}}</span>
            <!-- <span
              style="font-size:0.36rem;width:3rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
            >考评人：{{dataList.evaluateOrgName}}</span> -->
          </div>
        </div>
        <div class="header-content-top">
          <div class="header-content-fixed">
            <img
              style="width:0.48rem;height:0.48rem"
              src="@/assets/image/evaluation/status2.png"
              alt
              srcset
            >
            <span style="color:#00c458;font-size:0.38rem;margin-left:0.1rem">已考评</span>
            <div
              style="border-left:1px solid #dddddd;margin-left:0.3rem;padding-left:0.3rem;display:flex;justify-content:flex-start;"
            >
              <span style="color:#999999;font-size:0.38rem">被评方：</span>
              <span style="color:#333333;font-size:0.38rem">{{dataList.evaluatedOrgName}}</span>
              <span style="color:#999999;font-size:0.38rem;margin-left:0.2rem">考评方：</span>
              <span
                style="display:block;color:#333333;font-size:0.38rem;width:2rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              >{{dataList.evaluateOrgName}}</span>
            </div>
          </div>
        </div>
        <div class="header-content-bottom">
          <div class="header-content-nav">
            <div
              class="btn-left"
              style="border-top-left-radius: 0.1rem;border-bottom-left-radius: 0.1rem;"
              :viewType="viewType"
              :class="[viewType == 1 ? 'tab-active' : '']"
              @click="selectView"
            >
              <img src="@/assets/image/evaluation/icon_zicha@3x.png" alt srcset>
              <span>自查考评</span>
            </div>
            <div
              class="btn-left"
              style="border-top-right-radius: 0.1rem;border-bottom-right-radius: 0.1rem;"
              :viewType="viewType"
              :class="[viewType == 2 ? 'tab-active' : '']"
              @click="selectView1"
            >
              <img src="@/assets/image/evaluation/icon_paidan@3x.png" alt srcset>
              <span>派单考评</span>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
    <div class="content" ref="menuWrapper">
      <p
        v-if="checkData.length==0||dispatchData.length==0"
        style="color:rgb(170, 170, 170);text-align:center"
      >--我也是有底线的--</p>
      <div v-for="(iteamList,index) in dataFind" :key="index" style="margin-bottom:0.3rem;">
        <div class="superList">
          <div class="pagingSa">
            <!-- <p v-show="presa" @click="prePage" class="buttontab">上</p> -->
            <p style>第{{index+1}}单</p>
            <!-- <p v-show="nextsa" @click="nextPage" class="buttontab">下</p> -->
          </div>
        </div>
        <div class="superList">
          <div class="topsa">
            <div class="fontext">详情</div>
            <div></div>
          </div>
        </div>
        <div class="superList">
          <div class="topcloum" style="border-bottom:1px solid #eeeeee;">
            <div class="topcloumson">
              <p class="leftfont">单号</p>
              <p class="leftfont1">{{iteamList.sheetCode}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">{{iteamList.sheetType=='CHECK'?'时间':'派单时间'}}</p>
              <p class="leftfont1">{{FormatDate(iteamList.dispatchTime)}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">地点</p>
              <p class="leftfont1">{{iteamList.handleAddr}}</p>
            </div>
            <div class="topcloumson" v-if="iteamList.sheetType=='DISPATCH'">
              <p class="leftfont">派单人</p>
              <p class="leftfont1">{{iteamList.dispachUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理方式</p>
              <p
                class="leftfont1"
              >{{iteamList.dealMethod==1?"整理":iteamList.dealMethod==2?"清运":"整理且清运"}}</p>
            </div>
            <div class="topcloumson" v-if="iteamList.sheetType=='DISPATCH'">
              <p class="leftfont">派单照片</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in iteamList.dispachPhotoURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理前</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in iteamList.handleBeforeURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理后</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in iteamList.handleAfterURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">整理数</p>
              <p class="leftfont1">{{iteamList.arrangeNum}}</p>
            </div>
            <div class="topcloumson" v-if="iteamList.sheetType=='DISPATCH'">
              <p class="leftfont">清运数</p>
              <p class="leftfont1">{{iteamList.cleanNum}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">备注</p>
              <p class="leftfont1">{{iteamList.dispachRemark}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理人</p>
              <p class="leftfont1">{{iteamList.handleAddr}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时长</p>
              <p class="leftfont1">{{iteamList.dealTimeHour}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时间</p>
              <p class="leftfont1">{{FormatDate(iteamList.handleTime)}}</p>
            </div>
          </div>
        </div>
        <div class="superList">
          <div class="topsa">
            <div class="fontext">考评情况</div>
            <div></div>
          </div>
        </div>
        <div class="superList" style="margin-bottom:0rem;">
          <div
            class="topcloum"
            style="border-bottom-left-radius:0;border-bottom-right-radius:0;border-bottom:1px solid #eeeeee;"
          >
            <div class="topcloumson" style="padding-bottom:0.16rem">
              <div style="font-size: 0.38rem">拍照角度</div>
              <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
                <img
                  v-for="(iteam,index) in iteamList.avgEvaluationComments.avgPhotoAngle"
                  @click="chooseOrder(index)"
                  style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                  :key="index"
                  src="@/assets/image/evaluation/stars.png"
                  alt
                  srcset
                >
              </div>
            </div>
            <!-- <p
            style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem"
            >照片角度是否一致，是否能看出是同一个地点，照片的视野范围是否太小。</p>-->
            <div class="topcloumson" style="padding-bottom:0.16rem">
              <div style="font-size: 0.38rem">治理数量</div>
              <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
                <img
                  v-for="(iteam,index) in iteamList.avgEvaluationComments.avgDealNum"
                  @click="chooseOrder1(index)"
                  style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                  :key="index"
                  src="@/assets/image/evaluation/stars.png"
                  alt
                  srcset
                >
              </div>
            </div>
            <!-- <p
            style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem"
            >实际整理或清运数量是否与照片展现的一致，整理和清运数量是否写反。</p>-->
            <div class="topcloumson" style="padding-bottom:0.16rem">
              <div style="font-size: 0.38rem">整理照片</div>
              <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
                <img
                  v-for="(iteam,index) in iteamList.avgEvaluationComments.avgAfterDeal"
                  @click="chooseOrder2(index)"
                  style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                  :key="index"
                  src="@/assets/image/evaluation/stars.png"
                  alt
                  srcset
                >
              </div>
            </div>
            <!-- <p
            style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem"
            >整理后，其他企业的单车或社会车辆是否停放错乱，照片是否清晰。</p>-->
            <div class="topcloumson" style="padding-bottom:0.16rem;">
              <div style="font-size: 0.38rem">处理方式</div>
              <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
                <img
                  v-for="(iteam,index) in iteamList.avgEvaluationComments.avgDealMethod"
                  @click="chooseOrder3(index)"
                  style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                  :key="index"
                  src="@/assets/image/evaluation/stars.png"
                  alt
                  srcset
                >
              </div>
            </div>
            <!-- <p
            style="color:#999999;font-size:0.3rem;padding-left:2rem;"
            >派单的处理方式与企业的处理方式是否一致，反例：派单要求清运，而企业只做了整理的处理。</p>-->
          </div>
        </div>
        <div class="superList">
          <div class="topsa" style="border-radius:0">
            <div class="fontext">备注</div>
            <div></div>
          </div>
        </div>
        <div class="superList">
          <div class="topcloum" style="color:#666666" v-for="(iteam,index) in iteamList.avgEvaluationComments.remarks" :key="index">{{iteam.key}}：{{iteam.value}}</div>
        </div>
        <div class="superList">
          <div class="fraction-img">
            <div class="fraction-number">
              <div class="fraction-font">
                <span>综合得分</span>
                <p
                  style="font-size:0.7rem;margin-top:0.1rem"
                >{{iteamList.avgEvaluationComments.avgGeneralScore}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
let pathSa;
export default {
  computed: {},
  data() {
    return {
      slide: [],
      slide1: [],
      assessmentId: "",
      buttonScroll:false,
      totalSingular: "",
      viewType: 1, // 自查/派单显示
      currentPage: 0,
      nextsa: true,
      presa: false,
      totalData: [],
      dispatchData: [],
      checkData: [],
      remark: "",
      rotateS: 0,
      bigImage: "",
      popupVisible: false,
      achievementTimely: "",
      pathSa:'',
      dataFind: [],
      iteamList: {},
      dataList: {}
    };
  },
  components: {},
  created() {
    if (this.$route.query.assessmentId) {
      this.assessmentId = this.$route.query.assessmentId;
      this.dataList = this.$route.query.data;
      this.getMessage();
    }
  },
  computed: {},
  watch: {
    currentPage: function(val, old) {
      // console.log(val, old);
      if (val == 0) {
        this.presa = false;
        this.nextsa = true;
      }
      if (this.checkData.length == 1) {
        this.presa = false;
        this.nextsa = false;
      }
    },
    achievementTimely1: function(val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely2 +
        this.achievementTimely3 +
        this.achievementTimely4;
    },
    achievementTimely2: function(val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely1 +
        this.achievementTimely3 +
        this.achievementTimely4;
    },
    achievementTimely3: function(val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely1 +
        this.achievementTimely2 +
        this.achievementTimely4;
    },
    achievementTimely4: function(val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely1 +
        this.achievementTimely3 +
        this.achievementTimely2;
    },
    achievementTimely: (val, old) => {},
  },
  beforeRouteEnter(to,from,next){
    console.log(from.path);
    pathSa=from.path;
    next();
  },
  mounted() {
    this.box = this.$refs.menuWrapper;
    //             监听这个dom的scroll事件
    this.box.addEventListener("scroll", this.handleScroll, false);
  },
  methods: {
    handOpen(val) {
      this.rotateS = 0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    handleScroll() {
      if(this.$refs.menuWrapper.scrollTop>667){
          this.buttonScroll=true
      }else{
        this.buttonScroll=false
      }
    },
    toTop(){
      this.$refs.menuWrapper.scrollTop=0;
    },
    // 选择考评类型自查
    selectView(e) {
      this.dataFind = [];
      this.viewType = 1;
      if (this.checkData) {
        this.dataFind = this.checkData;
      }
    },
    // 选择考评类型派单
    selectView1(e) {
      this.dataFind = [];
      this.viewType = 2;
      if (this.dispatchData) {
        this.dataFind = this.dispatchData;
      }
    },
    nextPage() {
      if (this.viewType == 2) {
        this.currentPage++;
        this.presa = true;
        // console.log(this.currentPage);
        // console.log(this.dispatchData);
        this.iteamList = this.dispatchData[this.currentPage];
        if (
          this.currentPage == this.dispatchData.length - 1 ||
          this.dispatchData.length == 1
        ) {
          this.nextsa = false;
        } else {
          this.nextsa = true;
        }
      } else if (this.viewType == 1) {
        this.currentPage++;
        this.presa = true;
        // console.log(this.currentPage);
        // console.log(this.checkData.length - 2);
        this.iteamList = this.checkData[this.currentPage];
        if (
          this.currentPage == this.checkData.length - 1 ||
          this.checkData.length == 1
        ) {
          this.nextsa = false;
        } else {
          this.nextsa = true;
        }
      }
    },
    prePage() {
      if (this.viewType == 1) {
        this.currentPage--;
        this.nextsa = true;
        console.log(this.currentPage);
        console.log(this.checkData.length - 2);
        this.iteamList = this.checkData[this.currentPage];
        if (this.currentPage == 0 || this.checkData.length == 1) {
          this.presa = false;
        } else {
          this.presa = true;
        }
      } else if (this.viewType == 2) {
        this.currentPage--;
        this.nextsa = true;
        console.log(this.currentPage);
        console.log(this.dispatchData.length - 2);
        this.iteamList = this.dispatchData[this.currentPage];
        if (this.currentPage == 0 || this.dispatchData.length == 1) {
          this.presa = false;
        } else {
          this.presa = true;
        }
      }
    },

    splitsa(val) {
      return (
        val.split(" ")[0].split("-")[1] + "-" + val.split(" ")[0].split("-")[2]
      );
    },
    splitsa1(val) {
      return (
        val.split(" ")[1].split(":")[0] + ":" + val.split(" ")[1].split(":")[1]
      );
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    iconClick() {
      console.log()
      this.$router.push({
        path: pathSa
      });
    },
    //计算派单响应及时性成绩
    achievementSa(val) {
      let achievement;
      if (val < 30) {
        achievement = 100 * 0.4;
      } else if (val > 30 && val < 60) {
        achievement = 80 * 0.4;
      } else if (val > 60 && val < 90) {
        achievement = 60 * 0.4;
      } else if (val > 90 && val < 120) {
        achievement = 40 * 0.4;
      } else if (val > 120) {
        achievement = 20 * 0.4;
      }
      return achievement;
    },
    //计算成绩
    achievementSa1(val) {
      let achievement;
      if (val == 0) {
        achievement = 3;
      } else if (val == 1) {
        achievement = 6;
      } else if (val == 2) {
        achievement = 9;
      } else if (val == 3) {
        achievement = 12;
      } else if (val == 4) {
        achievement = 15;
      }
      return achievement;
    },
    //下一单
    Submission() {},
    //上一单
    onSingle() {},
    getMessage1() {
      this.$fetchGet("evaluation/monthEvaluationDetail", {
        evaluateId: this.assessmentId
      }).then(res => {
        this.totalData = res;
      });
    },
    getMessage() {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("evaluation/monthEvaluationDetail", {
        evaluateId: this.assessmentId
      })
        .then(res => {
          Indicator.close();
          res.forEach((element, index) => {
            if (element.sheetType == "DISPATCH") {
              this.dispatchData.push(element);
            } else if (element.sheetType == "CHECK") {
              this.checkData.push(element);
            }
          });
          this.dataFind = this.checkData;
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
p {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #f2f2f2;
  .scroll-top{
    width:1.5rem;
    height:1.5rem;
    position:fixed;
    bottom:0.5rem;
    right:0.5rem;
    background-image: url('../../assets/image/evaluation/icon_top@3x.png');
    background-size: 100% 100%;
    // box-shadow: 0 0 0.1rem #999999;
    // border-radius: 50%;
  }
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
    height: 4.473333rem;
    // background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .header-header {
      height: 1.173333rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
      padding: 0 0.346667rem;
      flex-shrink: 0;
      .header-tittle {
        line-height: 1.173333rem;
        font-size: 0.48rem;
      }
      .header-setting {
        height: 0.48rem;
        width: 0.266667rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .header-content {
      width: 100%;
      display: flex;
      flex: 1;
      //   padding: 0 0.346667rem;
      box-sizing: border-box;
      //   background: -webkit-linear-gradient(left, #6698ff, #5076ff);

      position: relative;
      .header-content-top {
        position: absolute;
        top: 0.5rem;
        width: 100%;
        height: 1.2rem;
        box-sizing: border-box;
        padding: 0 0.346667rem;
        .header-content-fixed {
          height: 100%;
          background: #fff;
          border-radius: 0.1rem;
          box-sizing: border-box;
          box-sizing: border-box;
          padding: 0.2rem;
          display: flex;
          justify-content: flex-start;
          box-shadow: 0 0 0.1rem #c5c5cc;
          align-items: center;
        }
      }
      .header-content-bottom {
        position: absolute;
        top: 1.9rem;
        // background: #fff;
        width: 100%;
        height: 1.2rem;
        box-sizing: border-box;
        padding: 0 0.346667rem;
        .header-content-nav {
          height: 100%;
          background: #fff;
          box-shadow: 0 0 0.1rem #c5c5cc;
          border-radius: 0.1rem;
          display: flex;
          justify-content: space-between;
          .btn-left {
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #5076ff;
            img {
              width: 0.5rem;
              height: 0.5rem;
            }
          }
          .tab-active {
            background: #dae6ff;
          }
        }
      }
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding-bottom: 0.3rem;
    .button-number {
      height: 1rem;
      border-radius: 0.1rem;
      color: #fff;
    }
    .superList {
      width: 100%;
      box-sizing: border-box;
      border-radius: 2px;
      .pagingSa {
        display: flex;
        justify-content: center;
        border-bottom: 1px solid #eeeeee;
        margin: 0 0.3rem;
        padding: 0.2rem 0.3rem;
        background: #ffffff;
        border-top-left-radius: 0.12rem;
        border-top-right-radius: 0.12rem;
        align-items: center;
        font-weight: bolder;
        .buttontab {
          color: #fff;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: -webkit-linear-gradient(top, #6698ff, #5076ff);
          font-size: 0.3rem;
          text-align: center;
          line-height: 30px;
        }
      }
      .fraction-img {
        display: flex;
        justify-content: center;
        background: #fff;
        align-items: center;
        margin: 0 0.3rem;
        padding-bottom: 0.3rem;
        border-bottom-left-radius: 0.12rem;
        border-bottom-right-radius: 0.12rem;
        .fraction-number {
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          //   line-height: 4rem;
          background-image: url("../../assets/image/evaluation/fraction.png");
          display: flex;
          background-size: 100% 100%;
          justify-content: center;
          align-items: center;
          .fraction-font {
            text-align: center;
            color: #ff7743;
          }
        }
      }
      .topsa {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 0.3rem;
        background: #fff;
        padding: 0.3rem;
        padding-bottom: 0;
        // border-top-left-radius: 0.12rem;
        // border-top-right-radius: 0.12rem;
        color: #5076ff;
        .fontext {
          position: relative;
          margin-left: 0.3rem;
          font-size: 0.42rem;
          &::before {
            content: "";
            position: absolute;
            top: 0.015rem;
            left: 0px;
            width: 0.1rem;
            height: 0.4rem;

            background: #5076ff;
            margin-left: -0.25rem;
          }
        }
      }
      .topcloum {
        background: #fff;

        display: flex;
        box-sizing: border-box;
        margin: 0 0.3rem;
        padding: 0.3rem;
        flex-direction: column;
        border-bottom-left-radius: 0.12rem;
        border-bottom-right-radius: 0.12rem;
        .topcloumson {
          display: flex;
          justify-content: flex-start;
          padding-bottom: 0.3rem;
          align-items: center;
          .leftfont {
            width: 25%;
            color: #999999;
            font-size: 0.38rem;
          }
          .leftfont1 {
            width: 75%;
            img {
              margin-right: 0.2rem;
              width: 2.5rem;
              height: 2.5rem;
            }
          }
          .start-img {
            display: block;
            width: 0.6rem;
            height: 0.6rem;
            background-image: url("../../assets/image/evaluation/starnor@2x.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
          .detail-selected {
            background-image: url("../../assets/image/evaluation/stars.png");
          }
        }
      }
    }
  }
}
</style>



