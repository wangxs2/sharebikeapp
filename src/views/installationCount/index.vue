<template>
  <div class="gcontainer">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png"
           alt
           @click="toHome">
      <div class="header-title">共享单车保有量日统计表</div>
      <div></div>
    </div>

    <main>
      <div class="version-popup-box">
        <div class="version-popup">
          <div v-for="(iteam,index) in menuListTop"
               :key="index"
               @click="sort(iteam,index)">
            <span class="version-popup-font"
                  :class="[iteam.menuName == '' ? '' : 'version-popup-font-active']">{{iteam.menuName == ''?iteam.name:iteam.menuName}}</span>
            <span style="color:#AAAAAA"
                  class="iconfont icon-jiantou"
                  v-if="downIcon==index"></span>
            <span style="color:#AAAAAA"
                  class="iconfont icon-arrow-up"
                  v-if="downIcon!==index"></span>
          </div>
        </div>
      </div>
      <!-- 查询列表 -->
      <div class="version-popup-box1"
           v-if="downIcon1">
        <div class="version-popup">
          <div class="variable">
            <div class="menself">
              <p v-if="menuListCenter.length==0"
                 style="color:#999999;text-align:center">暂无数据</p>
              <div>
                <p class="menselflist"
                   @click="menuListClick(item)"
                   v-for="(item, index) in menuListCenter"
                   :key="index"
                   :class="[menuListTop[downIcon].label == item.id||menuListTop[downIcon].label == item.shortName ? 'menselflist-active' : '']">{{downIcon==2?item.name:item.areaName}}</p>
              </div>
            </div>
          </div>
          <div class="bottomsa">
            <p @click="menReset()">重置</p>
            <p @click="submit()"
               style="border:none">确定</p>
          </div>
        </div>
      </div>
      <!-- 查询列表 -->
      <section>
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
                  <td style="width:15%;">{{item.arrange}}/{{item.arrangeNum}}</td>
                  <td style="width:15%;">{{item.clean}}/{{item.cleanNum}}</td>
                  <td style="width:20%;">
                    自查：{{item.selfCheck}}次
                    <br>
                    督办：{{item.dispatch}}次
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
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
      downIcon: -1,
      downIcon1: false,
      dateValue: "", // 实际使用时间
      rulesBox: false,//日周月报
      pickerValue: new Date(), // 选择的时间
      eachartNode: null,
      company: [], //单车企业数据
      activeComany: "", // 选中的单车企业
      viewType: 1, // 图表/表格显示
      dateData: [], // 时间数据
      dateType: "week", // 周统计/月统计
      menuListCenter: [],
      menuListTop: [
        {
          name: "区域",
          menuName: "",
          label: ""
        },
        {
          name: "街镇",
          menuName: "",
          label: ""
        },
        {
          name: "单车企业",
          menuName: "",
          label: ""
        },

      ],
      ruleStatus: "",
      areakids: [],
      menData: [],
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
      // window.onresize = () => {
      //   alert(2);
      //   this.eachartNode.resize();
      // };
      window.addEventListener("resize", function () {
        this.eachartNode.resize();
      });
    });
  },
  methods: {
    toHome () {

    },
    //切换图片；
    sort (iteam, index) {
      this.downIcon = index;
      this.downIcon1 = true;
      if (this.downIcon == 0) {
        this.menuListCenter = this.areakids;
      } else if (this.downIcon == 1) {
        this.menuListCenter = this.menData;
      } else if (this.downIcon == 2) {
        this.menuListCenter = this.company;
      }
    },
    getRules () {
      //获取地区
      this.$fetchGet("report/getReportArea").then(res => {
        if (res.reportArea) {
          this.$fetchGet("org/getOrgByPid", {
            orgId: res.reportArea[0].areaId
          }).then(res => {
            // if (res.reportArea) {
            //   this.areakids = res.reportArea;

            // }
          });
          this.areakids = res.reportArea;

        }
      });
    },
    // 获取统计数据
    getCount () {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("count/countDeviceClickWeekOrDay", {
        orgId: this.activeComany,
        countType: this.dateType,
        date: this.dateValue
      }).then(res => {
        Indicator.close();
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
    // 选择视图
    selectView (e) {
      console.log(e.target);
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

        this.company = res;
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
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
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

  main {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    .version-popup-box {
      height: 1.2rem;
      width: 100%;
      background: #ffffff;
      border-bottom: 1px solid #eeeeee;
      color: #282828;
      position: fixed;
      top: 1.173333rem;
      left: 0;
      z-index: 8888;
      .version-popup {
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        justify-content: center;
        div {
          display: flex;
          flex: 1;
          width: 1.8rem;
          justify-content: center;
          margin: 0.2rem;
          border-right: 1px solid #eeeeee;
          .version-popup-font {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333333;
          }
          .version-popup-font-active {
            color: #5076ff;
          }
        }
      }
    }
    .version-popup-box1 {
      height: 100%;
      width: 100%;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.5);
      color: #282828;
      position: fixed;
      top: 2.369rem;
      left: 0;
      z-index: 8888;
      .version-popup {
        display: flex;
        width: 100%;
        height: 60%;
        background: #ffffff;
        flex-direction: column;
        .variable {
          width: 100%;
          flex: 1;
          border-top: 1px solid #eeeeee;
          overflow: hidden;
          overflow-y: scroll;
          .menself {
            display: flex;
            flex-direction: column;
            .menselflist {
              margin: 0 0.3rem;
              padding: 0.3rem;
              border-bottom: 1px solid #eeeeee;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .menselflist-active {
              color: #5076ff;
            }
            .areacheck {
              height: 1rem;
              width: 100%;
              display: flex;
              line-height: 1rem;
              align-items: center;
              flex-direction: row;
              // padding: 0rem 0.3rem;
              // padding-right: 0.3rem;
              .areachecklist {
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                flex: 1;
                height: 1rem;
                text-align: center;
                // padding: 0;
              }
              .tab-active1 {
                color: #5076ff;
              }
              .tab-active {
                color: #5076ff;
                position: relative;
                &::after {
                  content: "";
                  position: absolute;
                  bottom: 0px;
                  left: 50%;
                  width: 1.173333rem;
                  height: 0.08rem;
                  background: #5076ff;
                  margin-left: -0.586667rem;
                }
              }
            }
            .mencheck {
              margin: 0.3rem;
              padding: 0;
              padding-bottom: 0.3rem;
              margin-bottom: 0rem;
              color: #333333;
              border-bottom: 1px solid #eeeeee;
            }
          }
        }
        .bottomsa {
          width: 100%;
          height: 1rem;
          border-top: 1px solid #eeeeee;
          color: #999999;
          display: flex;
          justify-content: space-between;
          p {
            margin: 0;
            padding: 0;
            width: 50%;
            height: 1rem;
            line-height: 1rem;
            text-align: center;
            border-right: 1px solid #eeeeee;
          }
        }
      }
    }
    section {
      width: 100%;
      flex: 1;
      height: 1px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tab-btns {
        display: flex;
        margin: 10px 0 10px 0;
        .btn-left {
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
          box-sizing: border-box;
          padding: 6px 20px;
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

