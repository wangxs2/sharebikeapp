<template>
  <div class="gcontainer">
    <header>
      <h1 style="margin-left:0.96rem;width:50%;text-align:right">统计</h1>
      <h1 class="animated-tada"
          style="width:50%;text-align:right"
          v-if="ruleStatus=='true'">
        <span style="font-size:0.6rem"
              class="iconfont icon-paper"
              @click="getinstallationCount"></span>
      </h1>
      <h1 style="width:50%;text-align:right"
          v-if="ruleStatus=='false'">
        <span style="font-size:0.6rem"
              class="iconfont icon-paper"
              @click="getinstallationCount"></span>
      </h1>
      <div class="historical-rules"
           v-if="rulesBox">
        <div class="rules-box"
             @click="toDaily('day')">
          <span>日报</span>
        </div>
        <div class="rules-box"
             @click="toDaily('week')">
          <span>周报</span>
        </div>
        <div class="rules-box"
             @click="toDaily('month')"
             style="border:none">
          <span>月报</span>
        </div>
      </div>
    </header>
    <main>
      <nav @click="selectComany($event)">
        <div v-for="item in company"
             :key="item.id"
             :companyId="item.id"
             :class="[activeComany == item.id ? 'nav-active' : '']"
             class="nav-item">{{item.name}}</div>
      </nav>
      <div class="sectionSa">
        <div class="tab-btns"
             @click="selectView">
          <div class="btn-left"
               viewType="1"
               :class="[viewType == 1 ? 'tab-active' : '']">图表</div>
          <div class="btn-right"
               viewType="2"
               :class="[viewType == 2 ? 'tab-active' : '']">表格</div>
        </div>
        <div class="echart-select">
          <div class="date-type"
               @click="selectDateType">
            <div :class="dateType == 'week' ? 'date-active' : ''"
                 dateType="week">周统计</div>
            <div :class="dateType == 'month' ? 'date-active' : ''"
                 dateType="month"
                 style="margin-left:.48rem">月统计</div>
          </div>
          <div class="date-select"
               @click="openPicker">
            <div>{{dateValue}}</div>
            <i class="iconfont icon-rili"></i>
          </div>
        </div>
        <div class="myViews">
          <div v-show="viewType == 1"
               id="Echart"></div>
          <div v-show="viewType == 2"
               class="tab-view">
            <div class="tab-head">
              <table border="0"
                     cellpadding="0"
                     cellspacing="0">
                <tr>
                  <td style="width:10%;">序号</td>
                  <td style="width:20%;">时间</td>
                  <td style="width:15%;">整理
                    <br>(次数/总数)
                  </td>
                  <td style="width:15%;">清运
                    <br>(次数/总数)
                  </td>
                  <td style="width:20%;">说明</td>
                </tr>
              </table>
            </div>
            <div class="tab-body">
              <table border="0"
                     cellpadding="0"
                     cellspacing="0">
                <tr v-for="(item,index) in tabData"
                    :key="index">
                  <td style="width:10%;">{{index + 1}}</td>
                  <td style="width:20%;">{{dateData[index]}}</td>
                  <td style="width:15%;">{{item.arrangeTimes}}/{{item.arrangeNum}}</td>
                  <td style="width:15%;">{{item.cleanTimes}}/{{item.cleanNum}}</td>
                  <td style="width:20%;">
                    自查：{{item.selfCheckTimes}}次
                    <br>
                    督办：{{item.dispatchTimes}}次
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 时间选择 -->
    <mt-datetime-picker @confirm="selectDate"
                        ref="picker"
                        type="date"
                        v-model="pickerValue"></mt-datetime-picker>
    <!-- 时间选择 -->
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data () {
    return {
      dateValue: "", // 实际使用时间
      rulesBox: false,//日周月报
      pickerValue: new Date(), // 选择的时间
      eachartNode: null,
      company: [], //单车企业数据
      activeComany: "", // 选中的单车企业
      viewType: 1, // 图表/表格显示
      dateData: [], // 时间数据
      dateType: "week", // 周统计/月统计
      ruleStatus: "",
      tabData: {} // 表格数据
    };
  },
  created () {
    this.getRules();
    this.getBikeCompany();
    this.dateValue = new Date().Format("yyyy-MM-dd");
  },
  mounted () {
    this.$nextTick(function () {
      this.eachartNode = this.$echarts.init(document.getElementById("Echart"));
      window.addEventListener("resize", function () {
        this.eachartNode.resize();
      });
    });
  },
  methods: {
    getRules () {
      //获取是否有考评
      this.$fetchGet("count/willdo").then(res => {
        this.ruleStatus = res.daily;
      });
    },
    // 获取统计数据
    getCount () {
      // Indicator.open({
      //   text: "加载中...",
      //   spinnerType: "fading-circle"
      // });
      this.$fetchGet("count/countDeviceClickWeekOrDay", {
        orgId: this.activeComany,
        countType: this.dateType,
        date: this.dateValue
      }).then(res => {
        // Indicator.close();
        this.dateData = res.timeArea;
        this.tabData = res.table;
        let dataxItem = "",
          nowDate = new Date().Format("MM-dd");
        // this.dateType == "week"
        //   ? new Date().Format("MM-dd")
        //   : new Date().Format("MM-dd");
        let datax = res.timeArea.map(item => {
          dataxItem =
            this.dateType == "week" ? item.substring(5) : item.substring(5);
          if (nowDate == dataxItem) {
            dataxItem = "今天";
          }
          return dataxItem;
        });
        let legendData = [];
        let series = res.chart.map((item, index) => {
          legendData.push({
            name: item.name,
            icon: "rect",
            textStyle:
              (index + 1) % 3 !== 0
                ? {
                  padding: [0, 20, 0, 0]
                }
                : ""
          });
          item.symbol = "none";
          item.type = "line";
          item.smooth = true;
          return item;
        });
        this.initCanvas(legendData, datax, series);
      });
    },
    //选择统计时间类型
    selectDateType (e) {
      let type = e.target.getAttribute("dateType");
      if (type) {
        this.dateType = type;
        this.getCount();
      }
    },
    toDaily (val) {
      this.$router.push({
        path: "/statisticsDaily",
        query: {
          dailyType: val
        }
      });
    },
    getinstallationCount () {
      this.$router.push("/statisticalforms");
    },

    // 选择视图
    selectView (e) {
      // console.log(e.target);
      let type = e.target.getAttribute("viewType");
      if (type) {
        this.viewType = type;
      }
    },
    // 选择公司
    selectComany (e) {
      let id = e.target.getAttribute("companyId");
      if (id) {
        this.activeComany = id;
        this.getCount();
      }
    },
    // 获取单车企业数据
    getBikeCompany () {
      this.$fetchGet("count/bikeCompany").then(res => {
        if (res.length > 0) {
          this.activeComany = res[0].id;
        }
        this.company = res;
        this.getCount();
      });
    },
    // 画图
    initCanvas (legendData, dataX, seriesData) {
      let option = {
        color: [
          "#9A6EFF",
          "#2AD5DB",
          "#FF7418",
          "#5883FF",
          "#21C677",
          "#FFAE1F"
        ],
        legend: {
          width: "90%",
          right: 0,
          align: "left",
          selectedMode: true,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#989898",
            fontSize: 12
          },
          data: legendData
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "4%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#DDDDDD",
              type: "dotted"
            }
          },
          axisLabel: {
            color: "#AAAAAA"
          },
          axisTick: {
            show: false
          },
          boundaryGap: false,
          data: dataX
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#DDDDDD",
              type: "dotted"
            }
          },
          axisLabel: {
            color: "#AAAAAA"
          },
          splitLine: {
            lineStyle: {
              color: ["#DDDDDD"],
              type: "dotted"
            }
          },
          axisTick: {
            show: false
          }
        },
        series: seriesData
      };
      this.eachartNode.setOption(option);
    },
    // 选中时间事件
    selectDate (val) {
      this.dateValue = val.Format("yyyy-MM-dd");
      this.getCount();
    },
    // 打开时间选择框
    openPicker () {
      this.$refs.picker.open();
      this.eachartNode.dispatchAction({ type: "hideTip" });
    }
  }
};
</script>

