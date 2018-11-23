
<template>
  <div class="container">
      <div class="header">
        <mt-header title="转派">   
                <mt-button icon="back" slot="left" style="font-size:24px" @click="iconClick"></mt-button>
             <!-- <mt-button style="font-size:18px" slot="right" @click="iconClick">
                {{roleCode=="manage"?"转派":""}}
            </mt-button>           -->
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_1_time@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>时间</span>
            <span style="width:100%;text-align:right;margin-right:1rem" v-model="formMessage.createTime">{{FormatDate(formMessage.createTime)}}</span>
          </p>
        </div>
        <div class="iteamForm">
          <span><img src="../../assets/image/supervise/icon_2_address@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>地点</span>
            <span style="width:100%;text-align:right;margin-right:1rem" v-model="formMessage.handleAddr">{{formMessage.handleAddr}}</span>
            <!-- <input type="text" placeholder="请输入清理地点" disabled="disabled" v-model="formMessage.handleAddr"> -->
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <span><img src="../../assets/image/selfcheck/icon_8_processor@3x.png" width="22" height="22" alt="" srcset=""></span>
            <span style="padding-left:0.2rem">转派</span>
          </p>
          <p class="imageClean">
                <mt-radio
                    v-model="value"
                    :options="options" @change="getCompany">
                </mt-radio>
          </p>
        </div>
        <div class="iteamForm" style="height:100px">
          <span><img src="../../assets/image/supervise/icon_5_note@3x.png" width="22" height="22" alt="" srcset=""></span>
          <p>
            <span>备注</span>
            <textarea cols="50" rows="10" placeholder="请输入派单备注"  v-model="formMessage.remark"></textarea>
          </p>
        </div>
      </div>
      <div class="bottom">
          <!-- <button type="button" class="buttonSa" @click="save()">暂存</button> -->
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
      roleCode: "",
      options: [],
      value: "",
      slide1: [],
      slide2: [],
      slide: [],
      sheetCode: "",
      sheetCode1:"",
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
      sendMessage: {}
    };
  },
  components: {},
  mounted() {
    this.getMap();
  },
  created() {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.sheetCode1 = this.$route.query.sheetCode1;
      this.getMessage();
      this.getAll();
      
    }
  },
  methods: {
    iconClick() {
      this.$router.push({
        path: "/needtodoAdd",
        query: {
          id: this.sheetCode,
          sheetCode1:this.sheetCode1
        }
      });
    },
    getCompany(val) {
      console.log(val);
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
      this.$fetchGet("dispatch/listUser",{
        sheetCode:this.sheetCode1
      }).then(res => {
        res.forEach(iteam => {
          let obj = {};
          obj.label = iteam.realName+"（"+iteam.areas+"）";
          obj.value = iteam.id.toString();
          this.options.push(obj);
        });
        this.value = res[0].id.toString();
      });
    },
    getMessage() {
      this.$fetchGet("dispatch/dispatchDetail",{
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
      if (this.userId == "") {
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

<style lang="scss" scoped>
input {
  width: 80%;
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
        padding-top: 0.6rem;
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

