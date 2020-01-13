

<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible=false"
      ></span>

      <mt-swipe
        style="width:100%;height:64%"
        :continuous="false"
        :touchstart="true"
        :speed="10"
        :auto="0"
        :defaultIndex="indexImage"
      >
        <mt-swipe-item v-for="(iteam,index) in lageImg" :key="index">
          <img :src="Ip+iteam" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" width="100%" />
        </mt-swipe-item>
      </mt-swipe>
    </mt-popup>
    <mt-popup v-model="popupVisible1" class="mapwhere" position="right">
      <div class="header">
        <img
          src="@/assets/image/infoModification/nav_1_back@2x.png"
          alt
          @click="popupVisible1=false"
        />
        <div class="header-title">处理地址</div>
        <div></div>
      </div>

      <div id="myMap"></div>
    </mt-popup>
    <mt-popup class="qualified-box" v-model="popupVisible3" position="right">
      <div class="version-popup">
        <div class="version-popup-top">不合格原因</div>
        <div class="version-popup-center">
          <p class="version-popup-center-box" v-for="(item,index) in options" :key="index">
            <span :viewType="item.label" @click="chooseOrder($event)" class="detail-btn"></span>
            <span>{{item.label}}</span>
          </p>
        </div>
        <div class="version-popup-bottom">
          <div @click="popupVisible3=false" style="color:black">取消</div>
          <div @click="noQualified()" style="border:none;color:#26a2ff">确定</div>
        </div>
      </div>
    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toHome" />
      <div class="header-title">派单处理详情</div>
      <div style="font-size:18px"></div>
    </div>
    <main>
      <p
        style="width:100%;height:1rem;background: -webkit-linear-gradient(left, #6698ff, #5076ff);"
      ></p>
      <nav @click="selectComany($event)">
        <div
          v-for="item in iteamList"
          :key="item.id"
          :companyId="item.id"
          :class="[activeComany == item.id ? 'nav-active' : '']"
          class="nav-item"
        >{{item.orgName}}</div>
      </nav>
      <section>
        <div class="superList">
          <div class="topsa" style="margin-top:0.3rem">
            <div class="fontext">派单信息</div>
            <div class="overimg">
              <div
                v-if="listdetail.overTimeFlag==1||listdetail.overTimeFlag==2"
                class="overTimeFlag"
              ></div>
              <div
                :class="listdetail.status == 2 ? 'red' : 'green'"
              >{{listdetail.status == 0 ? '未处理' : listdetail.status == 1 ?"处理中":listdetail.status == 2 ?"已处理":listdetail.status == 3 ?"已转派":"已完成"}}</div>
            </div>
          </div>
        </div>
        <div class="superList">
          <img
            class="hegeimg"
            v-if="listdetail.qualified==2"
            src="@/assets/image/selfcheck/hege@3x.png"
          />
          <img
            class="hegeimg"
            v-if="listdetail.qualified==0"
            src="@/assets/image/selfcheck/buhege@3x.png"
          />
          <div class="topcloum">
            <div class="topcloumson">
              <p class="leftfont">单号</p>
              <p class="leftfont1">{{listdetail.sheetCode}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">时间</p>
              <p class="leftfont1">{{FormatDate(listdetail.dispatchTime)}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">地点</p>
              <div class="leftfont1" @click="getMap()">
                <p
                  style="margin-top:0.1rem;color:#333333;text-decoration:underline"
                >{{listdetail.handleSecAddr}}</p>
                <p
                  style="margin-top:0.1rem;color:#aeaeae;text-decoration:underline"
                >{{listdetail.handleAddr}}</p>
              </div>
            </div>
            <div class="topcloumson">
              <p class="leftfont">派单人</p>
              <p class="leftfont1">{{listdetail.dispatchUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理方式</p>
              <p
                class="leftfont1"
              >{{listdetail.dealMethod==1?"整理":listdetail.dealMethod==2?"清运":"整理且清运"}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">企业</p>
              <p class="leftfont1">{{listdetail.orgName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">派单照片</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in listdetail.dispachPhotoURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(listdetail.dispachPhotoURLs,index)"
                />
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">备注</p>
              <p class="leftfont1">{{listdetail.dispachRemark}}</p>
            </div>
          </div>
        </div>
        <div class="superList">
          <div class="topsa" style="margin-top:0.3rem">
            <div class="fontext">派单/转派记录</div>
            <div></div>
          </div>
        </div>
        <div class="superList">
          <div class="topsa" style="height:0.3rem;border:none;border-radius:0">
            <div></div>
            <div></div>
          </div>
        </div>
        <div class="superList">
          <div
            class="topcloum"
            style="padding:0 0.3rem"
            v-for="(item,index) in listdetail.sendRecordList"
            :key="index"
          >
            <div class="topcloumson" style="padding-bottom:0">
              <div style="margin-top:-0.1rem">
                <span>{{splitsa(item.sendTime)}} {{splitsa1(item.sendTime)}}</span>
                <!-- <br> -->
                <p
                  :class="index==listdetail.sendRecordList.length-1?(item.read==0?'reaed-two':'reaed-sa'):(item.read==0?'reaed-sa1':'reaed-sa')"
                  style="display: block;width:1.1rem;height:0.4rem;padding:0rem;line-height:0.46rem;text-align:center;box-sizing: border-box;border-radius: 12px;color: #ffffff;font-size: 0.3rem;margin-left:0.8rem;margin-top:0.2rem"
                >{{index==listdetail.sendRecordList.length-1?(item.read==0?'未读':'已读'):(item.read==0?'已转派':'已读')}}</p>
              </div>
              <div
                class="topcloum"
                style="margin:0;padding:0;align-items: center;padding-top:0rem;padding-left:0.2rem"
              >
                <p style="width:0.26rem;height:0.26rem;border-radius:50%;background:#5076ff;"></p>
                <p
                  v-if="index!==listdetail.sendRecordList.length-1"
                  style="display:flex;flex:1;width:1px;border-left: 1px dashed #5076ff;"
                ></p>
              </div>
              <div
                class="topcloum"
                style="margin:0;padding:0;flex:1;padding-left:0.2rem;margin-top:-0.1rem"
              >
                <div class="topcloumson">
                  <p class="leftfont" style="width:22%">{{index==0?'派单人':'转派人'}}</p>
                  <p class="leftfont1" style="width:78%">{{item.sendMan}}</p>
                </div>
                <div class="topcloumson">
                  <p class="leftfont" style="width:22%">接单人</p>
                  <p class="leftfont1" style="width:78%">{{item.receiveMan}}</p>
                </div>
                <div class="topcloumson">
                  <p class="leftfont" style="width:22%">备注</p>
                  <p class="leftfont1" style="width:78%">{{item.sendRemark}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="superList">
          <div class="topsa" style="margin-top:0.3rem">
            <div class="fontext">处理信息</div>
            <div></div>
          </div>
        </div>
        <div class="superList" v-show="listdetail.status !== 2">
          <div class="iteamQs">
            <img src="@/assets/image/supervise/image_zanwu@2x.png" alt srcset />
            <p>{{listdetail.status == 0?'尚未处理，暂无处理信息':listdetail.status == 1?'企业正在处理，暂无处理信息':'已转派：已转派，暂无处理信息'}}</p>
          </div>
        </div>
        <div class="superList" v-show="listdetail.status == 2">
          <div class="iteamsa" style="padding-top:0.3rem;padding-bottom:0.2rem">
            <div style="width:50%;text-align: center">
              <p style="font-size:0.3rem;color:#666666">整理总数</p>
              <p
                style="font-size:0.5rem;margin-top:0.1rem"
              >{{listdetail.arrangeNum==undefined?0:listdetail.arrangeNum}}</p>
            </div>
            <div style="width:50%;text-align: center">
              <p style="font-size:0.3rem;color:#666666">清运总数</p>
              <p
                style="font-size:0.5rem;margin-top:0.1rem"
              >{{listdetail.cleanNum==undefined?0:listdetail.cleanNum}}</p>
            </div>
          </div>
        </div>
        <div v-show="listdetail.status == 2" class="superList">
          <div class="iteamsa" style="height:6rem;padding-bottom:0.2rem">
            <div id="Myechart"></div>
          </div>
        </div>
        <div v-show="listdetail.status == 2" class="superList">
          <div class="topcloum">
            <div class="topcloumson">
              <p class="leftfont">处理人</p>
              <p class="leftfont1">{{listdetail.handleUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时间</p>
              <p
                class="leftfont1"
                v-if="listdetail.handleTime!==undefined"
              >{{FormatDate(listdetail.handleTime)}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时长</p>
              <p class="leftfont1">{{listdetail.dealTimeHour}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理前</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in listdetail.handleBeforeURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(listdetail.handleBeforeURLs,index)"
                />
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理后</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in listdetail.handleAfterURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(listdetail.handleAfterURLs,index)"
                />
              </p>
            </div>
          </div>
        </div>
        <div class="superList" v-if="listdetail.qualified!==3">
          <div class="topsa" style="margin-top:0.3rem">
            <div class="fontext">反馈信息</div>
            <div></div>
          </div>
        </div>
        <div v-if="listdetail.qualified!==3" class="superList">
          <div class="topcloum">
            <div class="topcloumson">
              <p class="leftfont">反馈时间</p>
              <p
                class="leftfont1"
              >{{listdetail.updateTime==undefined?'':FormatDate(listdetail.updateTime)}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">反馈人员</p>
              <p class="leftfont1">{{listdetail.qualifieUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">反馈情况</p>
              <p class="leftfont1">{{listdetail.qualified==0?'不合格':listdetail.qualified==2?'合格':''}}</p>
            </div>
            <div v-if="listdetail.qualified==0" class="topcloumson">
              <p class="leftfont">不合格原因</p>
              <p class="leftfont1">{{listdetail.unqualifiedReason}}</p>
            </div>
          </div>
        </div>
        <div
          v-if="listdetail.status == 2&listdetail.qualified==3&(roleCode=='global'||roleCode=='dispatch')"
          class="evaluation-button"
        >
          <button @click="popupVisible3=true" style="background:#FF4545">不合格</button>
          <button @click="qualified()" style="background:#56CA37">合格</button>
        </div>
      </section>
    </main>
  </div>
</template>
<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      slide: [],
      imgArray: [],
      rotateS: 0,
      popupVisible: false,
      popupVisible1: false, //地图
      popupVisible3: false, //不合格理由
      listdetail: {},
      showIndicators: false,
      activeComany: "", // 选中的单车企业
      ifCleanByBike: "", //是否分成企业填写整理数
      title: "",
      bigImage: "",
      roleCode: "",
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
      unqualifiedReason: [], //不合格理由
      slide2: [],
      slide1: [],
      sheetCode: "",
      status: "",
      iteamList: [],
      areakids: [],
      areaarr: [],
      searchCondition: {},
      menuListTop: [],
      lageImg: [], //轮播显示图片
      indexImage: 0,
      downIcon: -1,
      eachartNode: null, //echarts
      myMap: null
    };
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      let worldMapContainer = document.getElementById("Myechart");
      //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
      let resizeWorldMapContainer = function() {
        worldMapContainer.style.width = window.innerWidth - 30 + "px";
        worldMapContainer.style.height = "6rem";
      };
      //设置容器高宽
      resizeWorldMapContainer();
      this.eachartNode = this.$echarts.init(worldMapContainer);
      this.getComanylist();
      window.onresize = () => {
        this.eachartNode.resize();
      };
    });
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    to.meta.keepAlive = true; // C 跳转到 A 时让 A 不缓存，即刷新
    next();
  },
  created() {
    this.roleCode = localStorage.roleCode;
    if (this.$route.query.codescroll) {
      this.sheetCode = this.$route.query.codescroll;
      this.status = this.$route.query.statuSa;
      if (this.$route.query.downIcon || this.$route.query.downIcon == 0) {
        this.searchCondition = this.$route.query.searchCondition;
        this.menuListTop = this.$route.query.menuListTop;
        this.downIcon = this.$route.query.downIcon;
        this.areakids = this.$route.query.areakids;
        this.areaarr = this.$route.query.areaarr;
      }
      this.getMessage(this.sheetCode);
    }
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    handleClose() {
    },
    //是否确认合格
    qualified() {
      MessageBox.confirm("确认处理合格?").then(action => {
        this.$fetchPut("dispatch/dispatchQualifiedFeedBack", {
          id: this.listdetail.id,
          qualified: 2,
          unqualifiedReason: ""
        }).then(res => {
          if (res.status == 0) {
            MessageBox.alert("", {
              message: "操作成功",
              title: "提示"
            }).then(action => {
              this.getMessage(this.sheetCode);
            });
            this.getMessage(this.sheetCode);
          } else {
            MessageBox.alert("", {
              message: res.message,
              title: "提示"
            }).then(action => {});
          }
        });
      });
    },
    noQualified() {
      this.$fetchPut("dispatch/dispatchQualifiedFeedBack", {
        id: this.listdetail.id,
        qualified: 0,
        unqualifiedReason: this.unqualifiedReason.join(",")
      }).then(res => {
        if (res.status == 0) {
          MessageBox.alert("", {
            message: "操作成功",
            title: "提示"
          }).then(action => {
            this.getMessage(this.sheetCode);
          });
          this.getMessage(this.sheetCode);
        } else {
          MessageBox.alert("", {
            message: res.message,
            title: "提示"
          }).then(action => {});
        }
        this.popupVisible3 = false;
      });
    },
    chooseOrder(e) {
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
    getComanylist() {
      this.$fetchGet("cleanConfig/ifCleanByBike")
        .then(res => {
          this.ifCleanByBike = res;
        })
        .catch(res => {});
    },
    watchBackWXS() {
      if (this.popupVisible || this.popupVisible1) {
        this.popupVisible = false;
        this.popupVisible1 = false;
      } else {
        this.toHome();
      }
    },
    //echarts
    initCanvas(company, arrangeNum, cleanNum) {
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
            minInterval: 1,
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
      this.eachartNode.setOption(option, true);
    },
    toHome() {
      this.$router.push({
        path: "/layout/supervise",
      });
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    handleChange(val) {
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
    //打开图片弹框
    handOpen(val, index) {
      if (this.listdetail.status == 2) {
        this.eachartNode.dispatchAction({ type: "hideTip" });
      }

      // this.rotateS = 0;
      // this.popupVisible = true;
      // val = val.replace(".400x400.jpg", ".square.jpg");
      // this.bigImage = val;
      this.rotateS = 0;
      this.lageImg = [];
      this.popupVisible = true;
      val.forEach(iteam => {
        iteam = iteam.replace(".400x400.jpg", ".square.jpg");
        this.lageImg.push(iteam);
      });
      this.indexImage = index;
    },
    iconClick() {
      this.$router.push({
        path: "/feedBack",
        query: {
          message: this.sheetCode,
          dealMethod: this.iteamList[0].dealMethod,
          statuSa: this.iteamList[0].status,
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areaarr: this.areaarr,
          areakids: this.areakids
        }
      });
    },
    getMap() {
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
        var markers = [
          {
            icon: require("../../assets/image/supervise/iconren.png"),
            label: {
              offset: new AMap.Pixel(-20, -30),
              content: "<div class='info'>处理位置</div>"
            },
            position: [
              this.listdetail.gaodeLongitude,
              this.listdetail.gaodeLatitude
            ]
          },
          {
            icon: require("../../assets/image/supervise/iconpr.png"),
            label: {
              offset: new AMap.Pixel(-20, -30),
              content: "<div class='info'>当前位置</div>"
            },
            position: [result.position.lng, result.position.lat]
          }
        ];

        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        markers.forEach(marker => {
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
    // 选择公司
    selectComany(e) {
      let slide = [];
      let slide1 = [];
      let slide2 = [];
      let id = e.target.getAttribute("companyId");
      if (id) {
        this.activeComany = id;
      }
      this.iteamList.forEach((iteam, index) => {
        if (id == iteam.id) {
          this.listdetail = iteam;
          if (iteam.dispatchDealDetailList.length > 0) {
            this.$nextTick(function() {
              iteam.dispatchDealDetailList.forEach(item => {
                slide.push(item.orgName);
                slide1.push(item.arrangeNum);
                slide2.push(item.cleanNum);
              });
              this.initCanvas(slide, slide1, slide2);
            });
          }
        }
      });
    },
    getMessage(val) {
      this.iteamList = [];
      let slide = [];
      let slide1 = [];
      let slide2 = [];
      let slide3 = [];
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("dispatch/listDispatchDetails", {
        sheetCode: val
      })
        .then(res => {
          Indicator.close();
          slide3 = res[0].dispatchDealDetailList;
          this.iteamList = res;
          if (this.activeComany) {
            this.iteamList.forEach((iteam, index) => {
              if (iteam.id == this.activeComany) {
                this.listdetail = res[index];
              }
            });
            this.activeComany = this.activeComany;
          } else {
            this.activeComany = res[0].id;
            this.listdetail = res[0];
          }
          // this.activeComany = res[0].id;
          // this.listdetail = res[0];
          if (res[0].dispatchDealDetailList.length > 0) {
            slide3.forEach(iteam => {
              slide.push(iteam.orgName);
              slide1.push(iteam.arrangeNum);
              slide2.push(iteam.cleanNum);
            });
            this.initCanvas(slide, slide1, slide2);
          }
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
  color: red;
}
.red {
  color: #41cd76;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
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
        font-size: 0.45rem;
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
        height: 1.06rem;
        line-height: 1.06rem;
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
  main {
    flex: 1;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    p {
      margin: 0;
      padding: 0;
    }
    nav {
      //   width: 100%;
      height: 1.2rem;
      display: flex;
      align-items: center;
      overflow-y: hidden;
      overflow-x: scroll;
      box-sizing: border-box;
      border-radius: 0.12rem;
      box-shadow: 0 0 3px #a5bef1;
      background: #fff;
      justify-content: space-between;
      position: absolute;
      top: 0.3rem;
      left: 0.3rem;
      right: 0.3rem;
      .nav-item {
        flex: 1;
        width: 100%;
        height: 100%;
        text-align: center;
        color: #656565;
        font-size: 0.45rem;
        line-height: 1.2rem;
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
          height: 0.06rem;
          background: #5076ff;
          margin-left: -0.586667rem;
        }
      }
    }
    section {
      width: 100%;
      flex: 1;
      height: 1px;
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      align-items: center;
      margin-top: 0.5rem;
      margin-bottom: 0.2rem;
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
        .iteamsa {
          box-sizing: border-box;
          margin: 0 0.3rem;
          flex: 1;
          display: flex;
          justify-content: flex-start;
          background: #fff;
          #Myechart {
            width: 100%;
            height: 100%;
          }
          .timesa {
            display: flex;
            flex-direction: column;
          }
        }
        .iteamQs {
          box-sizing: border-box;
          margin: 0 0.3rem;
          padding: 0.5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: #fff;
          img {
            width: 5.22rem;
            height: 4.88rem;
          }
          p {
            font-size: 0.4rem;
            color: rgb(101, 101, 101);
            padding-top: 0.5rem;
          }
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
          .overimg {
            display: flex;
            justify-content: flex-start;
            .overTimeFlag {
              width: 0.57rem;
              height: 0.51rem;
              background-image: url("../../assets/image/me/overtimg.gif");
              background-size: 100% 100%;
              margin-right: 0.12rem;
            }
          }

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
          .reaed-sa {
            background: #aaaaaa;
          }
          .reaed-sa1 {
            background: #5076ff;
          }
          .reaed-two {
            background: #ff0000;
          }
          .topcloumson {
            display: flex;
            justify-content: flex-start;
            padding-bottom: 0.3rem;

            .leftfont {
              width: 25%;
              color: #999999;
              font-size: 0.37rem;
            }
            .topcloum {
              overflow: hidden;
            }
            .leftfont1 {
              img {
                margin-right: 0.2rem;
                width: 2.7rem;
                height: 2.7rem;
              }
            }
          }
        }
      }
      .evaluation-button {
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.3rem;
        button {
          color: #fff;
          width: 48%;
          height: 1rem;
          border-radius: 4px;
          margin-top: 0.3rem;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
}
</style>



