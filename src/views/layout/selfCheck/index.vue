
<template>
  <div class="containerSaone">
    <div class="header">
        <span style="font-size:0.48rem;width:2rem;text-align:center" class="iconfont icon-location">上海</span>
        <span style='width:2rem;text-align:center'>自查</span>
        <span style="font-size:24px;width:2rem;text-align:center" class="iconfont icon-gengduo" @click="iconClick"></span>
      </div>
    <div class="version-popup-box">
      <div class="version-popup">
        <div @click="sort">
          <span
            class="version-popup-font"
            :class="[areaname.name == '区域' ? '' : 'version-popup-font-active']"
          >{{areaname.name}}</span>
          <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-show="downIcon"></span>
          <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-show="!downIcon"></span>
        </div>
        <div @click="sort1">
          <span
            class="version-popup-font"
            :class="[companyname.name == '单车企业' ? '' : 'version-popup-font-active']"
          >{{companyname.name}}</span>
          <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-show="downIcon1"></span>
          <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-show="!downIcon1"></span>
        </div>
        <div @click="sort2">
          <span
            class="version-popup-font"
            :class="[menname.name == '处理人' ? '' : 'version-popup-font-active']"
          >{{menname.name}}</span>
          <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-show="downIcon2"></span>
          <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-show="!downIcon2"></span>
        </div>
        <div style="border:none" @click="sort3">
          <span
            class="version-popup-font"
            :class="[statusname.name == '状态' ? '' : 'version-popup-font-active']"
          >{{statusname.name}}</span>
          <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-show="downIcon3"></span>
          <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-show="!downIcon3"></span>
        </div>
      </div>
    </div>
    <!-- 区域的划分 -->
    <div class="version-popup-box1" v-show="!downIcon">
      <div class="version-popup">
        <div class="variable">
          <div class="menself">
            <p v-if="areakids.length==0" style="color:#999999;text-align:center">暂无数据</p>
            <div style="padding:0rem;background: #f2f2f2;">
              <div class="areacheck" v-if="areaarr.length>0">
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
                @click="areaTypeclick1(iteam)"
                v-for="(iteam, index) in areakids"
                :key="index"
                :class="[viewType1 == iteam.id ? 'menselflist-active' : '']"
              >{{iteam.name}}</p>
              <!-- <p v-if="areakids.length==0" style="text-align:center;color:#999999">暂无数据</p> -->
            </div>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset()">重置</p>
          <p @click="submit()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!-- 区域的划分 -->
    <!-- 单车企业弹框 -->
    <div class="version-popup-box1" v-show="!downIcon1">
      <div class="version-popup">
        <div class="variable">
          <div class="menself">
            <p v-if="company.length==0" style="color:#999999;text-align:center">暂无数据</p>
            <p
              class="menselflist"
              @click="clickCompany(iteam)"
              v-for="(iteam, index) in company"
              :class="[viewType2 == iteam.id ? 'menselflist-active' : '']"
              :key="index"
            >{{iteam.name}}</p>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset1()">重置</p>
          <p @click="submit1()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!-- 单车企业弹框 -->
    <!-- 处理人弹框 -->
    <div class="version-popup-box1" v-show="!downIcon2">
      <div class="version-popup">
        <div class="variable">
          <div class="menself">
            <p v-if="menData.length==0" style="color:#999999;text-align:center">暂无数据</p>
            <p
              class="menselflist"
              v-for="(iteam, index) in menData"
              :key="index"
              @click="menTypeclick(iteam)"
              :class="[menType == iteam.id ? 'menselflist-active' : '']"
            >{{iteam.realName}}</p>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset2()">重置</p>
          <p @click="submit2()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!-- 处理人弹框 -->
    <!-- 状态弹框 -->
    <div class="version-popup-box1" v-show="!downIcon3">
      <div class="version-popup">
        <div class="variable">
          <div class="menself">
            <p
              class="menselflist"
              v-for="(iteam, index) in statusData"
              :key="index"
              @click="statusclick(iteam)"
              :class="[viewType3 == iteam.id ? 'menselflist-active' : '']"
            >{{iteam.name}}</p>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset3()">重置</p>
          <p @click="submit3()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!-- 状态弹框 -->
    <div class="noneList" v-if="noneList">
      <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt>
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
        >
          <div class="leftSa" style="width:120px;height:120px">
            <img
              :src="iteam.status == 1 ? Ip + iteam.handleBeforeURLs[0] : Ip + iteam.handleAfterURLs[0]"
              alt
              width="120"
              height="120"
              srcset
            >
          </div>
          <div class="rightSa">
            <div style="display:flex;flex-direction: column;flex:1;max-width: 100%;">
              <div class="topRight">
                <p style="flex:1;">{{FormatDate(iteam.updateTime)}}</p>
                <p
                  style="font-size:0.36rem;line-height:1.5;"
                  :class="iteam.status == 1 ? 'green' : 'red'"
                >{{iteam.status == 1 ? '处理中' : "已处理"}}</p>
              </div>
              <div class="centersa">
                <p
                  style='line-height:1.5;'
                  :class="iteam.orgId == 1006 ? 'mobike' : iteam.orgId == 1007? 'ofo':iteam.orgId == 1014? 'jiujiu':iteam.orgId == 1015? 'haluo':iteam.orgId == 1059? 'xiangqi':'other'"
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
</template>

