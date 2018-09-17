<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="toSettings">
      <div class="header-title">意见反馈</div>
      <img src="" alt="">

    </div>
    <div class="content">
      <div class="feedback-input-box">
        <div class="input-text-box">
          <textarea class="input-text" placeholder="欢迎您向我们提出宝贵建议和意见" v-text="problemContent"></textarea>
        </div>
        <div class="input-img-box">
          <div class="img-added-box">
            <img class="img-added" src="" alt="">
            <img class="del-img" src="@/assets/image/problemFeedback/delete@2x.png" alt="" @click="deleteImg(index)">
          </div>
          <img class="img-add-btn" src="@/assets/image/problemFeedback/add@2x.png" alt="" v-if="photo.length<4">
          <div class="img-add-note" v-if="photo.length<4">至多上传四张图片</div>
        </div>
      </div>
      <div class="contact-box">
        <div class="info-title">联系方式</div>
        <input class="info-input" type="text" placeholder="请输入手机号/邮箱，便于联系您" v-model="phoneNumber">
      </div>

      <div class="bottom-btn">
        <div class="modify" @click="submit">提交</div>
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
      problemContent: "",
      phoneNumber: "",
      photo: []
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
    //删除图片
    deleteImg(index) {
      this.photo.splice(index,1);
    },
    //修改密码
    submit() {
      MessageBox({
        title: "提示",
        message: "是否提交反馈？",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          MessageBox("提示", "感谢您的反馈！").then(action => {
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
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    color: #282828;
    font-size: 0.4rem;
    .feedback-input-box {
      height: 5.973333rem;
      background-color: #ffffff;
      padding: 0.4rem 0.32rem 0.493333rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .input-text-box {
        height: 3rem;
        display: flex;
        .input-text {
          color: #282828;
          width: 100%;
          height: 90%;
        }
      }
      .input-img-box {
        height: 1.786667rem;
        flex-shrink: 0;
        display: flex;
        align-items: flex-end;
        .img-added-box {
          height: 1.786667rem;
          width: 1.786667rem;
          position: relative;
          margin-right: 0.266667rem;
          flex-shrink: 0;
          .img-added {
            height: 1.786667rem;
            width: 1.786667rem;
            border-radius: 0.053333rem;
            position: absolute;
          }
          .del-img {
            height: 0.373333rem;
            width: 0.373333rem;
            position: absolute;
            right: 0;
            z-index: 2;
          }
        }
      }
      .img-add-btn {
        height: 1.786667rem;
        width: 1.786667rem;
        margin-right: 0.16rem;
      }
      .img-add-note {
        color: #989898;
        font-size: 0.32rem;
      }
    }
    .contact-box {
      background-color: #ffffff;
      margin-top: 0.266667rem;
      height: 1.306667rem;
      display: flex;
      align-items: center;
      .info-title {
        margin-left: 0.32rem;
        color: #282828;
        font-size: 0.426667rem;
      }
      .info-input {
        margin-left: 0.64rem;
        color: #282828;
        font-size: 0.426667rem;
        flex: 1;
        border: none;
      }
    }
  }
  .bottom-btn {
    width: 100%;
    height: 1.173333rem;
    padding: 0 0.64rem;
    box-sizing: border-box;
    margin-top: 1.6rem;
    .modify {
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