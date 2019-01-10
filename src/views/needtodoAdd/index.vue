
<template>
  <div class="container">
    <div id="myMap"></div>
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
        style="position:fixed;right:44%;bottom:15px;"
        @click="rotate()"
      >
    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toHome">
      <div class="header-title">派单处理</div>
      <div style="font-size:18px" @click="iconClick">{{roleCode=="manage"?"转派":""}}</div>
    </div>
    <div class="content">
      <div class="superList">
        <div class="topsa" style="margin-top:0.3rem">
          <div class="fontext">派单信息</div>
          <div
            :class="formMessage.status == 2 ? 'red' : 'green'"
          >{{formMessage.status == 0 ? '未处理' : formMessage.status == 1 ?"处理中":formMessage.status == 2 ?"已处理":formMessage.status == 3 ?"已转派":"已完成"}}</div>
        </div>
      </div>
      <div class="superList">
        <div class="topcloum">
          <div class="topcloumson">
            <p class="leftfont">单号</p>
            <p class="leftfont1">{{formMessage.sheetCode}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">时间</p>
            <p class="leftfont1">{{FormatDate(formMessage.dispatchTime)}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">地点</p>
            <p class="leftfont1">{{formMessage.handleAddr}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">派单人</p>
            <p class="leftfont1">{{formMessage.dispatchUserName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理方式</p>
            <p
              class="leftfont1"
            >{{formMessage.dealMethod==1?"整理":formMessage.dealMethod==2?"清运":"整理且清运"}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">企业</p>
            <p class="leftfont1">{{formMessage.orgName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">派单照片</p>
            <p class="leftfont1">
              <img
                v-for="(iteam,index) in formMessage.dispachPhotoURLs"
                :src="Ip+iteam"
                :key="index"
                alt
                srcset
                @click="handOpen(iteam)"
              >
            </p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">备注</p>
            <p class="leftfont1">{{formMessage.dispachRemark}}</p>
          </div>
        </div>
      </div>
      <div class="superList">
        <div class="topsa" style="margin-top:0.3rem">
          <div class="fontext">转派记录</div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topsa" style="height:0.3rem;border:none;border-radius:0">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div
          class="topcloum"
          style="padding:0 0.3rem"
          v-for="(item,index) in formMessage.sendRecordList"
          :key="index"
        >
          <div class="topcloumson" style="padding-bottom:0">
            <div style="margin-top:-0.1rem">
              <span>{{splitsa1(item.sendTime)}}</span>
              <br>
              <span
                style="display: block;margin-top:0.1rem;font-size:0.3rem;color:#555555;margin-left:0.09rem"
              >{{splitsa(item.sendTime)}}</span>
            </div>
            <div
              class="topcloum"
              style="margin:0;padding:0;align-items: center;padding-top:0rem;padding-left:0.2rem"
            >
              <p style="width:0.26rem;height:0.26rem;border-radius:50%;background:#5076ff;"></p>
              <p
                v-if="index!==formMessage.sendRecordList.length-1"
                style="display:flex;flex:1;width:1px;border-left: 1px dashed #5076ff;"
              ></p>
            </div>
            <div
              class="topcloum"
              style="margin:0;padding:0;flex:1;padding-left:0.2rem;margin-top:-0.1rem"
            >
              <div class="topcloumson">
                <p class="leftfont" style="width:22%">转派人</p>
                <p class="leftfont1" style="width:78%">{{item.sendMan}}</p>
              </div>
              <div class="topcloumson">
                <p class="leftfont" style="width:22%">接单人</p>
                <p class="leftfont1" style="width:78%">{{item.receiveMan}}</p>
              </div>
              <div class="topcloumson">
                <p class="leftfont" style="width:22%">备注</p>
                <p class="leftfont1" style="width:78%">{{item.sendRemark}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="superList">
        <div class="iteamImage">
          <div style="padding-left:0.3rem">
            <img
              src="../../assets/image/selfcheck/icon_4_picture.png"
              width="24"
              height="24"
              alt
              srcset
            >
            <span>整理前</span>
          </div>
          <div class="imageList">
            <div
              v-for="(iteam,index) in formMessage.handleBeforeURLs"
              :key="index"
              class="detailIcon"
            >
              <img :src="Ip+iteam" alt srcset width="100px" height="100px" @click="handOpen(iteam)">
              <span @click="detailImage(1,index)">
                <img src="@/assets/image/close@2x.png" width="30" height="30" alt srcset>
              </span>
            </div>
            <div
              v-if="formMessage.handleBeforeURLs.length<5"
              style="width:100px;height:100px;background:#F2F2F2;box-sizing: border-box;padding:24px"
              @click="clickImage"
            >
              <img src="../../assets/image/icon_add.png" width="52px" height="52px" alt srcset>
            </div>
          </div>
        </div>
      </div>
      <div class="superList">
        <div class="iteamImage">
          <div style="padding-left:0.3rem">
            <img
              src="../../assets/image/selfcheck/icon_4_picture.png"
              width="22"
              height="22"
              alt
              srcset
            >
            <span>整理后</span>
          </div>
          <div class="imageList">
            <div
              v-for="(iteam,index) in formMessage.handleAfterURLs"
              :key="index"
              class="detailIcon"
            >
              <img :src="Ip+iteam" alt srcset width="100px" height="100px" @click="handOpen(iteam)">
              <span @click="detailImage(2,index)">
                <img src="@/assets/image/close@2x.png" width="30" height="30" alt srcset>
              </span>
            </div>
            <div
              v-if="formMessage.handleAfterURLs.length<5"
              style="width:100px;height:100px;background:#F2F2F2;box-sizing: border-box;padding:24px"
              @click="clickImage1"
            >
              <img src="../../assets/image/icon_add.png" width="52px" height="52px" alt srcset>
            </div>
          </div>
        </div>
      </div>
      <div class="superList" style="margin-top:0.2rem">
          <div class="iteamForm">
            <img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="24" height="24" alt="" srcset="">
            <div class="rightsa">
              <span>整理数</span>
              <input style="text-align:right;" type="number" placeholder="请输入整理数" v-model="formMessage.arrangeNum">
            </div>
          </div>
          <div class="iteamForm">
            <img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="24" height="24" alt="" srcset="">
            <div class="rightsa" style="border:none">
              <span>清运数</span>
              <input style="text-align:right;" type="number" placeholder="请输入清运数" v-model="formMessage.cleanNum">
            </div>
          </div>
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
        dispachRemark: "",
        handleBeforeURLs: [],
        handleAfterURLs: [],
        cleanNum: "",
        sheetCode1: "",
        remark: "",
        //c查询条件
        viewTypesa:'',
        areakids:[],
        areaarr:[],
        searchCondition:{},
        menuListTop:[],
        downIcon:-1,
      }
    };
  },
  components: {},
  mounted() {},
  created() {
    this.roleCode = localStorage.roleCode;
    if (this.$route.query.id) {
      this.sheetCode = this.$route.query.id;
      this.viewTypesa= this.$route.query.viewTypesa;
      this.getMessage(this.sheetCode);
      if (this.$route.query.downIcon || this.$route.query.downIcon == 0) {
        this.searchCondition = this.$route.query.searchCondition;
        this.menuListTop = this.$route.query.menuListTop;
        this.downIcon = this.$route.query.downIcon;
        this.areakids = this.$route.query.areakids;
        this.areaarr = this.$route.query.areaarr;
      }
    }
    window.getImage = this.getImage;
    window.watchBackWXS=this.watchBackWXS;
  },
  methods: {
    clickImage() {
      this.imageStatus = 1;
      this.downPictur("bikeImg");
    },
    rotate() {
      this.rotateS = this.rotateS + 90;
    },
    watchBackWXS(){
      this.toHome();
    },
    toHome(){
      this.$router.push({
          path: "/layout/needtodo",
          query: {
            name: "2",
            searchCondition:this.searchCondition,
            menuListTop:this.menuListTop,
            downIcon:this.downIcon,
            areaarr:this.areaarr,
            areakids:this.areakids,
            viewTypesa:this.viewTypesa,
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
            console.log(rs);
            this.placeData = rs.surroundingPois;
            this.formMessage.gpsLongitude = this.placeData[0].point.lng;
            this.formMessage.gpsLatitude = this.placeData[0].point.lat;
          },
          { poiRadius: 200, numPois: 20 }
        );
      });
    },
    iconClick() {
      this.$router.push({
        path: "/transfer",
        query: {
          sheetCode1: this.sheetCode1,
          message: this.sheetCode,
          viewTypesa:this.viewTypesa,
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areakids: this.areakids,
          areaarr: this.areaarr,
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
    splitsa(val) {
      return (
        val.split(" ")[0].split("-")[1] + "-" + val.split(" ")[0].split("-")[2]
      );
    },
    splitsa1(val) {
      return (
        val.split(" ")[1].split(":")[0] + ":" + val.split(" ")[1].split(":")[1]
      );
    },
    getMessage(val) {
      this.$fetchGet("dispatch/dispatchDetail", {
        id: val
      })
        .then(res => {
          if (res.status == 1) {
            this.sheetCode1 = res.dispatchDetail.sheetCode;
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
// input {
//   width: 80%;
//   margin: 0 1rem;
//   text-align: right;
// }
// textarea {
//   width: 80%;
//   margin: 0.733333rem 1rem 0 1rem;
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
  background-color: #f2f2f2;
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
    height: 1.173333rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    color: #fff;
    font-size: 0.48rem;
    padding: 0 0.32rem;
    box-sizing: border-box;
    flex-shrink: 0;
    img {
      height: 0.48rem;
      width: 0.266667rem;
    }
  }
  .content {
    width: 100%;
    flex: 1;
    height: 1px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    align-items: center;
    margin-bottom: 0.2rem;
    .superList {
      width: 100%;
      box-sizing: border-box;

      border-radius: 2px;
      .iteamForm {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      box-sizing: border-box;
      padding: 0.4rem 0rem 0rem 0.3rem;
      background-color: #ffffff;
      .rightsa{
        width: 100%;
        margin: 0;
        padding: 0;
        margin-left: 0.3rem;
        border-bottom: 1px solid #eeeeee;
        height: 1rem;
        line-height: 0.6rem;
        display: flex;
        justify-content: space-between;
        // text-align:right;
        padding-right: 0.3rem;
        input{
          margin-bottom: 0.4rem;
        }
      }
      .rightsa1{
        width: 100%;
        margin: 0;
        padding: 0;
        margin-left: 0.3rem;
        display: flex;
        justify-content: space-between;
        padding-right: 0.3rem;
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
          span {
            font-size: 0.4rem;
            margin-left: 0.3rem;
          }
        }
      }
      .topsa {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 0.3rem;
        background: #fff;
        padding: 0.3rem;
        border-top-left-radius: 0.12rem;
        border-top-right-radius: 0.12rem;
        border-bottom: 1px solid #f2f2f2;
        .fontext {
          position: relative;
          margin-left: 0.3rem;
          &::before {
            content: "";
            position: absolute;
            top: 0.015rem;
            left: 0px;
            width: 0.1rem;
            height: 0.4rem;

            background: #5076ff;
            margin-left: -0.25rem;
          }
        }
      }
      .topcloum {
        background: #fff;

        display: flex;
        box-sizing: border-box;
        margin: 0 0.3rem;
        padding: 0.3rem;
        flex-direction: column;
        border-bottom-left-radius: 0.12rem;
        border-bottom-right-radius: 0.12rem;
        .topcloumson {
          display: flex;
          justify-content: flex-start;
          padding-bottom: 0.3rem;

          .leftfont {
            width: 25%;
            color: #999999;
            font-size: 0.37rem;
          }
          .leftfont1 {
            width: 75%;
            img {
              margin-right: 0.2rem;
              width: 2.5rem;
              height: 2.5rem;
            }
          }
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

