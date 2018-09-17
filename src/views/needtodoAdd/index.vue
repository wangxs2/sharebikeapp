
<template>
  <div class="container">
        <mt-popup
      class="imgMask"
        v-model="popupVisible"
        position="right">
        <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible=false"></span>
        <img :src="Ip+bigImage" alt="" srcset="" width="100%">
      </mt-popup>
      <div class="header">
        <mt-header title="派单处理">   
            <router-link to="/layout/needtodo" slot="left">
                <mt-button icon="back" style="font-size:24px"></mt-button>
            </router-link>
             <mt-button style="font-size:18px" slot="right" @click="iconClick">
                {{roleCode=="manage"?"转派":""}}
            </mt-button>          
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>时间</span>
            <span style="width:100%;text-align:right;margin-right:1rem" v-model="formMessage.handleTime">{{FormatDate(formMessage.handleTime)}}</span>
          </p>
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>地点</span>
            <span style="width:100%;text-align:right;margin-right:1rem" v-model="formMessage.handleAddr">{{formMessage.handleAddr}}</span>
            <!-- <input type="text" placeholder="请输入清理地点" disabled="disabled" v-model="formMessage.handleAddr"> -->
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">派单照片</span>
          </p>
          <div class="imageList">
            <img v-for="(iteam,index) in formMessage.dispachPhotoURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
          </div>
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理前</span>
          </p>
          <div class="imageList">
              <img v-for="(iteam,index) in formMessage.handleBeforeURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
              <img src="../../assets/image/login/cramer.svg" style="margin-top:50px;box-shadow:none" alt="" srcset="" @click="clickImage">
          </div>
          <!-- <p class="imageClean">
             <i class="iconfont icon-xiangji" style="color:#e6e6e6;padding-left:1rem;font-size:50px" @click="clickImage"></i>
               <vue-preview :slides="slide" @close="handleClose"></vue-preview>            
          </p> -->
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理后</span>
          </p>
          <div class="imageList">
              <img v-for="(iteam,index) in formMessage.handleAfterURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
              <img src="../../assets/image/login/cramer.svg" style="margin-top:50px;box-shadow:none" alt="" srcset="" @click="clickImage">
          </div>
          <!-- <p class="imageClean">
             <i class="iconfont icon-xiangji" style="color:#e6e6e6;padding-left:1rem;font-size:50px" @click="clickImage1"></i>
             <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
          </p> -->
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>整理数</span>
            <input type="text" placeholder="请选择整理数" v-model="formMessage.arrangeNum">
          </p>
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/selfcheck/icon_6_num2@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>清运数</span>
            <input type="text" placeholder="请选择清运数" v-model="formMessage.cleanNum">
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
      popupVisible: false,
      bigImage: "",
      roleCode: "",
      slide1: [],
      slide2: [],
      slide: [],
      sheetCode: "",
      imageStatus: 0,
      iteamList: {},
      handleBefore: [],
      handleAfter: [],
      formMessage: {
        handleTime: Date.now(),
        handleAddr: "",
        arrangeNum: "",
        cleanNum: ""
      }
    };
  },
  components: {},
  mounted() {},
  created() {
    this.roleCode = localStorage.roleCode;
    if (this.$route.query.id) {
      this.sheetCode = this.$route.query.id;
      this.getMessage(this.sheetCode);
    }
  },
  mounted() {},
  methods: {
    clickImage() {
      this.imageStatus = 1;
      this.downPictur("bikeImg");
    },
    iconClick() {
      this.$router.push({
        path: "/transfer",
        query: {
          message: this.sheetCode
        }
      });
    },
    handOpen(val) {
      this.popupVisible = true;
      this.bigImage = val;
    },
    getImage(val, row) {
     
      if (this.imageStatus == 1) {
        this.handleBefore.push(val);
        this.formMessage.handleBeforeURLs(row)
      }
      if (this.imageStatus == 2) {
        this.handleAfter.push(val);
        this.formMessage.handleAfterURLs(row)
      }
    },
    clickImage1() {
      this.imageStatus = 2;
      this.downPictur("bikeImg");
    },
    handleClose() {
      // console.log("close event");
    },
    getMessage(val) {
      this.$fetchGet("dispatch/dispatchDetail", {
        id: val
      })
        .then(res => {
          if (res.status == 1) {
            this.formMessage = res.dispatchDetail;
            if (this.formMessage.handleTime == undefined) {
              this.formMessage.handleTime = Date.now();
            }
            this.handleBefore = res.dispatchDetail.handleBefore.split(";");
            this.handleAfter = res.dispatchDetail.handleAfter.split(";");
          }
        })
        .catch(res => {});
    },
    save() {
      if (this.slide.length == 0) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => {});
      } else {
        let obj = {};
        this.formMessage.handleBefore;
        obj.dispatchDetail = this.formMessage;
        obj.dispatchDetail.handleBefore = this.handleBefore.join(";");
        obj.dispatchDetail.handleAfter = this.handleAfter.join(";");
        obj.finish = 0;
        this.$fetchPost("dispatch/saveDispatchDetail", obj, "json")
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
                this.$router.push("/layout/needtodo");
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
      if (this.slide == []) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => {});
      } else if (this.slide1 == []) {
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
        obj.dispatchDetail = this.formMessage;
        obj.dispatchDetail.handleBefore = this.handleBefore.join(";");
        obj.dispatchDetail.handleAfter = this.handleAfter.join(";");
        obj.finish = 1;
        this.$fetchPost("dispatch/saveDispatchDetail", obj, "json")
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
                this.$router.push("/layout/needtodo");
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
  .imgMask {
    width: 100%;
    height: 100%;
    line-height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      // margin-top: 20%;
    }
  }
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
      img {
        margin-top: 0.4rem;
      }
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        padding-left: 0.2rem;
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
      .imageList {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-left: 0.4rem;
        img {
          margin-right: 5px;
          margin-bottom: 10px;
          box-shadow: 0 0 010px #ccc;
        }
      }
      img {
        margin-top: -0.1rem;
      }
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

