<template>
  <div class="container">
    <div class="header">
      <div class="header-tittle">预警</div>
    </div>
    <div class="content">
      <div class="warning-box">
        <div class="warning-box-top">
          <div class="warning-info">
            <div class="warning-info-top">
              <div class="warning-info-date"></div>
              <div class="warning-info-status"></div>
            </div>
            <div class="warning-info-bottom">
              <img src="" alt="">
              <div class="warning-info-address"></div>
            </div>
          </div>
          <div class="warning-btn">
            <div class="warning-btn-detail"></div>
            <div class="warning-btn-ignore"></div>
          </div>
        </div>
        <div class="warning-total">
          <div class="warning-total-cars">
            <div class="warning-total-title"></div>
            <div class="warning-total-data"></div>
          </div>
          <div class="warning-total-parking">
            <div class="warning-total-title"></div>
            <div class="warning-total-data"></div>
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
    return {};
  },
  components: {},
  mounted() {},
  created() {},
  mounted() {},
  methods: {}
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
        width: 100%;
        height: 1.706667rem;
        border-bottom:1px solid salmon;
        .warning-info {

        }
        .warning-btn {

        }
      }
      .warning-total {
      }
    }
  }
}
</style>


