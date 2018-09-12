<template>
  <div class="container">
    <div class="header">
      <div class="header-title">预警</div>
    </div>
    <div class="content">
      <div class="warning-box">
        <div class="warning-box-top">
          <div class="warning-info">
            <div class="warning-info-top">
              <div class="warning-info-date">2018-08-28</div>
              <div class="warning-info-status">未处理</div>
            </div>
            <div class="warning-info-bottom">
              <img class="addr-icon" src="@/assets/image/warning/icon_address@2x.png" alt="">
              <div class="warning-info-address">世纪大道两侧(浦东南路-东方路)世纪大道两侧</div>
            </div>
          </div>
          <div class="warning-btn">
            <div class="warning-btn-detail" @click="detailClick">详情</div>
            <div class="warning-btn-ignore">忽略</div>
          </div>
        </div>
        <div class="warning-total">
          <div class="warning-total-box warning-total-cars">
            <span class="warning-total-title">总车辆数</span>
            <span class="warning-total-data">520</span>
          </div>
          <div class="warning-total-box warning-total-parking">
            <span class="warning-total-title">总泊位数</span>
            <span class="warning-total-data">100</span>
          </div>
        </div>
      </div>
      <div class="warning-box">
        <div class="warning-box-top">
          <div class="warning-info">
            <div class="warning-info-top">
              <div class="warning-info-date">2018-08-28</div>
              <div class="warning-info-status">未处理</div>
            </div>
            <div class="warning-info-bottom">
              <img class="addr-icon" src="@/assets/image/warning/icon_address@2x.png" alt="">
              <div class="warning-info-address">世纪大道两侧(浦东南路-东方路)世纪大道两侧</div>
            </div>
          </div>
          <div class="warning-btn">
            <div class="warning-btn-detail" @click="detailClick">详情</div>
            <div class="warning-btn-ignore">忽略</div>
          </div>
        </div>
        <div class="warning-total">
          <div class="warning-total-box warning-total-cars">
            <span class="warning-total-title">总车辆数</span>
            <span class="warning-total-data">520</span>
          </div>
          <div class="warning-total-box warning-total-parking">
            <span class="warning-total-title">总泊位数</span>
            <span class="warning-total-data">100</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      warningData: {}
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
      this.$fetchGet("count/countByUser").then(res => {
        this.warningData = res;
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
    height: 100%;
    background-color: #f2f2f2;
    padding: 0 0.32rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .warning-box {
      margin-top: 0.32rem;
      height: 2.986667rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 12px;
      padding: 0.32rem;
      box-sizing: border-box;
      .warning-box-top {
        padding: 0 0 0.32rem 0;
        box-sizing: border-box;
        width: 100%;
        height: 1.706667rem;
        border-bottom: 1px solid rgba(238, 238, 238, 1);
        display: flex;
        .warning-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #282828;
          .warning-info-top {
            display: flex;
            align-items: center;
            .warning-info-date {
              font-size: 0.426667rem;
              font-weight: bold;
              margin-left: 0.066667rem;
            }
            .warning-info-status {
              width: 1.573333rem;
              height: 0.586667rem;
              line-height: 0.586667rem;
              text-align: center;
              border: 1px solid rgba(255, 17, 17, 1);
              border-radius: 0.106667rem;
              font-size: 0.373333rem;
              font-weight: 500;
              color: rgba(255, 17, 17, 1);
              margin-left: 0.48rem;
            }
          }
          .warning-info-bottom {
            display: flex;
            .addr-icon {
              height: 0.426667rem;
              width: 0.426667rem;
            }
            .warning-info-address {
              margin-left: 0.16rem;
              width: 6rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .warning-btn {
          width: 1.573333rem;
          height: 100%;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          .warning-btn-detail {
            width: 1.573333rem;
            height: 0.586667rem;
            line-height: 0.586667rem;
            text-align: center;
            font-size: 0.373333rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            background: rgba(255, 179, 46, 1);
            border-radius: 0.133333rem;
          }
          .warning-btn-ignore {
            width: 1.573333rem;
            height: 0.586667rem;
            line-height: 0.586667rem;
            text-align: center;
            font-size: 0.373333rem;
            font-weight: 400;
            color: #989898;
            background: rgba(238, 238, 238, 1);
            border-radius: 0.133333rem;
          }
        }
      }
      .warning-total {
        padding: 0.293333rem 0;
        display: flex;
        justify-content: space-around;
        .warning-total-box {
          flex: 1;
          text-align: center;
          .warning-total-title {
            margin-right: 0.133333rem;
            color: #989898;
          }
          .warning-total-data {
            color: #282828;
            font-weight: bold;
          }
        }
        .warning-total-cars {
          border-right: 1px solid rgba(238, 238, 238, 1);
        }
      }
    }
  }
}
</style>


