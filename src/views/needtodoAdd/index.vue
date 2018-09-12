
<template>
  <div class="container">
      <div class="header">
        <mt-header title="派单处理">   
            <router-link to="/layout/needtodo" slot="left">
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
        </form>
       
      </div>
      <div class="bottom">
          <button type="button" class="buttonSa" @click.native="save()">暂存</button>
          <button type="button" class="buttonSa1" @click.native="submit()">完成</button>
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
      formMessage: {
        handleTime: Date.now(),
        handleAddr: "",
        arrangeNum: "",
        cleanNum: "",
        remark: "",
        handleBeforeURLs: [],
        handleAfterURLs: []
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
  },
  mounted() {},
  methods: {
    clickImage() {
      window.webkit.messageHandlers.photo.postMessage({ body: "Photograph" });
      let obj = {};
      obj.w = 600;
      obj.h = 600;
      obj.msrc = this.Ip + this.$store.getters.imageUrl;
      obj.src = this.Ip + this.$store.getters.imageUrl;
      this.slide.push(obj);
      // alert(this.$store.getters.imageUrl)
    },
    clickImage1() {
      window.webkit.messageHandlers.photo.postMessage({ body: "Photograph" });
    },
    handleClose() {
      console.log("close event");
    },
    getMessage(val) {
      this.$fetchGet("dispatch/dispatchDetail", {
        sheetCode: val
      })
        .then(res => {
          if (res.status == 1) {
            this.formMessage = res.dispatchDetail;
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
          }
        })
        .catch(res => {});
    },
    save() {
      this.$fetchPost("selfcheck", this.formMessage)
        .then(res => {})
        .catch(res => {
          MessageBox.alert("", {
            message: "登录超时",
            title: "提示"
          }).then(action => {});
        });
    },
    submit() {}
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