<style lang="scss" scoped>
.gcontainer {
  .animated-tada {
    animation: change 1s ease-in infinite;
    font-size: 0.48rem;
    color: #ffffff;
    font-weight: bold;
  }
  @keyframes change {
    0% {
      // text-shadow: 0 0 4px #fff;
      transform: scale(1);
    }
    50% {
      // text-shadow: 0 0 40px #fff;
      transform: scale(1.1);
    }
    100% {
      // text-shadow: 0 0 4px #fff;
      transform: scale(1);
    }
  }
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  header {
    width: 100%;
    height: 1.173333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    display: flex;
    justify-content: space-between;
    justify-content: center;
    box-sizing: border-box;
    padding: 0 0.3rem;
    position: relative;
    h1 {
      font-size: 0.48rem;
      color: #fff;
      margin: 0;
      font-weight: 400;
      text-align: center;
      line-height: 1.173333rem;
    }
    .historical-rules {
      position: absolute;
      top: 0.9rem;
      right: 0.1rem;
      width: 2rem;
      height: 2.4rem;
      background: #ffffff;
      border-radius: 0.1rem;
      box-shadow: 0 0 0.1rem #dddddd;
      display: flex;
      flex-direction: column;
      z-index: 99999;
      .rules-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #eeeeee;
        padding: 0.3rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin-right: 0.1rem;
        }
        span {
          color: #333333;
          font-size: 0.373333rem;
        }
      }
    }
  }
  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    nav {
      width: 100%;
      height: 1.066667rem;
      box-shadow: 0 0 1px #ddd;
      // border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      overflow-y: hidden;
      overflow-x: scroll;
      box-sizing: border-box;
      // padding:0 0.2rem;
      justify-content: space-between;
      .nav-item {
        // flex: 1;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #656565;
        font-size: 0.426667rem;
        line-height: 1.066667rem;
      }
      .nav-active {
        position: relative;
        color: #5076ff;
        &::after {
          content: "";
          position: absolute;
          bottom: 0px;
          left: 50%;
          width: 1.173333rem;
          height: 0.04rem;
          background: #5076ff;
          margin-left: -0.586667rem;
        }
      }
    }
    .sectionSa {
      width: 100%;
      flex: 1;
      height: 1px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tab-btns {
        // display: flex;
        // justify-content: flex-start;
        margin: 10px 0;
        .btn-left {
          float: left;
          box-sizing: border-box;
          padding: 6px 20px;
          font-size: 0.373333rem;
          color: #5076ff;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border: 1px solid #5076ff;
          border-right: none;
        }
        .btn-right {
          float: right;
          box-sizing: border-box;
          padding: 6px 20px;
          margin-bottom: 6px;
          // line-height: normal;
          font-size: 0.373333rem;
          color: #5076ff;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border: 1px solid #5076ff;
          border-left: none;
        }
        .tab-active {
          color: #fff;
          background: #5076ff;
        }
      }
      .echart-select {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.293333rem;
        box-sizing: border-box;
        margin-bottom: 0.48rem;
        .date-type {
          display: flex;
          font-size: 0.4rem;
          color: #656565;
          .date-active {
            color: #5076ff;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              bottom: -0.16rem;
              left: 50%;
              width: 0.72rem;
              height: 0.04rem;
              margin-left: -0.36rem;
              background: #5076ff;
            }
          }
        }
        .date-select {
          display: flex;
          font-size: 0.4rem;
          color: #5076ff;
          align-items: center;
          .icon-rili {
            font-size: 0.48rem;
            color: #bfbfbf;
            margin-left: 0.173333rem;
          }
        }
      }
      .myViews {
        width: 100%;
        padding: 0 0.293333rem;
        box-sizing: border-box;
        flex: 1;
        #Echart {
          width: 100%;
          height: 100%;
        }
        .tab-view {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          .tab-head {
            width: 100%;
            height: 0.96rem;
            table {
              width: 100%;
              height: 0.96rem;
              background: #f2f2f2;
              font-size: 0.293333rem;
              color: #888888;
              font-weight: 100;
              text-align: center;
            }
          }
          .tab-body {
            height: 9.866667rem;
            width: 100%;
            overflow: hidden;
            overflow-y: scroll;
            table {
              width: 100%;
              font-size: 0.32rem;
              color: #282828;
              tr {
                width: 100%;
                &:nth-child(even) {
                  background: #f3f5ff;
                }
                td {
                  height: 1.44rem;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>

