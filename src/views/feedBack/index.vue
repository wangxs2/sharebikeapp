
<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible=false"
      ></span>
      <img
        :src="Ip+bigImage"
        alt
        srcset
        width="100%"
        v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
        @click="popupVisible=false"
      >
      <img
        src="../../assets/image/login/rotate.svg"
        alt
        srcset
        width="50"
        height="50"
        style="position:fixed;right:50%;bottom:15px;"
        @click="rotate()"
      >
    </mt-popup>
    <!-- 重新信息弹框↓ -->
    <mt-popup
      class="version-popup-box"
      :closeOnClickModal="wesa"
      v-model="popupVisible1"
      position="right"
    >
      <div class="version-popup">
        <div class="version-popup-top">重新派单，请选择企业</div>
        <div class="version-popup-content">
          <p
            class="detail-btn"
            v-for="(item,index) in options"
            :key="index"
            :viewType="item.id"
            @click="chooseOrder($event)"
          >{{item.name}}</p>
        </div>
        <div class="version-popup-bottom">
          <div @click="popupVisible1 = false">取消</div>
          <div @click="leaflets" style="border-left: 1px solid #eeeeee;color:#5076FF">确定</div>
        </div>
      </div>
    </mt-popup>
    <!-- 重新信息弹框↑ -->
    <div class="header">
      <mt-header title="处理情况反馈">
        <mt-button
          class="iconfont icon-fanhui"
          style="font-size:24px;color:#fff"
          slot="left"
          @click="iconClick"
        ></mt-button>
      </mt-header>
    </div>
    <div class="content">
      <div class="witeSa">
        <div class="iteamForm">
          <p style="color:#666666">单号</p>
          <p v-model="formMessage.dispatchTime" style="text-align:right;">{{formMessage.sheetCode}}</p>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.2rem">
        <div class="iteamForm">
          <p style="color:#666666">处理方式</p>
          <p
            v-model="formMessage.dispatchTime"
            style="text-align:right;"
          >{{dealMethod==1?"整理":dealMethod==2?"清运":"整理且清运"}}</p>
        </div>
      </div>
      <div
        class="witeSa"
        style="margin-top:0.2rem;padding-left:0.3rem;margin-bottom:0.3rem;padding-top:0.2rem"
      >
        <div class="topsa">
          <img src="../../assets/image/icon_3@2x.png" width="24" height="24" alt srcset>
          <div
            style="width:100%;margin-top:0.05rem;padding-left:0.3rem;display:flex;justify-content: space-between"
          >
            <span>处理情况</span>
            <span style="text-align:right;margin-right:0.3rem;color:#757575"></span>
          </div>
        </div>
        <div class="bottomsa" style="padding-top:0.2rem;padding-right:0.2rem">
          <textarea
            style="width:100%;"
            rows="8"
            placeholder="请输入处理情况"
            v-model="formMessage.dealCondition"
          ></textarea>
        </div>
      </div>
      <div class="iteamImage">
        <div style="padding-left:0.3rem">
          <img
            src="../../assets/image/selfcheck/icon_4_picture.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <span>核实照片</span>
        </div>
        <div class="imageList">
          <div v-for="(iteam,index) in formMessage.handleAfterURLs" :key="index" class="detailIcon">
            <img :src="Ip+iteam" alt srcset width="100px" height="100px" @click="handOpen(iteam)">
            <span @click="detailImage(1,index)">
              <img src="@/assets/image/close@2x.png" width="30" height="30" alt srcset>
            </span>
          </div>
          <div
            v-if="formMessage.handleAfterURLs.length<5"
            style="width:100px;height:100px;background:#F2F2F2;box-sizing: border-box;padding:24px"
            @click="clickImage"
          >
            <img src="../../assets/image/icon_add.png" width="52px" height="52px" alt srcset>
          </div>
        </div>
      </div>
      <!--
        
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
      </div>-->
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
      statuSa: "",
      popupVisible: false,
      popupVisible1: false,
      wesa: false,
      dealMethod: "",
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
      this.dealMethod = this.$route.query.dealMethod;
      this.statuSa = this.$route.query.statuSa;
    }
    window.getImage = this.getImage;
  },
  mounted() {
    console.log(this.$store.getters.imageUrl);
  },
  methods: {
    getAll() {
      this.$fetchGet("count/bikeCompany").then(res => {
        this.options = res;
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
      this.popupVisible = true;
      this.bigImage = val;
    },
    iconClick() {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          supervise: this.formMessage.sheetCode,
          statuSa: this.statuSa
        }
      });
    },
    chooseOrder(e) {
      if (e.target.className.indexOf("detail-selected") == -1) {
        e.target.className = "detail-btn detail-selected"; //切换按钮样式
        //写逻辑
        this.value.push(e.target.getAttribute("viewType"));
      } else {
        e.target.className = "detail-btn"; //切换按钮样式
        let index = this.value.indexOf(e.target.getAttribute("viewType"));
        if (index > -1) {
          this.value.splice(index, 1);
        }
      }
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
    leaflets() {
      if(this.value.length==0){
        MessageBox.alert("", {
          message: "请选择派单企业",
          title: "提示"
        }).then(action => {});
      }else{
        MessageBox.confirm("", {
          message: "是否确认重新派单",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
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
        });
      }
    },
    save() {
      
      if (this.formMessage.dealCondition == "") {
        MessageBox.alert("", {
          message: "请输入处理情况",
          title: "提示"
        }).then(action => {});
      } else if (this.dispachPhoto.length == 0) {
        MessageBox.alert("", {
          message: "请上传核实照片",
          title: "提示"
        }).then(action => {});
      } else {
        this.popupVisible1 = true;

      }
    },
    submit() {
      if (this.formMessage.dealCondition == "") {
        MessageBox.alert("", {
          message: "请输入处理情况",
          title: "提示"
        }).then(action => {});
      } else if (this.dispachPhoto.length == 0) {
        MessageBox.alert("", {
          message: "请上传核实照片",
          title: "提示"
        }).then(action => {});
      } else {
        MessageBox.confirm("", {
          message: "是否确认提交",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
            let obj = {};
            obj.dispatch = this.formMessage;
            obj.dispatch.dealPhoto = this.dispachPhoto.join(";");
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
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// input {
//   width: 80%;
//   margin: 0 1rem;
//   text-align: right;
// }
// textarea {
//   width: 80%;
//   margin: 0.7rem 0.2rem 0 0.2rem;
//   text-align: right;
// }
p {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: #f2f2f2;
  .version-popup-box {
    height: 6rem;
    width: 100%;
    background: transparent;
    color: #282828;
    .version-popup {
      margin: 0 auto;
      background: #fff;
      height: 6rem;
      width: 9rem;
      border-radius: 0.16rem;
      display: flex;
      flex-direction: column;
      .version-popup-top {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        box-sizing: border-box;
        font-size: 0.44rem;
        margin-top: 0.6rem;
      }
      .version-popup-content {
        display: flex;
        padding: 0.4rem 0.4rem;
        flex: 1;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        .detail-btn {
          width: 1.8rem;
          height: 0.9rem;
          margin: 0;
          line-height: 0.9rem;
          text-align: center;
          box-sizing: border-box;
          padding: 0rem;
          border-radius: 0.5rem;
          color: #333333;
          margin-right: 0.5rem;
          background: #f2f2f2;
        }
        .detail-selected {
          background: #5076ff;
          color: #ffffff;
        }
      }
      .version-popup-bottom {
        display: flex;
        justify-content: flex-start;
        font-size: 0.5rem;
        border-top: 1px solid #eeeeee;
        div {
          text-align: center;
          width: 50%;
          height: 1.5rem;
          line-height: 1.5rem;
          color: #999999;
        }
      }
    }
  }
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
    height: 1.173333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1.173333rem;
    color: #fff;
  }
  .content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    .witeSa {
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      font-size: 0.4rem;
      .topsa {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 0.2rem;
      }
      .iteamForm {
        display: flex;
        justify-content: space-between;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        padding: 0.4rem 0.3rem;
        .detail-btn {
          width: 1.8rem;
          height: 0.9rem;
          margin: 0;
          line-height: 0.9rem;
          text-align: center;
          box-sizing: border-box;
          padding: 0rem;
          border-radius: 0.5rem;
          color: #666666;
          margin-right: 0.3rem;
          border: 1px solid #dddddd;
        }
        .detail-selected {
          background: #5076ff;
          color: #ffffff;
          border: none;
        }
        .rightsa {
          width: 100%;
          margin: 0;
          padding: 0;
          margin-left: 0.3rem;
          // height: 1rem;
          // line-height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          // text-align:right;
          input {
            margin-bottom: 0.4rem;
          }
        }
        .rightsa1 {
          width: 100%;
          margin: 0;
          padding: 0;
          margin-left: 0.3rem;
          line-height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    .iteamImage {
      width: 100%;
      display: flex;
      background-color: #ffffff;
      flex-direction: column;
      box-sizing: border-box;
      margin-top: 0.2rem;
      padding-top: 0.2rem;
      padding-bottom: 0.2rem;
      .imageList {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-left: 0.3rem;
        padding-top: 0.2rem;
        .detailIcon {
          position: relative;
          margin-right: 0.2rem;
          span {
            position: absolute;
            right: 0px;
            top: 0px;
          }
        }
      }
      div {
        img {
          border: none;
          margin-bottom: -4px;
        }
        vertical-align: middle;
        // display: flex;
        // justify-content: flex-start;
        // width: 100%;
        // margin: 0;
        // padding: 0;
        // padding: 0 0 0 0.4rem;
        span {
          font-size: 0.4rem;
          margin-left: 0.3rem;
          // margin-left: 0.1rem;
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

