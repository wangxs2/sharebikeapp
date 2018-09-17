<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="toUserInfo">
      <div class="header-title">设置</div>
      <img src="" alt="">

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
        <div class="info-box" @click="toVersion">
          <div class="info-title">版本更新V1.0</div>
          <img class="info-img" src="@/assets/image/settings/icon_next page@2x.png" alt="">
        </div>
      </div>
      <div class="content-bottom">
        <div class="bottom-btn">
          <div class="submit" @click="logOut">退出登录</div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data() {
    return {};
  },
  components: {},
  mounted() {},
  created() {},
  methods: {
    //返回个人中心
    toUserInfo() {
      this.$router.push("/layout/me");
    },
    //去修改密码
    toPassword() {
      this.$router.push("/password");
    },
    //去意见反馈
    toProblemFeedback() {
      this.$router.push("/problemFeedback");
    },
    //去版本更新
    toVersion() {
      this.$router.push("/layout/me");
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
}
</style>