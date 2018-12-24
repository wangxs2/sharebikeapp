<template>
  <div class="container">
    <!-- 时间选择 -->
    <mt-datetime-picker year-format="{value} 年" Format='yyyy-MM' month-format="{value} 月" @confirm="selectDate" ref="picker" type="date" v-model="pickerValue"></mt-datetime-picker>
    <!-- 时间选择 -->
    <div class="header">
      <div class="header-header">
        <div class="header-setting">
          <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toSettings">
        </div>
        <div class="header-tittle" style="margin-left:1.39rem">{{nowData}}月考评</div>
        <div class="header-tittle" @click="openPicker">{{nowData1}}</div>
      </div>
      <div class="header-content">
        <div class="tab-btns" @click="selectView">
          <div class="btn-left" viewType="1" :class="[viewTypesa == 1 ? 'tab-active' : '']">考评</div>
          <div class="btn-right" viewType="2" :class="[viewTypesa == 2 ? 'tab-active' : '']">被考评</div>
        </div>
      </div>
    </div>
    <div class="content">
        <p v-if="userCount.length==0" style="color:rgb(170, 170, 170);text-align:center">--我也是有底线的--</p>
      <div class="content-box">
        <div class="content-box-list" v-for="(iteam, index) in userCount" :key="index">
          <div class="content-box-listop">
            <div style="display:flex;justify-content: flex-start;align-items: center">
              <span
                :class="iteam.status==0?'noAssessment':iteam.status==1?'evaluation':'alreadyEvaluated'"
                style="display:block;width:8px;height:8px;border-radius:50%;"
              ></span>
              <span
                style="font-size:0.36rem;margin-left:0.1rem"
              >{{iteam.status==2?FormatDate(iteam.evaluateEndTime):'请尽快考评'}}</span>
            </div>
            <div
              style="font-size:0.36rem;text-align:right;width:5rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
              v-if="iteam.status!==0"
            >考评人：{{iteam.evaluateOrgName}}</div>
          </div>
          <div class="content-box-listbottom">
            <div class="listbottom-left">
              <img
                v-if="iteam.status==0"
                style="width:0.8rem;height:0.8rem;margin-right:0.1rem;"
                src="@/assets/image/evaluation/status0.png"
                alt
                srcset
              >
              <img
                v-if="iteam.status==1"
                style="width:0.8rem;height:0.8rem;margin-right:0.1rem;"
                src="@/assets/image/evaluation/status1.png"
                alt
                srcset
              >
              <img
                v-if="iteam.status==2"
                style="width:0.8rem;height:0.8rem;margin-right:0.1rem;"
                src="@/assets/image/evaluation/status2.png"
                alt
                srcset
              >
              <span
                :class="iteam.status==0?'noAssessment1':iteam.status==1?'evaluation1':'alreadyEvaluated1'"
              >{{iteam.status==0?'未考评':iteam.status==1?'考评中':'已考评'}}</span>
            </div>
            <div class="listbottom-right">
              <div class="right-bottom">
                <div>
                  <span style="color:#999999">已考评：</span>
                  <span>{{iteam.evaluatedCount}}</span>
                </div>
                <div style="margin-top:0.3rem">
                  <span style="color:#999999">总考评：</span>
                  <span>{{iteam.sheetCount}}</span>
                </div>
              </div>
              <div class="right-bottom" style="margin-left:0.3rem">
                <div>
                  <span style="color:#999999">被评方：</span>
                  <span
                    style="width:2.2rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                  >{{iteam.evaluatedOrgName}}</span>
                </div>
                <div style="margin-top:0.3rem">
                  <span style="color:#999999">考评方：</span>
                  <span
                    style="width:2.2rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                  >{{iteam.evaluateOrgName}}</span>
                </div>
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
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      userCount: [],
      pickerValue: new Date(), // 选择的时间
      viewTypesa: "1",
      query: {
        yearMonth: "",
        type: "evaluate"
      },
      nowData: "",
      nowData1: "",
    };
  },
  components: {},
  mounted() {},
  created() {
    let myDate = new Date();
    let now_year = myDate.getFullYear(); //年份
    let nowData =
      myDate.getMonth() == 0
        ? 11
        :myDate.getMonth() == 1
        ? 12
        : myDate.getMonth() < 10
        ? "0" + myDate.getMonth()-1
        : myDate.getMonth()-1; //获取当前月份(0-11,0代表1月)
    this.query.yearMonth = now_year + "-" + nowData;
    this.nowData = now_year + "年" + nowData;
    this.nowData1 = now_year + "/" + nowData;
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      this.$fetchGet("evaluation/monthEvaluation", this.query).then(res => {
        this.userCount = res;
      });
    },
    // 打开时间选择框
    openPicker() {
      this.$refs.picker.open();
    },
    // 选中时间事件
    selectDate(val) {
      this.query.yearMonth = val.Format("yyyy-MM");
      this.getData();
    },
    //进入个人信息修改
    toUserModi() {
      this.$router.push("/infoModification");
    },
    //进入个人中心
    toSettings() {
      this.$router.push("/evaluation");
    },
    //进入考评
    toEvaluation() {
      this.$router.push("/evaluation");
    },
    toRules() {
      this.$router.push("/evaluationrules");
    },
    //考评切换
    selectView(e) {
      let type = e.target.getAttribute("viewType");
      if (type) {
        this.viewTypesa = type;
        if (type == "1") {
          this.query.type = "evaluate";
          this.getData();
        } else {
          this.query.type = "evaluated";
          this.getData();
        }
      }
    }
  }
};
</script>
<style>

