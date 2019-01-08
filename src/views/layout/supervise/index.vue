
<template>
  <div class="containerSa1">
    <div class="header">
      <span style="font-size:0.48rem;width:2rem;text-align:center" class="iconfont icon-location">上海</span>
      <span style="width:2rem;text-align:center">督办</span>
      <span
        style="font-size:24px;width:1.7rem;text-align:right;padding-right:0.3rem"
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
    <!-- 查询条件的划分 -->
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
              >{{downIcon==2?item.realName:item.name}}</p>
            </div>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset()">重置</p>
          <p @click="submit()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!--查询条件的划分 -->
    <div class="noneList" v-if="noneList">
      <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt>
      <p style="color:#989898">暂时没有数据哦~</p>
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
        >
          <div class="leftSa" style="width:2.6rem;height:2.6rem">
            <img
              style="width:2.6rem;height:2.6rem"
              v-if="iteam.dispachPhotoURLs.length!==0"
              :src="Ip + iteam.dispachPhotoURLs[0]"
              alt
              srcset
            >
            <img
              style="width:2.6rem;height:2.6rem"
              v-if="iteam.dispachPhotoURLs.length==0"
              src="../../../assets/image/selfcheck/image_no data@3x.png"
              alt
              srcset
            >
          </div>
          <div class="rightSa">
            <div class="topRight">
              <span>{{FormatDate(iteam.dispatchTime)}}</span>
              <span
                style="font-size:0.32rem;line-height:1.5;"
                :class="iteam.status == 2 ? 'red':iteam.status == 0 ? 'blue':iteam.status == 4 ? 'pink' : 'green'"
              >{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"重新派单":"已完成"}}</span>
              <!-- <p style="width:0.1rem"></p> -->
            </div>
            <div class="centersa">
              <!-- <p v-if="iteam.status==0">企业：{{iteam.dispatchReceive}}</p> -->
              <div
                class="centersalist"
                v-for="(item, index) in iteam.finishDetailList"
                :key="index"
              >
                <p
                  style="line-height:1.15;text-align:center"
                  :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other'"
                >{{item.orgName}}</p>
                <p style="flex:1;padding-top:0.2rem">{{item.dealTime}}</p>
              </div>
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
</template>

