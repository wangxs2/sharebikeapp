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
      <!-- 查询列表 -->
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
                   :class="[menuListTop[downIcon].label == item.areaId||menuListTop[downIcon].label == item.id ? 'menselflist-active' : '']">{{downIcon==0?item.areaName:item.name}}</p>
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
      <div class="echart-select">
        <!-- <div class="date-type"
             @click="selectDateType">
          <div :class="dateType == '5' ? 'date-active' : 'dateType'"
               dateType="5">最近5天</div>
          <div :class="dateType == '30' ? 'date-active' : 'dateType'"
               dateType="30"
               style="margin-left:.48rem">最近一个月</div>
        </div> -->
        <div class="date-select"
             @click="openPicker">
          <div>{{dateValue}}</div>
          <i class="iconfont icon-rili"></i>
        </div>
      </div>
      <!-- 查询列表 -->
      <section>

        <div class="superList">
          <div class="topsa">
            <div class="fontext">{{title}}-保有量趋势图</div>
          </div>
        </div>
        <!-- echarts图标 -->
        <div class="myViews"
             style="padding:0.2rem 0.3rem;height:10rem;">
          <div id="Echart"></div>
        </div>

        <div class="superList"
             style="margin-top:0.2rem">
          <div class="topsa">
            <div class="fontext">{{title}}-保有量数据表</div>
          </div>
        </div>
        <!-- table表格 -->
        <div class="myViews"
             style="margin-bottom:0.2rem">
          <div class="tab-view">
            <p v-if="lenNumber==0"
               style="text-align:center;width:100%;">暂无数据</p>
            <table cellpadding="0"
                   cellspacing="0"
                   v-if="lenNumber>0">

              <thead>
                <tr>
                  <td style="width:2rem;">街镇</td>
                  <td style="width:1.2rem;">企业</td>
                  <td v-for="(iteam,index) in tabData.dateTime"
                      :key="index">{{iteam.substring(5).replace('-','/')}}</td>
                </tr>
              </thead>
              <!-- 表体 -->
              <tbody>

                <tr v-for="(iteam,index) in tabData.mapData"
                    :key="index">
                  <td v-if='iteam.areaName!==""'
                      :rowspan="getNumber(iteam.areaId)">{{iteam.areaName}}</td>
                  <td :class="iteam.orgId == 1006 ? 'mobike' : iteam.orgId == 1007? 'ofo':iteam.orgId == 1014? 'jiujiu':iteam.orgId == 1015? 'haluo':iteam.orgId == 1059? 'xiangqi':'other'">{{iteam.orgName}}</td>
                  <td v-for="(item,index) in iteam.bicycleNumsList"
                      :key="index">{{item}}</td>
                </tr>

              </tbody>
              <!-- 合计 -->
              <!-- <tfoot>
                <tr>
                  <td>Sum</td>
                  <td>$180</td>
                </tr>
              </tfoot> -->
            </table>
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
      title: '',//标题头
      downIcon: -1,
      downIcon1: false,
      roleType: '',//角色类型控制是否显示街镇
      dateValue: "", // 实际使用时间
      rulesBox: false,//日周月报
      pickerValue: new Date(), // 选择的时间
      eachartNode: null,
      company: [], //单车企业数据
      activeComany: "", // 选中的单车企业
      viewType: 1, // 图表/表格显示
      dateData: [], // 时间数据
      dateType: "5", // 周统计/月统计
      menuListCenter: [],
      query: {
        areaId: '',
        townId: '',
        bikeId: '',
        dayDate: ''
      },
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
      lenNumber: 0,
      menData: [],
      tabData: {} // 表格数据
    };
  },
  created () {
    this.getRules();
    this.getBikeCompany();
    this.dateValue = new Date().Format("yyyy-MM-dd");
    window.watchBackWXS = this.watchBackWXS;
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
    toHome () {
      this.$router.push("/statisticalforms");
    },
    getNumber (e) {
      var len = 0;
      this.tabData.mapData.forEach((iteam, index) => {
        if (iteam.areaId == e) {
          len++
        }
      })
      return len;
    },
    watchBackWXS () {
      this.toHome();
    },
    //确定
    submit () {
      this.downIcon1 = false;
      if (this.menuListTop.length > 2) {
        this.title = this.menuListTop[0].menuName + '-' + this.menuListTop[1].menuName + '-' + this.menuListTop[2].menuName
      } else {
        this.title = this.menuListTop[0].menuName + '-' + this.menuListTop[1].menuName
      }

      this.getCount();
    },
    // this.getTree(val);
    getTree (val) {
      //获取地区
      this.$fetchGet("org/getOrgByPid/" + val).then(res => {
        this.menData = res;
      });
    },
    //切换图片；
    sort (iteam, index) {
      this.downIcon = index;
      this.downIcon1 = true;
      if (this.menuListTop.length == 3) {
        if (this.downIcon == 0) {
          this.menuListCenter = this.areakids;
        } else if (this.downIcon == 1) {
          this.menuListCenter = this.menData;
        } else if (this.downIcon == 2) {
          this.menuListCenter = this.company;
        }
      } else {
        if (this.downIcon == 0) {
          this.menuListCenter = this.areakids;
        } else if (this.downIcon == 1) {
          this.menuListCenter = this.company;
        }
      }

    },
    //点击查询列表
    menuListClick (row) {
      if (this.menuListTop.length == 3) {
        if (this.downIcon == 0) {
          this.menuListTop[this.downIcon].label = row.areaId;
          this.menuListTop[this.downIcon].menuName = row.areaName;
          this.query.areaId = row.areaId;
          this.getTree(row.areaId);
          this.searchCondition.orgId = row.id;
        } else if (this.downIcon == 1) {
          this.menuListTop[this.downIcon].label = row.id;
          this.menuListTop[this.downIcon].menuName = row.name;
          this.query.townId = row.id;
        } else if (this.downIcon == 2) {
          this.menuListTop[this.downIcon].label = row.id;
          this.menuListTop[this.downIcon].menuName = row.name;
          this.query.bikeId = row.id;
        }
      } else {
        if (this.downIcon == 0) {
          this.menuListTop[this.downIcon].label = row.areaId;
          this.menuListTop[this.downIcon].menuName = row.areaName;
          this.query.townId = row.areaId;
          this.searchCondition.orgId = row.id;
        } else if (this.downIcon == 1) {
          this.menuListTop[this.downIcon].label = row.id;
          this.menuListTop[this.downIcon].menuName = row.name;
          this.query.bikeId = row.id;
        }
      }

    },
    menReset () {
      if (this.menuListTop.length == 3) {

        if (this.downIcon == 0) {
          this.menuListTop[this.downIcon].label = "";
          this.menuListTop[this.downIcon].menuName = "";
          this.query.areaId = "";
        } else if (this.downIcon == 1) {
          this.menuListTop[this.downIcon].label = "";
          this.menuListTop[this.downIcon].menuName = "";
          this.query.townId = "";
        } else if (this.downIcon == 2) {
          this.menuListTop[this.downIcon].label = "";
          this.menuListTop[this.downIcon].menuName = "";
          this.query.bikeId = "";
        }
        this.title = this.areakids[0].areaName + '-' + this.menuListTop[1].menuName + '-' + this.menuListTop[2].menuName
      } else {
        if (this.downIcon == 0) {
          this.menuListTop[this.downIcon].label = "";
          this.menuListTop[this.downIcon].menuName = "";
          this.query.townId = "";
        } else if (this.downIcon == 1) {
          this.menuListTop[this.downIcon].label = "";
          this.menuListTop[this.downIcon].menuName = "";
          this.query.bikeId = "";
        }
        this.title = this.areakids[0].areaName + '-' + this.menuListTop[1].menuName
      }

      this.downIcon1 = false;
      this.getCount();
    },
    getRules () {
      //获取地区
      this.$fetchGet("report/getReportArea").then(res => {
        this.roleType = res.type;
        if (res.type == 'TOWN') {
          this.menuListTop.splice(0, 1);
          // this.$fetchGet("org/getOrgByPid", {
          //   orgId: res.reportArea[0].areaId
          // }).then(res => {

          // });
          // this.areakids = res.reportArea;
          // this.query.townId=res.reportArea[0].areaId
        } else {
          this.getTree(res.reportArea[0].areaId);
        }
        // else{
        //   this.query.areaId=res.reportArea[0].areaId
        // }
        this.areakids = res.reportArea;
        this.menuListTop[0].menuName = res.reportArea[0].areaName;
        this.menuListTop[0].label = res.reportArea[0].areaId;
        this.getCount();
        this.title = res.reportArea[0].areaName;

      });
    },
    // 获取统计数据
    getCount () {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("report/dailyBikeContainData", {
        areaId: this.query.areaId,
        townId: this.query.townId,
        bikeId: this.query.bikeId,
        days: this.dateType,
        dayDate: this.dateValue,
      }).then(res => {
        Indicator.close();
        // console.log(res.data.mapData.length)
        this.lenNumber = res.data.mapData.length;
        let datax = [];
        res.data.dateTime.forEach(element => {
          element = element.substring(5).replace('-', '/');
          datax.push(element)
        })
        let legendData = [];
        let series = [];
        if (res.data.mapDataChart.length > 0) {
          series = res.data.mapDataChart.map((item, index) => {
            item.orgId == 1006 ? item.backgroundColor = '#e99187' : item.orgId == 1007 ? item.backgroundColor = '#fbc303' : item.orgId == 1014 ? item.backgroundColor = '#fd3121' : item.orgId == 1015 ? item.backgroundColor = '#01a1ff' : item.orgId == 1059 ? item.backgroundColor = '#00cb4b' : item.backgroundColor = '#9a6eff',
              legendData.push({
                name: item.orgName,
                icon: "rect",

                textStyle: {
                  margin: [0, 10, 0, 0],
                  // color: '#333333'
                }
              });
            item.symbol = "none";
            item.type = "line";
            item.data = item.bicycleNumsList;
            item.name = item.orgName;
            item.smooth = true;
            item.itemStyle = {
              normal: {
                lineStyle: {
                  color: item.orgId == 1006 ? '#e99187' : item.orgId == 1007 ? '#fbc303' : item.orgId == 1014 ? '#fd3121' : item.orgId == 1015 ? '#01a1ff' : item.orgId == 1059 ? '#00cb4b' : '#9a6eff'
                }
              }
            };
            return item;
          });
        }

        this.initCanvas(legendData, datax, series);
        this.tabData = res.data;
        (this.tabData.mapData).forEach((item, index) => {
          if (item.areaId == this.tabData.mapData[index + 1].areaId) {
            this.tabData.mapData[index + 1].areaName = '';
          }
        })


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
    //删除重复数据
    deleteNumber () {

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
      let color = [];
      seriesData.forEach((iteam, index) => {
        color.push(iteam.backgroundColor)
      });
      let option = {
        color: color,
        legend: {
          width: "100%",
          left: 40,
          align: "left",
          bottom: 0,
          selectedMode: true,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#333333",
            fontSize: 12
          },
          data: legendData
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "1%",
          right: "5%",
          bottom: "10%",
          top: '3%',
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
            show: false,
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
      this.eachartNode.setOption(option, true);
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
    .echart-select {
      width: 100%;
      display: flex;
      // justify-content: space-between;
      justify-content: flex-end;
      align-items: center;
      padding: 0.293333rem;
      box-sizing: border-box;
      margin-top: 1.2rem;
      .date-type {
        display: flex;
        font-size: 0.3rem;
        color: #666666;
        //
        box-sizing: border-box;
        .dateType {
          padding: 0.1rem 0.3rem;
          background: #fff;
          border-radius: 0.3rem;
          box-sizing: border-box;
        }
        .date-active {
          padding: 0.1rem 0.3rem;
          background: #fff;
          color: #5076ff;
          border-radius: 0.3rem;
          box-sizing: border-box;
        }
      }
      .date-select {
        display: flex;
        font-size: 0.36rem;
        color: #5076ff;
        align-items: center;
        .icon-rili {
          font-size: 0.48rem;
          color: #bfbfbf;
          margin-left: 0.173333rem;
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
      overflow-y: scroll;
      // padding-top: 1.2rem;
      .superList {
        width: 100%;
        box-sizing: border-box;
        border-radius: 2px;
        // .iteamsa {
        //   box-sizing: border-box;
        //   margin: 0 0.3rem;
        //   flex: 1;
        //   display: flex;
        //   justify-content: flex-start;
        //   background: #fff;
        //
        //   .timesa {
        //     display: flex;
        //     flex-direction: column;
        //   }
        // }
        #Myechart {
          width: 100%;
          height: 100%;
        }
        .topsa {
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          background: #fff;
          padding: 0.3rem;
          border-bottom: 1px solid #f2f2f2;
          .fontext {
            position: relative;
            margin-left: 0.3rem;
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
      }

      .myViews {
        width: 100%;
        padding: 0 0.1rem;
        box-sizing: border-box;
        flex: 1;
        background: #ffffff;
        #Echart {
          width: 100%;
          height: 100%;
        }
        .tab-view {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          padding: 0.3rem 0.2rem;
          .mobike {
            color: #e99187;
          }
          .ofo {
            color: #fbc303;
          }
          .haluo {
            color: #01a1ff;
          }
          .jiujiu {
            color: #fd3121;
          }
          .xiangqi {
            color: #00cb4b;
          }
          .other {
            color: #9a6eff;
          }
          table {
            border: none;
            border-left: 1px solid #dddddd;
            font-size: 0.34rem;
            thead {
              background: #dee6ff;
              color: #666666;
              td {
                padding: 0.15rem;
                border-right: 1px solid #dddddd;
              }
            }
            tbody {
              tr {
                td {
                  padding: 0.15rem;
                  border-bottom: 1px solid #dddddd;
                  border-right: 1px solid #dddddd;
                }
              }
            }
          }
          // .tab-head {
          //   width: 100%;
          //   height: 0.96rem;
          //   table {
          //     width: 100%;
          //     height: 0.96rem;
          //     background: #f2f2f2;
          //     font-size: 0.293333rem;
          //     color: #888888;
          //     font-weight: 100;
          //     text-align: center;
          //   }
          // }
          // .tab-body {
          //   height: 9.866667rem;
          //   width: 100%;
          //   overflow: hidden;
          //   overflow-y: scroll;
          //   table {
          //     width: 100%;
          //     font-size: 0.32rem;
          //     color: #282828;
          //     tr {
          //       width: 100%;
          //       &:nth-child(even) {
          //         background: #f3f5ff;
          //       }
          //       td {
          //         height: 1.44rem;
          //         text-align: center;
          //       }
          //     }
          //   }
          // }
        }
      }
    }
  }
}
</style>

