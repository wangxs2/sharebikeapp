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
        <input class="input-pwd" type="password" v-model="pwd.curPwd" placeholder="请输入您现在的密码">
      </div>
      <div class="info-box">
        <div class="info-title">新密码</div>
        <input class="input-pwd" type="password" v-model="pwd.newPwd" placeholder="请输入新密码">

      </div>
      <div class="info-box">
        <div class="info-title">确认密码</div>
        <input class="input-pwd" type="password" v-model="pwd.confirmPwd" placeholder="请再次输入新密码">

      </div>
      <div class="bottom-btn">
        <div class="submit" @click="submit">修改密码</div>
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
    return {
      pwd: {
        curPwd: "",
        newPwd: "",
        confirmPwd: ""
      }
    };
  },
  components: {},
  mounted() {},
  created() {},
  methods: {
    //返回个人中心
    toSettings() {
      this.$router.push("/settings");
    },
    //修改密码
    submit() {
      MessageBox({
        title: "提示",
        message: "是否确认修改？",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          MessageBox("提示", "修改成功/失败").then(action => {
            this.$router.push("/settings");
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