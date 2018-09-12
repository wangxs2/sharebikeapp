
<template>
  <div class="container">
      <div class="header">
      
        <mt-header title="企业自查">   
            <router-link to="/layout/selfCheck" slot="left">
                <mt-button icon="back" style="font-size:24px"></mt-button>
            </router-link>         
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>时间</span>
            <span style="width:80%;text-align:right;margin-right:1rem" v-model="formMessage.handleTime">{{FormatDate(formMessage.handleTime)}}</span>
          </p>
        </div>
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>地点</span>
            <input type="text" placeholder="请输入清理地点" v-model="formMessage.handleAddr">
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
            <span style="padding-left:0.5rem">整理前</span>
          </p>
          <p class="imageClean">
             <i class="iconfont icon-xiangji" style="color:#e6e6e6;padding-left:1rem;font-size:50px" @click="clickImage"></i>
               <vue-preview :slides="slide" @close="handleClose"></vue-preview>
             
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
            <span style="padding-left:0.5rem">整理后</span>
          </p>
          <p class="imageClean">
             <i class="iconfont icon-xiangji" style="color:#e6e6e6;padding-left:1rem;font-size:50px" @click="clickImage1"></i>
             <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
          </p>
        </div>
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>整理数</span>
            <input type="text" placeholder="请选择整理数" v-model="formMessage.arrangeNum">
          </p>
        </div>
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>清运数</span>
            <input type="text" placeholder="请选择清运数" v-model="formMessage.cleanNum">
          </p>
        </div>
        <div class="iteamForm" style="height:100px">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>备注</span>
            <textarea cols="50" rows="10" placeholder="请输入备注" style="margin-top:0.4rem" v-model="formMessage.remark"></textarea>
          </p>
        </div>
        </form>
       
      </div>
      <div class="bottom">
          <button type="button" class="buttonSa" @click="save()">暂存</button>
          <button type="button" class="buttonSa1" @click="submit()">完成</button>
      </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      time: "",
      slide1: [],
      slide: [],
      sheetCode: "",
      iteamList: {},
      imageStatus: 0,
      imageName: "",
      formMessage: {
        handleTime: Date.now(),
        handleAddr: "",
        arrangeNum: "",
        cleanNum: "",
        remark: "",
        handleBefore: [],
        handleAfter: []
      }
    };
  },
  components: {},
  mounted() {},
  created() {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.getMessage(this.sheetCode);
    }
    window.getImage = this.getImage;
    // alert(this.$store.getters.imageUrl)
  },
  mounted() {},
  methods: {
    clickImage() {
      this.imageStatus = 1;
      this.downPictur();
    },
    getImage(val, row) {
      let obj = {};
      obj.w = 600;
      obj.h = 600;
      obj.msrc = this.Ip + row;
      obj.src = this.Ip + row;
      if (this.imageStatus == 1) {
        this.formMessage.handleBefore.push(val);
        this.slide.push(obj);
      }
      if (this.imageStatus == 2) {
        this.formMessage.handleAfter.push(val);
        this.slide1.push(obj);
      }
    },
    clickImage1() {
      this.imageStatus = 2;
      this.downPictur();
    },
    handleClose() {
      console.log("close event");
    },
    getMessage(val) {
      this.$fetchGet("selfcheck/selfCheck", {
        sheetCode: val
      })
        .then(res => {
          this.formMessage = res;
          this.formMessage.handleBeforeURLs.forEach(iteam => {
            let obj = {};
            console.log(iteam);
            obj.w = 600;
            obj.h = 600;
            obj.msrc = this.Ip + iteam;
            obj.src = this.Ip + iteam;
            this.slide.push(obj);
          });
          this.formMessage.handleAfterURLs.forEach(iteam => {
            let obj = {};
            console.log(iteam);
            obj.w = 600;
            obj.h = 600;
            obj.msrc = this.Ip + iteam;
            obj.src = this.Ip + iteam;
            this.slide1.push(obj);
          });
        })
        .catch(res => {});
    },
    save() {
      if (this.formMessage.handleAddr == "") {
        MessageBox.alert("", {
          message: "请输入清理地点",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleBefore == []) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => {});
      } else {
        let obj = {};
        this.formMessage.handleBefore;
        obj.selfCheck = this.formMessage;
        obj.selfCheck.handleBefore = this.formMessage.handleBefore.join(";");
        obj.selfCheck.handleAfter = this.formMessage.handleAfter.join(";");
        obj.finish = 0;
        this.$fetchPost("selfcheck", obj, "json")
          .then(res => {
            if (res.status == -1) {
              MessageBox.alert("", {
                message: res.message,
                title: "提示"
              }).then(action => {});
            } else {
              MessageBox.alert("", {
                message: "保存成功",
                title: "提示"
              }).then(action => {
                this.$router.push("/layout/selfCheck");
              });
            }
          })
          .catch(res => {
            MessageBox.alert("", {
              message: "请求超时",
              title: "提示"
            }).then(action => {});
          });
      }
    },
    submit() {
      if (this.formMessage.handleAddr == "") {
        MessageBox.alert("", {
          message: "请输入清理地点",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleBefore == []) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleAfter == []) {
        MessageBox.alert("", {
          message: "请上传整理后照片",
          title: "提示"
        }).then(action => {});
      } else if (
        this.formMessage.arrangeNum == "" &&
        this.formMessage.cleanNum == ""
      ) {
        MessageBox.alert("", {
          message: "整理或清运数量有误",
          title: "提示"
        }).then(action => {});
      } else {
        let obj = {};
        this.formMessage.handleBefore;
        obj.selfCheck = this.formMessage;
        obj.selfCheck.handleBefore = this.formMessage.handleBefore.join(";");
        obj.selfCheck.handleAfter = this.formMessage.handleAfter.join(";");
        obj.finish = 1;
        this.$fetchPost("selfcheck", obj, "json")
          .then(res => {
            if (res.status == -1) {
              MessageBox.alert("", {
                message: res.message,
                title: "提示"
              }).then(action => {});
            } else {
              MessageBox.alert("", {
                message: "保存成功",
                title: "提示"
              }).then(action => {
                this.$router.push("/layout/selfCheck");
              });
            }
          })
          .catch(res => {
            MessageBox.alert("", {
              message: "请求超时",
              title: "提示"
            }).then(action => {});
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  width: 80%;
  margin: 0 1rem;
  text-align: right;
}
textarea {
  width: 80%;
  margin: 0.733333rem 1rem 0 1rem;
  text-align: right;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .header {
    width: 100%;
    height: 1rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1rem;
    color: #fff;
  }
  .content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;

    .iteamForm {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 55px;
      line-height: 55px;
      box-sizing: border-box;
      padding: 0 0 0 0.4rem;
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        padding-left: 0.5rem;
        // .imageSa{
        //   display: flex;
        //   flex-direction:row;
        // }
        span {
          color: #282828;
          font-size: 0.4rem;
          text-align: left;
          width: 22%;
        }
      }
    }
    .iteamImage {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 0.5rem;
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        padding: 0 0 0 0.4rem;
        span {
          font-size: 0.4rem;
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    .buttonSa {
      border: none;
      border-radius: 0;
      text-align: center;
      width: 50%;
      height: 1.5rem;
      color: #fff;
      line-height: 1.5rem;
      font-size: 0.5rem;
      background: -webkit-linear-gradient(left, #c69efc, #8f78f4);
    }
    .buttonSa1 {
      border: none;
      border-radius: 0;
      text-align: center;
      width: 50%;
      height: 1.5rem;
      color: #fff;
      line-height: 1.5rem;
      font-size: 0.5rem;
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    }
  }
}
</style>
<style  lang="scss">
</style>

