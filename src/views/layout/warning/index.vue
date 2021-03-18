<template>
  <div class="container">
    <div class="header">
      <div class="header-title">预警</div>
    </div>
    <!-- <div style="text-align:center;padding-top:.33rem;color:#aaa">开发中</div> -->
    <div class="content">
      <div class="noneList" v-if="isimg">
        <img
          src="../../../assets/image/selfcheck/image_no data@3x.png"
          width="200"
          height="180"
          alt
        />
        <p style="color:#989898">没有数据~</p>
      </div>
      <div>
        <div
          class="warning-box"
          v-for="(iteam, index) in warningData"
          :key="index"
        >
          <div class="warning-box-top">
            <img
              v-if="iteam.orgId == 1007"
              src="../../../assets/image/OFO.png"
              width="39"
              height="38"
            />
            <img
              v-if="iteam.orgId == 1006"
              src="../../../assets/image/mobike.png"
              width="39"
              height="38"
            />
            <img
              v-if="iteam.orgId == 1143"
              src="../../../assets/image/jiujiu.png"
              width="39"
              height="38"
            />
            <img
              v-if="iteam.orgId == 1015"
              src="../../../assets/image/haluo.png"
              width="39"
              height="38"
            />
            <img
              v-if="iteam.orgId == 1059"
              src="../../../assets/image/xiangqi.png"
              width="39"
              height="38"
            />
            <img
              v-if="iteam.orgId == 999"
              src="../../../assets/image/other.png"
              width="39"
              height="38"
            />
            <img
              v-if="iteam.type == 1"
              src="../../../assets/image/znyj.png"
              width="39"
              height="39"
            />
            <img
              v-if="
                iteam.orgId !== 1006 &&
                  iteam.orgId !== 1007 &&
                  iteam.orgId !== 1014 &&
                  iteam.orgId !== 1015 &&
                  iteam.orgId !== 1059 &&
                  iteam.orgId !== 999
                  &&
                  iteam.type !== 1
              "
              src="../../../assets/image/zhongdian.png"
              width="39"
              height="38"
            />
            <div style="margin-left:0.2rem;color:#282828;font-size:0.45rem">
              {{ FormatDate(iteam.createTime) }}
            </div>
          </div>
          <div class="warning-box-content">
            <div>
              <p style="margin-bottom:0.1rem;font-size:0.5rem;color:#3964FF">
                {{ iteam.type==1?iteam.bicycleNum:iteam.lockActiveNums + iteam.lockNoActiveNums }}
              </p>
              <p style="color:#989898;font-size:0.3rem;">{{iteam.type==1?'当前车辆数(辆)':'总车辆数(辆)'}}</p>
            </div>
            <div>
              <p style="margin-bottom:0.1rem;font-size:0.5rem;color:#3964FF">
                {{ iteam.type==1?iteam.predictBicycleNum:iteam.regionalWarningNumber }}
              </p>
              <p style="color:#989898;font-size:0.3rem;">{{iteam.type==1?'下一小时预测数(辆)':'预警数(辆)'}}</p>
            </div>
          </div>
          <div class="warning-box-bottom">
            <img
              src="../../../assets/image/warning/icon_address@2x.png"
              width="22"
              height="22"
              alt
              srcset
            />
            <div style="margin-left:0.2rem;color:#282828;">
              {{ iteam.regionalName }}
            </div>
          </div>
          <!-- <div class="warning-total">
          <div class="warning-total-box warning-total-cars">
            <span class="warning-total-title">总车辆数</span>
            <span class="warning-total-data">{{iteam.lockActiveNums+iteam.lockNoActiveNums}}</span>
          </div>
          <div class="warning-total-box warning-total-parking">
            <span class="warning-total-title">预警数</span>
            <span class="warning-total-data">{{iteam.regionalWarningNumber}}</span>
          </div>
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      warningData: [],
      isimg: false
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    //去预警详情页
    detailClick() {
      this.$router.push("/warningDetail");
    },
    //获取派单数据
    getData() {
      // Indicator.open({
      //   text: "加载中...",
      //   spinnerType: "fading-circle"
      // });
      this.$fetchGet("warn/getWarning")
        .then(res => {
          Indicator.close();
          this.warningData = res;
          if (this.warningData.length == 0) {
            this.isimg = true;
          } else {
            this.isimg = false;
          }
        })
        .catch(() => {
          // Indicator.close();
          // Indicator.open({
          //   text: "请求超时",
          //   spinnerType: "fading-circle"
          // });
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
  background-color: #f2f2f2;
  .noneList {
    flex: 1;
    line-height: 1;
    text-align: center;
    margin-top: 2rem;
    font-size: 16px;
  }
  .header {
    height: 1.173333rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    color: #fff;
    font-size: 0.48rem;
    flex-shrink: 0;
  }
  .content {
    // height: 100%;

    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    .warning-box {
      margin-top: 0.32rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      margin: 0.3rem;
      .warning-box-top {
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        align-items: center;
        padding: 0.3rem;
      }
      .warning-box-content {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        border-bottom: 1px solid #eeeeee;
        div {
          width: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.3rem 0;

          p {
            margin: 0;
          }
        }
      }
      .warning-box-bottom {
        box-sizing: border-box;
        width: 100%;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 0.3rem;
      }
    }
  }
}
</style>
