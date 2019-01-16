
<template>
  <div class="container">
    <mt-popup class="imgMask" v-model="popupVisible1" position="right">
      <span
        class="iconfont icon-guandiao"
        style="color:#fff;position:fixed;right:15px;top:15px"
        @click="popupVisible1=false"
      ></span>
      <mt-swipe
        style="width:100%;height:64%"
        :continuous="false"
        :touchstart="true"
        :speed="10"
        :auto="0"
        :defaultIndex="indexImage"
      >
        <mt-swipe-item v-for="(iteam,index) in lageImg" :key="index">
          <img :src="Ip+iteam" v-bind:style="{transform:'rotate('+rotateS+'deg)'}" width="100%">
        </mt-swipe-item>
      </mt-swipe>
    </mt-popup>
    <mt-popup class="version-popup-box" v-model="popupVisible2" position="right">
      <div class="version-popup" style="padding-bottom:0">
        <p style="margin:0;text-align:center;">请输入{{bikeTitle}}车辆数</p>
        <div style="padding:0.6rem;padding-top:0rem;display: flex;flex-direction: column;flex:1">
          <div class="version-popup-content" v-for="(iteam,index) in bikeCleanCompany" :key="index">
            <p
              class="companyBike"
              :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1014? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'"
            >{{iteam.name}}</p>
            <div style="margin-left:0.3rem;height:100%">
              <input v-if="bikeTitle=='整理'" type="number" v-model="iteam.arrangeNum">
              <input v-if="bikeTitle=='清运'" type="number" v-model="iteam.cleanNum">
            </div>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="popupVisible2=false">取消</p>
          <p @click="submitBike()" style="border:none;color:#5076FF">确定</p>
        </div>
      </div>
    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toHome">
      <div class="header-title">添加企业自查</div>
      <div></div>
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
              style="text-align:right;margin-right:0.3rem"
            >{{FormatDate(formMessage.createTime)}}</span>
          </div>
        </div>
        <div class="iteamForm" style="padding-bottom:0.4rem">
          <img
            src="../../assets/image/selfcheck/icon_2_address@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa1">
            <span style="margin-top:0.1rem;">地点</span>
            <input
              style="width:80%;text-align:right;word-break:break-all;background:#ffffff"
              maxlength="60"
              :disabled="true"
              placeholder="点击图标获取当前位置"
              v-model="formMessage.handleAddr"
            >
            <!-- <p style="flex:1;height:0.4rem;text-align:right;word-break:break-all;overflow-x:scroll;margin:0">{{formMessage.handleAddr}}</p> -->
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
          <span>整理前</span>
        </div>
        <div class="imageList">
          <div
            v-for="(iteam,index) in formMessage.handleBeforeURLs"
            :key="index"
            class="detailIcon"
          >
            <img
              :src="Ip+iteam"
              alt
              srcset
              width="100px"
              height="100px"
              @click="handOpen(formMessage.handleBeforeURLs,index)"
            >
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
          <div v-for="(iteam,index) in formMessage.handleAfterURLs" :key="index" class="detailIcon">
            <img
              :src="Ip+iteam"
              alt
              srcset
              width="100px"
              height="100px"
              @click="handOpen(formMessage.handleAfterURLs,index)"
            >
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
      <div class="witeSa" style="margin-top:0.2rem;">
        <div class="iteamForm" style="padding-right:0.3rem">
          <img
            src="../../assets/image/selfcheck/icon_5_num1@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa" style="border:none">
            <span>整理数</span>
            <span
              v-if="ifCleanByBike==1"
              style="flex:1;line-height:100%;text-align:right;"
            >{{formMessage.arrangeNum}}</span>
            <input
              v-if="ifCleanByBike==0"
              style="text-align:right;"
              type="number"
              placeholder="请输入"
              v-model="formMessage.arrangeNum"
            >
          </div>
          <span
            v-if="ifCleanByBike==1"
            class="iconfont icon-jiantou1"
            style="color:#999999;font-size:0.8rem;text-align:right"
            @click="dealDetailList('整理')"
          ></span>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.05rem;">
        <div style="margin:0 0.3rem">
          <div class="iteamForm" v-if="isNumberbike">
            <div
              v-for="(iteam,index) in bikeCleanCompany1"
              :key="index"
              :class="index == (bikeCleanCompany1.length-1) ? 'border-bike':'border-bike2'"
              style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem;"
            >
              <h7
                style="color:#333333;font-size:0.52rem;margin-bottom:0.11rem;margin:0"
              >{{iteam.arrangeNum==''||iteam.arrangeNum==undefined?0:iteam.arrangeNum}}</h7>
              <span
                class="companyBike"
                style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1014? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'"
              >{{iteam.name}}</span>
            </div>
          </div>
          <div
            v-if="isNumberbike&&bikeCleanCompany2.length>0"
            class="iteamForm"
            style="border-top:1px solid #eeeeee"
          >
            <div
              v-for="(iteam,index) in bikeCleanCompany2"
              :key="index"
              :class="index == 2||index==bikeCleanCompany2.length-1 ? 'border-bike':'border-bike2'"
              style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem"
            >
              <h7
                style="color:#333333;font-size:0.52rem;margin-bottom:0.1rem;margin:0"
              >{{iteam.arrangeNum==''||iteam.arrangeNum==undefined?0:iteam.arrangeNum}}</h7>
              <span
                class="companyBike"
                style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1014? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'"
              >{{iteam.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.2rem;">
        <div class="iteamForm" style="padding-right:0.3rem">
          <img
            src="../../assets/image/selfcheck/icon_5_num1@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <div class="rightsa" style="border:none">
            <span>清运数</span>
            <span
              v-if="ifCleanByBike==1"
              style="flex:1;line-height:100%;text-align:right;"
            >{{formMessage.cleanNum}}</span>
            <input
              v-if="ifCleanByBike==0"
              style="text-align:right;"
              type="number"
              placeholder="请输入"
              v-model="formMessage.cleanNum"
            >
          </div>
          <span
            v-if="ifCleanByBike==1"
            class="iconfont icon-jiantou1"
            style="color:#999999;font-size:0.8rem;"
            @click="dealDetailList('清运')"
          ></span>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.05rem;">
        <div style="margin:0 0.3rem">
          <div class="iteamForm" v-if="isNumberbike1">
            <div
              v-for="(iteam,index) in bikeCleanCompany1"
              :key="index"
              :class="index == (bikeCleanCompany1.length-1) ? 'border-bike':'border-bike2'"
              style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem;"
            >
              <h7
                style="color:#333333;font-size:0.52rem;margin-bottom:0.11rem;margin:0"
              >{{iteam.cleanNum==''||iteam.cleanNum==undefined?0:iteam.cleanNum}}</h7>
              <span
                class="companyBike"
                style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1014? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'"
              >{{iteam.name}}</span>
            </div>
          </div>
          <div
            v-if="isNumberbike1&&bikeCleanCompany2.length>0"
            class="iteamForm"
            style="border-top:1px solid #eeeeee"
          >
            <div
              v-for="(iteam,index) in bikeCleanCompany2"
              :key="index"
              :class="index == 2||index==bikeCleanCompany2.length-1? 'border-bike':'border-bike2'"
              style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem;width:30%"
            >
              <h7
                style="color:#333333;font-size:0.52rem;margin-bottom:0.1rem;margin:0"
              >{{iteam.cleanNum==''||iteam.cleanNum==undefined?0:iteam.cleanNum}}</h7>
              <span
                class="companyBike"
                style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1014? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'"
              >{{iteam.name}}</span>
            </div>
          </div>
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
      <button type="button" class="buttonSa" @click="save()">暂存</button>
      <button type="button" class="buttonSa1" @click="submit()">完成</button>
    </div>
    <mt-popup v-model="popupVisible" class="mapwhere" position="right">
      <div class="header">
        <div style="display: flex;justify-content:flex-start;">
          <span class="iconfont icon-fanhui" style="font-size:28px" @click="popupVisible=false"></span>
          <p style="margin:0;padding:0">位置</p>
        </div>
      </div>
      <div id="myMap"></div>
      <div class="addres-search">
        <div style="width:85%;height:100%;background:#f2f2f2;position:relative">
          <span
            style="position:absolute;top:0.2rem;left:0.2rem;color:#aaaaaa"
            class="iconfont icon-iconset0157"
          ></span>
          <input
            type="text"
            v-model="addressCtrol"
            id="suggestId"
            style="width:100%;height:100%;padding:0.18rem;border-radius:4px;text-indent:0.6rem"
            placeholder="搜索"
          >
        </div>
      </div>
      <div class="placeList">
        <p v-if="placeData.length==0" style="color:666666;padding-left:0.2rem">搜索不到相应地址，请重新操作</p>
        <div
          v-for="(iteam,index) in placeData"
          :key="index"
          class="address"
          @click="getAddress(iteam,index)"
        >
          <div>
            <h5>{{iteam.title}} {{iteam.business}}</h5>
            <p>{{iteam.city}}&nbsp;{{iteam.address}}&nbsp;{{iteam.district}}&nbsp;{{iteam.business}}</p>
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
      changeId: -1,
      changeId1: -1,
      rotateS: 0,
      areakids: [],
      areaarr: [],
      searchCondition: {},
      menuListTop: [],
      downIcon: -1,
      addressCtrol: "",
      popupVisible1: false,
      popupVisible2: false,
      popupVisible: false,
      bigImage: "",
      ifbikeListone: false,
      time: "",
      myMap: null,
      slide1: [],
      slide: [],
      placeData: [],
      placeData1: [],
      sheetCode: "",
      iteamList: {},
      lageImg: [], //轮播显示图片
      indexImage: 0,
      imageStatus: 0,
      ifCleanByBike: "", //是否分成企业填写整理数
      isNumberbike: false,
      isNumberbike1: false,
      bikeCleanCompany: [],
      bikeCleanCompany1: [],
      bikeCleanCompany2: [],
      bikeTitle: "",
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
      this.searchCondition = this.$route.query.searchCondition;
      this.menuListTop = this.$route.query.menuListTop;
      this.downIcon = this.$route.query.downIcon;
      this.areakids = this.$route.query.areakids;
      this.areaarr = this.$route.query.areaarr;
    }
    this.downAddress();
    // this.getComanylist();
    this.getbikeCleanCompany();
    window.getImage = this.getImage;
    window.getLocation = this.getLocation;
    window.watchBackWXS = this.watchBackWXS;
  },
  mounted() {
    new BMap.Autocomplete({
      //建立一个自动完成的对象
      input: "suggestId",
      location: "上海市",
      onSearchComplete: AutocompleteResult => {
        console.log(12);
        this.placeData = AutocompleteResult.Ar;
        this.suggestSa(this.addressCtrol);
      }
    });
  },
  methods: {
    getLocation(val) {
      return val;
    },
    submitBike() {
      this.popupVisible2 = false;
      if (this.bikeTitle == "整理" && this.sum(this.bikeCleanCompany) !== 0) {
        this.isNumberbike = true;
        this.formMessage.arrangeNum = this.sum(this.bikeCleanCompany);
        console.log(this.sum(this.bikeCleanCompany));
      } else if (
        this.bikeTitle == "清运" &&
        this.sum1(this.bikeCleanCompany) !== 0
      ) {
        this.isNumberbike1 = true;
        this.formMessage.cleanNum = this.sum1(this.bikeCleanCompany);
      }

      if (this.bikeCleanCompany.length > 3) {
        this.bikeCleanCompany1 = this.bikeCleanCompany.slice(0, 3);
        this.bikeCleanCompany2 = this.bikeCleanCompany.slice(
          3,
          this.bikeCleanCompany.length
        );
      } else {
        this.bikeCleanCompany1 = this.bikeCleanCompany;
      }
    },
    watchBackWXS() {
      if (this.popupVisible) {
        this.popupVisible = false;
      } else {
        this.toHome();
      }
    },
    //计算综合整理数的方法
    sum(arr) {
      var s = 0;
      arr.forEach(function(val, idx, arr) {
        if (val.arrangeNum) {
          s += Number(val.arrangeNum);
        }
      }, 0);
      return s;
    },
    sum1(arr) {
      var s = 0;
      arr.forEach(function(val, idx, arr) {
        if (val.cleanNum) {
          s += Number(val.cleanNum);
        }
      }, 0);
      return s;
    },
    dealDetailList(val) {
      this.bikeTitle = val;
      this.popupVisible2 = true;
    },
    //获取分企业添加的列表
    getComanylist() {
      this.$fetchGet("cleanConfig/ifCleanByBike")
        .then(res => {
          this.ifCleanByBike = res;
        })
        .catch(res => {});
    },
    getbikeCleanCompany() {
      this.$fetchGet("count/bikeCleanCompany")
        .then(res => {
          res.forEach(iteam => {
            iteam.orgId = iteam.id;
          });
          this.bikeCleanCompany = res;
        })
        .catch(res => {});
    },
    toHome() {
      this.$router.push({
        path: "/layout/selfCheck",
        query: {
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areaarr: this.areaarr,
          areakids: this.areakids
        }
      });
    },
    placeClick() {
      // console.log(123);
      if (this.downAddress() == false || this.getLocation() == false) {
        MessageBox.alert("", {
          message: "请在权限管理里面打开定位权限",
          title: "提示"
        }).then(action => {});
      } else {
        this.getMap();
        this.addressCtrol = "";
        this.popupVisible = true;
        //  Indicator.open({
        //   text: 'Loading...',
        //   spinnerType: 'fading-circle'
        // });
        //  setTimeout(()=>{
        //   Indicator.close();
        // },20000);
      }
    },
    detailImage(index, id) {
      // console.log(index)
      MessageBox.confirm("是否确认删除图片?").then(action => {
        if (action == "confirm") {
          //确认的回调
          if (index == 1) {
            this.formMessage.handleBefore.splice(id, 1);
            this.formMessage.handleBeforeURLs.splice(id, 1);
          } else {
            // console.log("进入整理后")
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
      console.log(row);
      if (row.title) {
        this.formMessage.handleAddr = row.city + row.address + row.title;
        this.formMessage.gpsLongitude = row.point.lng;
        this.formMessage.gpsLatitude = row.point.lat;
      } else {
        this.formMessage.handleAddr = row.city + row.district + row.business;
        this.suggestSa(row.city + row.district + row.business);
      }
      this.popupVisible = false;
    },

    getMap() {
      this.myMap = new BMap.Map("myMap", { enableMapClick: false });
      let myCity = new BMap.Geolocation();
      let geoc = new BMap.Geocoder();
      myCity.getCurrentPosition(rs => {
        let ggPoint = new BMap.Point(rs.longitude, rs.latitude);
        let marker = new BMap.Marker(ggPoint);
        this.myMap.addOverlay(marker);
        this.myMap.centerAndZoom(ggPoint, 16);
        this.addCompCtrol(this.myMap);
        geoc.getLocation(
          ggPoint,
          rs => {
            this.placeData = rs.surroundingPois;
            this.formMessage.gpsLongitude = this.placeData[0].point.lng;
            this.formMessage.gpsLatitude = this.placeData[0].point.lat;
            let addComp = rs.addressComponents;
          },
          { poiRadius: 200, numPois: 20 }
        );
      });
      this.myMap.addEventListener("click", e => {
        let pt = e.point;
        this.myMap.clearOverlays();
        geoc.getLocation(pt, rs => {
          var addComp = rs.addressComponents;
          let marker = new BMap.Marker(pt);
          this.myMap.addOverlay(marker);
          this.myMap.centerAndZoom(pt, 16);
          this.addCompCtrol(this.myMap);
          this.placeData = rs.surroundingPois;
        });
      });
    },
    addCompCtrol(val) {
      // 添加定位控件
      var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
      });
      val.addControl(navigationControl);
      var geolocationControl = new BMap.GeolocationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        size: (20, 20),
        showAddressBar: true,
        enableAutoLocation: true
      });
      geolocationControl.addEventListener("locationSuccess", function(e) {
        // 定位成功事件
      });
      geolocationControl.addEventListener("locationError", function(e) {
        // 定位失败事件
        // alert(e.message);
      });
      val.addControl(geolocationControl);
    },
    //百度地图关键字提示
    suggestSa(val) {
      this.myMap = new BMap.Map("myMap", { enableMapClick: false });
      let myGeo = new BMap.Geocoder();
      myGeo.getPoint(
        val,
        point => {
          if (point) {
            this.myMap.centerAndZoom(point, 16);
            this.myMap.addOverlay(new BMap.Marker(point));
            this.addCompCtrol(this.myMap);
            this.formMessage.gpsLongitude = point.lng;
            this.formMessage.gpsLatitude = point.lat;
          } else {
          }
        },
        "上海市"
      );
    },
    handOpen(val, index) {
      console.log(index);
      this.rotateS = 0;
      this.lageImg = [];
      this.popupVisible1 = true;
      val.forEach(iteam => {
        iteam = iteam.replace(".400x400.jpg", ".square.jpg");
        this.lageImg.push(iteam);
      });
      this.indexImage = index;
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
      this.$fetchGet("cleanConfig/ifCleanByBike")
        .then(res => {
            this.ifCleanByBike = res;
            this.$fetchGet("selfcheck/selfCheck", {
              sheetCode: val
            })
              .then(res => {
                if (res) {
                  this.formMessage = res;
                  this.formMessage.handleBefore = res.handleBefore.split(";");
                  this.formMessage.handleAfter = res.handleAfter.split(";");
                  if (res.arrangeNum > 0&&this.ifCleanByBike==1) {
                    this.isNumberbike = true;
                    res.selfCheckDealDetailList.forEach(iteam => {
                      iteam.id = iteam.orgId;
                      iteam.name = iteam.orgName;
                    });
                    this.bikeCleanCompany = res.selfCheckDealDetailList;
                    if (res.selfCheckDealDetailList.length > 3) {
                      this.bikeCleanCompany1 = this.bikeCleanCompany.slice(
                        0,
                        3
                      );
                      this.bikeCleanCompany2 = this.bikeCleanCompany.slice(
                        3,
                        this.bikeCleanCompany.length
                      );
                    } else {
                      this.bikeCleanCompany1 = res.selfCheckDealDetailList;
                    }
                  }
                  if (res.cleanNum > 0&&this.ifCleanByBike==1) {
                    this.isNumberbike1 = true;
                    res.selfCheckDealDetailList.forEach(iteam => {
                      iteam.id = iteam.orgId;
                      iteam.name = iteam.orgName;
                    });
                    this.bikeCleanCompany = res.selfCheckDealDetailList;
                    if (res.selfCheckDealDetailList.length > 3) {
                      this.bikeCleanCompany1 = this.bikeCleanCompany.slice(
                        0,
                        3
                      );
                      this.bikeCleanCompany2 = this.bikeCleanCompany.slice(
                        3,
                        this.bikeCleanCompany.length
                      );
                    } else {
                      this.bikeCleanCompany1 = res.selfCheckDealDetailList;
                    }
                  }
                }
              })
              .catch(res => {});
        })
    },
    save() {
      this.formMessage.createTime = this.FormatDate1(
        this.formMessage.createTime
      );
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
      } else {
        let obj = {};
        this.formMessage.handleBefore;
        obj.selfCheck = this.formMessage;
        obj.selfCheckDealDetailList = this.bikeCleanCompany;
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
      this.formMessage.createTime = this.FormatDate1(
        this.formMessage.createTime
      );
      // console.log(this.formMessage.createTime);
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
      } else if (this.formMessage.handleAddr.length > 60) {
        MessageBox.alert("", {
          message: "清理地点长度不能大于60",
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
          message: "是否确认提交",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
            let obj = {};
            obj.selfCheck = this.formMessage;
            obj.selfCheckDealDetailList = this.bikeCleanCompany;
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
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  color: #333333;
  background-color: #f2f2f2;
  .companyBike {
    color: #fff;
    font-size: 0.34rem;
    padding: 0.1rem 0.2rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    margin: 0;
    width: 1.2rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.44rem;
  }
  .mobike {
    background: #f25b4a;
  }
  .ofo {
    background: #fbc303;
    color: #333333;
  }
  .haluo {
    background: #01a1ff;
  }
  .jiujiu {
    background: #fd3121;
  }
  .xiangqi {
    background: #00cb4b;
  }
  .other {
    background: #9a6eff;
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
  .version-popup-box {
    height: 100%;
    width: 100%;
    background: transparent;
    color: #282828;
    display: flex;
    align-items: center;
    .version-popup {
      margin: 0 auto;
      background: #fff;
      height: 8rem;
      width: 8.82rem;
      border-radius: 0.16rem;
      display: flex;
      flex-direction: column;
      padding: 0.4rem 0;
      .version-popup-content {
        display: flex;
        justify-content: flex-start;
        margin-top: 0.4rem;
        height: 1.2rem;
        box-sizing: border-box;
        align-items: center;
        input {
          height: 90%;
          border-bottom: 1px solid #dddddd;
        }
      }
      .bottomsa {
        width: 100%;
        height: 1rem;
        border-top: 1px solid #eeeeee;
        color: #999999;
        display: flex;
        justify-content: space-between;
        p {
          margin: 0;
          padding: 0;
          width: 50%;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-right: 1px solid #eeeeee;
        }
      }
    }
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
      justify-content: space-between;
      align-items: center;
      p {
        margin: 0;
        padding: 0;
      }
    }
    #myMap {
      width: 100%;
      flex: 1;
    }
    .addres-search {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.2rem;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      background: #f2f2f2;
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
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    .witeSa {
      background-color: #ffffff;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      .border-bike {
        border: none;
      }
      .border-bike2 {
        border-right: 1px solid #dddddd;
      }
      .topsa {
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        padding-bottom: 0.2rem;
      }
    }
    .iteamForm {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      box-sizing: border-box;
      padding: 0.2rem 0.3rem;
      align-items: center;

      .rightsa {
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
        align-items: center;
        // margin-right: 0.3rem;
        input {
          // margin-bottom: 0.4rem;
          height: 100%;
        }
      }
      .rightsa1 {
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

