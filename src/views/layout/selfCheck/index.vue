
<template>
  <div class="containerSaone">
    <span @click="popupVisible1=true" v-if="isJunan&&isDate" class="questionnaire"></span>
    <!-- <a href="https://chengchuang.wjx.cn/jq/36628228.aspx" class="questionnaire"></a> -->
    <div class="text-box" v-if="popupVisible1">
      <div class="header">
        <img
          src="@/assets/image/infoModification/nav_1_back@2x.png"
          alt
          @click="popupVisible1=false"
        />
        <div class="header-title"></div>
        <div></div>
      </div>
      <iframe src="https://chengchuang.wjx.cn/jq/36628228.aspx" frameborder="0"></iframe>
    </div>
    <div v-if="!popupVisible1">
      <div class="header">
        <span
          v-if="addressFlag"
          style="font-size:0.4rem;width:25%;padding-left:2%;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
        >{{gpsadress}}</span>
        <span
          v-if="!addressFlag"
          style="font-size:0.4rem;width:25%;padding-left:2%;text-align:left;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
          class="iconfont icon-location"
        >{{district}}</span>
        <span style="width:48%;text-align:center">自查</span>
        <span
          style="font-size:24px;width:25%;text-align:right;padding-right:2%"
          class="iconfont icon-gengduo"
          @click="iconClick"
        ></span>
      </div>
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
      <!-- 查询列表 -->
      <div class="version-popup-box1" v-if="downIcon1">
        <div class="version-popup">
          <div class="variable">
            <div class="menself">
              <p
                v-if="menuListCenter.length==0&qualifiedFlag==false"
                style="color:#999999;text-align:center"
              >暂无数据</p>
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
                >{{downIcon==2?item.realName:item.name}}</p>
              </div>
            </div>
            <div class="qualified-box" v-if="qualifiedFlag">
              <p>工单状态</p>
              <p
                class="status-list"
                @click="statusclick(iteam,index)"
                :class="[viewType10 == iteam.id ? 'tab-active' : '']"
                v-for="(iteam, index) in statusData"
                :key="iteam.id"
              >{{iteam.name}}</p>
              <p>工单评价</p>
              <p
                class="status-list"
                :class="[viewType11 == item.id ? 'tab-active' : '']"
                v-for="(item,index) in qualifiedStatus"
                :key="'info1-'+index"
                @click="qualifiedclick(item,index)"
              >{{item.name}}</p>
            </div>
          </div>
          <div class="bottomsa">
            <p @click="menReset()">重置</p>
            <p @click="submit()" style="border:none">确定</p>
          </div>
        </div>
      </div>
      <!-- 查询列表 -->
      <div class="noneList" v-if="noneList">
        <img
          src="../../../assets/image/selfcheck/image_no data@3x.png"
          width="200"
          height="180"
          alt
        />
        <p style="color:#989898">暂时没有自查数据哦~</p>
      </div>
      <scroller
        style="top:2.4rem;bottom:55px;height:82%;overflow:hidden"
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
              v-bind:style="{'backgroundImage':iteam.status == 1 ? 'url('+Ip + iteam.handleBeforeURLs[0]+')' : 'url('+Ip + iteam.handleAfterURLs[0]+')'}"
            >
              <!-- <img class="left-qualified"
                   :src="iteam.status == 1 ? Ip + iteam.handleBeforeURLs[0] : Ip + iteam.handleAfterURLs[0]"
                   alt
                   style="width:2.6rem;height:2.6rem"
              srcset>-->
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
              <!-- <img src="../../../assets/image/合格@3x.png" alt="" srcset=""> -->
            </div>
            <div class="rightSa">
              <div style="display:flex;flex-direction: column;flex:1;max-width: 100%;">
                <div class="topRight">
                  <p style="flex:1;">{{FormatDate(iteam.updateTime)}}</p>
                  <p
                    style="font-size:0.32rem;line-height:1.5;"
                    :class="iteam.status == 1 ? 'green' : 'red'"
                  >{{iteam.status == 1 ? '处理中' : "已处理"}}</p>
                </div>
                <div class="centersa">
                  <p
                    style="line-height:1.5;"
                    :class="iteam.orgId == 1006 ? 'mobike' : iteam.orgId == 1007? 'ofo':iteam.orgId == 1143? 'jiujiu':iteam.orgId == 1015? 'haluo':iteam.orgId == 1059? 'xiangqi':'other'"
                  >{{iteam.orgName}}</p>
                  <p style="color:#666666;margin-left:0.2rem">整理</p>
                  <p
                    style="color:#5076FF;margin-left:0.1rem"
                  >{{iteam.arrangeNum==0?'-':iteam.arrangeNum}}</p>
                  <p style="color:#666666;margin-left:0.2rem">清运</p>
                  <p
                    style="color:#5076FF;margin-left:0.1rem"
                  >{{iteam.cleanNum==0?'-':iteam.cleanNum}}</p>
                </div>
              </div>
              <div class="bottomRight">
                <span class="iconfont icon-weizhi"></span>
                <span class="moreFont">{{iteam.handleAddr}}</span>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>

    <!-- 问卷调查弹框↓ -->
    <mt-popup class="version-popup-box-juan" v-model="popupVisible" position="right">
      <img
        @click="popupVisible=false"
        class="close-popup"
        src="@/assets/image/icon_close@3x.png"
        alt
        srcset
      />
      <div class="version-popup">
        <div class="version-popup-top">
          <img class="logo" src="@/assets/image/image@3x.png" alt />
        </div>
        <div class="version-popup-bottom">
          请于4月5号之前
          及时进行问卷调查,如果已提交请忽略
        </div>
      </div>
    </mt-popup>
    <!-- 问卷调查弹框↓ -->
  </div>
