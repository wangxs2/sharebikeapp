

<template>
  <div class="container">
    <mt-popup class="imgMask"
              v-model="popupVisible"
              position="right">
      <span class="iconfont icon-guandiao"
            style="color:#fff;position:fixed;right:15px;top:15px"
            @click="popupVisible=false"></span>
      <mt-swipe style="width:100%;height:64%"
                :continuous='false'
                :touchstart='true'
                :speed='10'
                :auto="0"
                :defaultIndex='indexImage'>
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
      > -->
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
    <div class="header">
      <mt-header title="详情">
        <mt-button icon="back"
                   slot="left"
                   style="font-size:24px"
                   @click="iconClick"></mt-button>
      </mt-header>
    </div>
    <div class="content">
      <div class="superList">
        <div class="topsa"
             style="margin-top:0.3rem">
          <div class="fontext">派单信息</div>
          <div :class="iteamList.status == 2 ? 'red' : 'green'">{{iteamList.status == 0 ? '未处理' : iteamList.status == 1 ?"处理中":iteamList.status == 2 ?"已处理":iteamList.status == 3 ?"已转派":"已完成"}}</div>
        </div>
      </div>
      <div class="superList">
        <img class="hegeimg"
             v-if="iteamList.qualified==2"
             src="@/assets/image/selfcheck/hege@3x.png">
        <img class="hegeimg"
             v-if="iteamList.qualified==0"
             src="@/assets/image/selfcheck/buhege@3x.png">
        <div class="topcloum">
          <div class="topcloumson">
            <p class="leftfont">单号</p>
            <p class="leftfont1">{{iteamList.sheetCode}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">时间</p>
            <p class="leftfont1">{{FormatDate(iteamList.dispatchTime)}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">地点</p>
            <div class="leftfont1"
                 @click="getMap()">
              <p style="margin-top:0.1rem;color:#333333;text-decoration:underline">{{iteamList.handleSecAddr}}</p>
              <p style="margin-top:0.1rem;color:#aeaeae;text-decoration:underline">{{iteamList.handleAddr}}</p>
            </div>
            <!-- <p class="leftfont1"
               style="color:blue;text-decoration:underline"
               @click="getMap()">{{iteamList.handleAddr}}</p> -->
          </div>
          <div class="topcloumson">
            <p class="leftfont">派单人</p>
            <p class="leftfont1">{{iteamList.dispatchUserName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理方式</p>
            <p class="leftfont1">{{iteamList.dealMethod==1?"整理":iteamList.dealMethod==2?"清运":"整理且清运"}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">企业</p>
            <p class="leftfont1">{{iteamList.orgName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">派单照片</p>
            <p class="leftfont1">
              <img v-for="(iteam,index) in iteamList.dispachPhotoURLs"
                   :src="Ip+iteam"
                   :key="index"
                   alt
                   srcset
                   @click="handOpen(iteamList.dispachPhotoURLs,index)">
            </p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">备注</p>
            <p class="leftfont1">{{iteamList.dispachRemark}}</p>
          </div>
        </div>
      </div>
      <div class="superList"
           style="">
        <div class="topsa">
          <div class="fontext">派单/转派记录</div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topsa"
             style="height:0.3rem;border:none;border-radius:0">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topcloum"
             style="padding:0 0.3rem"
             v-for="(item,index) in iteamList.sendRecordList"
             :key="index">
          <div class="topcloumson"
               style="padding-bottom:0">
            <div style="margin-top:-0.1rem">
              <span>{{splitsa(item.sendTime)}} {{splitsa1(item.sendTime)}}</span>
              <p :class="index==iteamList.sendRecordList.length-1?(item.read==0?'reaed-two':'reaed-sa'):(item.read==0?'reaed-sa1':'reaed-sa')"
                 style="display: block;width:1.1rem;height:0.4rem;padding:0rem;line-height:0.46rem;text-align:center;box-sizing: border-box;border-radius: 12px;color: #ffffff;font-size: 0.3rem;margin-left:0.8rem;margin-top:0.2rem">{{index==iteamList.sendRecordList.length-1?(item.read==0?'未读':'已读'):(item.read==0?'已转派':'已读')}}</p>
            </div>
            <div class="topcloum"
                 style="margin:0;padding:0;align-items: center;padding-top:0rem;padding-left:0.2rem">
              <p style="width:0.26rem;height:0.26rem;border-radius:50%;background:#5076ff;"></p>
              <p v-if="index!==iteamList.sendRecordList.length-1"
                 style="display:flex;flex:1;width:1px;border-left: 1px dashed #5076ff;"></p>
            </div>
            <div class="topcloum"
                 style="margin:0;padding:0;flex:1;padding-left:0.2rem;margin-top:-0.1rem">
              <div class="topcloumson">
                <p class="leftfont"
                   style="width:22%">{{index==0?'派单人':'转派人'}}</p>
                <p class="leftfont1"
                   style="width:78%">{{item.sendMan}}</p>
              </div>
              <div class="topcloumson">
                <p class="leftfont"
                   style="width:22%">接单人</p>
                <p class="leftfont1"
                   style="width:78%">{{item.receiveMan}}</p>
              </div>
              <div class="topcloumson">
                <p class="leftfont"
                   style="width:22%">备注</p>
                <p class="leftfont1"
                   style="width:78%">{{item.sendRemark}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="superList">
        <div class="topsa"
             style="margin-top:0.3rem">
          <div class="fontext">处理信息</div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topsa"
             style="padding-top:0.3rem;padding-bottom:0.2rem;border-radius:0">
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
      <div class="superList"
           v-show="ifCleanByBike==1&&iteamList.dispatchDealDetailList.length!==0">
        <div class="topsa"
             style="height:6rem;padding:0rem;border-radius:0">
          <div id="Myechart"></div>
        </div>
      </div>
      <div class="superList">
        <div class="topcloum">
          <div class="topcloumson">
            <p class="leftfont">处理人</p>
            <p class="leftfont1">{{iteamList.handleUserName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理时间</p>
            <p class="leftfont1"
               v-if="iteamList.handleTime!==undefined">{{FormatDate(iteamList.handleTime)}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理时长</p>
            <p class="leftfont1">{{iteamList.dealTimeHour}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理前</p>
            <p class="leftfont1">
              <img v-for="(iteam,index) in iteamList.handleBeforeURLs"
                   :src="Ip+iteam"
                   :key="index"
                   alt
                   srcset
                   @click="handOpen(iteamList.handleBeforeURLs,index)">
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
                   @click="handOpen(iteamList.handleAfterURLs,index)">
            </p>
          </div>
          <!-- <div class="topcloumson">
              <p class="leftfont">整理数</p>
              <p class="leftfont1">{{iteamList.arrangeNum}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">清运数</p>
              <p class="leftfont1">{{iteamList.cleanNum}}</p>
            </div> -->
        </div>
      </div>
      <div class="superList"
           v-if="iteamList.qualified!==3">
        <div class="topsa"
             style="margin-top:0.3rem">
          <div class="fontext">反馈信息</div>
          <div></div>
        </div>
      </div>
      <div v-if="iteamList.qualified!==3"
           class="superList"
           style="margin-bottom:0.2rem">
        <div class="topcloum">
          <div class="topcloumson">
            <p class="leftfont">反馈时间</p>
            <p class="leftfont1">{{iteamList.updateTime==undefined?'':FormatDate(iteamList.updateTime)}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">反馈人员</p>
            <p class="leftfont1">{{iteamList.qualifieUserName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">反馈情况</p>
            <p class="leftfont1">{{iteamList.qualified==0?'不合格':iteamList.qualified==2?'合格':''}}</p>
          </div>
          <div v-if="iteamList.qualified==0"
               class="topcloumson">
            <p class="leftfont">不合格原因</p>
            <p class="leftfont1">{{iteamList.unqualifiedReason}}</p>
          </div>
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
  data () {
    return {
      slide: [],
      slide1: [],
      lageImg: [],//轮播显示图片
      eachartNode: null, //echarts
      popupVisible1: false,
      ifCleanByBike: "", //是否分成企业填写整理数
      indexImage: 0,
      sheetCode: "",
      rotateS: 0,
      bigImage: "",
      popupVisible: false,
      iteamList: {},
      //c查询条件
      viewTypesa: '',
      areakids: [],
      areaarr: [],
      searchCondition: {},
      menuListTop: [],
      downIcon: -1,
    };
  },
  components: {},
  mounted () {
    this.$nextTick(() => {
      var worldMapContainer = document.getElementById('Myechart');
      //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
      var resizeWorldMapContainer = function () {
        worldMapContainer.style.width = window.innerWidth - 30 + 'px';
        worldMapContainer.style.height = '6rem';
      };
      //设置容器高宽
      resizeWorldMapContainer();
      this.eachartNode = this.$echarts.init(worldMapContainer);
      this.getComanylist();
      window.onresize = () => {
        this.eachartNode.resize();
      }
    });
  },
  created () {
    if (this.$route.query.id) {
      this.sheetCode = this.$route.query.id;
      this.viewTypesa = this.$route.query.viewTypesa;
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
    getMap () {
      this.popupVisible1 = true;
      this.myMap = new AMap.Map("myMap");
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        useNative: true,
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
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
    //获取分企业添加的列表
    getComanylist () {
      this.$fetchGet("cleanConfig/ifCleanByBike")
        .then(res => {
          this.ifCleanByBike = res;
        })
        .catch(res => { });
    },
    //echarts
    initCanvas (company, arrangeNum, cleanNum) {
      console.log(this.eachartNode);
      let option = {
        color: ["#958BFF", "#FF688D"],
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [
            {
              name: "整理数",
              color: "#666666",
              fontSize: 12
            },
            {
              name: "清运数",
              color: "#666666",
              fontSize: 12
            }
          ],
          itemWidth: 12,
          itemHeight: 12,
          bottom: 0
        },
        grid: {
          top: "4%",
          left: "4%",
          right: "4%",
          bottom: "12%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //是否显示刻度
            splitLine: { show: false }, //去除网格线
            splitArea: { show: false }, //保留网格区域
            data: company,
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#DDDDDD", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: "#666666" //坐标值得具体的颜色
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false }, //是否显示刻度
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#DDDDDD", //左边线的颜色
                width: "1" //坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: "#666666" //坐标值得具体的颜色
              }
            }
          },
          {
            type: "value", //双y轴  默认的第一个是左边 第二个是右边
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                type: "solid",
                color: "#DDDDDD", //右边线的颜色
                width: "1" //坐标线的宽度
              }
            },
            axisLabel: {
              textStyle: {
                color: "#666666" //坐标值得具体的颜色
              }
            }
          }
        ],
        series: [
          {
            name: "整理数",
            type: "bar",
            barGap: "50%",
            barCateGoryGap: "50%",
            barWidth: 6,
            itemStyle: {
              barBorderRadius: [14, 14, 14, 14] //柱子的圆角设置//
            },
            data: arrangeNum
          },
          {
            name: "清运数",
            type: "bar",
            barCateGoryGap: "50%",
            barWidth: 6,
            barGap: "50%",
            itemStyle: {
              barBorderRadius: [14, 14, 14, 14]
            },
            data: cleanNum
          }
        ]
      };
      this.eachartNode.setOption(option);
    },
    watchBackWXS () {
      if (this.popupVisible || this.popupVisible1) {
        this.popupVisible = false;
        this.popupVisible1 = false
      } else {
        this.iconClick();
      }

    },
    splitsa (val) {
      return val.split(" ")[0].split("-")[1] + "-" + val.split(" ")[0].split("-")[2]
    },
    splitsa1 (val) {
      return val.split(" ")[1].split(":")[0] + ":" + val.split(" ")[1].split(":")[1]
    },
    rotate () {
      this.rotateS = this.rotateS + 90;
    },
    iconClick () {
      this.$router.push({
        path: "/layout/needtodo",
        query: {
          name: "2",
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areaarr: this.areaarr,
          areakids: this.areakids,
          viewTypesa: this.viewTypesa,
        }
      });
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
      this.$fetchGet("dispatch/dispatchDetail", {
        id: val
      })
        .then(res => {
          Indicator.close();
          this.iteamList = res.dispatchDetail;
          if (res.dispatchDetail.dispatchDealDetailList.length > 0) {
            this.$nextTick(function () {
              res.dispatchDetail.dispatchDealDetailList.forEach(item => {
                slide.push(item.orgName);
                slide1.push(item.arrangeNum);
                slide2.push(item.cleanNum);
              });
              console.log()
              this.initCanvas(slide, slide1, slide2);
            });
          }
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
    display: flex;
    flex-direction: column;
    .superList {
      width: 100%;
      box-sizing: border-box;

      border-radius: 2px;
      position: relative;
      .hegeimg {
        width: 2.76rem;
        height: 2.76rem;
        position: absolute;
        right: 0.5rem;
        top: -0.5rem;
      }
      .topsa {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 0.3rem;
        background: #fff;
        padding: 0.3rem;
        border-top-left-radius: 0.12rem;
        border-top-right-radius: 0.12rem;
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
          .reaed-sa {
            background: #aaaaaa;
          }
          .reaed-sa1 {
            background: #5076ff;
          }
          .reaed-two {
            background: #ff0000;
          }
          .leftfont {
            width: 25%;
            color: #999999;
            font-size: 0.37rem;
          }
          .leftfont1 {
            width: 75%;
            img {
              margin-right: 0.2rem;
              width: 2.5rem;
              height: 2.5rem;
            }
          }
        }
      }
    }
  }
}
</style>



