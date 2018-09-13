<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/warningDetail/nav_1_back@2x.png" alt="" @click="iconReturn">
      <div class="header-title">预警详情</div>
      <img src="" alt="">
    </div>
    <div class="content">
      <div class="warning-info">
        <div class="warning-info-top">
          <div class="warning-info-date">2018-08-28</div>
          <div class="warning-info-status">未处理</div>
        </div>
        <div class="warning-info-bottom">
          <img class="addr-icon" src="@/assets/image/warningDetail/icon_address@2x.png" alt="">
          <div class="warning-info-address">世纪大道两侧(浦东南路-东方路)世纪大道两侧 (浦东南路-东方路)世纪大道两侧
          </div>
        </div>
      </div>
      <div class="warning-total">
        <div class="warning-total-box">
          <div class="warning-total-data font-blue">540</div>
          <div class="warning-total-title">总车辆数</div>
        </div>
        <div class="warning-total-box">
          <div class="warning-total-data font-purple">100</div>
          <div class="warning-total-title">总泊位数</div>
        </div>
      </div>
      <div class="warning-classify">
        <div class="warning-classify-box">
          <div class="warning-classify-data font-yellow">199</div>
          <div class="warning-classify-title">ofo</div>
          <img class="warning-classify-icon" src="@/assets/image/warningDetail/image_ofo@2x.png" alt="">
        </div>
        <div class="warning-classify-box">
          <div class="warning-classify-data font-orange">211</div>
          <div class="warning-classify-title">摩拜</div>
          <img class="warning-classify-icon" src="@/assets/image/warningDetail/image_mobai@2x.png" alt="">
        </div>
        <div class="warning-classify-box">
          <div class="warning-classify-data font-green">110</div>
          <div class="warning-classify-title">享骑</div>
          <img class="warning-classify-icon" src="@/assets/image/warningDetail/image_xiangqi@2x.png" alt="">
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottom-box ignore">忽略</div>
      <div class="bottom-box process">派单/处理</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {};
  },
  components: {},
  mounted() {},
  created() {},
  mounted() {},
  methods: {
    iconReturn() {
      this.$router.push("/layout/warning");
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
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.32rem;
    box-sizing: border-box;
    .warning-info {
      padding: 0 0.32rem;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #282828;
      margin-bottom: 0.48rem;
      .warning-info-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.333333rem 0;
        box-sizing: border-box;
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
        align-items: baseline;
        .addr-icon {
          height: 0.426667rem;
          width: 0.426667rem;
        }
        .warning-info-address {
          margin-left: 0.16rem;
          line-height: 2;
        }
      }
    }
    .warning-total {
      height: 2.4rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.16rem;
      box-shadow: 0px 0px 0.36rem 0px rgba(58, 104, 248, 0.16);
      display: flex;
      margin-bottom: 0.48rem;
      .warning-total-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .warning-total-data {
          font-size: 0.586667rem;
          margin-bottom: 0.25rem;
        }
        .warning-total-title {
          color: #656565;
          font-size: 0.4rem;
        }
      }
    }
    .warning-classify {
      height: 3.733333rem;
      background: rgba(255, 255, 255, 1);
      border-radius: 0.16rem;
      box-shadow: 0px 0px 0.36rem 0px rgba(58, 104, 248, 0.16);
      display: flex;
      .warning-classify-box {
        flex:1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .warning-classify-data {
          font-size: 0.586667rem;
          margin-bottom: .25rem;
        }
        .warning-classify-title {
          color: #656565;
          font-size: 0.4rem;
          margin-bottom: .25rem;
        }
        .warning-classify-icon {
          width: 1.066667rem;
          height: 0.8rem;
        }
      }
    }
  }
  .bottom {
    height: 1.306667rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .bottom-box {
      flex: 1;
      height: 100%;
      font-size: 0.426667rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ignore {
      color: #989898;
      background: #dddddd;
    }
    .process {
      color: #fff;
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    }
  }
}
.font-blue {
  color: #5076ff;
}
.font-purple {
  color: #aa88f7;
}
.font-yellow {
  color: #ffc809;
}
.font-orange {
  color: #ff671a;
}
.font-green {
  color: #77c301;
}
</style>

