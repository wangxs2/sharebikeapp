

<template>
  <div class="container">
    <mt-popup class="imgMask"
              v-model="popupVisible"
              position="right">
      <span class="iconfont icon-guandiao"
            style="color:#fff;position:fixed;right:15px;top:15px"
            @click="popupVisible=false"></span>
      <img :src="Ip+bigImage"
           alt
           srcset
           v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
           width="100%">
      <img src="../../assets/image/login/rotate.svg"
           alt
           srcset
           width="50"
           height="50"
           style="position:fixed;right:44%;bottom:15px;"
           @click="rotate()">
    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png"
           alt
           @click="iconClick">
      <div class="header-title">2018年12月考评列表</div>
      <div>{{currentPage+1}}/{{totalSingular}}</div>
    </div>
    <div class="content">
      <div class="superList">
        <div class="topsa"
             style="margin-top:0.2rem">
          <div class="fontext">详情</div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topcloum">
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
          <div class="topcloumson"
               v-if="iteamList.sheetType=='DISPATCH'">
            <p class="leftfont">派单人</p>
            <p class="leftfont1">{{iteamList.dispachUserName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理方式</p>
            <p class="leftfont1">{{iteamList.dealMethod==1?"整理":iteamList.dealMethod==2?"清运":"整理且清运"}}</p>
          </div>
          <div class="topcloumson"
               v-if="iteamList.sheetType=='DISPATCH'">
            <p class="leftfont">派单照片</p>
            <p class="leftfont1">
              <img v-for="(iteam,index) in iteamList.dispachPhotoURLs"
                   :src="Ip+iteam"
                   :key="index"
                   alt
                   srcset
                   @click="handOpen(iteam)">
            </p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理前</p>
            <p class="leftfont1">
              <img v-for="(iteam,index) in iteamList.handleBeforeURLs"
                   :src="Ip+iteam"
                   :key="index"
                   alt
                   srcset
                   @click="handOpen(iteam)">
            </p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理后</p>
            <p class="leftfont1">
              <img v-for="(iteam,index) in iteamList.handleAfterURLs"
                   :src="Ip+iteam"
                   :key="index"
                   alt
                   srcset
                   @click="handOpen(iteam)">
            </p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">整理数</p>
            <p class="leftfont1">{{iteamList.arrangeNum}}</p>
          </div>
          <div class="topcloumson"
               v-if="iteamList.sheetType=='DISPATCH'">
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
        <div class="topsa"
             style="margin-top:0.2rem">
          <div class="fontext">考评情况</div>
          <div></div>
        </div>
      </div>
      <div class="superList"
           style="margin-bottom:0rem;">
        <div class="topcloum"
             style=" border-bottom-left-radius:0;border-bottom-right-radius:0;">
          <div class="topcloumson"
               style="padding-bottom:0.16rem">
            <div style="padding-top:0.1rem;font-size: 0.38rem">拍照角度</div>
            <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
              <img v-if="startNumber>index||startNumber==index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/stars.png"
                   alt
                   srcset>
              <img v-if="startNumber<index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/starnor@2x.png"
                   alt
                   srcset>
            </div>
          </div>
          <p style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem">照片角度是否一致，是否能看出是同一个地点，照片的视野范围是否太小。</p>
          <div class="topcloumson"
               style="padding-bottom:0.16rem">
            <div style="padding-top:0.1rem;font-size: 0.38rem">治理数量</div>
            <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
              <img v-if="startNumber1>index||startNumber1==index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder1(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/stars.png"
                   alt
                   srcset>
              <img v-if="startNumber1<index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder1(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/starnor@2x.png"
                   alt
                   srcset>
            </div>
          </div>
          <p style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem">实际整理或清运数量是否与照片展现的一致，整理和清运数量是否写反。</p>
          <div class="topcloumson"
               style="padding-bottom:0.16rem">
            <div style="padding-top:0.1rem;font-size: 0.38rem">整理照片</div>
            <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
              <img v-if="startNumber2>index||startNumber2==index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder2(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/stars.png"
                   alt
                   srcset>
              <img v-if="startNumber2<index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder2(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/starnor@2x.png"
                   alt
                   srcset>
            </div>
          </div>
          <p style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem">整理后，其他企业的单车或社会车辆是否停放错乱，照片是否清晰。</p>
          <div class="topcloumson"
               style="padding-bottom:0.16rem;">
            <div style="padding-top:0.1rem;font-size: 0.38rem">处理方式</div>
            <div style="display:flex;justify-content: flex-start;margin-left:0.36rem">
              <img v-if="startNumber3>index||startNumber3==index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder3(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/stars.png"
                   alt
                   srcset>
              <img v-if="startNumber3<index"
                   v-for="(iteam,index) in 5"
                   @click="chooseOrder3(index)"
                   style="width:0.6rem;height:0.6rem;margin-right:0.2rem"
                   :key="index"
                   src="@/assets/image/evaluation/starnor@2x.png"
                   alt
                   srcset>
            </div>
          </div>
          <p style="color:#999999;font-size:0.3rem;padding-left:2rem;padding-bottom:0.3rem">派单的处理方式与企业的处理方式是否一致，反例：派单要求清运，而企业只做了整理的处理。</p>
        </div>
      </div>
      <div class="superList">
        <div class="topsa"
             style="margin-top:0rem;padding-top:0rem;border-radius:0">
          <div class="fontext">备注</div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topcloum">
          <textarea name
                    style="border:1px solid #eeeeee;padding-top:0.2rem;text-indent:0.2rem"
                    placeholder="请输入备注内容"
                    id
                    cols="30"
                    v-model="remark"
                    rows="4"></textarea>
        </div>
      </div>
      <div class="superList">
        <div class="fraction-img">
          <div class="fraction-number">
            <div class="fraction-font">
              <span>综合得分</span>
              <p style="font-size:0.7rem;margin-top:0.1rem">{{achievementTimely}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="superList"
           style="margin-top:0.3rem">
        <div style="display: flex;justify-content:center;margin:0 0.3rem;">
          <button class="button-number"
                  v-if="prePage"
                  style="width:48%;background: -webkit-linear-gradient(left, #6698FF, #5076FF);margin-right:2%"
                  @click="onSingle">上一单</button>
          <button class="button-number"
                  style="width:48%;background: -webkit-linear-gradient(left, #FF9B42, #FF7743);margin-left:2%"
                  @click="Submission">{{nextPage==true?'下一单':'提交'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
let pathsaTwo;
export default {
  computed: {},
  data () {
    return {
      slide: [],
      slide1: [],
      assessmentId: "",
      totalSingular: "",
      prePage: true,
      nextPage: true,
      currentPage: "",
      totalData: [],
      remark: "",
      rotateS: 0,
      startNumber: -1,
      startNumber1: -1,
      startNumber2: -1,
      startNumber3: -1,
      bigImage: "",
      popupVisible: false,
      achievementTimelysa: "",
      achievementTimely: "",
      achievementTimely1: "",
      achievementTimely2: "",
      achievementTimely3: "",
      achievementTimely4: "",
      iteamList: {}
    };
  },
  components: {},
  mounted () { },
  created () {
    if (this.$route.query.assessmentId) {
      this.assessmentId = this.$route.query.assessmentId;
      this.currentPage = this.$route.query.pageSize;
      this.totalSingular = this.$route.query.totalPage;
      this.getMessage();
    }
  },
  computed: {},
  watch: {
    currentPage: function (val, old) {
      if (val == 0) {
        this.prePage = false;
        this.nextPage = true;
      } else if (val == this.totalSingular - 1) {
        this.prePage = true;
        this.nextPage = false;
      } else {
        this.prePage = true;
        this.nextPage = true;
      }
    },
    achievementTimely1: function (val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely2 +
        this.achievementTimely3 +
        this.achievementTimely4;
    },
    achievementTimely2: function (val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely1 +
        this.achievementTimely3 +
        this.achievementTimely4;
    },
    achievementTimely3: function (val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely1 +
        this.achievementTimely2 +
        this.achievementTimely4;
    },
    achievementTimely4: function (val, old) {
      this.achievementTimely =
        val +
        this.achievementTimelysa +
        this.achievementTimely1 +
        this.achievementTimely3 +
        this.achievementTimely2;
    },
    achievementTimely: (val, old) => { }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(from.path);
    pathsaTwo = from.path;
    next();
  },
  mounted () { },
  methods: {
    handOpen (val) {
      this.rotateS = 0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    //拍照角度
    chooseOrder (index) {
      // let number=0;
      this.startNumber = index;
      this.achievementTimely1 = this.achievementSa1(index);
      //  if(id==1){
      //  this.achievementTimely=this.achievementTimely+number;
      //  }
    },
    //处理数量
    chooseOrder1 (index) {
      this.startNumber1 = index;
      this.achievementTimely2 = this.achievementSa1(index);
    },
    //整理照片
    chooseOrder2 (index) {
      this.startNumber2 = index;
      this.achievementTimely3 = this.achievementSa1(index);
    },
    //处理方式
    chooseOrder3 (index) {
      this.startNumber3 = index;
      this.achievementTimely4 = this.achievementSa1(index);
    },
    splitsa (val) {
      return (
        val.split(" ")[0].split("-")[1] + "-" + val.split(" ")[0].split("-")[2]
      );
    },
    splitsa1 (val) {
      return (
        val.split(" ")[1].split(":")[0] + ":" + val.split(" ")[1].split(":")[1]
      );
    },
    rotate () {
      this.rotateS = this.rotateS + 90;
    },
    iconClick () {
      this.$router.push({
        path: pathsaTwo
      });
    },
    //计算派单响应及时性成绩
    achievementSa (val) {
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
    achievementSa1 (val) {
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
    Submission () {
      // console.log(this.currentPage);
      if (
        this.startNumber == -1 ||
        this.startNumber1 == -1 ||
        this.startNumber2 == -1 ||
        this.startNumber3 == -1
      ) {
        MessageBox.alert("", {
          message: "请完成各项评分！",
          title: "评分失败"
        }).then(action => { });
      } else {
        this.$fetchPut(
          "evaluation/saveEvaluationDetail",
          {
            detailId: this.iteamList.id,
            photoAngle: this.startNumber + 1,
            dealNum: this.startNumber1 + 1,
            afterDeal: this.startNumber2 + 1,
            dealMethod: this.startNumber3 + 1,
            responseTime: this.achievementTimelysa / 8,
            generalScore: this.achievementTimely,
            remark: this.remark
          },
          "json"
        ).then(res => {
          if (res.status == 0) {
            // console.log(number);

            let number = this.currentPage;
            if (number == this.totalData.length - 1) {
              MessageBox.alert("", {
                message: "评分完成！",
                title: "成功"
              }).then(action => {
                this.$router.push(pathsaTwo);
              });
            }
            this.iteamList = this.totalData[number + 1];
            this.currentPage = number + 1;
            if (this.iteamList.evaluationComments) {
              this.startNumber =
                this.iteamList.evaluationComments.photoAngle - 1;
              this.startNumber1 = this.iteamList.evaluationComments.dealNum - 1;
              this.startNumber2 =
                this.iteamList.evaluationComments.afterDeal - 1;
              this.startNumber3 =
                this.iteamList.evaluationComments.dealMethod - 1;
              this.remark = this.iteamList.evaluationComments.remark;
              this.achievementTimely1 = this.achievementSa1(this.startNumber);
              this.achievementTimely2 = this.achievementSa1(this.startNumber1);
              this.achievementTimely3 = this.achievementSa1(this.startNumber2);
              this.achievementTimely4 = this.achievementSa1(this.startNumber3);
              this.achievementTimelysa = this.achievementSa(
                this.iteamList.costTime
              );
              this.achievementTimely =
                this.achievementTimelysa +
                this.achievementTimely1 +
                this.achievementTimely2 +
                this.achievementTimely3 +
                this.achievementTimely4;
            } else {
              this.achievementTimely1 = "";
              this.achievementTimely2 = "";
              this.achievementTimely3 = "";
              this.achievementTimely4 = "";
              this.remark = "";
              this.startNumber = -1;
              this.startNumber1 = -1;
              this.startNumber2 = -1;
              this.startNumber3 = -1;
              this.achievementTimelysa = this.achievementSa(
                this.iteamList.costTime
              );
              this.achievementTimely = this.achievementTimelysa;
            }
          } else {
            MessageBox.alert("", {
              message: res.message,
              title: "评分失败"
            }).then(action => { });
          }
        });
      }
    },
    //上一单
    onSingle () {
      let number = this.currentPage;
      this.currentPage = number - 1;
      this.$fetchGet("evaluation/monthEvaluationDetail", {
        evaluateId: this.assessmentId
      }).then(res => {
        this.totalData = res;
        this.iteamList = res[number - 1];
        this.startNumber = this.iteamList.evaluationComments.photoAngle - 1;
        this.startNumber1 = this.iteamList.evaluationComments.dealNum - 1;
        this.startNumber2 = this.iteamList.evaluationComments.afterDeal - 1;
        this.startNumber3 = this.iteamList.evaluationComments.dealMethod - 1;
        this.remark = this.iteamList.evaluationComments.remark;
        this.achievementTimely1 = this.achievementSa1(this.startNumber);
        this.achievementTimely2 = this.achievementSa1(this.startNumber1);
        this.achievementTimely3 = this.achievementSa1(this.startNumber2);
        this.achievementTimely4 = this.achievementSa1(this.startNumber3);
        this.achievementTimelysa = this.achievementSa(this.iteamList.costTime);
        this.achievementTimely =
          this.achievementTimelysa +
          this.achievementTimely1 +
          this.achievementTimely2 +
          this.achievementTimely3 +
          this.achievementTimely4;
      });
    },
    getMessage1 () {
      this.$fetchGet("evaluation/monthEvaluationDetail", {
        evaluateId: this.assessmentId
      }).then(res => {
        this.totalData = res;
      });
    },
    getMessage () {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("evaluation/monthEvaluationDetail", {
        evaluateId: this.assessmentId
      })
        .then(res => {
          Indicator.close();
          this.totalData = res;
          this.iteamList = res[this.currentPage];
          this.achievementTimelysa = this.achievementSa(
            this.iteamList.costTime
          );
          this.achievementTimely = this.achievementTimelysa;
        })
        .catch(res => { });
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
        border-top-left-radius: 0.12rem;
        border-top-right-radius: 0.12rem;
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



