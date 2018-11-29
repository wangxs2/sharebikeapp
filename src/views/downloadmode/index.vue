<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="toSettings">
      <div class="header-title">下载方式</div>
      <img src="" alt="">

    </div>
    <div class="content">
      <p>1、IOS版下载</p>
      <p style="text-indent: 1rem;">在APPStore里面搜索“单车治理”下载即可。</p>
      <p style="padding-top:0.4rem">2、Android版下载</p>
      <p style="text-indent: 1rem;">扫描下方二维码下载即可。</p>
      <img src="@/assets/image/infoModification/download.png" alt="" style="margin-left:1rem" width="260" height="309" srcset="">
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { validateContact } from "@/libs/validate.js";
// import { constants } from 'http2';
export default {
  computed: {},
  data() {
    return {
      problemContent: "",
      phoneNumber: "",
      photo: [],
      showPhoto: [],
      phoneNumberCheck: true
    };
  },
  components: {},
  mounted() {},
  created() {
    window.getImage = this.getImage;
  },
  methods: {
    //返回个人中心
    toSettings() {
      this.$router.push("/settings");
    },
    //删除图片
    deleteImg(index) {
      this.photo.splice(index, 1);
      this.showPhoto.splice(index, 1);
    },
    //添加图片
    addImg() {
      this.downPictur("feedbackImg");
    },
    //获取图像
    getImage(imgName, url) {
      this.photo.push(imgName);
      this.showPhoto.push(url);
    },
    //检查联系方式格式
    checkPhoneNumber() {
      if (this.phoneNumber) {
        if (this.phoneNumber.length > 32) {
          this.phoneNumberCheck = false;
        } else {
          this.phoneNumberCheck = validateContact(this.phoneNumber);
        }
      } else {
        this.phoneNumberCheck = true;
      }
    },
    //提交
    submit() {
      if (this.problemContent.length === 0) {
        MessageBox("提示", "反馈内容不能为空！");
        return;
      }
      MessageBox({
        title: "提示",
        message: "是否提交反馈？",
        showCancelButton: true
      }).then(action => {
        if (action == "confirm") {
          if (this.phoneNumberCheck === false) {
            MessageBox("提示", "联系方式输入有误，请检查");
          } else {
            
            let photoStr = this.photo.join(";");
            console.log(photoStr);
            this.$fetchPost(
              "problemFeedback",
              {
                problemContent: this.problemContent,
                photo: photoStr,
                contact: this.phoneNumber
              },
              "json"
            ).then(res => {
              if (res.status === 0) {
                MessageBox("提示", "感谢您的反馈！").then(action => {
                  this.$router.push("/settings");
                });
              } else {
                MessageBox("提示", "反馈失败");
              }
            });
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
    background-color: #fff;
    display: flex;
    flex-direction: column;
    color: #282828;
    font-size: 0.4rem;
    padding-top: 0.5rem;
    p{
        margin: 0;
        padding: 0.1rem 0;
        text-indent: 0.4rem;
    }
  }
}
</style>