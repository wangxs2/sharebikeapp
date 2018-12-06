
<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible1" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible1=false"
      ></span>
      <img
        :src="Ip+bigImage"
        alt
        srcset
        width="100%"
        v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
        @click="popupVisible1=false"
      >
      <img
        src="../../assets/image/login/rotate.svg"
        alt
        srcset
        width="50"
        height="50"
        style="position:fixed;right:44%;bottom:15px;"
        @click="rotate()"
      >
    </mt-popup>
    <div class="header">
      <mt-header title="派单">
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
          <img
            src="../../assets/image/selfcheck/icon_1_time@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa">
            <span>时间</span>
            <span
              v-model="formMessage.dispatchTime"
              style="text-align:right;"
            >{{FormatDate(formMessage.dispatchTime)}}</span>
          </div>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.2rem">
        <div class="iteamForm" style="0.4rem 0.3rem">
          <img
            src="../../assets/image/selfcheck/icon_2_address@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa1">
            <span style="width:20%">地点</span>
            <input
              style="width:100%;text-align:right;word-break:break-all"
              maxlength="60"
              placeholder="点击图标获取当前位置"
              v-model="formMessage.handleAddr"
            >
            <img
              src="../../assets/image/icon_2_address2.png"
              width="24"
              height="24"
              alt
              srcset
              @click="placeClick"
            >
          </div>
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
          <span>现场照片</span>
        </div>
        <div class="imageList">
          <div v-for="(iteam,index) in dispachPhotoUrls" :key="index" class="detailIcon">
            <img :src="Ip+iteam" alt srcset width="100px" height="100px" @click="handOpen(iteam)">
            <span @click="detailImage(1,index)">
              <img src="@/assets/image/close@2x.png" width="30" height="30" alt srcset>
            </span>
          </div>
          <div
            v-if="dispachPhotoUrls.length<5"
            style="width:100px;height:100px;background:#F2F2F2;box-sizing: border-box;padding:24px"
            @click="clickImage"
          >
            <img src="../../assets/image/icon_add.png" width="52px" height="52px" alt srcset>
          </div>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.2rem;padding:0.3rem;padding-bottom:0">
        <div
          class="iteamForm"
          style="border-bottom:1px solid #f2f2f2;padding:0;padding-bottom:0.3rem"
        >
          <img
            src="../../assets/image/supervise/icon_4_company@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa">派单</div>
        </div>
      </div>
      <div class="witeSa">
        <div class="iteamForm">
          <p
            class="detail-btn"
            v-for="(item,index) in options"
            :key="index"
            :viewType="item.id"
            @click="chooseOrder($event)"
          >{{item.name}}</p>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.2rem;padding:0.3rem;padding-bottom:0">
        <div
          class="iteamForm"
          style="border-bottom:1px solid #f2f2f2;padding:0;padding-bottom:0.3rem"
        >
          <img
            src="../../assets/image/selfcheck/icon_3_before processing@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa">处理方式</div>
        </div>
      </div>
      <div class="witeSa">
        <div class="iteamForm">
          <p
            style="width:1.7rem;height:0.85rem;line-height:0.85rem"
            class="detail-btn"
            v-for="(item,index) in options1"
            :key="index"
            :viewType="item.value"
            @click="chooseOrder1($event)"
          >{{item.label}}</p>
        </div>
      </div>
      <div
        class="witeSa"
        style="margin-top:0.2rem;padding-left:0.3rem;margin-bottom:0.3rem;padding-top:0.2rem"
      >
        <div class="topsa">
          <img
            src="../../assets/image/selfcheck/icon_7_note@3x.png"
            width="22"
            height="22"
            alt
            srcset
          >
          <div
            style="width:100%;margin-top:0.05rem;padding-left:0.3rem;display:flex;justify-content: space-between"
          >
            <span>备注</span>
            <span style="text-align:right;margin-right:0.3rem;color:#757575">最多输入180个文字</span>
          </div>
        </div>
        <div class="bottomsa" style="padding-top:0.2rem;padding-right:0.2rem">
          <textarea
            maxlength="180"
            style="width:100%;"
            rows="8"
            placeholder="请输入备注"
            v-model="formMessage.remark"
          ></textarea>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button
        type="button"
        :class="isDisable==false?'buttonSa1 buttonSa2': 'buttonSa1 buttonSa3'"
        @click="submit()"
        :disabled="isDisable"
      >派单</button>
    </div>
    <mt-popup v-model="popupVisible" class="mapwhere" position="right">
      <div class="header">
        <span class="iconfont icon-fanhui" style="font-size:28px" @click="popupVisible=false"></span>
        <p>位置</p>
      </div>
      <div id="myMap"></div>
      <div class="placeList">
        <div
          v-for="(iteam,index) in placeData"
          :key="index"
          class="address"
          @click="getAddress(iteam,index)"
        >
          <div>
            <h5>{{iteam.title}}</h5>
            <p>{{iteam.city}}&nbsp;&nbsp;{{iteam.address}}</p>
          </div>
          <span
            v-if="changeId==index"
            class="iconfont icon-xuanzhong"
            style="font-size:22px;color:#1caa20"
          ></span>
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
      // console.log(this.value);
    },
    chooseOrder1(e) {
      let arr = ["1"];
      let arr1 = ["2"];
      let arr2 = ["1","2"];
      // console.log(e.target.getAttribute("viewType"))
      if (e.target.className.indexOf("detail-selected") == -1) {
        e.target.className = "detail-btn detail-selected"; //切换按钮样式
        //写逻辑
        this.value1.push(e.target.getAttribute("viewType"));
      } else {
        e.target.className = "detail-btn"; //切换按钮样式
        let index = this.value1.indexOf(e.target.getAttribute("viewType"));
        if (index > -1) {
          this.value1.splice(index, 1);
        }
      }
      if (this.value1.length==1&&this.value1[0] == 1) {
        this.dealMethod = "1";
      } else if (this.value1.length==1&&this.value1[0] == 2) {
        this.dealMethod = "2";
      } else {
        this.dealMethod = "3";
      } 
      console.log(this.dealMethod)
    },
    iconClick() {
      this.$router.push("/layout/supervise");
    },
    // getCompany1(val) {
    //   this.value1 = val;
    //   let arr = "1";
    //   let arr1 = "2";
    //
    // },
    getAll() {
      this.$fetchGet("count/bikeCompany").then(res => {
        this.options = res;
        // res.forEach(iteam => {
        //   let obj = {};
        //   obj.label = iteam.name;
        //   obj.value = iteam.id;
        //   this.options.push(obj);
        // });
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
      } else if (this.dealMethod == "") {
        MessageBox.alert("", {
          message: "请选择清运方式",
          title: "提示"
        }).then(action => {});
      }else if (this.dispachPhotoUrls.length == 0) {
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
          let obj = {};
          let arrsa = [];
          if (action == "confirm") {
            this.isDisable = true;
            arrsa = this.formMessage.dispachPhoto;
            obj.dispatch = this.formMessage;
            obj.dispatch.dispachPhoto = arrsa.join(";");
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
                    this.formMessage.dispachPhoto = this.formMessage.dispachPhoto.split(
                      ";"
                    );
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
}
textarea {
  width: 80%;
  margin: 0rem 1rem 0 0rem;
  text-align: left;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: #f2f2f2;
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
    box-sizing: border-box;
    .witeSa {
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      .topsa {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 0.2rem;
      }
      .iteamForm {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        box-sizing: border-box;
        align-items: center;
        // background-color: #ffffff;
        // margin: 0.3rem;
        padding: 0.3rem;
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

