<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png"
           alt
           @click="toUserInfo">
      <div class="header-title">单车相关数据统计报表</div>
      <div></div>
    </div>
    <div class="content">
      <div class="content-top">
        <div class="info-box"
             style="margin-top:0"
             @click="toPassword">
          <div class="info-title">共享单车保有量日统计表</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <!-- <div class="info-box"
             @click="toProblemFeedback
        ">
          <div class="info-title">意见反馈</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <div class="info-box"
             @click="popupVisible = true">
          <div class="info-title">版本更新{{version}}</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <div class="info-box"
             v-if="userInfo.userName!=='caicc'"
             @click="todownload">
          <div class="info-title">下载方式</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div> -->
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data () {
    return {
      popupVisible: false,
      version: "",
      versionTime: "",
      versionDetail: []
    };
  },
  components: {},
  mounted () { },
  created () {
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    //返回个人中心
    toUserInfo () {
      this.$router.push("/layout/me");
    },
    watchBackWXS () {
      this.toUserInfo();
    },

    //去保有量统计表
    toPassword () {
      this.$router.push("/installationCount");
    },

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
    height: 14rem;
    width: 100%;
    background: transparent;
    color: #282828;
    .version-popup {
      margin: 0 auto;
      background: #fff;
      height: 14rem;
      width: 7.72rem;
      border-radius: 0.16rem;
      display: flex;
      flex-direction: column;
      position: relative;
      padding: 0.4rem;
      .close-popup {
        position: absolute;
        right: 0.32rem;
        top: 0.32rem;
        height: 0.48rem;
        width: 0.48rem;
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