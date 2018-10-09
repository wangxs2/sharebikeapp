

<template>
  <div class="container">
      <mt-popup
      class="imgMask"
        v-model="popupVisible"
        position="right">
        <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible=false"></span>
        <img :src="Ip+bigImage" alt="" srcset="" width="100%" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" @click="popupVisible=false">
         <img src="../../assets/image/login/rotate.svg" alt="" srcset="" width="50" height="50" style="position:fixed;right:50%;bottom:15px;" @click="rotate()">
      </mt-popup>
      <div class="header">
       
        <mt-header title="派单处理详情">
           <router-link to="/layout/supervise" slot="left">
                <mt-button icon="back" style="font-size:24px"></mt-button>
            </router-link>
            <mt-button style="font-size:18px" slot="right" @click="iconClick">
                {{status==2?"反馈":""}}
            </mt-button>

        </mt-header>
      </div>
      <div class="content">
        <mt-swipe :auto="0" :continuous="false">
            <mt-swipe-item v-for="(iteam,index) in iteamList" :key="index">
                <div class="iteamList">
                      <div>
                        <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>单号：</span>
                        <span>{{iteam.sheetCode}}</span>
                        
                      </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/supervise/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>时间：</span>
                        <span>{{FormatDate(iteam.dispatchTime)}}</span>
                        
                    </div>
                    <div :class="iteam.status == 2 ? 'red' : 'green'">{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"已转派":"已完成"}}</div>

                </div>
                <div class="iteamList">
                  <div class="moreText">
                        <span><img style="margin-top:-0.1rem" src="../../assets/image/supervise/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span style="width:17%;margin-left:0.1rem">地点：</span>
                        <span class="textFont">{{iteam.handleAddr}}</span>                
                    </div>
                    <!-- <div>
                        <span><img src="../../assets/image/supervise/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>地点：</span>
                        <span>{{iteam.handleAddr}}</span>
                        
                    </div> -->

                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_8_processor@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>派单人：</span>
                        <span>{{iteam.dispatchUserName}}</span>
                        
                    </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>处理方式：</span>
                        <span>{{iteam.dealMethod==1?"整理":iteam.dealMethod==2?"清运":"整理且清运"}}</span>
                        
                    </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/supervise/icon_4_company@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>企业：</span>
                        <span>{{iteam.orgName}}</span>
                        
                    </div>

                </div>
                <div class="imageClean" style="padding:0.3rem 0.213333rem">
                    <div>
                        <span><img src="../../assets/image/supervise/icon_3_picture@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>派单照片</span>                                
                    </div>
                    <div class="imageList">
                        <img v-for="(iteam,index) in iteam.dispachPhotoURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
                    </div>
                    <!-- <div>
                        <vue-preview :slides="slide2" @close="handleClose"></vue-preview>
                    </div> -->
                </div>
                <div class="iteamList">
                    <div class="moreText">
                        <span><img style="margin-top:-0.1rem" src="../../assets/image/selfcheck/icon_7_note@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span style="width:17%;margin-left:0.1rem">备注：</span>
                        <span class="textFont">{{iteam.dispatchRemark}}</span>                
                    </div>
                </div>
                <div class="imageClean" style="padding:0.3rem 0.213333rem">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>处理前</span>                                
                    </div>
                     <div class="imageList">
                        <img v-for="(iteam,index) in iteam.handleBeforeURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
                    </div>
                </div>
                <div class="imageClean" style="padding:0.3rem 0.213333rem">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>处理后</span>                                
                    </div>
                     <div class="imageList">
                        <img v-for="(iteam,index) in iteam.handleAfterURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
                    </div>
                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>整理数：</span>
                        <span>{{iteam.arrangeNum}}</span>                
                    </div>
                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_6_num2@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>清运数：</span>
                        <span>{{iteam.cleanNum}}</span>
                        
                    </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/selfcheck/icon_8_processor@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>处理人：</span>
                        <span>{{iteam.handleUserName}}</span>                
                    </div>
                </div>
                <div class="iteamList">
                    <div>
                        <span><img src="../../assets/image/supervise/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
                        <span>处理时间：</span>
                        <span v-if="iteam.handleTime!==undefined">{{FormatDate(iteam.handleTime)}}</span>
                        <!-- <span v-if="iteam.handleTime==null||iteam.handleTime==undefined"></span>                            -->
                    </div>

                </div>
            </mt-swipe-item>
        </mt-swipe>
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
      imgArray: [],
      rotateS:0,
      popupVisible: false,
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
    handOpen(val) {
    this.rotateS=0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", "");
      this.bigImage = val;
    },
    iconClick() {
      this.$router.push({
        path: "/feedBack",
        query: {
            message:this.sheetCode,
            dealMethod:this.iteamList[0].dealMethod,
            statuSa:this.iteamList[0].status
        }
      });
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
          console.log(res[0].handleTime)
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
  .content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    .iteamImage {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.213333rem;
      flex-direction: column;
    }
    .iteamList {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.213333rem;
      justify-content: space-between;
      .moreText {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        .textFont {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
    .imageClean {
      .imageList {
        display: flex;
        flex-wrap: wrap;
        margin-top: 0.2rem;
        img {
          margin-right: 5px;
          box-shadow: 0 0 010px #ccc;
        }
      }
    }
  }
}
</style>



