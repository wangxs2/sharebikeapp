<template>
  <div class="container">
    <van-overlay :z-index="100" :show="showstart">
      <div class="wrapperfast">
        <van-loading type="spinner" size="48px" vertical color="#1989fa">上传中...</van-loading>
      </div>
    </van-overlay>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt="" @click="toSettings">
      <div class="header-title">意见反馈</div>
      <div></div>
      <!-- <img src="" alt=""> -->

    </div>
    <div class="content">
      <div class="feedback-input-box">
        <div class="input-text-box">
          <textarea class="input-text" placeholder="欢迎您向我们提出宝贵建议和意见" v-model="problemContent"></textarea>
        </div>
        <div class="input-img-box">
          <div class="img-added-box" v-for="(item,index) in showPhoto" :key="index">
            <img class="img-added" :src="Ip + item" alt="">
            <img class="del-img" src="@/assets/image/problemFeedback/delete@2x.png" alt="" @click="deleteImg(index)">
          </div>
          <div @click="addImg">
             <!-- <van-uploader
              v-model="fileList"
              multiple
              :max-count='4'
              :before-read="beforeRead"
              :preview-image="false"
              :accept="'image/png,image/jpeg'"
              :after-read="afterRead"
            >
          <img class="img-add-btn" src="@/assets/image/problemFeedback/add@2x.png" alt="" v-if="photo.length<4" />
          </van-uploader> -->
          <img class="img-add-btn" src="@/assets/image/problemFeedback/add@2x.png" alt="" v-if="photo.length<4" />
          </div>
         
          <div class="img-add-note" v-if="photo.length<4">至多上传四张图片</div>
        </div>
      </div>
      <div class="contact-box">
        <div class="info-title">联系方式</div>
        <input class="info-input" type="text" placeholder="请输入手机号/邮箱，便于联系您" v-model="phoneNumber" @blur="checkPhoneNumber">
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
import { validateContact } from "@/libs/validate.js";
// import { constants } from 'http2';
export default {
  computed: {},
  data() {
    return {
      problemContent: "",
      fileList: [],
      phoneNumber: "",
      photo: [],
      showPhoto: [],
      phoneNumberCheck: true,
      showstart:false
    };
  },
  components: {},
  mounted() {},
  created() {
    window.getImage = this.getImage;
    window.watchBackWXS=this.watchBackWXS; 
  },
  methods: {
    //返回个人中心
    toSettings() {
      this.$router.push("/settings");
    },
     //添加图片
    addImg() {
      this.downPictur("feedbackImg");
    },
     watchBackWXS(){
        this.toSettings();
    },
    afterRead(file) {
      this.showstart = true;
      if (file&&!Array.isArray(file)){   
          file=[file]
      }
      file.forEach(iteam=>{
        lrz(iteam.file, {
          quality: 0.2    //自定义使用压缩方式
        })  
        .then(rst=> {
          let formdata = new FormData();
          formdata.append("files", rst.file);
          formdata.append("imgType", "bikeImg");
          this.$fetchPost("uploadFiles", formdata, "json").then(res => {
            if (res.data) {
               this.photo.push(res.data[0].fileName);
              this.showPhoto.push(res.data[0].filePath);
              this.showstart = false;
              //  file.file.status = 'done';
            }
          });
        })
      })
      
     
    },
    beforeRead(file){
      // this.showstart = true;
      if(file.length>4){
        MessageBox.alert("", {
          message: "最多上传4张照片",
          title: "提示"
        }).then(action => {});
      }
       return true;
      
    },
    //删除图片
    deleteImg(index) {
      this.photo.splice(index, 1);
      this.showPhoto.splice(index, 1);
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