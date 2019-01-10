<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="toSettings">
      <div class="header-title">修改密码</div>
      <img src="" alt="">

    </div>
    <div class="content">
      <div class="info-box">
        <div class="info-title">原密码</div>
        <input class="input-pwd" type="password" v-model="pwd.curPwd" placeholder="请输入您现在的密码" @blur="checkCurPwd">
      </div>
      <div class="info-box">
        <div class="info-title">新密码</div>
        <input class="input-pwd" type="password" v-model="pwd.newPwd" placeholder="请输入新密码" @blur="checkNewPwd">

      </div>
      <div class="info-box">
        <div class="info-title">确认密码</div>
        <input class="input-pwd" type="password" v-model="pwd.confirmPwd" placeholder="请再次输入新密码" @blur="checkconfirmPwd">

      </div>
      <div class="bottom-btn">
        <div class="submit" @click="submit">修改密码</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox, Toast } from "mint-ui";
import base64 from "@/libs/base.js";
import { LvalidatePwd } from "@/libs/validate.js";
export default {
  computed: {},
  data() {
    return {
      pwd: {
        curPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      curPwdCheck: false,
      newPwdCheck: false,
      confirmPwdCheck: false,
      bcode: new base64()
    };
  },
  components: {},
  mounted() {},
  created() {
    window.watchBackWXS=this.watchBackWXS;  
  },
  methods: {
    //返回个人中心
    toSettings() {
      this.$router.push("/settings");
    },
    watchBackWXS(){
        this.toSettings();
    },
    //判断原密码
    checkCurPwd() {
      if (!this.pwd.curPwd) {
        return;
      }
      this.$fetchGet(
        "user/checkPwd/" + this.bcode.encode(this.pwd.curPwd)
      ).then(res => {
        this.curPwdCheck = res;
      });
    },
    //判断新密码
    checkNewPwd() {
      //新密码为空
      if (!this.pwd.newPwd) {
        return;
      }
      //新密码不为空，检查格式
      this.newPwdCheck = LvalidatePwd(this.pwd.newPwd);
      if (LvalidatePwd(this.pwd.newPwd)) {
        //确认密码已输入
        if (this.pwd.confirmPwd.length !== 0) {
          if (this.pwd.newPwd === this.pwd.confirmPwd) {
            this.confirmPwdCheck = true;
          } else {
            this.confirmPwdCheck = false;
            Toast({
              message: "两次密码输入不一致，请检查",
              position: "middle",
              duration: 3000
            });
          }
        }
      } else {
        Toast({
          message: "新密码必须为6-16位，且不能含有特殊字符",
          position: "middle",
          duration: 3000
        });
      }
    },
    //判断确认密码
    checkconfirmPwd() {
      if (this.pwd.newPwd === this.pwd.confirmPwd) {
        this.confirmPwdCheck = true;
      } else {
        this.confirmPwdCheck = false;
        Toast({
          message: "两次密码输入不一致，请检查",
          position: "middle",
          duration: 3000
        });
      }
    },
    //修改密码提交
    submit() {
      MessageBox({
        title: "提示",
        message: "是否确认修改？",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          //验证原密码
          if (
            this.curPwdCheck === true &&
            this.newPwdCheck === true &&
            this.pwd.newPwd === this.pwd.confirmPwd
          ) {
            this.$fetchPut("user/pwd/" + this.bcode.encode(this.pwd.newPwd)).then(
              res => {
                if (res === "success") {
                  MessageBox("提示", "修改成功！").then(action => {
                    this.$router.push("/settings");
                  });
                } else {
                  MessageBox("提示", "修改失败");
                }
              }
            );
          } else {
            if (this.curPwdCheck !== true) {
              MessageBox("提示", "原密码输入错误");
              return;
            }
            if (this.newPwdCheck !== true) {
              MessageBox("提示", "新密码必须为6-16位，且不能含有特殊字符");
              return;
            }
            if (this.pwd.newPwd !== this.pwd.confirmPwd) {
              MessageBox("提示", "两次密码输入不一致，请检查");
              return;
            }
          }
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
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    color: #282828;
    font-size: 0.4rem;
    padding: 0.666667rem 0.64rem 0 0.64rem;
    .info-box {
      height: 1.426667rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid rgba(221, 221, 221, 1);
      .info-title {
        width: 2.026667rem;
      }
      .input-pwd {
        flex: 1;
      }
    }
  }
  .bottom-btn {
    width: 100%;
    height: 1.173333rem;
    margin-top: 1.826667rem;
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