</style>

<style lang="scss" scoped>
.picker-items:last-child{
    display: none;
  }
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .header {
    width: 100%;
    height: 2.273333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    padding: 0 0.346667rem;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .header-header {
      height: 1.173333rem;
      display: flex;
      flex-direction: row;
      flex: 1;
      align-items: center;
      justify-content: space-between;
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
      display: flex;
      justify-content: center;
      position: relative;
      .tab-btns {
        display: flex;
        margin-bottom: 0.18rem;
        .btn-left {
          box-sizing: border-box;
          padding: 3px 20px;
          font-size: 0.373333rem;
          color: #ffffff;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border: 1px solid #ffffff;
          border-right: none;
        }
        .btn-right {
          box-sizing: border-box;
          padding: 3px 20px;
          // line-height: normal;
          font-size: 0.373333rem;
          color: #ffffff;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border: 1px solid #ffffff;
          border-left: none;
        }
        .tab-active {
          color: #5076ff;
          background: #ffffff;
        }
      }
    }
  }
  .content {
    flex: 1;
    overflow-y: scroll;
    padding-bottom: 0.4rem;
    .noAssessment {
      background: #9a73e7;
    }
    .evaluation {
      background: #ffb400;
    }
    .alreadyEvaluated {
      background: #00c458;
    }
    .noAssessment1 {
      color: #9a73e7;
    }
    .evaluation1 {
      color: #ffb400;
    }
    .alreadyEvaluated1 {
      color: #00c458;
    }
    .content-box {
      width: 100%;
      .content-box-list {
        padding: 0.5rem 0.3rem 0rem 0.3rem;
        display: flex;
        flex-direction: column;
        .content-box-listop {
          display: flex;
          justify-content: space-between;
        }
        .content-box-listbottom {
          margin-top: 0.16rem;
          padding: 0.4rem 0.2rem;
          padding-right: 0;
          display: flex;
          justify-content: flex-start;
          box-shadow: 0 0 0.3rem #e9e9e9;
          border-radius: 0.1rem;
          .listbottom-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border-right: 1px solid #eeeeee;
            padding-right: 0.3rem;
          }
          .listbottom-right {
            padding-left: 0.3rem;
            display: flex;
            justify-content: flex-start;
            .right-bottom {
              display: flex;
              flex-direction: column;
              div {
                display: flex;
                justify-content: flex-start;
                align-items: flex-start;
              }
            }
          }
        }
      }
    }
  }
}
</style>



