<template>
  <div class="container">
    <!-- 时间选择 -->
    <mt-datetime-picker
      year-format="{value} 年"
      Format="yyyy-MM"
      month-format="{value} 月"
      @confirm="selectDate"
      ref="picker"
      type="date"
      v-model="pickerValue"
    ></mt-datetime-picker>
    <!-- 时间选择 -->
    <div class="header">
      <img src="@/assets/image/evaluation/nav_1_back@2x.png" alt @click="toUserInfo">
      <div style="color:#333333" class="header-title">治理日报</div>
      <img
        style="width:0.48rem;height:0.48rem"
        src="@/assets/image/statisticsDaily/icon_data@3x.png"
        @click="openPicker"
        alt
        srcset
      >
    </div>
    <div class="content">
      <div class="content-top"></div>
      <div class="content-bottom">
        <div
          class="content-bottom-box"
          style="marrin-top:0.4rem;position: absolute;top: -0.5rem;left: 0;"
        >
          <div class="content-bottom-img">
            <h1
              style="font-size:0.5rem;margin:0;margin-top:0.2rem;text-align:center"
            >{{dataDetail.title}}</h1>
            <p
              style="font-size:0.3rem;margin:0;color:#afbffe;text-align:center;margin-right:0.6rem"
            >《单车治理》2018-12-22 23:23</p>
          </div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:1.1rem;left:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:1.1rem;right:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <div class="content-bottom-rules" style="margin-top:1.8rem;padding-bottom:0.5rem">
            <div class="content-bottom-list">
              <p
                style="margin:0;padding:0.3rem;line-height:0.62rem;padding-bottom:0;text-indent:0.8rem"
              >{{dataDetail.dispatchContentSummary.split('其中')[0]}}。</p>
              <p
                style="margin:0;padding:0.3rem;line-height:0.62rem;padding-top:0;text-indent:0.8rem"
              >其中{{dataDetail.dispatchContentSummary.split('其中')[0]}}。</p>
            </div>
            <div class="content-bottom-list">
              <table class="tableSa" cellspacing="0">
                <thead>
                  <tr>
                    <th>派单单位</th>
                    <th>派单数</th>
                    <th>派单详情</th>
                    <th>已处理</th>
                    <th>处理中</th>
                    <th>未处理</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- <tr v-for="(item,index) in new Array(dataDetail.dispatchContentDetail)" :key="index">
                      <td>{{item.dispatchUnit}}</td>
                      <td>{{item.dispatchCount}}</td>
                      <td>{{item.done}}</td>
                      <td>{{item.done}}</td>
                      <td>{{item.doing}}</td>
                      <td>{{item.willdo}}</td>
                  </tr>-->
                  <tr>
                    <td>
                      <p style="width:2.2rem;">
                        徐家汇社区车
                        辆管理服务社
                      </p>
                    </td>
                    <td style="color:#3E68FF">2</td>
                    <td>
                      <p style="width:1.8rem;">李木木:4</p>
                      <p style="width:1.8rem;">张山山:4</p>
                    </td>
                    <td style="color:#09C504">2</td>
                    <td style="color:#FF7E00">2</td>
                    <td style="color:#FF1717">2</td>
                  </tr>
                  <tr>
                    <td>
                      徐家汇社区车
                      辆管理服务社
                    </td>
                    <td>2</td>
                    <td>
                      <p>李木木:4</p>
                      <p>张山山:4</p>
                    </td>
                    <td>2</td>
                    <td>2</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:-0.6rem;left:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:-0.6rem;right:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <div class="content-bottom-rules" style="margin-top:0rem">
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">各企业派单处理情况</div>
              <div style="padding-top:0.98rem">
                <div
                  class="content-bottom-list"
                  style="padding:0.3rem;border-left:1px solid #FEB621"
                >
                  <h6 style="margin:0;font-size:0.4rem;margin-bottom:0.2rem">当日派单处理</h6>
                  <div style="display:flex;justify-content: space-between;width:100%;">
                    <p style="margin:0">整理总车辆数：15</p>
                    <p style="margin:0">清运总车辆数：60</p>
                  </div>
                </div>
                <div
                  style="display:flex;justify-content:flex-start;width:100%;align-items: center;margin-bottom:0.1rem"
                >
                  <img
                    class="saDaily"
                    src="@/assets/image/statisticsDaily/icon_1_mobai@3x.png"
                    alt
                    srcset
                  >
                  <p style="margin:0;font-size:0.39rem;margin-left:0.3rem">收到派单：17单</p>
                </div>
                <div
                  class="content-bottom-list"
                  style="padding:0.3rem;border-left:1px solid #FEB621"
                >
                  <div style="display:flex;flex-direction: column;border:1px solid #F2F2F2;width:100%;">
                    <div style="display:flex;justify-content: space-between;width:100%;border-bottom:1px solid #F2F2F2">
                      <div style='display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%'>
                        <span style="text-align:center;margin-bottom:0.1rem">13</span>
                        <span style="text-align:center">已处理</span>
                      </div>
                      <div style='display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%'>
                        <span style="text-align:center;margin-bottom:0.1rem">3</span>
                        <span style="text-align:center">未处理</span>
                      </div>
                      <div style='display:flex;flex-direction: column;justify-content:center;padding:0.2rem;margin:0.1rem 0;width:100%'>
                        <span style="text-align:center;margin-bottom:0.1rem">91.7%</span>
                        <span style="text-align:center">完成率</span>
                      </div>
                    </div>
                    <div style="display:flex;justify-content: space-between;width:100%;">
                      <div style='display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%'>
                        <span style="text-align:center;margin-bottom:0.1rem">48</span>
                        <span style="text-align:center">完成率</span>
                      </div>
                      <div style='display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%'>
                        <span style="text-align:center;margin-bottom:0.1rem">229</span>
                        <span style="text-align:center">完成率</span>
                      </div>
                      <div style='display:flex;flex-direction: column;justify-content:center;padding:0.2rem;margin:0.1rem 0;width:100%'>
                        <span style="text-align:center;margin-bottom:0.1rem">72min</span>
                        <span style="text-align:center">处理时长</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">各企业自查情况</div>
              <div>
                <div class="content-bottom-list">
                  <span style="letter-spacing:0.78rem">说</span>
                  <span>明：</span>
                  <span
                    style="line-height:0.6rem;margin-top:-0.06rem;"
                  >实际整理或清运数量是否与照片展现的一致，整理和清运数量是否写反</span>
                </div>
                <div class="content-bottom-list">
                  <span>分值占比：</span>
                  <span>15%</span>
                </div>
                <div class="content-bottom-list">
                  <span>评分标准：</span>
                  <div style="margin-top:-0.07rem;">
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style="text-align:center;font-size:0.32rem;color:#FFFFFF">今天的治理日报到此结束，感谢您的收看，再见~</p>
        <div class="rules-bottom-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      popupVisible: false,
      pickerValue: new Date(), // 选择的时间
      version: "",
      versionTime: "",
      versionDetail: [],
      dataDetail: {}
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getCleanArea();
  },
  methods: {
    //返回考评
    toUserInfo() {
      this.$router.push("/layout/count");
    },
    // 打开时间选择框
    openPicker() {
      this.$refs.picker.open();
    },
    // 选中时间事件
    selectDate(val) {
      // this.query.yearMonth = val.Format("yyyy-MM");
      // this.nowData1=val.Format("yyyy/MM")
      // this.getData();
    },
    //获取地区列表
    getCleanArea() {
      this.$fetchGet("cleanDaily/getCleanArea").then(res => {
        this.$fetchGet("cleanDaily/getCleanDaily", {
          areaId: res[0].key,
          dayDate: "2018-10-03"
        }).then(res => {
          this.dataDetail = res;
          console.log(res.dispatchContentDetail);
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .header {
    height: 1.173333rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 0.48rem;
    padding: 0 0.32rem;
    box-sizing: border-box;
    flex-shrink: 0;
    img {
      height: 0.48rem;
      width: 0.466667rem;
    }
  }
  .content {
    overflow-y: scroll;
    color: #282828;
    font-size: 0.426667rem;
    background: url("../../assets/image/statisticsDaily/bg@3x.png");
    background-size: 100% 100%;

    .content-top {
      width: 100%;
      height: 5.6rem;
      background-image: url("../../assets/image/statisticsDaily/iamge_1@3x.png");
      background-size: 100% 100%;
    }
    .content-bottom {
      width: 100%;
      height: 100%;
      position: relative;
      .content-bottom-box {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        position: relative;
        .content-bottom-img {
          width: 96%;
          height: 2rem;
          background-image: url("../../assets/image/statisticsDaily/image_2@3x.png");
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.8rem;
          color: #ffffff;
          font-size: 0.44rem;
        }
        .content-bottom-font {
          font-size: 0.34rem;
          color: #fe876b;
        }
        .content-bottom-rules {
          margin: 0.2rem;
          padding: 0.3rem;
          border-radius: 0.2rem;
          color: #333333;
          display: flex;
          background: #ffffff;
          flex-direction: column;
          .content-bottom-list {
            display: flex;
            flex-direction: column;
            font-size: 0.39rem;
            align-items: flex-start;
            margin-bottom: 0.1rem;
            .tableSa {
              width: 100%;
              border-bottom: 1px solid #eeeeee;
              border-right: 1px solid #eeeeee;
              // border-bottom: none;
              th {
                color: #888888;
                font-size: 0.26rem;
                border: 1px solid #eeeeee;
                border-bottom: none;
                width: 16.6%;
                height: 1rem;
                border-right: none;
              }
              tr {
                border: 1px solid #eeeeee;
              }
              td {
                border: 1px solid #eeeeee;
                border-right: none;
                border-bottom: none;
                text-align: center;
                font-size: 0.34rem;
                padding: 0.1rem;
                p {
                  margin: 0.1rem 0;
                }
              }
            }
            img {
              width: 0.5rem;
              height: 0.5rem;
            }
            .standard-rules {
              display: flex;
              flex-direction: column;
              .standard-rules-list {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 0.06rem;
              }
            }
          }
          .content-bottom-rules-box {
            display: flex;
            flex-direction: column;
            position: relative;
            margin-top: 0.5rem;
            padding: 0 0.4rem;
            .saDaily {
              width: 1.47rem;
              height: 0.54rem;
              margin-left: -0.3rem;
            }
            .content-bottom-rules-box1 {
              position: absolute;
              top: 0;
              left: -0.419999rem;
              margin: 0;
              background: url("../../assets/image/statisticsDaily/image_label@3x.png");
              background-size: 100% 100%;
              width: 4.8rem;
              height: 1rem;
              line-height: 1rem;
              text-align: center;
              color: #ffffff;
              font-size: 0.44rem;
            }
          }
        }
      }
      .rules-bottom-img {
        width: 100%;
        height: 1.8rem;
        margin-top: 0.4rem;
        text-align: center;
        color: #ffffff;
        font-size: 0.3rem;
        background-image: url("../../assets/image/statisticsDaily/iamge_3@3x.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>