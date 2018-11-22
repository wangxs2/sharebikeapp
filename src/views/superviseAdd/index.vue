
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
      
        <mt-header title="派单">   
            <mt-button class="iconfont icon-fanhui" style="font-size:24px;color:#fff" slot="left" @click="iconClick">                
            </mt-button>         
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm">
          <!-- <i class="iconfont icon-zihangche1" style="color:#6698FF"></i> -->
          <span><img src="../../assets/image/supervise/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>时间</span>
            <span style="width:80%;text-align:right;margin-right:1rem" v-model="formMessage.dispatchTime">{{FormatDate(formMessage.dispatchTime)}}</span>
          </p>
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>地点</span>
            <textarea style="width:80%;text-align:right;margin-right:1rem;white-space:normal; word-break:break-all;overflow:hidden" placeholder="点击图标获取当前位置" v-model="formMessage.handleAddr"></textarea>
          </p>
           <span class="iconfont icon-dingwei1" style="font-size:20px;margin-top:0.1rem;margin-right:0.1rem" @click="placeClick"></span>
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/supervise/icon_3_picture@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">现场照</span>
          </p>
          <div class="imageList">
              <div v-for="(iteam,index) in dispachPhotoUrls" :key="index" class="detailIcon">
                  <img :src="Ip+iteam" alt="" srcset="" width="50px" height="50px" @click="handOpen(iteam)">
                  <span class="iconfont icon-shanchu" style="font-size:20px" @click="detailImage(index)"></span>
              </div>             
              <img v-if="dispachPhotoUrls.length<5" src="../../assets/image/login/cramer.svg" style="box-shadow:none;background:#eeeeee;" width="50px" height="50px" alt="" srcset="" @click="clickImage">       
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
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/supervise/icon_5_note@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">处理方式</span>
          </p>
          <p class="imageClean">
              <mt-checklist
                  v-model="value1"
                  :options="options1" @change="getCompany1">
              </mt-checklist>
          </p>
        </div>
        <div class="iteamForm" style="height:100px">
          <span><img src="../../assets/image/supervise/icon_5_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p style="border:none">
            <span>备注</span>
            <textarea maxlength="180" cols="50" rows="10" placeholder="请输入备注(最多输入180个文字)" style="margin-top:0rem" v-model="formMessage.remark"></textarea>
          </p>
        </div>
      </div>
      <div class="bottom">
          <button type="button" :class="isDisable==false?'buttonSa1 buttonSa2': 'buttonSa1 buttonSa3'" @click="submit()" :disabled="isDisable">派单</button>
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
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      time: "",
      isDisable: false,
      changeId: 0,
      rotateS: 0,
      dealMethod: "",
      popupVisible: false,
      popupVisible1: false,
      bigImage: "",
      value: [],
      value1: [],
      options: [],
      options1: [
        {
          label: "整理",
          value: "1"
        },
        {
          label: "清运",
          value: "2"
        }
      ],
      slide1: [],
      slide: [],
      sheetCode: "",
      iteamList: {},
      dispachPhotoUrls: [],
      placeData: [],
      formMessage: {
        dispatchTime: Date.now(),
        handleAddr: "",
        remark: "",
        orgId: "",
        gpsLongitude: "",
        gpsLatitude: "",
        dispachPhoto: []
      }
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getAll();
    window.getImage = this.getImage;
    window.getLocation = this.getLocation;
  },
  mounted() {},
  methods: {
    clickImage() {
      this.downPictur("bikeImg");
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    getLocation(val) {
      return val;
    },
    placeClick() {
      if (this.downAddress() == false || this.getLocation() == false) {
        MessageBox.alert("", {
          message: "请在权限管理里面打开定位权限",
          title: "提示"
        }).then(action => {});
      } else {
        this.getMap();
        this.popupVisible = true;
      }
    },
    getAddress(row, index) {
      this.changeId = index;
      this.formMessage.handleAddr = row.address;
      this.formMessage.gpsLongitude = row.point.lng;
      this.formMessage.gpsLatitude = row.point.lat;
      this.popupVisible = false;
    },
    handOpen(val) {
      this.rotateS = 0;
      this.popupVisible1 = true;
      val = val.replace(".400x400.jpg", ".square.jpg");
      this.bigImage = val;
    },
    getImage(val, row) {
      this.dispachPhotoUrls.push(row);
      this.formMessage.dispachPhoto.push(val);
    },
    detailImage(index, id) {
      MessageBox.confirm("是否确认删除图片?").then(action => {
        if (action == "confirm") {
          //确认的回调
          this.formMessage.dispachPhoto.splice(id, 1);
          this.dispachPhotoUrls.splice(id, 1);
        }
      });
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
            // console.log(rs);
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
    handleClose() {
      // console.log("close event");
    },
    iconClick() {
      this.$router.push("/layout/supervise");
    },
    getCompany(val) {
      this.value = val;
      // console.log(this.value);
    },
    getCompany1(val) {
      this.value1 = val;
      // console.log(this.value1.toString())
      let arr = "1";
      let arr1 = "2";
      if (this.value1.toString() == arr) {
        this.dealMethod = "1";
      } else if (this.value1.toString() == arr1) {
        this.dealMethod = "2";
      } else if (this.value1.toString() == "") {
        this.dealMethod = "";
      } else {
        this.dealMethod = "3";
      }
      // console.log(this.dealMethod);
    },
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
    submit() {
      // console.log(this.value);
      if (this.formMessage.handleAddr == "") {
        MessageBox.alert("", {
          message: "请选择待清理地点",
          title: "提示"
        }).then(action => {});
      } else if (this.formMessage.handleAddr.length > 60) {
        MessageBox.alert("", {
          message: "清理地点长度不能大于60",
          title: "提示"
        }).then(action => {});
      } else if (this.dispachPhotoUrls.length == 0) {
        MessageBox.alert("", {
          message: "请上传现场照片",
          title: "提示"
        }).then(action => {});
      } else if (this.value.length == 0) {
        MessageBox.alert("", {
          message: "请选择派单企业",
          title: "提示"
        }).then(action => {});
      } else {
        MessageBox.confirm("", {
          message: "是否确认派单",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
            // console.log(1);
            this.isDisable = true;
            let obj = {};
            this.formMessage.handleBefore;
            obj.dispatch = this.formMessage;
            obj.dispatch.dispachPhoto = this.formMessage.dispachPhoto.join(";");
            obj.dispatch.dealMethod = this.dealMethod;
            obj.orgIdList = this.value;
            obj.finish = 1;
            this.$fetchPost("dispatch/saveDispatch", obj, "json")
              .then(res => {
                this.isDisable = false;
                if (res.status == -1) {
                  MessageBox.alert("", {
                    message: res.message,
                    title: "派单失败"
                  }).then(action => {
                    this.$router.push("/superviseAdd");
                  });
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
          } else {
            console.log(2);
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
      padding-left: 0.2rem;
      .imageList {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-left: 0.4rem;
        padding-top: 0.4rem;
        .detailIcon {
          position: relative;
          margin-right: 0.2rem;
          span {
            position: absolute;
            right: -7px;
            top: -8px;
          }
        }
      }
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        // padding: 0 0 0 0.2rem;
        img {
          margin-top: -0.1rem;
          margin-left: 0.2rem;
        }
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
      width: 100%;
      height: 1.5rem;
      color: #fff;
      line-height: 1.5rem;
      font-size: 0.5rem;
    }
    .buttonSa2 {
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    }
    .buttonSa3 {
      background: #aeaeae;
    }
  }
}
</style>
<style  lang="scss">
</style>

