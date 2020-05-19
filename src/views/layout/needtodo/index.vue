
<template>
  <div class="containerSa2">
    <div class="header">
      <div></div>
      <div class="tab-btns" @click="selectView">
        <div class="btn-left" viewType="1" :class="[viewTypesa == 1 ? 'tab-active' : '']">待办</div>
        <div class="btn-right" viewType="2" :class="[viewTypesa == 2 ? 'tab-active' : '']">已办</div>

      </div>
      <div></div>
    </div>
    <div class="content" v-if="!isMap">
      <div class="version-popup-box">
        <div class="version-popup">
          <div v-for="(iteam,index) in menuListTop" :key="index" @click="sort(iteam,index)">
            <span
              class="version-popup-font"
              :class="[iteam.menuName == '' ? '' : 'version-popup-font-active']"
            >{{iteam.menuName == ''?iteam.name:iteam.menuName}}</span>
            <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-if="downIcon==index"></span>
            <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-if="downIcon!==index"></span>
          </div>
        </div>
      </div>
      <!-- 查询的划分 -->
      <div class="version-popup-box1" v-if="downIcon1">
        <div class="version-popup">
          <div class="variable">
            <div class="menself">
              <p v-if="menuListCenter.length==0" style="color:#999999;text-align:center">暂无数据</p>
              <div style="padding:0rem;background: #f2f2f2;">
                <div class="areacheck" v-if="areaarr.length>0&&downIcon==0">
                  <p
                    class="areachecklist"
                    @click="areaTypeclick(iteam,index)"
                    :class="[viewType == iteam.id ? 'tab-active' : '']"
                    v-for="(iteam, index) in areaarr"
                    :key="index"
                  >{{iteam.name}}</p>
                </div>
              </div>
              <div>
                <p
                  class="menselflist"
                  @click="menuListClick(item)"
                  v-for="(item, index) in menuListCenter"
                  :key="index"
                  :class="[menuListTop[downIcon].label == item.id||menuListTop[downIcon].label == item.shortName ? 'menselflist-active' : '']"
                >{{downIcon==1?item.realName:item.name}}</p>
              </div>
            </div>
          </div>
          <div class="bottomsa">
            <p @click="menReset()">重置</p>
            <p @click="submit()" style="border:none">确定</p>
          </div>
        </div>
      </div>
      <!-- 查询的划分 -->
      <div class="noneList" v-if="noneList">
        <img
          src="../../../assets/image/selfcheck/image_no data@3x.png"
          width="200"
          height="180"
          alt
        />
        <p style="color:#989898">暂时没有数据哦~</p>
      </div>
      <scroller
        style="top: 2.4rem;bottom:55px;height:82%;overflow:hidden"
        v-if="!noneList"
        :on-infinite="infinite"
        :on-refresh="refresh"
        infiniteText="上拉加载"
        noDataText="--我也是有底线的--"
        ref="my_scroller"
      >
        <div class="iteamsa">
          <div
            class="iteamListSa"
            v-for="(iteam, index) in pageList"
            :key="index"
            @click="detailClick(iteam)"
            :style="{background:mysiteCode==iteam.sheetCode?'#eeeeee':'#ffffff'}"
          >
            <div
              class="leftSa"
              v-bind:style="{'backgroundImage':iteam.status == 2 ? 'url('+Ip + iteam.handleAfterURLs[0]+')' :iteam.dispachPhotoURLs.length!==0&&iteam.status!==2? 'url('+Ip + iteam.dispachPhotoURLs[0]+')':iteam.dispachPhotoURLs.length==0?'url(../../../assets/image/selfcheck/image_no data@3x.png)':''}"
            >
              <img
                v-if="iteam.qualified==0"
                class="left-qualified"
                src="../../../assets/image/不合格@3x.png"
                alt
                srcset
              />
              <img
                v-if="iteam.qualified==2"
                class="left-qualified"
                src="../../../assets/image/合格@3x.png"
                alt
                srcset
              />
            </div>
            <div class="rightSa">
              <div class="topRight">
                <span>{{FormatDate(iteam.dispatchTime)}}</span>
                <span
                  style="font-size:0.32rem;line-height:1.5;"
                  :class="iteam.status == 2 ? 'red':iteam.status == 0 ? 'blue':iteam.status == 4 ? 'pink' : 'green'"
                >{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"已转派":"已完成"}}</span>
              </div>
              <div class="centersa">
                <p style="margin-top:0.2rem">
                  <span style="color:#666666;">接单人：</span>
                  <span style="color:#5076FF;">{{iteam.handleUserName}}</span>
                </p>
                <p v-if="iteam.status == 2||iteam.status==4">
                  <span style="color:#666666;">处理时长：</span>
                  <span style="color:#5076FF;">{{iteam.dealTimeHour}}</span>
                </p>
                <p v-if="iteam.overTimeFlag==1||iteam.overTimeFlag==2">
                  <span style="color:#666666;">工单状态：</span>
                  <span
                    style="color:#5076FF;"
                  >{{(iteam.overTimeFlag==1||iteam.overTimeFlag==2)?'超时':''}}</span>
                </p>
              </div>
              <div class="bottomRight">
                <span class="iconfont icon-location"></span>
                <span class="moreFont">{{iteam.handleAddr}}</span>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="contentwo" v-if="isMap">
      <div id="maptodo"></div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      viewType: "",
      isMap:true,//督办的地图显示
      mapTodo:null,
      popupVisible: true,
      viewTypesa: 1, //待办
      requestFlage: true, //请求是我自己写的还是自带的刷新的
      areaflag: true, //是否包含flag
      menuflag: true,
      menuListTop: [
        {
          name: "区域",
          menuName: "",
          label: ""
        },

        {
          name: "处理人",
          menuName: "",
          label: ""
        },
        {
          name: "工单状态",
          menuName: "",
          label: -1
        }
      ],
      qualifiedStatus: [
        {
          name: "不合格",
          id: 0
        },
        {
          name: "合格",
          id: 2
        },
        {
          name: "超时未处理",
          id: 7
        },
        {
          name: "超时已处理",
          id: 8
        }
      ],
      qualified: "",
      menuListCenter: [],
      menType: "",
      downIcon: -1,
      downIcon1: false,
      downIcon2: true,
      areaname: {
        name: "区域",
        id: ""
      },
      companyname: {
        name: "处理人",
        id: ""
      },
      noneList: false,
      mysiteCode: "",
      searchCondition: {
        //分页属性
        page: 0,
        pageSize: 15,
        status: "",
        handleBy: "",
        areaId: "",
        qualified: ""
      },
      company: [
        {
          id: 1,
          name: "待办"
        },
        {
          id: 2,
          name: "已办"
        }
      ], //导航
      activeComany: 1,
      UserArea: [],
      pageList: [],
      companyData: [], //查询单车企业
      areaarr: [],
      areaarr1: [],
      areakids: [],
      menData: []
    };
  },
  components: {},
  created() {
    // if (this.$route.query.name == "2") {
    //   this.activeComany = 2;
    //   this.searchCondition.status = 2;
    //   this.viewTypesa = this.$route.query.viewTypesa;
    //   if (this.$route.query.downIcon || this.$route.query.downIcon == 0) {
    //     this.searchCondition = this.$route.query.searchCondition;
    //     this.menuListTop = this.$route.query.menuListTop;
    //     this.downIcon = this.$route.query.downIcon;
    //     if (this.$route.query.areaarr.length == 0) {
    //       this.getorgsTree();
    //     } else {
    //       this.areakids = this.$route.query.areakids;
    //       this.areaarr = this.$route.query.areaarr;
    //       this.viewType = this.areaarr[this.areaarr.length - 1].id;
    //     }
    //   }
    //   this.getBikeMen();
    //   this.getListData2();
    // } else {
    //   this.getBikeMen();
    //   this.getorgsTree();
    // }
    this.getBikeMen();
    this.getorgsTree();
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    // alert(2)
    sessionStorage.askPositonthree =
      this.$refs.my_scroller &&
      this.$refs.my_scroller.getPosition() &&
      this.$refs.my_scroller.getPosition().top;
    sessionStorage.mysiteCodeneed = this.mysiteCode;
    if (to.path == "/needtodoDetail" || to.path == "/needtodoAdd") {
      to.meta.keepAlive = false; // B 跳转到 A 时，让 A 缓存，即不刷新
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    if (!sessionStorage.askPositonthree || from.path == "/") {
      //当前页面刷新不需要切换位置
      sessionStorage.askPositonthree = "";
      next();
    } else {
      next(vm => {
        vm.mysiteCode = sessionStorage.mysiteCodeneed;
        if (vm && vm.$refs.my_scroller) {
          //通过vm实例访问this
          setTimeout(function() {
            vm.$refs.my_scroller.scrollTo(
              0,
              sessionStorage.askPositonthree,
              true
            );
          }, 0); //同步转异步操作
        }
      });
    }
  },
  mounted() {
    this.getMapData()
    this.initMap()
  },
  methods: {
    //初始化地图‘’
    initMap(){
      this.mapTodo = new AMap.Map("maptodo", {
        resizeEnable: true,
        mapStyle: "amap://styles/9fb204085bdb47adb66e074fca3376be", // 自定义地图样式
      });
   
    },
    //获取所有的点
    getMapData(){
       this.$fetchGet("dispatch/pageDispatchToDo", {
         page:1,
         pageSize:1000,
       }).then(
          res => {
            res.list.forEach(itram=>{
              itram.lnglat=[itram.gaodeLongitude, itram.gaodeLatitude];
              itram.style = itram.status;
            })
            this.getMass(res.list);
          }
        );
    },
    detailClick(row) {
      this.mysiteCode = row.sheetCode;
      if (row.status == 2) {
        this.$router.push({
          path: "/needtodoDetail",
          query: {
            id: row.id
            // viewTypesa: this.viewTypesa,
            // searchCondition: this.searchCondition,
            // menuListTop: this.menuListTop,
            // downIcon: this.downIcon,
            // areakids: this.areakids,
            // areaarr: this.areaarr
          }
        });
      } else {
        this.$router.push({
          path: "/needtodoAdd",
          query: {
            id: row.id
            // viewTypesa: this.viewTypesa,
            // searchCondition: this.searchCondition,
            // menuListTop: this.menuListTop,
            // downIcon: this.downIcon,
            // areakids: this.areakids,
            // areaarr: this.areaarr
          }
        });
      }
    },
    areaTypeclick(val, index) {
      this.areaflag = false;
      this.areakids = [];
      this.viewType = val.id;
      this.areaname.name = val.name;
      this.areaname.id = val.id;
      this.areakids = val.children;
      this.menuListCenter = this.areakids;
      this.areaarr = this.areaarr.slice(0, index + 1);
    },

    //代办切换
    selectView(e) {
      let type = e.target.getAttribute("viewType");
      if (type) {
        this.viewTypesa = type;
        this.activeComany = type;
        this.pageList = [];
        if (type == 1) {
          this.searchCondition.page = 0;
          this.searchCondition.status = "";
          if (
            this.menuListTop[2].label == 0 ||
            this.menuListTop[2].label == 2
          ) {
            this.searchCondition.qualified = "";
          } else {
            this.searchCondition.qualified = this.menuListTop[2].label;
          }

          this.getListData2();
        } else if (type == 2) {
          this.searchCondition.page = 0;
          this.searchCondition.status = 2;
          this.searchCondition.qualified = this.menuListTop[2].label;
          // if (this.menuListTop[2].label !== -1) {
          //   this.searchCondition.qualified = this.menuListTop[2].label;
          // }
          this.getListData2();
        }
      }
    },
    //切换图片；
    //点击查询列表
    menuListClick(row) {
      if (this.downIcon == 0) {
        this.menuListTop[this.downIcon].label = row.id;
        this.areaname.id = row.id;
        this.menuListTop[this.downIcon].menuName = row.name;
        if (row.children) {
          this.viewType = row.id;
          if (this.areaflag) {
            this.areaarr.push({
              name: row.name,
              id: row.id,
              children: this.areakids
            });
          }
          this.areaflag = true;
          this.areakids = row.children;
          this.menuListCenter = this.areakids;
        }
        this.searchCondition.areaId = this.areaname.id;
      } else if (this.downIcon == 1) {
        this.menuListTop[this.downIcon].label = row.id;
        this.menuListTop[this.downIcon].menuName = row.realName;
        this.searchCondition.handleBy = row.id;
      } else if (this.downIcon == 2) {
        this.menuListTop[this.downIcon].label = row.id;
        this.menuListTop[this.downIcon].menuName = row.name;
        this.searchCondition.qualified = row.id;
      }
    },
    //重置
    menReset() {
      if (this.downIcon == 0) {
        this.viewType = "";
        this.menuListTop[this.downIcon].label = "";
        this.menuListTop[this.downIcon].menuName = "";
        this.searchCondition.areaId = "";
      } else if (this.downIcon == 1) {
        this.menuListTop[this.downIcon].label = "";
        this.menuListTop[this.downIcon].menuName = "";
        this.searchCondition.handleBy = "";
      } else if (this.downIcon == 2) {
        this.menuListTop[this.downIcon].label = -1;
        this.menuListTop[this.downIcon].menuName = "";
        this.searchCondition.qualified = "";
      }
      // this.downIcon1 = false;
      this.getListData2();
    },
    //确定
    submit() {
      this.downIcon1 = false;
      this.getListData2();
    },
    //切换图片；
    sort(iteam, index) {
      this.downIcon = index;
      this.downIcon1 = true;
      if (this.downIcon == 0) {
        this.menuListCenter = this.areakids;
      } else if (this.downIcon == 1) {
        this.menuListCenter = this.menData;
      } else if (this.downIcon == 2) {
        this.menuListCenter = this.qualifiedStatus;
      }
    },


    //加载海量点
    getMass(data) {
      var styles = [
        {
          url: require("../../../assets/image/map0.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        },
        {
          url: require("../../../assets/image/map1.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        },
        {
          url: require("../../../assets/image/map2.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        },
        {
          url: require("../../../assets/image/map3.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        },
        {
          url: require("../../../assets/image/map4.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        },
        {
          url: require("../../../assets/image/map7.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        },
        {
          url: require("../../../assets/image/map8.png"),
          anchor: new AMap.Pixel(25, 25),
          size: new AMap.Size(50, 50)
        }
      ];

      var mass = new AMap.MassMarks(data, {
        opacity: 0.8,
        zIndex: 111,
        cursor: "pointer",
        style: styles
      });

      mass.on("click", e => {
        // console.log(e.data.sheetCode);
        // this.ismapclick=true
        // this.mapList = e.data;
      });

      this.mapTodo.add(mass);
    },

    getorgsTree() {
      //获取组织树数据
      this.$fetchGet("org/getUserArea").then(res => {
        this.UserArea = res;
        let originTree = this.parseChildren(1, res.slice(0));
        this.deleteChildren(originTree);
        this.areakids = originTree;
      });
    },
    parseChildren(pid, json) {
      //格式父级权限
      var arr = [];
      $.each(json, (index, item) => {
        // item.Ids = item.pid + "," + item.id;
        if (item.pid === pid) {
          arr.push(item);
          item.children = this.parseChildren(item.id, json);
        }
      });
      return arr;
    },
    deleteChildren(menuData) {
      //删除空的child
      $.each(menuData, (index, item) => {
        if (item.children && item.children.length) {
          this.deleteChildren(item.children);
        } else {
          delete item.children;
        }
      });
    },
    // 获取单车企业数据
    getBikeCompany() {
      this.$fetchGet("count/bikeCompany").then(res => {
        this.companyData = res;
      });
    },
    //获取处理人数据
    getBikeMen() {
      this.$fetchGet("dispatch/listSearchUser", {
        type: "3"
      }).then(res => {
        this.menData = res;
      });
    },
    // 导航标签
    selectComany(e) {
      let id = e.target.getAttribute("companyId");
      this.activeComany = id;
      if (id == 1) {
        this.searchCondition.status = "";
        this.getListData2();
      } else if (id == 2) {
        this.searchCondition.status = 2;
        this.getListData2();
      }
    },
    iconClick() {
      this.$router.push("/selfCheckAdd");
    },
    getListData() {
      this.pageList = [];
      this.searchCondition.page = 0;
      this.searchCondition.pageSize = 15;
    },
    getListData2() {
      this.searchCondition.page = 1;
      this.$fetchGet("dispatch/pageDispatchToDo", this.searchCondition).then(
        res => {
          this.pageList = res.list;
        }
      );
    },
    infinite(done) {
      if (this.requestFlage) {
        this.searchCondition.page++;
        this.$fetchGet("dispatch/pageDispatchToDo", this.searchCondition).then(
          res => {
            if (this.pageList.length == 0) {
              this.pageList = res.list;
            } else {
              this.pageList = this.pageList.concat(res.list);
            }
            done(true);
          }
        );
      }
    },
    refresh: function() {
      //下拉刷新
      this.searchCondition.page = 1;
      this.searchCondition.pageSize = 15;
      this.$fetchGet("dispatch/pageDispatchToDo", {
        page: 1,
        pageSize: 15,
        status: this.searchCondition.status,
        handleBy: this.searchCondition.handleBy,
        areaId: this.searchCondition.areaId,
        qualified: this.searchCondition.qualified
      }).then(res => {
        this.pageList = res.list;
      });
      this.timeout = setTimeout(() => {
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
._v-container {
  height: 88% !important;
  background-color: transparent;
}
.containerSa2 {
  width: 100%;
  height: 100%;
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
    .tab-btns {
      display: flex;
      margin: 10px 0 10px 0;
      .btn-left {
        box-sizing: border-box;
        padding: 6px 20px;
        font-size: 0.373333rem;
        color: #ffffff;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
        border: 1px solid #ffffff;
        border-right: none;
      }
      .btn-right {
        box-sizing: border-box;
        padding: 6px 20px;
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
  .contentwo{
     flex: 1;
    overflow: hidden;
    box-sizing: border-box;
    background: #f2f2f2;
    #maptodo{
      width: 100%;
      height: 100%;
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    box-sizing: border-box;
    background: #f2f2f2;
    .iteamsa {
      width: 100%;
      box-sizing: border-box;
      .iteamListSa {
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        padding: 0.3rem;
        border-bottom: 1px solid #eeeeee;
        .leftSa {
          width: 2.6rem;
          height: 2.6rem;
          position: relative;
          background-size: 100% 100%;
          .left-qualified {
            position: absolute;
            left: 0;
            top: 0;
            width: 1.58rem;
            height: 1.6rem;
          }
        }
        .rightSa {
          width: 0;
          display: flex;
          flex: 1;
          box-sizing: border-box;
          padding: 0 0.2rem;
          flex-direction: column;
          .topRight {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .green {
              color: #ffc000;
              border: 1px solid #ffc000;
              box-sizing: border-box;
              padding: 0.06rem;
              border-radius: 5px;
            }
            .red {
              color: #41cd76;
              border: 1px solid #41cd76;
              box-sizing: border-box;
              padding: 0.06rem;
              border-radius: 5px;
            }
            .blue {
              color: red;
              border: 1px solid red;
              box-sizing: border-box;
              padding: 0.06rem;
              border-radius: 5px;
            }
          }
          .centersa {
            width: 100%;
            display: flex;
            flex-direction: column;
            flex: 1;
            p {
              margin: 0;
              padding: 0;
            }
            box-sizing: border-box;
          }
          .bottomRight {
            display: flex;
            width: 100%;
            height: 20px;
            color: #666666;
            justify-content: flex-start;
            align-items: flex-end;
            .moreFont {
              width: 68%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
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
    // padding-top: 0.2rem;
    nav {
      width: 100%;
      height: 1.066667rem;
      box-shadow: 0 0 1px #ddd;
      // border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav-item {
        flex: 1;
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
          left: 0;
          width: 100%;
          height: 0.04rem;
          background: #5076ff;
          // margin-left: -0.586667rem;
        }
      }
    }
    .noneList {
      flex: 1;
      line-height: 1;
      text-align: center;
      margin-top: 2rem;
    }
  }
}
</style>
<style lang="scss">
</style>