<script>
import { Loadmore } from "mint-ui";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      selected: "/layout/selfCheck",
      viewType: "",
      viewType1: "",
      viewType2: "",
      viewType3: "",
      popupVisible: true,
      areaflag: true, //是否包含flag
      menType: "",
      downIcon: true,
      downIcon1: true,
      downIcon2: true,
      downIcon3: true,
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
      noneList: false,
      searchCondition: {
        page: "0",
        pageSize: "15",
        handleBy: "",
        areaId: "",
        orgId: "",
        status: ""
      },
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
  created() {
    this.getBikeCompany();
    this.getBikeMen();
    this.getorgsTree();
  },
  mounted() {},
  methods: {
    detailClick(row) {
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
      this.$router.push("/selfCheckAdd");
    },
    clickCompany(val) {
      this.viewType2 = val.id;
      this.companyname.name = val.name;
      this.companyname.id = val.id;
    },
    menTypeclick(val) {
      this.menType = val.id;
      this.menname.name = val.realName;
      this.menname.id = val.id;
    },
    statusclick(val) {
      this.viewType3 = val.id;
      this.statusname.name = val.name;
      this.statusname.id = val.id;
    },
    areaTypeclick(val, index) {
      this.areaflag = false;
      this.areakids = [];
      this.viewType = val.id;
      this.areaname.name = val.name;
      this.areaname.id = val.id;
      this.areakids = val.children;
      this.areaarr = this.areaarr.slice(0, index + 1);
    },
    areaTypeclick1(val) {
      this.viewType1 = val.id;
      this.areaname.name = val.name;
      this.areaname.id = val.id;
      if (val.children) {
        this.viewType = val.id;
        if (this.areaflag) {
          this.areaarr.push({
            name: val.name,
            id: val.id,
            children: this.areakids
          });
        }
        this.areaflag = true;
        this.areakids = val.children;
      }
    },
    menReset() {
      this.viewType = "";
      this.viewType1 = "";
      this.areaname.name = "区域";
      this.pageList = [];
      this.searchCondition.areaId = "";
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon = true;
    },
    menReset1() {
      this.viewType2 = "";
      this.companyname.name = "单车企业";
      this.pageList = [];
      this.searchCondition.orgId = "";
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon1 = true;
    },
    menReset2() {
      this.menType = "";
      this.menname.name = "处理人";
      this.pageList = [];
      this.searchCondition.handleBy = "";
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon2 = true;
    },
    menReset3() {
      this.viewType3 = "";
      this.statusname.name = "状态";
      this.pageList = [];
      this.searchCondition.status = "";
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon3 = true;
    },
    submit() {
      this.pageList = [];
      this.searchCondition.areaId = this.areaname.id;
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon = true;
    },
    submit1() {
      this.pageList = [];
      this.searchCondition.orgId = this.companyname.id;
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon1 = true;
    },
    submit2() {
      this.pageList = [];
      this.searchCondition.handleBy = this.menname.id;
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon2 = true;
    },
    submit3() {
      this.pageList = [];
      this.searchCondition.status = this.statusname.id;
      (this.searchCondition.page = "0"),
        (this.searchCondition.pageSize = "15"),
        this.infinite();
      this.downIcon3 = true;
    },
    //切换图片；
    sort() {
      this.downIcon = !this.downIcon;
      this.downIcon1 = true;
      this.downIcon2 = true;
      this.downIcon3 = true;
    },
    sort1() {
      this.downIcon1 = !this.downIcon1;
      this.downIcon = true;
      this.downIcon2 = true;
      this.downIcon3 = true;
    },
    sort2() {
      this.downIcon2 = !this.downIcon2;
      this.downIcon1 = true;
      this.downIcon = true;
      this.downIcon3 = true;
    },
    sort3() {
      this.downIcon3 = !this.downIcon3;
      this.downIcon1 = true;
      this.downIcon = true;
      this.downIcon2 = true;
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
    infinite(done) {
      this.searchCondition.page++;
      this.$fetchGet("selfcheck/pageSelfCheck", this.searchCondition).then(
        res => {
          if (res.list.length !== 0) {
            this.pageList = this.pageList.concat(res.list);
            done();
          } else {
            done(true);
          }
        }
      );
    },
    refresh: function() {
      //下拉刷新
      // console.log("refresh");
      this.$fetchGet("selfcheck/pageSelfCheck", {
        page: 1,
        pageSize: 15,
        handleBy: this.searchCondition.handleBy,
        areaId: this.searchCondition.areaId,
        orgId: this.searchCondition.orgId,
        status: this.searchCondition.status
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
            background: #9a6eff;
            color: #ffffff;
            padding: 0.06rem 0.2rem;
            box-sizing: border-box;
            border-radius: 12px;
            font-size: 0.35rem;
          }
        }
        .bottomRight {
          display: flex;
          max-width: 100%;

          height: 0.4rem;
          color: #666666;
          justify-content: flex-start;
          align-items:flex-end;
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
