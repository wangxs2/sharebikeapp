
<template>
  <div class="container">
    <div class="header">
      <mt-header title="转派">
        <mt-button icon="back" slot="left" style="font-size:24px" @click="iconClick"></mt-button>
      </mt-header>
    </div>
    <div class="content">
      <div class="witeSa">
        <div class="iteamForm" style="padding-top:0.4rem">
          <p>
            <img
              src="../../assets/image/selfcheck/icon_2_address@3x.png"
              width="24"
              height="24"
              alt
              srcset
            >
          </p>
          <p style="margin:0 0.2rem;margin-top:0.1rem">地点</p>
          <p
            v-model="formMessage.dispatchTime"
            style="justify-content:flex-end;margin-top:0.1rem;display: flex;flex:1;"
          >{{formMessage.handleAddr}}</p>
        </div>
      </div>
      <div class="witeSa" style="margin-top:0.2rem;border-bottom:1px solid #f2f2f2">
        <div class="iteamForm" style="padding-top:0.4rem">
          <img
            src="../../assets/image/supervise/icon_4_company@3x.png"
            width="24"
            height="24"
            alt
            srcset
          >
          <p style="margin:0 0.2rem;margin-top:0.1rem">转派</p>
        </div>
      </div>
      <div class="witeSa">
        <div class="topcloum">
          <div class="topcloumson" v-for="(item,index) in options" :key="index">
            <p
              class="detail-btn"
              :viewType="item.id"
              :class="viewType==item.id?'detail-selected':''"
              @click="selectView"
            ></p>
            <p style="margin:0 0.2rem">{{item.realName}}</p>
            <p :class="item.areas==''?'grey':''">{{item.areas==''?"（无负责区域）":'（'+item.areas+'）'}}</p>
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
      <button type="button" class="buttonSa1" @click="submit()">转派</button>
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
      valuesa: "",
      roleCode: "",
      viewType: "",
      options: [],
      value: "",
      slide1: [],
      slide2: [],
      slide: [],
      sheetCode: "",
      sheetCode1: "",
      imageStatus: 0,
      iteamList: {},
      handleBefore: [],
      handleAfter: [],
      formMessage: {
        createTime: Date.now(),
        handleAddr: "",
        id: "",
        gpsLongitude: "",
        gpsLatitude: "",
        userId: "",
        remark: "",
        radio: ""
      },
      sendMessage: {},
      //c查询条件
      viewTypesa: "",
      areakids: [],
      areaarr: [],
      searchCondition: {},
      menuListTop: [],
      downIcon: -1
    };
  },
  components: {},
  mounted() {
    // this.getMap();
  },
  created() {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.sheetCode1 = this.$route.query.sheetCode1;
      this.searchCondition = this.$route.query.searchCondition;
      this.menuListTop = this.$route.query.menuListTop;
      this.downIcon = this.$route.query.downIcon;
      this.areakids = this.$route.query.areakids;
      this.areaarr = this.$route.query.areaarr;
      this.viewTypesa = this.$route.query.viewTypesa;
      this.getMessage();
      this.getAll();
    }
    window.watchBackWXS=this.watchBackWXS;
  },
  methods: {
    iconClick() {
      this.$router.push({
        path: "/needtodoAdd",
        query: {
          id: this.sheetCode,
          sheetCode1: this.sheetCode1,
          viewTypesa: this.viewTypesa,
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areakids: this.areakids,
          areaarr: this.areaarr
        }
      });
    },
    watchBackWXS(){
      this.iconClick();
    },
    selectView(e) {
      let type = e.target.getAttribute("viewType");
      if (type) {
        this.viewType = type;
        this.value = type;
      }
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
            this.formMessage.gpsLongitude = rs.surroundingPois[0].point.lng;
            this.formMessage.gpsLatitude = rs.surroundingPois[0].point.lat;
            let addComp = rs.addressComponents;
          },
          { poiRadius: 200, numPois: 20 }
        );
      });
    },
    getAll() {
      this.valuesa = "";
      this.$fetchGet("dispatch/listUser", {
        sheetCode: this.sheetCode1
      }).then(res => {
        this.options = res;
      });
    },
    getMessage() {
      this.$fetchGet("dispatch/dispatchDetail", {
        id: this.sheetCode
      })
        .then(res => {
          if (res.status == 1) {
            this.formMessage = res.dispatchDetail;
            if (this.formMessage.handleTime == undefined) {
              this.formMessage.handleTime = Date.now();
            }
          }
        })
        .catch(res => {});
    },
    submit() {
      if (this.value == "") {
        MessageBox.alert("", {
          message: "请选择转派人",
          title: "提示"
        }).then(action => {});
      } else {
        this.sendMessage.userId = this.value;
        this.sendMessage.id = this.sheetCode;
        this.sendMessage.remark = this.formMessage.remark;
        this.$fetchPost("dispatch/turnDispatchDetail", this.sendMessage)
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
<style lang="scss">
.value {
  color: black;
}
.valuesa {
  color: red;
}
</style>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.grey {
  color: #9e9e9e;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #f2f2f2;
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
      .topcloum {
        display: flex;
        box-sizing: border-box;
        margin: 0 0.3rem;
        // padding: 0.3rem;
        flex-direction: column;
        .topcloumson {
          display: flex;
          box-sizing: border-box;
          justify-content: flex-start;
          border-bottom: 1px solid #f2f2f2;
          align-items: center;
          padding: 0.3rem 0;
          .ballsa {
          }
          .detail-btn {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            border: 1px solid #dddddd;
          }
          .detail-selected {
            width: 0.55rem;
            height: 0.55rem;
            border-radius: 50%;
            background-image: url("../../assets/image/select_pre@2x.png");
            background-size: contain;
            border: none;
          }
        }
      }
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
        // align-items: center;
        padding: 0.3rem;

        .rightsa {
          width: 100%;
          margin: 0;
          padding: 0;
          margin-left: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
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
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    }
  }
}
</style>
<style  lang="scss">
</style>

