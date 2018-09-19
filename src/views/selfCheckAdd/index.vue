
<template>
  <div class="container">
      <mt-popup
        class="imgMask"
          v-model="popupVisible1"
          position="right">
          <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible1=false"></span>
          <img :src="Ip+bigImage" alt="" srcset="" width="100%">
      </mt-popup>
      <div class="header">
        <mt-header title="添加企业自查">   
            <router-link to="/layout/selfCheck" slot="left">
                <mt-button icon="back" style="font-size:24px"></mt-button>
            </router-link>         
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm">
          <span><img src="../../assets/image/selfcheck/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>时间</span>
            <span style="width:80%;text-align:right;margin-right:1rem" v-model="formMessage.createTime">{{FormatDate(formMessage.createTime)}}</span>
          </p>
        </div>
        <div class="iteamForm" @click="placeClick">
          <span><img src="../../assets/image/selfcheck/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span style="width:10%">地点</span>
            <span style="width:80%;text-align:right;margin-right:1rem;white-space:normal; word-break:break-all;overflow:hidden" v-model="formMessage.handleAddr">{{formMessage.handleAddr}}</span>
          </p>
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
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理后</span>
          </p>
           <div class="imageList">
              <img v-for="(iteam,index) in formMessage.handleAfterURLs" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
              <img src="../../assets/image/login/cramer.svg" style="margin-top:50px;box-shadow:none" alt="" srcset="" @click="clickImage1">
          </div>
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
        <div class="iteamForm" style="height:100px">
           <span><img src="../../assets/image/selfcheck/icon_7_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span style="width:15%">备注</span>
            <textarea cols="50" rows="10" placeholder="请输入备注" style="margin-top:0rem" v-model="formMessage.remark"></textarea>
          </p>
        </div>
        </form>
      </div>
      <div class="bottom">
          <button type="button" class="buttonSa" @click="save()">暂存</button>
          <button type="button" class="buttonSa1" @click="submit()">完成</button>
      </div>
      <mt-popup v-model="popupVisible" class="mapwhere" position="right">
          <div class="header">
            <span class="iconfont icon-fanhui" style="font-size:28px" @click="popupVisible=false"></span>
            <p>位置</p>
          </div>
          <div id="myMap">

          </div>
          <div class="placeList">
                <div v-for="(iteam,index) in placeData" class="address" @click="getAddress(iteam,index)">
                  <div>
                    <h5>{{iteam.title}}</h5>
                    <p>{{iteam.city}}&nbsp;&nbsp;{{iteam.address}}</p>
                  </div>
                     <span v-if="changeId==index" class="iconfont icon-xuanzhong" style="font-size:22px;color:#1caa20"></span>
                </div>
             
          </div>
      </mt-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      changeId: 0,
      popupVisible1: false,
      popupVisible: false,
      bigImage: "",
      time: "",
      myMap: null,
      slide1: [],
      slide: [],
      placeData: [],
      sheetCode: "",
      iteamList: {},
      imageStatus: 0,
      imageName: "",
      formMessage: {
        createTime: Date.now(),
        handleAddr: "点击获取当前位置",
        arrangeNum: "",
        cleanNum: "",
        remark: "",
        longitude:"",
        latitude:"",
        handleBefore: [],
        handleBeforeURLs: [],
        handleAfterURLs: [],
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
  },
  mounted() {},
  methods: {
    placeClick() {
      this.getMap();
      this.popupVisible = true;
    },
    getAddress(row, index) {
      this.changeId = index;
      this.formMessage.handleAddr = row.address;
      this.formMessage.longitude = row.point.lng;
      this.formMessage.latitude = row.point.lat;
      this.popupVisible = false;
    },
    getMap() {
      this.myMap = new BMap.Map("myMap", { enableMapClick: false });
      let myCity = new BMap.Geolocation();
      let geoc = new BMap.Geocoder();
      myCity.getCurrentPosition(rs => {
        let ggPoint = new BMap.Point(rs.longitude, rs.latitude);
        // this.myMap.setCenter(ggPoint);
        var marker = new BMap.Marker(ggPoint); // 创建标注
        this.myMap.addOverlay(marker);
        this.myMap.centerAndZoom(ggPoint, 16);
        geoc.getLocation(
          ggPoint,
          rs => {
            console.log(rs);
            this.placeData = rs.surroundingPois;
            this.formMessage.handleAddr = this.placeData[0].address;
            this.formMessage.longitude = this.placeData[0].point.lng;
            this.formMessage.latitude = this.placeData[0].point.lat;
            let addComp = rs.addressComponents;
          },
          { poiRadius: 200, numPois: 20 }
        );
      });
    },
    handOpen(val) {
      this.popupVisible1 = true;
      val=val.replace(".400x400.jpg","")
      this.bigImage = val;
    },
    clickImage() {
      this.imageStatus = 1;
      this.downPictur("bikeImg");
    },
    clickImage1() {
      this.imageStatus = 2;
      this.downPictur("bikeImg");
    },
    getImage(val, row) {
      if (this.imageStatus == 1) {
        this.formMessage.handleBefore.push(val);
        this.formMessage.handleBeforeURLs.push(row);
      }
      if (this.imageStatus == 2) {
        this.formMessage.handleAfter.push(val);
        this.formMessage.handleAfterURLs.push(row);
      }
    },
    handleClose() {
      // console.log("close event");
    },
    getMessage(val) {
      this.$fetchGet("selfcheck/selfCheck", {
        sheetCode: val
      })
        .then(res => {
          this.formMessage = res;
          this.formMessage.handleBefore = res.handleBefore.split(";");
          this.formMessage.handleAfter = res.handleAfter.split(";");
        })
        .catch(res => {});
    },
    save() {
      //  MessageBox.alert("", {
      //     message: "点击",
      //     title: "提示"
      //   }).then(action => {});
      if (this.formMessage.handleAddr == "点击获取当前位置") {
        MessageBox.alert("", {
          message: "请选择清理地点",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleBefore.length == 0) {
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
          message: "请选择清理地点",
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
  width: 100%;
  margin: 0 1rem;
  text-align: right;
}
textarea {
  width: 100%;
  margin: 0rem 1rem 0 0rem;
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
  .mapwhere {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background: #fff;
    flex-direction: column;
    .header {
      height: 1.173333rem;
      line-height: 1.173333rem;
      font-size: 16px;
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
      display: flex;
      justify-content: flex-start;
      p {
        margin: 0;
        padding: 0;
      }
    }
    #myMap {
      width: 100%;
      flex: 1;
    }
    .placeList {
      width: 100%;
      flex: 1;
      padding-top: 0.2rem;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      .address {
        display: flex;
        justify-content: space-between;
        padding: 0.34rem 0.2rem;
        box-sizing: border-box;
        border-bottom: 1px solid #eeeeee;
      }
      h5 {
        margin: 0;
        padding: 0;
        font-size: 0.4rem;
        color: #282828;
        font-weight: normal;
      }
      p {
        margin: 0;
        padding: 0;
        color: #aeaeae;
      }
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
    box-sizing: border-box;
    padding-top: 0.4rem;
    .iteamForm {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      box-sizing: border-box;
      padding: 0.2rem 0 0.2rem 0.4rem;
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        padding-top: 0.1rem;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        padding-left: 0.2rem;
        span {
          color: #282828;
          font-size: 0.4rem;
          text-align: left;
          width: 25%;
        }
      }
    }
    .iteamImage {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 0.4rem;
      .imageList {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-left: 0.4rem;
        padding-top: 0.4rem;
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

