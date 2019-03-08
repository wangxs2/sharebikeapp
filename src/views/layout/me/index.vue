<template>
  <div class="container">
    <div class="header">
      <div class="header-header">
        <div class="header-setting"></div>
        <div class="header-tittle">个人中心</div>
        <div class="header-setting">
          <i style="font-size:0.58rem;margin-right:0.2rem"
             class="iconfont icon-wenhao"
             @click="toRules"></i>
          <img src="@/assets/image/me/icon_nav_set@2x.png"
               alt
               @click="toSettings">
        </div>
      </div>
      <div class="header-content">
        <div class="header-contentsa">
          <div class="headertop"
               style="flex:1"
               @click="toUserModi">
            <div class="info-box">
              <img v-if="userInfo.imageURL!==''"
                   class="user-avatar"
                   :src="Ip + userInfo.imageURL"
                   alt>
              <img v-if="userInfo.imageURL==''"
                   class="user-avatar"
                   src="@/assets/image/me/默认头像@2x.png"
                   alt>
              <div class="user-namebox">
                <div class="user-nameboxsa">
                  <h3 style="font-size: 0.426667rem;color:#333333;margin:0;padding:0;margin-right:0.15rem"
                      v-text="userInfo.realName"></h3>
                  <img style="width:0.5rem;height:0.5rem"
                       src="@/assets/image/me/icon_woman@2x.png"
                       alt
                       v-if="userInfo.sex == 'W'">
                  <img style="width:0.5rem;height:0.5rem"
                       src="@/assets/image/me/icon_man@2x.png"
                       alt
                       v-else>
                </div>
                <div class="user-nameboxsa"
                     style="margin-top:0.2rem">
                  <span style="color:#AAAAAA;margin-right:0.1rem"
                        class="iconfont icon-icon-mail"></span>
                  <div style="color:#999999"
                       v-text="userInfo.emailAddr"></div>
                </div>
              </div>
            </div>
            <img style="width: 0.373333rem;height: 0.373333rem;"
                 src="@/assets/image/settings/icon_next page@2x.png"
                 alt>
          </div>
          <div class="headerbottom">
            <div class="headerbottom-top">
              <div style="display:flex;justify-content: flex-start;align-items: center">
                <img style="width:0.48rem;height:0.48rem"
                     src="@/assets/image/me/company@3x.png"
                     alt
                     srcset>
                <span style="width:5rem;color:#333333;margin-left:0.1rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align:left">{{userInfo.orgName}}</span>
              </div>
              <p style="border:1px solid #5279FF;color:#5279FF;margin:0;padding:0.06rem 0.2rem;border-radius: 0.6rem;">{{userInfo.roleName}}</p>
            </div>
            <div class="headerbottom-bottom"
                 style="margin-top:0.2rem">
              <img style="width:0.48rem;height:0.48rem"
                   src="@/assets/image/me/address.png"
                   alt
                   srcset>
              <span style="color:#999999;margin-left:0.1rem">负责区域</span>
              <span style="color:#333333;flex:1;margin-left:0.1rem;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;text-align:left">{{userInfo.areas}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content"
         style="padding:0.1rem">
      <!-- <div class="colorsa"></div> v-if="willdoInfo.evaluation!=='close'"  -->
      <div class="evaluation"
           style="display:none">
        <div class="evaluationimg"
             @click="toEvaluation">
          <span v-if="willdoInfo.evaluation=='true'"
                style="font-size:0.8rem;font-family:stylefont;color:#FF9600;letter-spacing:-0.1rem">{{nowData}}月考评已生成</span>
          <span v-if="willdoInfo.evaluation=='false'"
                style="font-size:0.8rem;font-family:stylefont;color:#FF9600;letter-spacing:-0.1rem">{{nowData}}月考评已完成</span>
          <!-- <transition enter-active-class="animated tada"> -->
          <img v-if="ruleStatus=='true'"
               class="animated-tada"
               src="@/assets/image/me/go@3x.png"
               style="width:1.3rem;height:0.65rem;margin-left:0.2rem"
               alt
               srcset>
          <img v-if="ruleStatus=='false'"
               src="@/assets/image/me/go@3x.png"
               style="width:1.3rem;height:0.65rem;margin-left:0.2rem"
               alt
               srcset>
          <!-- </transition> -->
        </div>
      </div>
      <!-- style="display:none" -->
      <!-- <div class="static-box-count"
           @click="getinstallationCount">
        <div style="display: flex;justify-content:flex-start;align-items: center;padding:0.2rem">
          <img style="width:22px;height:22px"
               src="@/assets/image/me/icon_baobiao@3x.png"
               alt
               srcset>
          <h6 style="font-size:0.33rem;margin:0;margin-left:0.2rem">统计报表</h6>
        </div>
        <img style="width: 0.373333rem;height: 0.373333rem;"
             src="@/assets/image/settings/icon_next page@2x.png"
             alt>

      </div> -->
      <div class="static-box">
        <div style="display: flex;justify-content:flex-start;align-items: center;border-bottom:1px solid #E1E1E1;padding:0.2rem">
          <img style="width:22px;height:22px"
               src="@/assets/image/me/icon_1 @3x.png"
               alt
               srcset>
          <h6 style="font-size:0.33rem;margin:0;margin-left:0.2rem">工单总数</h6>
        </div>
        <div style="display: flex;justify-content:space-between;box-sizing: border-box;padding:0.2rem 0.3rem;flex:1">
          <div style="display: flex;flex-direction: column;padding:0.1rem;">
            <span style="text-align:center;margin-bottom:0.2rem;color:#A857FB;font-size:0.5rem">{{userCount.dispatch==0?'-':userCount.dispatch}}</span>
            <span style="text-align:center;color:#666666;font-size:0.3rem">收到派单数(单)</span>
          </div>
          <div style="display: flex;flex-direction: column;padding:0.1rem">
            <span style="text-align:center;margin-bottom:0.2rem;color:#A857FB;font-size:0.5rem">{{userCount.selfCheck==0?'-':userCount.selfCheck}}</span>
            <span style="text-align:center;color:#666666;font-size:0.3rem">自检单数(单)</span>
          </div>
        </div>
        <!-- <div class="static-box-left">
          <div class="static-img">
            <img src="@/assets/image/me/icon_2@3x.png" alt>
          </div>
          <div class="static-title">收到派单</div>
        </div>
        <div class="static-data" v-text="userCount.dispatch"></div>-->
      </div>
      <div class="static-box"
           style="margin-top:0.3rem">
        <div style="display: flex;justify-content:flex-start;align-items: center;border-bottom:1px solid #E1E1E1;padding:0.2rem">
          <img style="width:22px;height:22px"
               src="@/assets/image/me/icon_2 @3x.png"
               alt
               srcset>
          <h6 style="font-size:0.33rem;margin:0;margin-left:0.2rem">处理总数</h6>
        </div>
        <div style="display: flex;justify-content:space-between;box-sizing: border-box;padding:0.2rem 0.3rem;flex:1">
          <div style="display: flex;flex-direction: column;box-sizing: border-box;padding:0.1rem">
            <span style="text-align:center;margin-bottom:0.2rem;color:#FF8039;font-size:0.5rem">{{userCount.arrangeNum==0?'-':userCount.arrangeNum}}</span>
            <span style="text-align:center;color:#666666;font-size:0.3rem">整理车辆数(辆)</span>
          </div>
          <div style="display: flex;flex-direction: column;box-sizing: border-box;padding:0.1rem">
            <span style="text-align:center;margin-bottom:0.2rem;color:#FF8039;font-size:0.5rem">{{userCount.cleanNum==0?'-':userCount.cleanNum}}</span>
            <span style="text-align:center;color:#666666;font-size:0.3rem">清运车辆数(辆)</span>
          </div>
        </div>
        <!-- <div class="static-box-left">
          <div class="static-img">
            <img src="@/assets/image/me/icon_1@2x.png" alt>
          </div>
          <div class="static-title">自检次数</div>
        </div>
        <div class="static-data" v-text="userCount.selfCheck"></div>-->
      </div>
      <!-- <div class="static-box">
        <div class="static-box-left">
          <div class="static-img">
            <img src="@/assets/image/me/icon_1@3x.png" alt>
          </div>
          <div class="static-title">整理车辆</div>
        </div>
        <div class="static-data" v-text="userCount.arrangeNum"></div>
      </div>
      <div class="static-box" style="border-radius:0.2rem">
        <div class="static-box-left">
          <div class="static-img">
            <img src="@/assets/image/me/icon_3@3x.png" alt>
          </div>
          <div class="static-title">清运车辆</div>
        </div>
        <div class="static-data" v-text="userCount.cleanNum"></div>
      </div>-->
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import "@/assets/stylefont/iconfont.css";
export default {
  computed: {
    ...mapGetters(["willdoInfo"])
  },
  data () {
    return {
      userCount: {},
      ruleStatus: '',
      nowData: "",
      userInfo: {}
    };
  },
  components: {},
  mounted () { },
  created () {
    this.getUser();
    let myDate = new Date();
    this.nowData = myDate.getMonth() == 0 ? 12 : myDate.getMonth(); //获取当前月份(0-11,0代表1月)
    this.getData();
    this.getRules();
    this.getArea();
  },
  methods: {

    getArea () {
      this.$fetchGet("report/getReportArea").then(res => {
        // this.userCount = res;
      });
    },
    //获取数据
    getData () {
      this.$fetchGet("count/countByUser").then(res => {
        this.userCount = res;
      });
    },
    getUser () {
      this.$fetchGet("user/user").then(res => {
        this.userInfo = res;
      });
    },
    getRules () {
      //获取是否有考评
      this.$fetchGet("count/willdo").then(res => {
        this.ruleStatus = res.evaluation;
      });
    },
    //进入个人信息修改
    toUserModi () {
      this.$router.push("/infoModification");
    },
    //进入使用说明
    toRules () {
      this.$router.push("/Instructions");
    },
    //进入设置
    toSettings () {
      this.$router.push("/settings");
    },
    //进入保有量日统计表
    getinstallationCount () {
      this.$router.push("/statisticalforms");
    },
    //进入考评
    toEvaluation () {
      this.$router.push("/evaluation");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .animated-tada {
    animation: change 1s ease-in infinite;
    font-size: 0.48rem;
    color: #ffffff;
    font-weight: bold;
  }
  @keyframes change {
    0% {
      // text-shadow: 0 0 4px #fff;
      transform: scale(1);
    }
    50% {
      // text-shadow: 0 0 40px #fff;
      transform: scale(1.1);
    }
    100% {
      // text-shadow: 0 0 4px #fff;
      transform: scale(1);
    }
  }
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f2f2f2;
  .header {
    width: 100%;
    height: 5.173333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    padding: 0 0.346667rem;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .header-header {
      height: 1.173333rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      .header-tittle {
        line-height: 1.173333rem;
        font-size: 0.48rem;
        width: 3rem;
        text-align: right;
      }
      .header-setting {
        img {
          height: 0.48rem;
          width: 0.48rem;
        }
      }
    }
    .header-content {
      position: absolute;
      top: 1.4rem;
      left: 0;

      width: 100%;
      height: 100%;
      display: flex;
      // flex-direction: column;
      // align-items: center;
      justify-content: center;
      .header-contentsa {
        background: #ffffff;
        width: 94%;
        border-radius: 6px;
        box-shadow: 0 0.05rem 0.1rem #f2f2f2;
        box-shadow: 0 2px 6px -1px #f2f2f2; //底部阴影
        display: flex;
        flex-direction: column;
      }
      .headertop {
        margin: 0 0.4rem;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        .info-box {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .user-avatar {
            height: 1.706667rem;
            width: 1.706667rem;
            // border: 0.106667rem solid rgb(169, 191, 252);
            border-radius: 50%;
          }
          .user-namebox {
            display: flex;
            flex-direction: column;
            margin-left: 0.3rem;
            .user-nameboxsa {
              display: flex;
              justify-content: flex-start;
              align-items: center;
            }
          }
        }
      }
      .headerbottom {
        margin: 0 0.4rem;
        padding: 0.6rem 0 0.4rem 0;
        display: flex;
        align-items: center;
        flex-direction: column;
        .headerbottom-top {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .headerbottom-bottom {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }
    }
  }
  .content {
    margin-top: 1.4rem;
    flex: 1;
    .colorsa {
      height: 0.16rem;
      width: 94%;
      margin-left: 3%;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      // background: -webkit-linear-gradient(top, #f5f5f5, #ffffff);
    }
    .evaluation {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .evaluationimg {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 95.8%;
        height: 2.4rem;
        padding-left: 0.3rem;
        background-image: url("../../../assets/image/me/bg@3x.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
    .static-box {
      display: flex;
      border-radius: 6px;
      flex-direction: column;
      box-shadow: 0 0.05rem 0.1rem #f2f2f2;
      box-shadow: 0 2px 6px -1px #f2f2f2; //底部阴影
      margin: 0 0.2rem;
      margin-bottom: 1px;
      // height: 1.4rem;
      background: #ffffff;
      margin-top: 0.1rem;
    }
    .static-box-count {
      display: flex;
      border-radius: 6px;
      justify-content: space-between;
      box-shadow: 0 0.05rem 0.1rem #f2f2f2;
      box-shadow: 0 2px 6px -1px #f2f2f2; //底部阴影
      margin: 0 0.2rem;
      margin-bottom: 0.2rem;
      margin-top: 0.05rem;
      background: #ffffff;
      align-items: center;
      box-sizing: border-box;
      padding: 0.1rem 0;
      padding-right: 0.2rem;
    }
  }
}
</style>



