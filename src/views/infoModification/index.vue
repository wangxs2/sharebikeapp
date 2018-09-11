<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="iconClick">
      <div class="header-tittle">个人信息修改</div>
      <img src="" alt="">

    </div>
    <div class="content">
      <div class="user-info-box user-info-avatar box-margin-large" @click="popupVisible = true">
        <div class="info-title">头像</div>
        <div class="info-content">
          <img class="user-avatar-arrow" src="@/assets/image/infoModification/icon_next@2x.png" alt="">
          <img class="user-avatar" src="" alt="">

        </div>
      </div>
      <div class="user-info-box box-margin-large">
        <div class="info-title">姓名</div>
        <div class="info-content">李木木</div>
      </div>
      <div class="user-info-box">
        <div class="info-title">性别</div>
        <div class="info-content">
          <div class="info-gender-box">
            <img src="@/assets/image/infoModification/icon_select_pre@2x.png" alt="">
            <div class="info-gender">女</div>
          </div>
          <div class="info-gender-box">
            <img src="@/assets/image/infoModification/icon_select_nor@2x.png" alt="">
            <div class="info-gender">男</div>
          </div>
        </div>
      </div>
      <div class="user-info-box box-margin-large">
        <div class="info-title">邮箱</div>
        <div class="info-content">13025463879@163.com</div>
      </div>
      <div class="user-info-box">
        <div class="info-title">手机号</div>
        <div class="info-content">13025492586</div>
      </div>
    </div>
    <div class="bottom">
      <div class="save">保存</div>
    </div>
    <!-- 选择头像方式 ↓-->
    <mt-popup class="avatar-popup" v-model="popupVisible" position="bottom">
      <div class="avatar-popup-box">
        <div class="select-avatar">
          <div class="img-holder"></div>
          <div class="select-title">拍照</div>
        </div>
        <div class="select-avatar">
          <div class="img-holder"></div>
          <div class="select-title">相册</div>
        </div>
      </div>
    </mt-popup>

    <!-- 选择头像方式 -->
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      popupVisible: false
    };
  },
  components: {},
  mounted() {},
  created() {},
  methods: {
    //返回个人信息修改
    iconClick() {
      this.$router.push("/layout/me");
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
    .user-info-box {
      height: 1.306667rem;
      background-color: #fff;
      margin-top: 1px;
      box-shadow: 0px 1px 0px 0px rgba(221, 221, 221, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info-title {
        margin-left: 0.32rem;
      }
      .info-content {
        margin-right: 0.346667rem;
        width: 7rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        .user-avatar {
          height: 1.306667rem;
          width: 1.306667rem;
          border-radius: 50%;
        }
        .user-avatar-arrow {
          margin-left: 0.16rem;
          height: 0.373333rem;
          width: 0.373333rem;
        }
        .info-gender-box {
          display: flex;
          flex-direction: row;
          margin-left: 0.346667rem;
          img {
            height: 0.48rem;
            width: 0.48rem;
            margin-right: 0.266667rem;
          }
        }
      }
    }
    .user-info-avatar {
      height: 1.706667rem;
    }
    .box-margin-large {
      margin-top: 0.266667rem;
    }
  }
  .bottom {
    height: 1.306667rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .save {
      color: #fff;
      font-size: 0.426667rem;
    }
  }
  .avatar-popup {
    width: 100%;
    height: 5rem;
    .avatar-popup-box {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      .select-avatar {
        height: 3rem;
        width: 3rem;
        border: 1px solid salmon;
        display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
        .img-holder {
          height: 2.4rem;
          width: 2.4rem;
          border: 1px solid steelblue;
        }
      }
    }
  }
}
</style>