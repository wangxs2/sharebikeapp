

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
        width="100%"
        v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
        @click="popupVisible=false"
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
      <mt-header title="派单处理详情">
        <router-link to="/layout/supervise" slot="left">
          <mt-button icon="back" style="font-size:24px"></mt-button>
        </router-link>
        <mt-button style="font-size:18px" slot="right" @click="iconClick">{{status==2?"反馈":""}}</mt-button>
      </mt-header>
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
            <div :class="listdetail.status == 2 ? 'red' : 'green'">{{listdetail.status == 0 ? '未处理' : listdetail.status == 1 ?"处理中":listdetail.status == 2 ?"已处理":listdetail.status == 3 ?"已转派":"已完成"}}</div>
          </div>
        </div>
        <div class="superList">
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
              <p class="leftfont1">{{listdetail.handleAddr}}</p>
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
                  @click="handOpen(iteam)"
                >
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
        <div class="superList">
          <div class="topcloum">
            <div class="topcloumson">
              <p class="leftfont">处理人</p>
              <p class="leftfont1">{{listdetail.handleUserName}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">处理时间</p>
              <p class="leftfont1" v-if="listdetail.handleTime!==undefined">{{FormatDate(listdetail.handleTime)}}</p>
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
                  @click="handOpen(iteam)"
                >
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
                  @click="handOpen(iteam)"
                >
              </p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">整理数</p>
              <p class="leftfont1">{{listdetail.arrangeNum}}</p>
            </div>
            <div class="topcloumson">
              <p class="leftfont">清运数</p>
              <p class="leftfont1">{{listdetail.cleanNum}}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
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
      imgArray: [],
      rotateS: 0,
      popupVisible: false,
      listdetail: {},
      showIndicators: false,
      activeComany: "", // 选中的单车企业
      title: "",
      bigImage: "",
      roleCode: "",
      slide2: [],
      slide1: [],
      sheetCode: "",
      status: "",
      iteamList: []
    };
  },
  components: {},
  mounted() {},
  created() {
    this.roleCode = localStorage.roleCode;
    if (this.$route.query.supervise) {
      this.sheetCode = this.$route.query.supervise;
      this.status = this.$route.query.statuSa;
      this.getMessage(this.sheetCode);
    }
  },
  mounted() {},
  methods: {
    handleClose() {
      console.log("close event");
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    handleChange(val) {
      // console.log(val)
    },
    splitsa(val){
      return val.split(" ")[0].split("-")[1]+"-"+val.split(" ")[0].split("-")[2]
    },
    splitsa1(val){
      return val.split(" ")[1].split(":")[0]+":"+val.split(" ")[1].split(":")[1]
    },
    handOpen(val) {
      this.rotateS = 0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    iconClick() {
      this.$router.push({
        path: "/feedBack",
        query: {
          message: this.sheetCode,
          dealMethod: this.iteamList[0].dealMethod,
          statuSa: this.iteamList[0].status
        }
      });
    },
    // 选择公司
    selectComany(e) {
      let id = e.target.getAttribute("companyId");
      if (id) {
        this.activeComany = id;
      }
      this.iteamList.forEach((iteam,index)=>{
        if(id==iteam.id){
          this.listdetail=iteam;
        }
      })

    },
    getMessage(val) {
      this.iteamList = [];
      this.slide = [];
      this.slide1 = [];
      this.slide2 = [];
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("dispatch/listDispatchDetails", {
        sheetCode: val
      })
        .then(res => {
          Indicator.close();
          this.iteamList = res;
          this.activeComany = res[0].id;
          this.listdetail = res[0];
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
  .header {
    width: 100%;
    height: 1.173333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1.173333rem;
    color: #fff;
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
                width: 2.7rem;
                height: 2.7rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>



