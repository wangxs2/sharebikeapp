<template>
  <div class="container">
    <van-overlay :z-index="100" :show="showstart">
      <div class="wrapperfast">
        <van-loading type="spinner" size="48px" vertical color="#1989fa">上传中...</van-loading>
      </div>
    </van-overlay>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toUserInfo" />
      <div class="header-title">个人信息修改</div>
      <div></div>
      <!-- <img src="" alt=""> -->
    </div>
    <div class="content">
      <!-- <div class="user-info-box user-info-avatar box-margin-large" @click="popupVisible = true"> -->
      <div class="user-info-box user-info-avatar box-margin-large" @click="clickImage()">
        <div class="info-title">头像</div>
        <div class="info-content"  >
          <!-- <van-uploader
            v-model="fileList"
            :before-read="beforeRead"
            :preview-image="false"
            :accept="'image/png,image/jpeg'"
            :after-read="afterRead"
          >
            <img
              class="user-avatar-arrow"
              
              src="@/assets/image/infoModification/icon_next@2x.png"
              alt
            />
          </van-uploader> -->
           <img
              class="user-avatar-arrow"
              
              src="@/assets/image/infoModification/icon_next@2x.png"
              alt
            />

          <img class="user-avatar" :src="Ip + userInfoNew.imageURL" alt v-if="userInfoNew.imageURL" />
          <img class="user-avatar" src="@/assets/image/infoModification/默认头像@2x.png" alt v-else />
        </div>
      </div>
      <div class="user-info-box box-margin-large">
        <div class="info-title">姓名</div>
        <input class="info-content" type="text" name id v-model="userInfoNew.realName" />
      </div>
      <div class="user-info-box">
        <div class="info-title">性别</div>
        <div class="info-content">
          <div class="info-gender-box" @click="setGenderW">
            <img
              src="@/assets/image/infoModification/icon_select_pre@2x.png"
              alt
              v-if="userInfoNew.sex == 'W'"
            />
            <img src="@/assets/image/infoModification/icon_select_nor@2x.png" alt v-else />
            <div class="info-gender">女</div>
          </div>
          <div class="info-gender-box" @click="setGenderM">
            <img
              src="@/assets/image/infoModification/icon_select_pre@2x.png"
              alt
              v-if="userInfoNew.sex == 'M'"
            />
            <img src="@/assets/image/infoModification/icon_select_nor@2x.png" alt v-else />
            <div class="info-gender">男</div>
          </div>
        </div>
      </div>
      <div class="user-info-box box-margin-large">
        <div class="info-title">邮箱</div>
        <input class="info-content" type="text" name id v-model="userInfoNew.emailAddr" />
      </div>
      <div class="user-info-box">
        <div class="info-title">手机号</div>
        <input
          class="info-content"
          type="text"
          name
          id
          v-model="userInfoNew.phoneNum"
          @blur="checkPhoneNum"
        />
      </div>
    </div>
    <div class="bottom" @click="saveChange">
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import { userInfo } from "os";
import {
  validatePhoneNum,
  validateEmail,
  validateName
} from "@/libs/validate.js";

export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      popupVisible: false,
      showstart: false,
      fileList: [],
      userInfoNew: {},
      updetailImage: ""
    };
  },
  components: {},
  mounted() {},
  created() {
    window.getImage = this.getImage;
    this.userInfoNew = this.cloneObj(this.userInfo);
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
     clickImage() {
      this.downPictur("headImg");
    },
     //设置头像
    getImage(val, row) {
      this.userInfoNew.imageURL = row;
      this.updetailImage = val;
    },
 
    afterRead(file) {
      this.showstart = true;
      if (file && !Array.isArray(file)) {
        file = [file];
      }
      file.forEach(iteam => {
        lrz(iteam.file, {
          quality: 0.2 //自定义使用压缩方式
        }).then(rst => {
          let formdata = new FormData();
          formdata.append("files", rst.file);
          formdata.append("imgType", "bikeImg");
          this.$fetchPost("uploadFiles", formdata, "json").then(res => {
            if (res.data) {
              this.userInfoNew.imageURL = res.data[0].filePath;
              this.updetailImage = res.data[0].fileName;
              this.showstart = false;
              //  file.file.status = 'done';
            }
          });
        });
      });
    },
    beforeRead(file) {
      // this.showstart = true;
     
      if (file.length > 4) {
        MessageBox.alert("", {
          message: "最多上传4张照片",
          title: "提示"
        }).then(action => {});
      }
      return true;
    },
    //返回个人信息修改
    toUserInfo() {
      this.$router.push("/layout/me");
    },
    watchBackWXS() {
      this.toUserInfo();
    },
    checkPhoneNum() {},
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
          //姓名为空或超过32位
          if (
            this.userInfoNew.realName.length > 32 ||
            this.userInfoNew.realName.length <= 0 ||
            validateName(this.userInfoNew.realName) === false
          ) {
            MessageBox("提示", "姓名输入错误！");
            return;
          }
          //手机号不为空
          if (this.userInfoNew.phoneNum !== "") {
            let phoneNumCheck = validatePhoneNum(this.userInfoNew.phoneNum);
            if (phoneNumCheck === false) {
              MessageBox("提示", "手机号格式错误！");
              return;
            }
          }
          //邮箱不为空
          if (this.userInfoNew.emailAddr.length !== 0) {
            let emailCheck = validateEmail(this.userInfoNew.emailAddr);
            if (emailCheck === false) {
              MessageBox("提示", "邮箱格式错误！");
              return;
            }
          }
          //输入信息检测无误后发送请求
          let updateData = {
            id: this.userInfoNew.id,
            realName: this.userInfoNew.realName,
            sex: this.userInfoNew.sex,
            emailAddr: this.userInfoNew.emailAddr,
            phoneNum: this.userInfoNew.phoneNum,
            image: this.updetailImage
              ? this.updetailImage
              : this.userInfoNew.image
          };
          this.$fetchPut("user/updateAppUser", updateData, "json").then(res => {
            if (res.status === 0) {
              Toast("操作成功");
              this.$store.dispatch("GetUserInfo");
              setTimeout(() => {
                this.$router.push("/layout/me");
              }, 600);
            } else {
              Toast(res.message);
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
  .wrapperfast {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
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