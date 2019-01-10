

<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible=false"
      ></span>
      <img
        :src="Ip+bigImage"
        alt
        srcset
        v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
        width="100%"
      >
      <img
        src="../../assets/image/login/rotate.svg"
        alt
        srcset
        width="50"
        height="50"
        style="position:fixed;right:44%;bottom:15px;"
        @click="rotate()"
      >
    </mt-popup>
    <div class="header">
      <mt-header title="详情">
        <mt-button icon="back" slot="left" style="font-size:24px" @click="iconClick"></mt-button>
      </mt-header>
    </div>
    <div class="content">
      <div class="superList">
          <div class="topsa" style="margin-top:0.3rem">
            <div class="fontext">派单信息</div>
            <div :class="iteamList.status == 2 ? 'red' : 'green'">{{iteamList.status == 0 ? '未处理' : iteamList.status == 1 ?"处理中":iteamList.status == 2 ?"已处理":iteamList.status == 3 ?"已转派":"已完成"}}</div>
          </div>
        </div>
        <div class="superList">
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
              <p class="leftfont1">{{iteamList.handleAddr}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">派单人</p>
              <p class="leftfont1">{{iteamList.dispatchUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理方式</p>
              <p
                class="leftfont1"
              >{{iteamList.dealMethod==1?"整理":iteamList.dealMethod==2?"清运":"整理且清运"}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">企业</p>
              <p class="leftfont1">{{iteamList.orgName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">派单照片</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in iteamList.dispachPhotoURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">备注</p>
              <p class="leftfont1">{{iteamList.dispachRemark}}</p>
            </div>
          </div>
        </div>
        <div class="superList" style="">
          <div class="topsa">
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
            v-for="(item,index) in iteamList.sendRecordList"
            :key="index"
          >
            <div class="topcloumson" style="padding-bottom:0">
              <div style="margin-top:-0.1rem">
                <span>{{splitsa1(item.sendTime)}}</span>
                <br>
                <span
                  style="display: block;margin-top:0.1rem;font-size:0.3rem;color:#555555;margin-left:0.09rem"
                >{{splitsa(item.sendTime)}}</span>
              </div>
              <div
                class="topcloum"
                style="margin:0;padding:0;align-items: center;padding-top:0rem;padding-left:0.2rem"
              >
                <p style="width:0.26rem;height:0.26rem;border-radius:50%;background:#5076ff;"></p>
                <p
                  v-if="index!==iteamList.sendRecordList.length-1"
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
        <div class="superList" style="margin-bottom:0.2rem">
          <div class="topcloum">
            <div class="topcloumson">
              <p class="leftfont">处理人</p>
              <p class="leftfont1">{{iteamList.handleUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时间</p>
              <p class="leftfont1" v-if="iteamList.handleTime!==undefined">{{FormatDate(iteamList.handleTime)}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时长</p>
              <p class="leftfont1">{{iteamList.dealTimeHour}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理前</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in iteamList.handleBeforeURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理后</p>
              <p class="leftfont1">
                <img
                  v-for="(iteam,index) in iteamList.handleAfterURLs"
                  :src="Ip+iteam"
                  :key="index"
                  alt
                  srcset
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">整理数</p>
              <p class="leftfont1">{{iteamList.arrangeNum}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">清运数</p>
              <p class="leftfont1">{{iteamList.cleanNum}}</p>
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
  data() {
    return {
      slide: [],
      slide1: [],
      sheetCode: "",
      rotateS: 0,
      bigImage: "",
      popupVisible: false,
      iteamList: {},
      //c查询条件
        viewTypesa:'',
        areakids:[],
        areaarr:[],
        searchCondition:{},
        menuListTop:[],
        downIcon:-1,
    };
  },
  components: {},
  mounted() {},
  created() {
    if (this.$route.query.id) {
      this.sheetCode = this.$route.query.id;
      this.viewTypesa= this.$route.query.viewTypesa;
      this.searchCondition = this.$route.query.searchCondition;
      this.menuListTop = this.$route.query.menuListTop;
      this.downIcon = this.$route.query.downIcon;
      this.areakids = this.$route.query.areakids;
      this.areaarr = this.$route.query.areaarr;
      this.getMessage(this.sheetCode);
    }
    window.watchBackWXS=this.watchBackWXS;
  },
  mounted() {},
  methods: {
    handOpen(val) {
      this.rotateS = 0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    watchBackWXS(){
      this.iconClick();
    },
    splitsa(val){
      return val.split(" ")[0].split("-")[1]+"-"+val.split(" ")[0].split("-")[2]
    },
    splitsa1(val){
      return val.split(" ")[1].split(":")[0]+":"+val.split(" ")[1].split(":")[1]
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    iconClick() {
      this.$router.push({
        path: "/layout/needtodo",
        query: {
          name: "2",
          searchCondition:this.searchCondition,
          menuListTop:this.menuListTop,
          downIcon:this.downIcon,
          areaarr:this.areaarr,
          areakids:this.areakids,
          viewTypesa:this.viewTypesa,
        }
      });
    },
    getMessage(val) {
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("dispatch/dispatchDetail", {
        id: val
      })
        .then(res => {
          Indicator.close();
          //   var obj = {};
          // res.dispatchDetail.sendRecordList.splice(0, 1);
          this.iteamList = res.dispatchDetail;
        })
        .catch(res => {});
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



