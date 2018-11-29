
<template>
  <div class="container">
      <mt-popup
        class="imgMask"
          v-model="popupVisible1"
          position="right">
          <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible1=false"></span>
          <img :src="Ip+bigImage" alt="" srcset="" width="100%" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" @click="popupVisible1=false">
          <img src="../../assets/image/login/rotate.svg" alt="" srcset="" width="50" height="50" style="position:fixed;right:44%;bottom:15px;" @click="rotate()">
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
        <div class="iteamForm">
          <span><img src="../../assets/image/selfcheck/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span style="width:12%">地点</span>
            <textarea style="width:80%;text-align:right;" placeholder="点击图标获取当前位置" v-model="formMessage.handleAddr"></textarea>
          </p>
          <span class="iconfont icon-dingwei1" style="font-size:20px;margin-top:0.1rem;margin-right:0.1rem" @click="placeClick"></span>
        </div>
        <div class="iteamImage">
          <div style="padding-left:0.4rem">
            <!-- <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理前</span> -->
            <img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""><span>整理前</span>
          </div>
          <div class="imageList">
              <div v-for="(iteam,index) in formMessage.handleBeforeURLs" :key="index" class="detailIcon">
                  <img :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
                  <span @click="detailImage(1,index)"><img src="@/assets/image/close@2x.png" width="30" height="30" alt="" srcset=""></span>
              </div>             
              <img v-if="formMessage.handleBeforeURLs.length<5" src="../../assets/image/login/cramer.svg" style="box-shadow:none;background:#eeeeee;" width="100px" height="100px" alt="" srcset="" @click="clickImage">
          </div>
        </div>
        <div class="iteamImage" style="padding-top: 0.4rem;">
          <div style="padding-left:0.4rem">
            <!-- <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理后</span> -->
            <img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""><span>整理后</span>
          </div>
           <div class="imageList">
              <div v-for="(iteam,index) in formMessage.handleAfterURLs" :key="index" class="detailIcon">
                  <img :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
                  <span @click="detailImage(2,index)"><img src="@/assets/image/close@2x.png" width="30" height="30" alt="" srcset=""></span>
              </div>             
              <img v-if="formMessage.handleAfterURLs.length<5" src="../../assets/image/login/cramer.svg" style="box-shadow:none;background:#eeeeee;" width="100px" height="100px" alt="" srcset="" @click="clickImage1">                         
          </div>
        </div>
        <div class="iteamForm">
           <span><img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>整理数</span>
            <input type="number" placeholder="请选择整理数" v-model="formMessage.arrangeNum">
          </p>
        </div>
        <div class="iteamForm">
           <span><img src="../../assets/image/selfcheck/icon_6_num2@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>清运数</span>
            <input type="number" placeholder="请选择清运数" v-model="formMessage.cleanNum">
          </p>
        </div>
        <div class="iteamForm" style="height:100px">
           <span><img src="../../assets/image/selfcheck/icon_7_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span style="width:15%">备注</span>
            <textarea maxlength="180" cols="50" rows="10" placeholder="请输入备注(最多输入180个文字)" style="margin-top:0rem" v-model="formMessage.remark"></textarea>
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
                <div v-for="(iteam,index) in placeData" :key="index" class="address" @click="getAddress(iteam,index)">
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
      rotateS: 0,
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
        handleAddr: "",
        arrangeNum: "",
        cleanNum: "",
        remark: "",
        gpsLongitude: "",
        gpsLatitude: "",
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
    this.downAddress();
    window.getImage = this.getImage;
    window.getLocation = this.getLocation;
  },
  mounted() {
    
  },
  methods: {
     getLocation(val){
      return val
     },
    placeClick() {      
      if(this.downAddress()==false||this.getLocation()==false){
        MessageBox.alert("", {
          message: "请在权限管理里面打开定位权限",
          title: "提示"
        }).then(action => {});
      }else{
        this.getMap();
        this.popupVisible = true;
      }      
    },
    detailImage(index, id){
      console.log(index)
      MessageBox.confirm("是否确认删除图片?").then(action => {
        if (action == "confirm") {
          //确认的回调
          if (index == 1){
            this.formMessage.handleBefore.splice(id, 1);
            this.formMessage.handleBeforeURLs.splice(id, 1);
          } else {
            console.log("进入整理后")
            this.formMessage.handleAfter.splice(id, 1);
            this.formMessage.handleAfterURLs.splice(id, 1);
          }
        }
      });
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    getAddress(row, index) {
      this.changeId = index;
      this.formMessage.handleAddr = row.address;
      this.formMessage.gpsLongitude = row.point.lng;
      this.formMessage.gpsLatitude = row.point.lat;
      this.popupVisible = false;
    },
    getMap() {
      this.myMap = new BMap.Map("myMap", { enableMapClick: false });
      let myCity = new BMap.Geolocation();
      let geoc = new BMap.Geocoder();
      myCity.getCurrentPosition(rs => {
        let ggPoint = new BMap.Point(rs.longitude, rs.latitude);
        var marker = new BMap.Marker(ggPoint); // 创建标注
        this.myMap.addOverlay(marker);
        this.myMap.centerAndZoom(ggPoint, 16);
        geoc.getLocation(
          ggPoint,
          rs => {
            console.log(rs);
            this.placeData = rs.surroundingPois;
            this.formMessage.handleAddr = this.placeData[0].address;
            this.formMessage.gpsLongitude = this.placeData[0].point.lng;
            this.formMessage.gpsLatitude = this.placeData[0].point.lat;
            let addComp = rs.addressComponents;
          },
          { poiRadius: 200, numPois: 20 }
        );
      });
    },
    handOpen(val) {
      this.rotateS=0;
      this.popupVisible1 = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
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
      this.formMessage.createTime=this.FormatDate1(this.formMessage.createTime);
      if (this.formMessage.handleAddr == "") {
        MessageBox.alert("", {
          message: "请选择清理地点",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleBefore=="") {
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
      this.formMessage.createTime=this.FormatDate1(this.formMessage.createTime);
      console.log(this.formMessage.createTime);
      if (this.formMessage.handleAddr == "") {
        MessageBox.alert("", {
          message: "请选择清理地点",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleBefore == "") {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleAfter == "") {
        MessageBox.alert("", {
          message: "请上传整理后照片",
          title: "提示"
        }).then(action => {});
      }else if(this.formMessage.handleAddr.length>60){
        MessageBox.alert("", {
          message: "清理地点长度不能大于60",
          title: "提示"
        }).then(action => {});
      }else if (
        (this.formMessage.arrangeNum == "" &&
        this.formMessage.cleanNum == "")||(this.formMessage.arrangeNum<0||this.formMessage.cleanNum<0)||(this.formMessage.arrangeNum==0&&this.formMessage.cleanNum==0)
      ) {
        MessageBox.alert("", {
          message: "整理或清运数量有误",
          title: "提示"
        }).then(action => {});
      } else {
        MessageBox.confirm("", {
          message: "是否确认提交",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
            let obj = {};
            
            obj.selfCheck = this.formMessage;
            // obj.selfCheck.createTime=this.FormatDate(this.formMessage.createTime);
            obj.selfCheck.handleBefore = this.formMessage.handleBefore.join(
              ";"
            );
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
          } else {
            return;
          }
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
      padding-top: 0.1rem;
      .imageList {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-left: 0.4rem;
        padding-top: 0.1rem;
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
        img{
          border: none;
          margin-bottom:-3px;
        }
        vertical-align:middle;
        // display: flex;
        // justify-content: flex-start;
        // width: 100%;
        // margin: 0;
        // padding: 0;
        // padding: 0 0 0 0.4rem;
        span {
          font-size: 0.4rem;
          margin-left: 0.2rem;
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

