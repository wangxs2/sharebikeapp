<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="iconClick">
      <div class="header-title">个人信息修改</div>
      <img src="" alt="">

    </div>
    <div class="content">
      <div class="user-info-box user-info-avatar box-margin-large" @click="popupVisible = true">
        <div class="info-title">头像</div>
        <div class="info-content">
          <img class="user-avatar-arrow" src="@/assets/image/infoModification/icon_next@2x.png" alt="">
          <img class="user-avatar" :src="Ip + userInfoNew.imageURL" alt="" v-if="userInfoNew.imageURL">
          <img class="user-avatar" src="@/assets/image/infoModification/默认头像@2x.png" alt="" v-else>

        </div>
      </div>
      <div class="user-info-box box-margin-large">
        <div class="info-title">姓名</div>
        <!-- <div class="info-content" v-text="userInfo.userName"></div> -->
        <input class="info-content" type="text" name="" id="" v-model="userInfoNew.userName">

      </div>
      <div class="user-info-box">
        <div class="info-title">性别</div>
        <div class="info-content">
          <div class="info-gender-box">
            <img src="@/assets/image/infoModification/icon_select_pre@2x.png" alt="" v-if="userInfoNew.sex == 'W'">
            <img src="@/assets/image/infoModification/icon_select_nor@2x.png" alt="" @click="setGenderW" v-else>
            <div class="info-gender">女</div>
          </div>
          <div class="info-gender-box">
            <img src="@/assets/image/infoModification/icon_select_pre@2x.png" alt="" v-if="userInfoNew.sex == 'M'">
            <img src="@/assets/image/infoModification/icon_select_nor@2x.png" alt="" @click="setGenderM" v-else>
            <div class="info-gender">男</div>
          </div>
        </div>
      </div>
      <div class="user-info-box box-margin-large">
        <div class="info-title">邮箱</div>
        <!-- <div class="info-content" v-text="userInfo.emailAddr"></div> -->
        <input class="info-content" type="text" name="" id="" v-model="userInfoNew.emailAddr">
      </div>
      <div class="user-info-box">
        <div class="info-title">手机号</div>
        <!-- <div class="info-content" v-text="userInfo.phoneNum"></div> -->
        <input class="info-content" type="text" name="" id="" v-model="userInfoNew.phoneNum">
      </div>
    </div>
    <div class="bottom" @click="saveChange">
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
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  computed: {
    ...mapGetters({ userInfoNew: "userInfo" })
  },
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
    },
    //设置性别
    setGenderW() {
      this.userInfoNew.sex = "W";
    },
    setGenderM() {
      this.userInfoNew.sex = "M";
    },
    //保存修改
    saveChange() {
      MessageBox({
        title: "提示",
        message: "是否确认修改?",
        showCancelButton: true
      }).then(action => {
        if (action === "confirm") {
          let updateData = {
            id: this.userInfoNew.id,
            realName: this.userInfoNew.realName,
            sex: this.userInfoNew.sex,
            emailAddr: this.userInfoNew.emailAddr,
            phoneAum: this.userInfoNew.phoneAum
          };
          this.$fetchPut("user/updateUser", updateData).then(res => {
            if (res.status === 0) {
              Toast("操作成功");
              setTimeout(() => {
      this.$router.push("/layout/me");
                
              }, 600);
              
            } else {
            }
          });
        }
      });
      return;

      // console.log(this.userInfoNew)
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
        text-align: right;
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