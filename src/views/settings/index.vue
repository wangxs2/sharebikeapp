<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="toUserInfo">
      <div class="header-title">设置</div>
      <div></div>

    </div>
    <div class="content">
      <div class="content-top">
        <div class="info-box" @click="toPassword">
          <div class="info-title">修改密码</div>
          <img class="info-img" src="@/assets/image/settings/icon_next page@2x.png" alt="">
        </div>
        <div class="info-box" @click="toProblemFeedback
        ">
          <div class="info-title">意见反馈</div>
          <img class="info-img" src="@/assets/image/settings/icon_next page@2x.png" alt="">
        </div>
        <div class="info-box" @click="popupVisible = true">
          <div class="info-title">版本更新{{version}}</div>
          <img class="info-img" src="@/assets/image/settings/icon_next page@2x.png" alt="">
        </div>
        <div class="info-box" @click="todownload">
          <div class="info-title">下载方式</div>
          <img class="info-img" src="@/assets/image/settings/icon_next page@2x.png" alt="">
        </div>
      </div>
      <div class="content-bottom">
        <div class="bottom-btn">
          <div class="submit" @click="logOut">退出登录</div>
        </div>
      </div>
      <!-- 版本信息弹框↓ -->
      <mt-popup class="version-popup-box" v-model="popupVisible" position="right">
        <div class="version-popup">
        <img class="close-popup" src="@/assets/image/settings/icon_close@2x.png" alt="" @click="popupVisible = false">
          <div class="version-popup-top">
            <img class="logo" src="@/assets/image/settings/ios-template-120.png" alt="">
            <div class="cur-version">版本{{version}} {{versionTime}}</div>
            <div class="new-version">当前版本已是最新版本</div>
          </div>
          <div class="version-popup-bottom">
            <ul class="version-detail" v-for="(item,index) in versionDetail" :key="item.index">
              <li class="version-detail-li">
                <span style="text-indent: -0.6rem;margin-left: 0.6rem;">{{item}}</span>
              </li>
            </ul>
          </div>
        </div>
      </mt-popup>
      <!-- 版本信息弹框↑ -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      popupVisible: false,
      version:"",
      versionTime:"",
      versionDetail: []
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getVersion()
  },
  methods: {
    //返回个人中心
    toUserInfo() {
      this.$router.push("/layout/me");
    },
    //获取版本号
    getVersion(){
      this.$fetchGet("sysInfo/getAPPversion").then(data=>{
        if(data.status==0){
          this.version=data.version;
          this.versionTime=data.list[0].split("：")[1]
          this.versionDetail=data.list.splice(1)
        }
      })
      // .catch(res => {
      //     MessageBox.alert("", {
      //       message: "请求超时",
      //       title: "提示"
      //     }).then(action => {});
      //   });
    },
    //去修改密码
    toPassword() {
      this.$router.push("/password");
    },
    //去意见反馈
    toProblemFeedback() {
      this.$router.push("/problemFeedback");
    },
    todownload(){
      this.$router.push("/downloadmode");
    },
    //退出登录
    logOut() {
      MessageBox({
        title: "提示",
        message: "是否确认退出？",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          this.$fetchGet("login/logout").then(res => {
            if (res == "login") {
              this.$router.push("/login");
            }
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
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
    img {
      height: 0.48rem;
      width: 0.266667rem;
    }
  }
  .content {
    height: 100%;
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    color: #282828;
    font-size: 0.426667rem;
    justify-content: space-between;
    .info-box {
      height: 1.306667rem;
      background-color: #fff;
      margin-top: 0.266667rem;
      box-shadow: 0px 1px 0px 0px rgba(221, 221, 221, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-title {
        margin-left: 0.32rem;
      }
      .info-img {
        margin-right: 0.24rem;
        width: 0.373333rem;
        height: 0.373333rem;
        overflow: hidden;
      }
    }
  }
  .bottom-btn {
    width: 100%;
    height: 1.173333rem;
    padding: 0 0.64rem;
    box-sizing: border-box;
    background-color: #f2f2f2;
    margin-bottom: 2.08rem;
    .submit {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        -90deg,
        rgba(80, 118, 255, 1),
        rgba(102, 152, 255, 1)
      );
      border-radius: 0.586667rem;
      color: #fff;
      font-size: 0.426667rem;
    }
  }
  .version-popup-box {
    height: 11.466667rem;
    width: 100%;
    background: transparent;
    color: #282828;
    .version-popup {
      margin: 0 auto;
      background: #fff;
      height: 11.466667rem;
      width: 8.72rem;
      border-radius: 0.16rem;
      display: flex;
      flex-direction: column;
      position: relative;
      .close-popup {
        position: absolute;
        right: .32rem;
        top: .32rem;
        height: .48rem;
        width: .48rem;
      }
      .version-popup-top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 4.64rem;
        flex-shrink: 0;
        border-bottom: 0.026667rem dashed #dddddd;
        padding-top: 0.7rem;
        box-sizing: border-box;
        .logo {
          height: 1.706667rem;
          width: 1.706667rem;
          margin-bottom: 0.2rem;
        }
        .cur-version {
          font-size: 0.4rem;
          font-weight: bold;
          line-height: 2;
        }
        .new-version {
          font-size: 0.373333rem;
          font-weight: 400;
          color: rgba(101, 101, 101, 1);
          line-height: 2;
        }
      }
      .version-popup-bottom {
        padding: 0.2rem 0.4rem;
        flex: 1;
        font-size: 0.4rem;
        overflow: scroll;
        .version-detail {
          padding: 0;
          margin: 0;
          line-height: 2;
          list-style: none;
          .version-detail-li {
            display: flex;
            align-items: center;
            .dot {
              display: inline-block;
              width: 8px;
              height: 8px;
              background: rgba(255, 174, 31, 1);
              border-radius: 50%;
              margin-right: 0.4rem;
            }
          }
        }
      }
    }
  }
}
</style>