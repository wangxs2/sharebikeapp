
<template>
  <div class="container">
    <mt-popup class="imgMask"
              v-model="popupVisible"
              position="right">
      <span class="iconfont icon-guandiao"
            style="color:#fff;position:fixed;right:15px;top:15px"
            @click="popupVisible=false"></span>
      <mt-swipe style="width:100%;height:64%"
                :continuous="false"
                :touchstart="true"
                :speed="10"
                :auto="0"
                :defaultIndex="indexImage">
        <mt-swipe-item v-for="(iteam,index) in lageImg"
                       :key="index">
          <img :src="Ip+iteam"
               v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
               width="100%">
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
      >-->
    </mt-popup>
    <mt-popup v-model="popupVisible1"
              class="mapwhere"
              position="right">
      <div class="header">
        <img src="@/assets/image/infoModification/nav_1_back@2x.png"
             alt
             @click="popupVisible1=false">
        <div class="header-title">处理地址</div>
        <div></div>
      </div>

      <div id="myMap"></div>

    </mt-popup>
    <mt-popup class="qualified-box"
              v-model="popupVisible3"
              position="right">
      <div class="version-popup">
        <div class="version-popup-top">不合格原因</div>
        <div class="version-popup-center">
          <p class="version-popup-center-box"
             v-for="(item,index) in options"
             :key="index">
            <span :viewType="item.label"
                  @click="chooseOrder($event)"
                  class="detail-btn"></span><span>{{item.label}}</span>
          </p>
        </div>
        <div class="version-popup-bottom">
          <div @click="popupVisible3=false"
               style="color:#999999">取消</div>
          <div @click="noQualified()"
               style="border:none;color:#5076FF">确定</div>
        </div>
      </div>
    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png"
           alt
           @click="toHome">
      <div class="header-title">自查处理详情</div>
      <div></div>
    </div>
    <div class="content">
      <div class="selfcheckList"
           style="border-bottom:1px solid #f2f2f2;">

        <div class="iteamsa">
          <img v-if="iteamList.orgId==1007"
               src="../../assets/image/OFO.png"
               width="59"
               height="58">
          <img v-if="iteamList.orgId==1006"
               src="../../assets/image/mobike.png"
               width="59"
               height="58">
          <img v-if="iteamList.orgId==1014"
               src="../../assets/image/jiujiu.png"
               width="59"
               height="58">
          <img v-if="iteamList.orgId==1015"
               src="../../assets/image/haluo.png"
               width="59"
               height="58">
          <img v-if="iteamList.orgId==1059"
               src="../../assets/image/xiangqi.png"
               width="59"
               height="58">
          <img v-if="iteamList.orgId!==1006&&iteamList.orgId!==1007&&iteamList.orgId!==1014&&iteamList.orgId!==1015&&iteamList.orgId!==1059"
               src="../../assets/image/jiedao.png"
               width="59"
               height="58">
          <div style="width:80%;margin-left:0.3rem;display: flex;flex-direction:column;">
            <p style="display: flex;justify-content: space-between;width:100%;flex:1">
              <span>{{iteamList.orgName}}</span>
              <span :class="iteamList.status == 1 ? 'green' : 'red'">{{iteamList.status == 1 ? '处理中' : "已处理"}}</span>
            </p>
            <p style="color:#666666;width:100%;">单号：{{iteamList.sheetCode}}</p>
          </div>
        </div>
      </div>
      <div class="selfcheckList"
           style="margin-bottom:0.3rem">
        <img class="hegeimg"
             v-if="iteamList.qualified==2"
             src="@/assets/image/selfcheck/hege@3x.png">
        <img class="hegeimg"
             v-if="iteamList.qualified==0"
             src="@/assets/image/selfcheck/buhege@3x.png">
        <div class="iteamsa">
          <img src="../../assets/image/selfcheck/icon_2_address@3x.png"
               width="24"
               height="24"
               alt
               srcset>
          <div @click="getMap()">
            <p style="margin-left:0.2rem;margin-top:0.1rem;color:#333333;text-decoration:underline">{{iteamList.handleSecAddr}}</p>
            <p style="margin-left:0.2rem;margin-top:0.1rem;color:#aeaeae;text-decoration:underline">{{iteamList.handleAddr}}</p>
          </div>

        </div>
      </div>
      <p style="background: #fff;padding:0.2rem 0.3rem;">处理人：{{iteamList.handleUserName}}</p>
      <p style="background: #fff;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2">处理时长：{{iteamList.dealTimeHour}}</p>
      <div class="selfcheckList"
           style="margin-bottom:0.3rem">
        <div class="iteamsa">
          <div class="timesa">
            <p style="display: flex;flex:1;margin-top:0.1rem;color:#666666;font-size:0.35rem">处理完成</p>
            <p style="margin-bottom:-0.05rem;color:#666666;font-size:0.35rem">开始处理</p>
          </div>
          <div class="timesa"
               style="margin-left:0.2rem">
            <img src="../../assets/image/icon_完成@2x.png"
                 width="20"
                 height="20"
                 alt
                 srcset>
            <p style="display: flex;flex:1;width:2px;height:1rem;background:#5076FF;margin-left:8px"></p>
            <p style="width:10px;height:10px;border-radius: 50%;background:#5076FF;margin-left:4px"></p>
          </div>
          <div class="timesa"
               style="margin-left:0.2rem">
            <p style="display: flex;flex:1;margin-top:0.05rem;">{{FormatDate(iteamList.handleTime)}}</p>
            <p style="margin-bottom:-0.1rem;">{{FormatDate(iteamList.createTime)}}</p>
          </div>
        </div>
      </div>
      <p style="background: #fff;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2">处理统计</p>
      <!-- <div class="iteamList" style="margin-top:0px;margin-bottom:1px">处理统计</div> -->
      <div class="selfcheckList">
        <div class="iteamsa"
             style="padding-top:0.5rem;padding-bottom:0.2rem">
          <div style="width:50%;text-align: center">
            <p style="font-size:0.3rem;color:#666666">整理总数</p>
            <p style="font-size:0.5rem;margin-top:0.1rem">{{iteamList.arrangeNum==undefined?0:iteamList.arrangeNum}}</p>
          </div>
          <div style="width:50%;text-align: center">
            <p style="font-size:0.3rem;color:#666666">清运总数</p>
            <p style="font-size:0.5rem;margin-top:0.1rem">{{iteamList.cleanNum==undefined?0:iteamList.cleanNum}}</p>
          </div>
        </div>
      </div>
      <div class="selfcheckList"
           style="width:100%;height:6rem;padding: 0 0.293333rem;box-sizing: border-box;flex: 1;margin-bottom:0.3rem;padding-bottom:0.2rem"
           v-show="ifCleanByBike==1&&iteamList.selfCheckDealDetailList.length!==0">
        <div id="Echart"></div>
      </div>
      <p style="background: #fff;padding:0.2rem 0.3rem;border-bottom:1px solid #f2f2f2">现场照片</p>
      <div class="iteamListsa">
        <p style="font-size:0.3rem;color:#666666;padding-bottom:0.2rem">处理前</p>
        <div class="imageList">
          <img v-for="(iteam,index) in iteamList.handleBeforeURLs"
               :src="Ip+iteam"
               :key="index"
               alt
               srcset
               style="width:2.6rem;height:2.6rem"
               @click="handOpen(iteamList.handleBeforeURLs,index)">
        </div>
        <p style="font-size:0.3rem;color:#666666;padding-bottom:0.2rem;padding-top:0.2rem;">处理后</p>
        <div class="imageList">
          <img v-for="(iteam,index) in iteamList.handleAfterURLs"
               :src="Ip+iteam"
               :key="index"
               alt
               srcset
               style="width:2.6rem;height:2.6rem"
               @click="handOpen(iteamList.handleAfterURLs,index)">
        </div>
      </div>
      <div class="selfcheckList"
           style="margin-bottom:0.1rem;">
        <div class="iteamsa">
          <p style="display: flex;">备注：</p>
          <p class="textFont"
             style="margin-left:0.2rem;flex:1">{{iteamList.remark}}</p>
        </div>
      </div>
      <div v-if="iteamList.status!== 1&iteamList.qualified== 3"
           class="evaluation-button">
        <button @click="popupVisible3=true"
                style="background:#FF4545">不合格</button>
        <button @click="qualified()"
                style="background:#56CA37">合格</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