</template>
 
<script>
import { Loadmore } from "mint-ui";
import { mapGetters } from "vuex";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import { fail } from "assert";
export default {
  name: "zicha",
  computed: {
    ...mapGetters(["district", "addressFlag", "gpsadress"])
  },
  data() {
    return {
      mysitea: "done",
      selected: "/layout/selfCheck",
      viewType: "",
      viewType2: "",
      viewType3: "",
      viewType10: -1,
      viewType11: -1, //合格不合格
      popupVisible: false,
      popupVisible1: false,
      areaflag: true, //是否包含flag
      menType: "",
      downIcon: -1,
      downIcon1: false,
      qualifiedFlag: false,
      menuName: "",
      menuListTop: [
        {
          name: "区域",
          menuName: "",
          label: ""
        },
        {
          name: "单车企业",
          menuName: "",
          label: ""
        },
        {
          name: "处理人",
          menuName: "",
          label: ""
        },
        {
          name: "状态",
          menuName: "",
          label: ""
        }
      ],
      menuListCenter: [],
      statusData: [
        {
          name: "处理中",
          id: 1
        },
        {
          name: "已处理",
          id: 2
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
        }
      ],
      areaname: {
        name: "区域",
        id: ""
      },
      companyname: {
        name: "单车企业",
        id: ""
      },
      statusname: {
        name: "状态",
        id: ""
      },
      menname: {
        name: "处理人",
        id: ""
      },
      requestFlage: true, //请求是我自己写的还是自带的刷新的
      noneList: false,
      searchCondition: {
        page: 0,
        pageSize: 15,
        handleBy: "",
        areaId: "",
        orgId: "",
        status: "",
        qualified: ""
      },
      mysiteCode: "",
      UserArea: [],
      pageList: [],
      company: [], //查询单车企业
      areaarr: [],
      areaarr1: [],
      areakids: [],
      menData: [],
      isJunan: false, //是否显示区
      isDate: false,
      isnumbersa: 0
    };
  },
  components: {},
  created() {
    // this.$refs.my_scroller.scrollTo(0, document.getElementById("mysite").offsetTop, true)
    // if (this.$route.query.downIcon || this.$route.query.downIcon == 0) {
    //   this.$refs.my_scroller.scrollTo(0, document.getElementById("mysite").offsetTop, true)
    //   this.searchCondition = this.$route.query.searchCondition;
    //   this.menuListTop = this.$route.query.menuListTop;
    //   if (this.$route.query.searchCondition.status) {
    //     this.viewType10 = this.$route.query.searchCondition.status;
    //   } else {
    //     this.viewType10 = -1;
    //   }
    //   if (this.$route.query.searchCondition.qualified) {
    //     this.viewType11 = this.$route.query.searchCondition.qualified;
    //   } else {
    //     this.viewType11 = -1;
    //   }
    //   this.downIcon = this.$route.query.downIcon;
    //   if (this.$route.query.areaarr.length == 0) {
    //     this.getorgsTree();
    //   } else {
    //     this.areakids = this.$route.query.areakids;
    //     this.areaarr = this.$route.query.areaarr;
    //     this.viewType = this.areaarr[this.areaarr.length - 1].id;
    //   }
    //   this.getListData2();
    // } else {
    //   this.getorgsTree();
    // }
    this.getorgsTree();
    this.getBikeCompany();
    this.getBikeMen();
    this.getNumber();
    window.watchBackWXS = this.watchBackWXS;
  },
  beforeRouteLeave(to, from, next) {
    // 设置下一个路由的 meta
    sessionStorage.askPositon =
      this.$refs.my_scroller &&
      this.$refs.my_scroller.getPosition() &&
      this.$refs.my_scroller.getPosition().top;
    sessionStorage.mysiteCodecheck = this.mysiteCode;
    if (to.path == "/selfCheckdetail" || to.path == "/selfCheckAdd") {
      to.meta.keepAlive = false; // B 跳转到 A 时，让 A 缓存，即不刷新
    }

    next();
  },
  beforeRouteEnter(to, from, next) {
    if (!sessionStorage.askPositon || from.path == "/") {
      //当前页面刷新不需要切换位置
      sessionStorage.askPositon = "";
      sessionStorage.mysiteCodecheck = "";
      next();
    } else {
      next(vm => {
        vm.mysiteCode = sessionStorage.mysiteCodecheck;
        if (vm && vm.$refs.my_scroller) {
          //通过vm实例访问this
          setTimeout(function() {
            vm.$refs.my_scroller.scrollTo(0, sessionStorage.askPositon, true);
          }, 0); //同步转异步操作
        }
      });
    }
  },

  mounted() {
    // window.addEventListener("scroll", this.handleScroll, true);
    // this.handleScroll(this.$route.query);
    // let dd = Date.now();
    // let str = 1554393600000;
    // if (dd - str >= 0) {
    //   this.isDate = false;
    // } else {
    //   this.isDate = true;
    // }
  },
  methods: {
    // handleScroll(row) {
    //   this.mysitea = row.mysiteCode;
    //   setTimeout(() => {
    //     if (document.getElementById("mysite")) {
    //       let container = document.getElementById("mysite").offsetTop - 160;
    //       let x = this.$refs.my_scroller.scrollTo(0, container, true);
    //     }
    //   }, 200);
    // },

    watchBackWXS() {
      if (this.popupVisible1) {
        this.popupVisible1 = false;
      }
    },
    //获取所属区域
    getNumber() {
      let arr = [];
      let num;
      this.$fetchGet("cleanConfig/getCleanArea").then(res => {
        res.forEach(element => {
          arr.push(element.key);
        });
        num = arr.indexOf("1057");
        if (num > -1) {
          this.isJunan = true;
        } else {
          this.isJunan = false;
        }
        if (
          this.isJunan &
          this.isDate &
          (localStorage.getItem("isnumbersa") == null)
        ) {
          this.popupVisible = true;
          localStorage.setItem("isnumbersa", 1);
        }
      });
    },
    //获取当前城市

    //进入详情
    detailClick(row) {
      this.mysiteCode = row.sheetCode;
      if (row.status == 2) {
        this.$router.push({
          path: "/selfCheckdetail",
          query: {
            message: row.sheetCode
          }
        });
      } else {
        this.$router.push({
          path: "/selfCheckAdd",
          query: {
            message: row.sheetCode
          }
        });
      }
    },
    iconClick() {
      this.$router.push({
        path: "/selfCheckAdd"
        // query: {
        //   message: "123",
        //   searchCondition: this.searchCondition,
        //   menuListTop: this.menuListTop,
        //   downIcon: this.downIcon,
        //   areakids: this.areakids,
        //   areaarr: this.areaarr
        // }
      });
    },
    //区域切换
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
        this.menuListTop[this.downIcon].label = row.shortName;
        this.menuListTop[this.downIcon].menuName = row.name;
        this.searchCondition.orgId = row.id;
      } else if (this.downIcon == 2) {
        this.menuListTop[this.downIcon].label = row.id;
        this.menuListTop[this.downIcon].menuName = row.realName;
        this.searchCondition.handleBy = row.id;
      } else if (this.downIcon == 3) {
        // this.menuListTop[this.downIcon].label = row.id;
        // this.menuListTop[this.downIcon].menuName = row.name;
        // this.searchCondition.status = row.id;
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
        this.searchCondition.orgId = "";
      } else if (this.downIcon == 2) {
        this.menuListTop[this.downIcon].label = "";
        this.menuListTop[this.downIcon].menuName = "";
        this.searchCondition.handleBy = "";
      } else if (this.downIcon == 3) {
        this.menuListTop[this.downIcon].label = "";
        this.menuListTop[this.downIcon].menuName = "";
        this.searchCondition.status = "";
        this.searchCondition.qualified = "";
        this.viewType10 = -1;
        this.viewType11 = -1;
      }
      //this.downIcon1 = false;
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
        this.qualifiedFlag = false;
        this.menuListCenter = this.areakids;
      } else if (this.downIcon == 1) {
        this.qualifiedFlag = false;
        this.menuListCenter = this.company;
      } else if (this.downIcon == 2) {
        this.qualifiedFlag = false;
        this.menuListCenter = this.menData;
        this.qualifiedFlag = false;
      } else if (this.downIcon == 3) {
        this.menuListCenter = [];
        this.qualifiedFlag = true;
      }
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
    //合格不合格
    statusclick(row, index) {
      this.viewType10 = row.id;
      this.searchCondition.status = row.id;
    },
    //合格不合格
    qualifiedclick(row, index) {
      this.viewType11 = row.id;
      this.searchCondition.qualified = row.id;
    },
    parseChildren(pid, json) {
      //格式父级权限
      var arr = [];
      $.each(json, (index, item) => {
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
        this.company = res;
      });
    },
    //获取处理人数据
    getBikeMen() {
      this.$fetchGet("dispatch/listSearchUser", {
        type: "1"
      }).then(res => {
        this.menData = res;
      });
    },
    getListData() {
      this.pageList = [];
      this.searchCondition.page = 0;
      this.searchCondition.pageSize = 15;
    },
    getListData2() {
      this.searchCondition.page = 1;
      this.$fetchGet("selfcheck/pageSelfCheck", this.searchCondition).then(
        res => {
          this.pageList = res.list;
        }
      );
    },
    infinite(done) {
      if (this.requestFlage) {
        this.searchCondition.page++;
        this.$fetchGet("selfcheck/pageSelfCheck", this.searchCondition).then(
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
    refresh: function(done) {
      this.searchCondition.page = 1;
      this.searchCondition.pageSize = 15;
      this.$fetchGet("selfcheck/pageSelfCheck", {
        page: 1,
        pageSize: 15,
        handleBy: this.searchCondition.handleBy,
        areaId: this.searchCondition.areaId,
        orgId: this.searchCondition.orgId,
        status: this.searchCondition.status,
        qualified: this.searchCondition.qualified
      }).then(res => {
        done();
        this.bottom = self.bottom + 10;
        this.pageList = res.list;
      });
    }
  }
};
</script>
<style>
._v-container > ._v-content > .loading-layer > .no-data-text[data-v-ecaca2b0] {
  top: -0.3rem !important;
}
</style>
<style lang="scss" scoped>
._v-container {
  height: 84% !important;
  background-color: transparent;
}
.containerSaone {
  .text-box {
    position: absolute;
    width: 100%;
    height: 100%;
    // background: #282828;
    z-index: 4444;

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
    iframe {
      flex: 1;
      -webkit-overflow-scrolling: touch;
      overflow-y: scroll;
    }
  }
  .questionnaire {
    background-image: url("../../../assets/image/icon_wenjuan@3x.png");
    width: 2.7rem;
    height: 1.14rem;
    display: block;
    background-size: 100% 100%;
    position: fixed;
    bottom: 1.9rem;
    right: 0;
    z-index: 88;
  }
  .version-popup-box-juan {
    height: 8rem;
    width: 100%;
    background: transparent;
    color: #282828;
    position: relative;
    .close-popup {
      position: absolute;
      right: 45%;
      bottom: -0.32rem;
      height: 0.8rem;
      width: 0.8rem;
    }
    .version-popup {
      margin: 0 auto;
      background: #fff;
      height: 7rem;
      width: 6.6rem;
      border-radius: 0.16rem;
      display: flex;
      flex-direction: column;

      .version-popup-top {
        .logo {
          width: 100%;
          height: 3.8rem;
        }
      }
      .version-popup-bottom {
        flex: 1;
        text-align: center;
        color: #333333;
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        font-size: 0.46rem;
        line-height: 1.5;
      }
    }
  }
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  overflow: hidden;
  .version-popup-box {
    height: 1.2rem;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    color: #282828;
    position: fixed;
    top: 1.173333rem;
    left: 0;
    z-index: 88;
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
    z-index: 88;
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
            .areachecklist {
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: 1;
              height: 1rem;
              text-align: center;
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
        .qualified-box {
          box-sizing: border-box;
          padding: 0.3rem;
          .status-list {
            display: inline-block;
            padding: 0.15rem 0.6rem;
            color: #999999;
            border: 1px solid #eeeeee;
            border-radius: 4px;
            margin: 0;
            margin-right: 0.4rem;
            margin-bottom: 0.2rem;
            cursor: pointer;
          }
          .tab-active {
            background: #5076ff;
            color: #fff;
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
  .header {
    height: 1.173333rem;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-between;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    color: #fff;
    font-size: 0.48rem;
    padding: 0rem;
    box-sizing: border-box;
  }
  .noneList {
    flex: 1;
    line-height: 1;
    text-align: center;
    margin-top: 2rem;
  }
  .iteamsa {
    max-width: 100%;
    box-sizing: border-box;
    .iteamListSa {
      display: flex;
      max-width: 100%;
      background: #ffffff;
      margin-bottom: 0.2rem;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0.3rem;
      border-bottom: 1px solid #eeeeee;
      .leftSa {
        width: 2.6rem;
        height: 2.6rem;
        position: relative;
        // background-image: url("../../../assets/image/不合格@3x.png");
        background-size: 100% 100%;
        // z-index: -1;
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
        box-sizing: border-box;
        padding: 0rem;
        flex: 1;
        padding-left: 0.2rem;
        flex-direction: column;
        .topRight {
          p {
            margin: 0;
            padding: 0;
          }
          display: flex;
          max-width: 100%;
          // flex: 1;
          justify-content: space-between;
          align-items: center;
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
            padding: 0.06rem;
            box-sizing: border-box;
            border-radius: 5px;
          }
        }
        .centersa {
          width: 100%;
          display: flex;
          // flex: 1;
          box-sizing: border-box;
          padding-top: 0.2rem;
          align-items: center;
          .mobike {
            background: #fbc303;
            padding: 0.06rem 0.2rem;
            box-sizing: border-box;
            border-radius: 12px;
            color: #333333;
            font-size: 0.3rem;
          }
          .ofo {
            background: #fbc303;
            padding: 0.06rem 0.2rem;
            box-sizing: border-box;
            border-radius: 12px;
            color: #333333;
            font-size: 0.3rem;
          }
          .haluo {
            background: #01a1ff;
            padding: 0.06rem 0.2rem;
            box-sizing: border-box;
            border-radius: 12px;
            color: #ffffff;
            font-size: 0.3rem;
          }
          .jiujiu {
            background: #4DC5BC;
            padding: 0.06rem 0.2rem;
            box-sizing: border-box;
            border-radius: 12px;
            color: #ffffff;
            text-align: center;
            font-size: 0.3rem;
          }
          .xiangqi {
            background: #00cb4b;
            padding: 0.06rem 0.2rem;
            box-sizing: border-box;
            border-radius: 12px;
            color: #ffffff;
            text-align: center;
            font-size: 0.3rem;
          }
          .other {
            background: #9a6eff;
            color: #ffffff;
            width: 2.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding: 0.06rem 0.2rem;
            text-align: center;
            box-sizing: border-box;
            border-radius: 12px;
            font-size: 0.3rem;
          }
        }
        .bottomRight {
          display: flex;
          max-width: 100%;

          height: 0.4rem;
          color: #666666;
          justify-content: flex-start;
          align-items: flex-end;
          .moreFont {
            max-width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
