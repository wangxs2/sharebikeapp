
<template>
  <div class="container">
      <mt-popup
      class="imgMask"
        v-model="popupVisible"
        position="right">
        <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible=false"></span>
        <img :src="Ip+bigImage" alt="" srcset="" width="100%" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" @click="popupVisible=false">
        <img src="../../assets/image/login/rotate.svg" alt="" srcset="" width="50" height="50" style="position:fixed;right:50%;bottom:15px;" @click="rotate()">
      </mt-popup>
      <div class="header">  
        <mt-header title="处理情况反馈">  
            <mt-button class="iconfont icon-fanhui" style="font-size:24px;color:#fff" slot="left" @click="iconClick">                
            </mt-button>       
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm" style="height:100px">
          <span><img style="margin-top:-0.1rem" src="../../assets/image/selfcheck/icon_7_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>处理情况</span>
            <textarea cols="50" rows="10" placeholder="请输入处理情况" v-model="formMessage.dealCondition" style="margin-top:0.46rem"></textarea>
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/supervise/icon_3_picture@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">核实照片</span>
          </p>
           <div class="imageList">
               <div v-for="(iteam,index) in formMessage.handleAfterURLs" class="detailIcon">
                  <img :src="Ip+iteam" alt="" srcset="" width="50px" height="50px" @click="handOpen(iteam)">
                  <span class="iconfont icon-shanchu1" @click="detailImage(index)"></span>
              </div>             
              <img v-if="formMessage.handleAfterURLs.length<5" src="../../assets/image/login/cramer.svg" style="box-shadow:none;background:#eeeeee;" width="50px" height="50px" alt="" srcset="" @click="clickImage">       
          </div>          
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/supervise/icon_4_company@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">派单</span>
          </p>
          <p class="imageClean">
                <mt-checklist
                    v-model="value"
                    :options="options" @change="getCompany">
                </mt-checklist>
          </p>
        </div>
        </form>      
      </div>
      <div class="bottom">
          <button type="button" class="buttonSa" @click="save()">重新派单</button>
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
      rotateS: 0,
      bigImage: "",
      slide1: [],
      slide: [],
      dispachPhoto: [],
      sheetCode: "",
      iteamList: {},
      options: [],
      value: [],
      formMessage: {
        dealCondition: "",
        sheetCode: "",
        handleAfterURLs: []
      }
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getAll();
    if (this.$route.query.message) {
      this.formMessage.sheetCode = this.$route.query.message;
    }
    window.getImage = this.getImage;
  },
  mounted() {
    console.log(this.$store.getters.imageUrl);
  },
  methods: {
    getAll() {
      this.$fetchGet("count/bikeCompany").then(res => {
        res.forEach(iteam => {
          let obj = {};
          obj.label = iteam.name;
          obj.value = iteam.id;
          this.options.push(obj);
        });
      });
    },
     rotate() {
      this.rotateS = this.rotateS + 90;
    },
    getCompany(val) {
      this.value = val;
      console.log(this.value);
    },
    handOpen(val) {
      this.popupVisible1 = true;
      this.bigImage = val;
    },
    iconClick() {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          message: this.formMessage.sheetCode
        }
      });
    },
    clickImage() {
      this.downPictur("bikeImg");
    },
    getImage(val, row) {
      this.dispachPhoto.push(val);
      this.formMessage.handleAfterURLs.push(row);
    },
    detailImage(id) {
      MessageBox.confirm("是否确认删除图片?").then(action => {
        if (action == "confirm") {
          //确认的回调
          this.formMessage.handleAfterURLs.splice(id, 1);
          this.dispachPhoto.splice(id, 1);
        }
      });
    },
    handleClose() {
      console.log("close event");
    },
    save() {
      if (this.formMessage.dealCondition == "") {
        MessageBox.alert("", {
          message: "请输入处理情况",
          title: "提示"
        }).then(action => {});
      } else if (this.dispachPhoto.length==0) {
        MessageBox.alert("", {
          message: "请上传核实照片",
          title: "提示"
        }).then(action => {});
      } else if (this.value.length == 0) {
        MessageBox.alert("", {
          message: "请选择派单企业",
          title: "提示"
        }).then(action => {});
      } else {
        let obj = {};
        this.formMessage.handleBefore;
        obj.dispatch = this.formMessage;
        obj.dispatch.dealPhoto = this.dispachPhoto.join(";");
        obj.orgIdList = this.value;
        obj.finish = 0;
        this.$fetchPost("dispatch/saveDispatchFeedBack", obj, "json")
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
                this.$router.push("/layout/supervise");
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
      if (this.formMessage.dealCondition == "") {
        MessageBox.alert("", {
          message: "请输入处理情况",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleBefore == []) {
        MessageBox.alert("", {
          message: "请上传现场照片",
          title: "提示"
        }).then(action => {});
      } else {
        let obj = {};
        obj.dispatch = this.formMessage;
        obj.dispatch.dispachPhoto = this.dispachPhoto.join(";");
        obj.orgIdList = this.value;
        obj.finish = 1;
        this.$fetchPost("dispatch/saveDispatchFeedBack", obj, "json")
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
                this.$router.push("/layout/supervise");
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
          width: 27%;
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
        padding-top: 0.2rem;
        .detailIcon {
          position: relative;
          margin-right: 0.2rem;
          span {
            position: absolute;
            right: -5px;
            top: -8px;
          }
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

