<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/warningDetail/nav_1_back@2x.png" alt="" @click="iconReturn()">
      <div class="header-title">找回密码</div>
      <div></div>
      <!-- <img src="" alt="" srcset=""> -->
    </div>
    <div class="content">
        <div v-if="order==1" class="formList">
            <p class="top">
              <span>用户名</span>
              <input type="text" placeholder="请输入用户名" v-model="userName">
            </p>
            <p class="top">
              <span>邮箱</span>
              <input type="email" placeholder="请输入邮箱" v-model="emailAddr">
            </p>
            <div class="bottomSa">
              <p style="80%">验证码</p>
              <input type="text" placeholder="请输入验证码" v-model="checkCode">
              <p v-if="sendFlag" class="Messagecode">{{sendTime}}s重新</p>
              <span v-else @click="getCode()" class="Messagecode">点击获取</span>
            </div>
        </div>
        <div v-if="order==2" class="formList">
            <p class="top">
              <span>新密码</span>
              <input type="password" placeholder="请输入新密码" v-model="newPwd">
            </p>
            <p class="top">
              <span>确认密码</span>
              <input type="password" placeholder="请输入再次输入新密码" v-model="newPwd1">
            </p>
            
        </div>
        <div v-if="order==3" class="formList">
          <img src="../../assets/image/login/achieve.png" width="60" height="60" style="margin-left:40%">         
        </div>
        
    </div>
    <div>
          <mt-button @click="submitForm()" :disabled="disabled" class="btn">{{order==1?"下一步":order==2?"提交":"返回登录"}}</mt-button>
        </div>
        <div class="have-login">
          已有账号，
          <span class="go-login" @click="iconReturn()">马上登录</span>
        </div>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
import {
  validatePhoneNum,
  validateEmail,
  validateName,
  validatePwd
} from "@/libs/validate.js";

const TIME_COUNT = 60;
export default {
  computed: {},
  data() {
    return {
      sendFlag: false,
      sendTime: 60, //验证码读秒
      timer: null, //定时器
      order: 1, //步骤
      userName: "",
      disabled: false,
      lawInfo: "",
      emailAddr: "",
      checkCode: "",
      newPwd: "",
      newPwd1: ""
    };
  },
  components: {},
  mounted() {},
  created() {},
  mounted() {},
  methods: {
    iconReturn() {
      this.$router.push("/login");
    },
    getCode() {
      if (this.userName == "") {
        MessageBox.alert("", {
          message: "请输入用户名",
          title: "提示"
        }).then(action => {});
      } else if (this.emailAddr == "") {
        MessageBox.alert("", {
          message: "请输入邮箱",
          title: "提示"
        }).then(action => {});
      } else {
        if (this.emailAddr !== "") {
          let emailNumCheck = validateEmail(this.emailAddr);
          if (emailNumCheck === false) {
            MessageBox("提示", "邮箱格式错误！");
            return;
          } else {
            let subData = {
              userName: this.userName,
              emailAddr: this.emailAddr
            };
            this.$fetchPost("user/getEmailCheckCode", subData).then(res => {
              if (res.status == 0) {
                if (!this.timer) {
                  this.sendTime = TIME_COUNT;
                  this.sendFlag = true;
                  this.timer = setInterval(() => {
                    if (this.sendTime > 0 && this.sendTime <= TIME_COUNT) {
                      this.sendTime--;
                    } else {
                      this.sendFlag = false;
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000);
                }
                MessageBox.alert("", {
                  message: res.message,
                  title: "提示"
                }).then(action => {});
              } else {
                MessageBox.alert("", {
                  message: res.message,
                  title: "提示"
                }).then(action => {});
              }
            });
          }
        }
      }
    },
    submitForm() {
      if (this.order == 1) {
        if (this.userName == "") {
          MessageBox.alert("", {
            message: "请输入用户名",
            title: "提示"
          }).then(action => {});
        } else if (this.emailAddr == "") {
          MessageBox.alert("", {
            message: "请输入邮箱",
            title: "提示"
          }).then(action => {});
        } else if (this.checkCode == "") {
          MessageBox.alert("", {
            message: "请输入验证码",
            title: "提示"
          }).then(action => {});
        } else {
          this.disabled = true;
          let subData = {
            userName: this.userName,
            emailAddr: this.emailAddr,
            checkCode: this.checkCode
          };
          this.$fetchGet("user/checkInLaw", subData).then(res => {
            this.disabled = false;
            if (res.status == 0) {
              this.lawInfo = res.lawInfo;
              MessageBox.alert("", {
                message: res.message,
                title: "提示"
              }).then(action => {
                this.order = 2;
              });
            } else {
              MessageBox.alert("", {
                message: res.message,
                title: "提示"
              }).then(action => {});
            }
          });
        }
      } else if (this.order == 2) {
        if (this.newPwd == "") {
          MessageBox.alert("", {
            message: "请输入新密码",
            title: "提示"
          }).then(action => {});
        } else if (this.newPwd !== this.newPwd1) {
          MessageBox.alert("", {
            message: "两次密码输入不一致",
            title: "提示"
          }).then(action => {});
        } else {
          if (this.newPwd !== "") {
            let newPwdCheck = validatePwd(this.newPwd);
            if (newPwdCheck === false) {
              MessageBox("提示", "密码至少包含8个字符，至少1个字母和1个数字！");
              return;
            } else {
              this.disabled = true;
              let subData = {
                userName: this.userName,
                emailAddr: this.emailAddr,
                checkCode: this.checkCode,
                lawInfo: this.lawInfo,
                newPwd: this.newPwd
              };
              this.$fetchPut("user/updatePwdByEmailCode", subData).then(res => {
                this.disabled = false;
                if (res.status == 0) {
                  MessageBox.alert("", {
                    message: res.message,
                    title: "提示"
                  }).then(action => {
                    this.order = 3;
                  });
                } else {
                  MessageBox.alert("", {
                    message: res.message,
                    title: "提示"
                  }).then(action => {});
                }
              });
            }
          }
        }
      } else {
        // this.disabled=false
        this.iconReturn();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .have-login {
      text-align: center;
      padding-top: 0.5rem;
      .go-login {
        color: #5076ff;
      }
    }
  .btn {
      width: 100%;
      height: 1.173333rem;
      // margin-left: 6%;
      margin-top: 1.333333rem;
      border-radius: 0.586667rem;
      background: #5076ff;
      color: #fff;
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
    // height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.626667rem;
    padding-top: 0.1rem;
    box-sizing: border-box;
    
    .formList {
      display: flex;
      flex-direction: column;
      .bottomSa {
        display: flex;
        margin: 0;
        padding: 0;
        height: 1.72rem;
        line-height: 1.72rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        color: #282828;
        justify-content: flex-end;
        input {
          text-indent: 0.4rem;
        }
        p{
          margin: 0;
          padding: 0;
          width: 80%;
        }
        .Messagecode {
          width: 100%;
          position: relative;
          color: #5076ff;
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 1px;
            height: 100%;
            background: #dddddd;
          }
        }
      }
      .top {
        display: flex;
        margin: 0;
        height: 1.72rem;
        line-height: 1.72rem;
        padding: 0;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
        color: #282828;
        span {
          width: 2rem;
          font-size: 0.4rem;
        }
      }
    }
    
  }
}
</style>