<script>
import { Loadmore } from "mint-ui";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  name:'duban',
  computed: {},
  data() {
    return {
      selected: "/layout/supervise",
      viewType: "",
      viewType2: "",
      viewType3: -1,
      popupVisible: true,
      areaflag: true, //是否包含flag
      menType: "",
      downIcon: -1,
      downIcon1: false,
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
          label: -1
        }
      ],
      menuListCenter: [],
      statusData: [
        {
          name: "未处理",
          id: 0
        },
        {
          name: "处理中",
          id: 1
        },
        {
          name: "已处理",
          id: 2
        },
        {
          name: "重新派单",
          id: 3
        },
        {
          name: "已完成",
          id: 4
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
        name: "派单人",
        id: ""
      },
      noneList: false,
      searchCondition: {
        page: 0,
        pageSize: 15,
        createBy: "",
        areaId: "",
        orgId: ""
      },
      areaflag: true, //是否包含flag
      UserArea: [],
      pageList: [],
      company: [], //查询单车企业
      areaarr: [],
      areaarr1: [],
      areakids: [],
      menData: []
    };
  },
  components: {},
  mounted() {
    // this.loadPageList();
    if (this.$route.query.supervise) {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          supervise: this.$route.query.supervise,
          statuSa: 2
        }
      });
    }
  },
  created() {
    this.getBikeCompany();
    this.getBikeMen();
    this.getorgsTree();
  },
  beforeRouteLeave(to, from, next) {
    console.log('---------------------------------------------');
    if (to.path == "/superviseAdd" || to.path == "/superviseDetail") {
      if (!from.meta.keepAlive) {
        from.meta.keepAlive = true;
      }
      next();
    } else {
      from.meta.keepAlive = false;
      to.meta.keepAlive = false;
      console.log(this)
      this.$destroy();
      next();
    }
    console.log(to.meta.keepAlive);
    console.log(from.meta.keepAlive);
  },
  methods: {
    detailClick(row) {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          supervise: row.sheetCode,
          statuSa: row.status
        }
      });
    },
    iconClick() {
      this.$router.push("/superviseAdd");
    },
    //区域切换
    areaTypeclick(val, index) {
      console.log(val);
      this.areaflag = false;
      this.areakids=[];
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
        this.menuListTop[this.downIcon].label = row.id;
        this.menuListTop[this.downIcon].menuName = row.name;
        this.searchCondition.status = row.id;
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
        this.menuListTop[this.downIcon].label = -1;
        this.menuListTop[this.downIcon].menuName = "";
        this.searchCondition.status = "";
      }
      this.downIcon1 = false;
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
      console.log(this.downIcon);
      this.downIcon1 = true;
      if (this.downIcon == 0) {
        this.menuListCenter = this.areakids;
      } else if (this.downIcon == 1) {
        this.menuListCenter = this.company;
      } else if (this.downIcon == 2) {
        this.menuListCenter = this.menData;
      } else if (this.downIcon == 3) {
        this.menuListCenter = this.statusData;
      }
    },

    // 获取单车企业数据
    getBikeCompany() {
      this.$fetchGet("count/bikeCompany").then(res => {
        this.company = res;
      });
    },
    //获取派单人数据
    getBikeMen() {
      this.$fetchGet("dispatch/listSearchUser", {
        type: "2"
      }).then(res => {
        this.menData = res;
      });
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
    getListData() {
      this.pageList = [];
      this.searchCondition.page = "0";
      this.searchCondition.pageSize = "15";
    },
    getListData2() {
      if (this.pageList.length !== 0) {
        this.getListData();
      } else {
        this.getListData();
        this.$fetchGet("dispatch/pageDispatch", this.searchCondition).then(
          res => {
            this.pageList = res.list;
          }
        );
      }
    },
    infinite(done) {
      this.searchCondition.page++;
      this.$fetchGet("dispatch/pageDispatch", this.searchCondition).then(
        res => {
          if (this.pageList.length == 0) {
            this.pageList = res.list;
          } else {
            this.pageList = this.pageList.concat(res.list);
          }
          done(true);
        }
      );
    },
    refresh: function(done) {
      //下拉刷新
      // console.log("refresh");
      this.$fetchGet("dispatch/pageDispatch", {
        page: 1,
        pageSize: 15,
        createBy: this.searchCondition.createBy,
        areaId: this.searchCondition.areaId,
        orgId: this.searchCondition.orgId,
        status: this.searchCondition.status
      }).then(res => {
        this.pageList = res.list;
        done();
      });
      // this.timeout = setTimeout(() => {
      //   this.$refs.my_scroller.finishPullToRefresh();
      // }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
._v-container {
  height: 84% !important;
  background-color: transparent;
}
.containerSa1 {
  width: 100%;
  height: 100%;
  display: flex;
  background: #f2f2f2;
  flex-direction: column;
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
  .header {
    height: 1.173333rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    color: #fff;
    font-size: 0.48rem;
    padding: 0rem;
    box-sizing: border-box;
    flex-shrink: 0;
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
    background: #f2f2f2;
    .iteamListSa {
      max-width: 100%;
      display: flex;
      margin-bottom: 0.2rem;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0.3rem;
      background: #ffffff;
      border-bottom: 1px solid #eeeeee;
      .rightSa {
        width: 0;
        display: flex;
        flex: 1;
        box-sizing: border-box;
        padding: 0rem;
        padding-left: 0.2rem;
        flex-direction: column;
        .topRight {
          display: flex;
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
          flex: 1;
          box-sizing: border-box;
          justify-content: flex-start;
          padding-top: 0.1rem;
          .centersalist {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-right: 0.2rem;
            p {
              margin: 0;
              padding: 0;
              text-align: center;
            }
            .mobike {
              background: #f25b4a;
              padding: 0.06rem 0.2rem;
              box-sizing: border-box;
              border-radius: 12px;
              color: #ffffff;
              font-size: 0.35rem;
            }
            .ofo {
              background: #fbc303;
              padding: 0.06rem 0.2rem;
              box-sizing: border-box;
              border-radius: 12px;
              color: #333333;
              font-size: 0.35rem;
            }
            .haluo {
              background: #01a1ff;
              padding: 0.06rem 0.2rem;
              box-sizing: border-box;
              border-radius: 12px;
              color: #ffffff;
              font-size: 0.35rem;
            }
            .jiujiu {
              background: #fd3121;
              padding: 0.06rem 0.2rem;
              box-sizing: border-box;
              border-radius: 12px;
              color: #ffffff;
              font-size: 0.35rem;
            }
            .xiangqi {
              background: #00cb4b;
              padding: 0.06rem 0.2rem;
              box-sizing: border-box;
              border-radius: 12px;
              color: #ffffff;
              font-size: 0.35rem;
            }
            .other {
              background: transparent;
              color: #333333;
              // padding: 0.04rem 0.15rem;
              box-sizing: border-box;
              border-radius: 12px;
              font-size: 0.35rem;
              width: 2.4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              text-align: center;
            }
          }
        }
        .bottomRight {
          display: flex;
          width: 100%;
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
}
</style>


