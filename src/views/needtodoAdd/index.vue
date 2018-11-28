
<template>
  <div class="container">
    <div id="myMap"></div>
        <mt-popup
      class="imgMask"
        v-model="popupVisible"
        position="right">
        <span class="iconfont icon-guandiao" style="color:#fff;position:fixed;right:15px;top:15px" @click="popupVisible=false"></span>
        <img :src="Ip+bigImage" alt="" srcset="" width="100%" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" @click="popupVisible=false">
         <img src="../../assets/image/login/rotate.svg" alt="" srcset="" width="50" height="50" style="position:fixed;right:44%;bottom:15px;" @click="rotate()">
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
        <div  style="color:rgb(102, 204, 0);padding-left:0.4rem">
              派单信息
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_5_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>单号</span>
            <span style="width:100%;text-align:right;margin-right:1rem" v-model="formMessage.sheetCode">{{formMessage.sheetCode}}</span>
          </p>
        </div>
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
          </p>
        </div>
  
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">派单照片</span>
          </p>
          <div class="imageList">
            <img v-for="(iteam,index) in formMessage.dispachPhotoURLs" :key="index" :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
          </div>
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_5_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>派单备注</span>
            <span style="width:100%;text-align:right;margin-right:1rem" v-model="formMessage.dispachRemark">{{formMessage.dispachRemark}}</span>
          </p>
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>处理方式</span>
            <span style="width:100%;text-align:right;margin-right:1rem">{{formMessage.dealMethod==1?"整理":formMessage.dealMethod==2?"清运":"整理且清运"}}</span>
          </p>
        </div>
        <div v-if="formMessage.sendRecordList.length!==0" style="color:rgb(102, 204, 0);padding-left:0.4rem" class="iteamList">
                转派记录
        </div>
        <div v-for="(item,index) in formMessage.sendRecordList" :key="index">
            <div class="iteamForm">
                    <span><img src="../../assets/image/supervise/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
                    <p>
                      <span>转派时间</span>
                      <span style="width:100%;text-align:right;margin-right:1rem">{{item.sendTime}}</span>
                    </p>
                    
            </div>
            <div class="iteamForm">
                    <span><img src="../../assets/image/selfcheck/icon_8_processor@3x.png" width="22" height="22" alt="" srcset=""></span>
                    <p>
                      <span>转派人</span>
                    <span style="width:100%;text-align:right;margin-right:1rem">{{item.sendMan}}</span>
                    </p>
                    
            </div>
            <div class="iteamForm">
                    <span><img src="../../assets/image/selfcheck/icon_8_processor@3x.png" width="22" height="22" alt="" srcset=""></span>
                    <p>
                      <span>接单人</span>
                    <span style="width:100%;text-align:right;margin-right:1rem">{{item.receiveMan}}</span>
                    </p>
                    
            </div>
            <div class="iteamForm">
                    <span><img style="margin-top:-0.1rem" src="../../assets/image/supervise/icon_5_note@3x.png" width="22" height="22" alt="" srcset=""></span>
                    <p>
                      <span>备注</span>
                      <span style="width:100%;text-align:right;margin-right:1rem">{{item.sendRemark}}</span>   
                    </p>
                                 
            </div>
        </div>
        <div  style="color:rgb(102, 204, 0);padding-left:0.4rem">
              处理信息
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_3_before processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理前</span>
          </p>
          <div class="imageList">
               <div v-for="(iteam,index) in formMessage.handleBeforeURLs" :key="index" class="detailIcon">
                  <img :src="Ip+iteam" alt="" srcset="" width="100px" height="100px" @click="handOpen(iteam)">
                  <span @click="detailImage(1,index)"><img src="@/assets/image/close@2x.png" width="30" height="30" alt="" srcset=""></span>
              </div>             
              <img v-if="formMessage.handleBeforeURLs.length<5" src="../../assets/image/login/cramer.svg" style="box-shadow:none;background:#eeeeee;" width="100px" height="100px" alt="" srcset="" @click="clickImage">
          </div>
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_4_after processing@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">整理后</span>
          </p>
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
      rotateS: 0,
      roleCode: "",
      myMap: null,
      slide1: [],
      slide2: [],
      slide: [],
      placeData: [],
      sheetCode: "",
      imageStatus: 0,
      iteamList: {},
      handleBefore: [],
      handleAfter: [],
      formMessage: {
        handleTime: Date.now(),
        handleAddr: "",
        arrangeNum: "",
        gpsLongitude: "",
        gpsLatitude: "",
        dispachRemark:'',
        handleBeforeURLs: [],
        handleAfterURLs: [],
        cleanNum: "",
        sheetCode1:"",
        remark: ""
      }
    };
  },
  components: {},
  mounted() {
    
  },
  created() {
    this.roleCode = localStorage.roleCode;
    if (this.$route.query.id) {
      this.sheetCode = this.$route.query.id;
      // if(this.$route.query.sheetCode){
      //   this.sheetCode1 = this.$route.query.sheetCode;
      // }
      // if(this.$route.query.sheetCode1){
      //   this.sheetCode1 = this.$route.query.sheetCode1;
      // }
      this.getMessage(this.sheetCode);
    }
    window.getImage = this.getImage;
    
  },
  methods: {
    clickImage() {
      this.imageStatus = 1;
      this.downPictur("bikeImg");
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
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
            // this.formMessage.handleAddr = this.placeData[0].address;
            this.formMessage.gpsLongitude = this.placeData[0].point.lng;
            this.formMessage.gpsLatitude = this.placeData[0].point.lat;
            // let addComp = rs.addressComponents;
          },
          { poiRadius: 200, numPois: 20 }
        );
      });
    },
    iconClick() {
      this.$router.push({
        path: "/transfer",
        query: {
          sheetCode1:this.sheetCode1,
          message: this.sheetCode
        }
      });
    },
    handOpen(val) {
      this.rotateS = 0;
      this.popupVisible = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    getImage(val, row) {
      if (this.imageStatus == 1) {
        this.handleBefore.push(val);
        this.formMessage.handleBeforeURLs.push(row);
      }
      if (this.imageStatus == 2) {
        this.handleAfter.push(val);
        this.formMessage.handleAfterURLs.push(row);
      }
    },
    detailImage(index, id) {
      MessageBox.confirm("是否确认删除图片?").then(action => {
        if (action == "confirm") {
          //确认的回调
          if (index == 1) {
            this.handleBefore.splice(id, 1);
            this.formMessage.handleBeforeURLs.splice(id, 1);
          } else {
            this.handleAfter.splice(id, 1);
            this.formMessage.handleAfterURLs.splice(id, 1);
          }
        }
      });
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
            this.sheetCode1=res.dispatchDetail.sheetCode;
            console.log(this.sheetCode1);
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
      this.getMap();
      if (this.formMessage.handleBeforeURLs.length == 0) {
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
      this.getMap();
      if (this.formMessage.handleBeforeURLs.length == 0) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleAfterURLs.length == 0) {
        MessageBox.alert("", {
          message: "请上传整理后照片",
          title: "提示"
        }).then(action => {});
      } else if (
        (this.formMessage.arrangeNum == "" &&
          this.formMessage.cleanNum == "") ||
        (this.formMessage.arrangeNum < 0 || this.formMessage.cleanNum < 0) ||
        (this.formMessage.arrangeNum == 0 && this.formMessage.cleanNum == 0)
      ) {
        MessageBox.alert("", {
          message: "整理或清运数量有误",
          title: "提示"
        }).then(action => {});
      } else {
        MessageBox.confirm("", {
          message: "是否确认处理完成",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
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
        // .imageSa{
        //   display: flex;
        //   flex-direction:row;
        // }
        span {
          color: #282828;
          font-size: 0.4rem;
          text-align: left;
          width: 28%;
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