import { setTimeout } from "timers";
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data () {
    return {
      slide: [],
      slide1: [],
      options: [
        {
          label: "其他单车停放混乱",
          value: "1"
        },
        {
          label: "整理、清运数量差别太大",
          value: "2"
        },
        {
          label: "图片不合格",
          value: "3"
        },
        {
          label: "处理地点有误",
          value: "4"
        },
        {
          label: "处理方式有误",
          value: "5"
        }
      ],
      searchCondition: {},
      menuListTop: [],
      popupVisible1: false,
      popupVisible3: false,
      downIcon: -1,
      sheetCode: "",
      rotateS: 0,
      bigImage: "",
      unqualifiedReason: [],//不合格理由
      indexImage: -1, //轮播默认图片
      ifCleanByBike: "", //是否分成企业填写整理数
      lageImg: [],
      eachartNode: null,//echarts
      popupVisible: false,
      iteamList: {},
      areakids: [],
      areaarr: []
    };
  },
  components: {},
  mounted () {

    this.$nextTick(() => {
      var worldMapContainer = document.getElementById('Echart');
      //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
      var resizeWorldMapContainer = function () {
        worldMapContainer.style.width = window.innerWidth - 30 + 'px';
        worldMapContainer.style.height = '6rem';
      };
      //设置容器高宽
      resizeWorldMapContainer();
      this.eachartNode = this.$echarts.init(worldMapContainer);
    })
  },
  created () {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.searchCondition = this.$route.query.searchCondition;
      this.menuListTop = this.$route.query.menuListTop;
      this.downIcon = this.$route.query.downIcon;
      this.areakids = this.$route.query.areakids;
      this.areaarr = this.$route.query.areaarr;
      this.getMessage(this.sheetCode);

    }
    this.getComanylist();
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    rotate () {
      this.rotateS = this.rotateS + 90;
    },
    //是否确认合格
    qualified () {
      MessageBox.confirm('确认处理合格?').then(action => {
        this.$fetchPut("selfcheck/selfCheckQualifiedFeedBack", {
          sheetCode: this.sheetCode,
          qualified: 2,
          unqualifiedReason: ''
        }).then(res => {
          if (res.status == 0) {
            MessageBox.alert("", {
              message: "操作成功",
              title: "提示"
            }).then(action => { });
          } else {
            MessageBox.alert("", {
              message: res.message,
              title: "提示"
            }).then(action => { });
          }
        });
      });
    },
    noQualified () {
      this.$fetchPut("selfcheck/selfCheckQualifiedFeedBack", {
        sheetCode: this.sheetCode,
        qualified: 0,
        unqualifiedReason: this.unqualifiedReason.join(',')
      }).then(res => {
        if (res.status == 0) {
          MessageBox.alert("", {
            message: "操作成功",
            title: "提示"
          }).then(action => { });
        } else {
          MessageBox.alert("", {
            message: res.message,
            title: "提示"
          }).then(action => { });
        }
        this.popupVisible3 = false
      });
    },
    chooseOrder (e) {
      // console.log(e.target.childNodes[0]);
      if (e.target.className.indexOf("detail-selected") == -1) {
        e.target.className = "detail-btn detail-selected"; //切换按钮样式
        //写逻辑
        this.unqualifiedReason.push(e.target.getAttribute("viewType"));
      } else {
        e.target.className = "detail-btn"; //切换按钮样式
        let index = this.value.indexOf(e.target.getAttribute("viewType"));
        if (index > -1) {
          this.unqualifiedReason.splice(index, 1);
        }
      }
    },
    //获取分企业添加的列表
    getComanylist () {
      this.$fetchGet("cleanConfig/ifCleanByBike")
        .then(res => {
          this.ifCleanByBike = res;
        })
        .catch(res => { });
    },
    watchBackWXS () {
      if (this.popupVisible || this.popupVisible1) {
        this.popupVisible = false;
        this.popupVisible1 = false
      } else {
        this.toHome();
      }

    },
    //echarts
    initCanvas (company, arrangeNum, cleanNum) {
      let option = {
        color: ["#958BFF", "#FF688D"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: [
            {
              name: "整理数",
              color: '#666666',
              fontSize: 12,

            }, {
              name: "清运数",
              color: '#666666',
              fontSize: 12
            }
          ],
          itemWidth: 12,
          itemHeight: 12,
          bottom: 0,
        },
        grid: {
          top: '4%',
          left: "1%",
          right: "5%",
          bottom: "12%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },//是否显示刻度
            splitLine: { show: false },//去除网格线
            splitArea: { show: false },//保留网格区域
            data: company,
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#DDDDDD',//左边线的颜色
                width: '1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#666666',//坐标值得具体的颜色

              }
            },
          }
        ],
        yAxis: [
          {
            type: "value",
            minInterval: 1,
            axisTick: { show: false },//是否显示刻度
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#DDDDDD',//左边线的颜色
                width: '1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#666666',//坐标值得具体的颜色

              }
            },
          },
          {
            type: "value",//双y轴  默认的第一个是左边 第二个是右边
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                type: 'solid',
                color: '#DDDDDD',//右边线的颜色
                width: '1'//坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: '#666666',//坐标值得具体的颜色

              }
            },
          }
        ],
        series: [
          {
            name: "整理数",
            type: "bar",
            barGap: '50%',
            barCateGoryGap: '50%',
            barWidth: 6,
            itemStyle: {
              barBorderRadius: [14, 14, 14, 14],//柱子的圆角设置//
            },
            data: arrangeNum
          },
          {
            name: "清运数",
            type: "bar",
            barCateGoryGap: '50%',
            barWidth: 6,
            barGap: '50%',
            itemStyle: {
              barBorderRadius: [14, 14, 14, 14],
            },

            data: cleanNum
          },
          // {
          //   name: "Desert",
          //   type: "bar",
          //   barCateGoryGap:20,
          //   data: [150, 232, 201, 154, 190]
          // },
          // {
          //   name: "Wetland",
          //   type: "bar",
          //   barCateGoryGap:20,
          //   data: [98, 77, 101, 99, 40]
          // }
        ]
      };
      this.eachartNode.setOption(option);
    },
    getMap () {
      this.eachartNode.dispatchAction({ type: "hideTip" });
      this.popupVisible1 = true;
      this.myMap = new AMap.Map("myMap");
      let geolocation = new AMap.Geolocation();
      geolocation.getCurrentPosition((status, result) => {
        console.log(result.position);
        var markers = [{
          icon: require('../../assets/image/supervise/iconren.png'),
          label: {
            offset: new AMap.Pixel(-20, -30),
            content: "<div class='info'>处理位置</div>"
          },
          position: [this.iteamList.gaodeLongitude, this.iteamList.gaodeLatitude]
        }, {
          icon: require('../../assets/image/supervise/iconpr.png'),
          label: {
            offset: new AMap.Pixel(-20, -30),
            content: "<div class='info'>当前位置</div>"
          },
          position: [result.position.lng, result.position.lat]
        }];

        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        markers.forEach((marker) => {
          new AMap.Marker({
            map: this.myMap,
            icon: marker.icon,
            label: marker.label,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30)
          });
        });
        this.myMap.setFitView();
















      });

    },
    toHome () {
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
    handOpen (val, index) {
      this.eachartNode.dispatchAction({ type: "hideTip" });
      console.log(index);
      this.rotateS = 0;
      this.lageImg = [];
      this.popupVisible = true;
      val.forEach(iteam => {
        iteam = iteam.replace(".400x400.jpg", ".square.jpg");
        this.lageImg.push(iteam);
      });
      this.indexImage = index;
    },
    getMessage (val) {
      let slide = [];
      let slide1 = [];
      let slide2 = [];
      let slide3 = [];
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("selfcheck/selfCheck", {
        sheetCode: val
      })
        .then(res => {
          Indicator.close();
          console.log(res);
          this.iteamList = res;
          slide3 = res.selfCheckDealDetailList;
          if (res.selfCheckDealDetailList.length > 0) {
            slide3.forEach(iteam => {
              slide.push(iteam.orgName);
              slide1.push(iteam.arrangeNum);
              slide2.push(iteam.cleanNum);
            });
            this.initCanvas(slide, slide1, slide2);
          }
        })
        .catch(res => { });
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
  .qualified-box {
    height: 10rem;
    width: 100%;
    background: transparent;
    .version-popup {
      height: 100%;
      width: 86%;
      margin: 0 auto;
      background: #fff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      .version-popup-top {
        color: #282828;
        text-align: center;
        height: 1.4rem;
        line-height: 1.4rem;
      }
      .version-popup-center {
        flex: 1;
        color: #666666;
        box-sizing: border-box;
        padding: 0 1rem;
        text-align: left;
        .version-popup-center-box {
          display: flex;
          align-items: center;
          .detail-btn {
            display: inline-block;
            width: 0.48rem;
            height: 0.48rem;
            background-image: url("../../assets/image/selfcheck/icon_select_nor@3x.png");
            background-size: 100% 100%;
            margin-right: 0.2rem;
          }
          .detail-selected {
            background-image: url("../../assets/image/selfcheck/icon_select_pre@3x.png");
          }
        }
      }
      .version-popup-bottom {
        display: flex;
        justify-content: flex-start;
        height: 0.88rem;
        line-height: 0.88rem;
        border-top: 1px solid #dddddd;
        div {
          width: 50%;
          text-align: center;
          border-right: 1px solid #dddddd;
        }
      }
    }
  }
  .mapwhere {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background: #fff;
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

    #myMap {
      width: 100%;
      flex: 1;
    }
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
      position: relative;
      .hegeimg {
        width: 2.76rem;
        height: 2.76rem;
        position: absolute;
        right: 0.5rem;
        top: -1rem;
      }
      #Echart {
        width: 100%;
        height: 100%;
      }
      .iteamsa {
        // box-sizing: border-box;
        // height: 80px;
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
    .evaluation-button {
      display: flex;
      justify-content: space-between;

      button {
        color: #fff;
        width: 48%;
        height: 1rem;
        border-radius: 4px;
        margin-top: 0.3rem;
        margin-bottom: 0.5rem;
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



