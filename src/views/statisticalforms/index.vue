<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png"
           alt
           @click="toUserInfo">
      <div class="header-title">单车相关数据统计报表</div>
      <div></div>
    </div>
    <div class="content">
      <div class="content-top">
        <div class="info-box"
             style="margin-top:0"
             @click="toDaily('day')">
          <div class="info-title">治理日报</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <div class="info-box"
             style="margin-top:0"
             @click="toDaily('week')">
          <div class="info-title">治理周报</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <div class="info-box"
             style="margin-top:0"
             @click="toDaily('month')">
          <div class="info-title">治理月报</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <!-- <div class="info-box"
             style="margin-top:0"
             @click="toPassword">
          <div class="info-title">共享单车保有量日统计表</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div> -->
        <!-- <div class="info-box"
             @click="toProblemFeedback
        ">
          <div class="info-title">意见反馈</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <div class="info-box"
             @click="popupVisible = true">
          <div class="info-title">版本更新{{version}}</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div>
        <div class="info-box"
             v-if="userInfo.userName!=='caicc'"
             @click="todownload">
          <div class="info-title">下载方式</div>
          <img class="info-img"
               src="@/assets/image/settings/icon_next page@2x.png"
               alt>
        </div> -->
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
  data () {
    return {
      popupVisible: false,
      version: "",
      versionTime: "",
      versionDetail: []
    };
  },
  components: {},
  mounted () { },
  created () {
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    //返回个人中心
    toUserInfo () {
      this.$router.push("/layout/count");
    },
    watchBackWXS () {
      this.toUserInfo();
    },
    toDaily (val) {
      this.$router.push({
        path: "/statisticsDaily",
        query: {
          dailyType: val
        }
      });
    },
    //去保有量统计表
    toPassword () {
      this.$router.push("/installationCount");
    },

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
    background-color: #f2f2f2;
    display: flex;
    flex-direction: column;
    color: #282828;
    font-size: 0.426667rem;
    justify-content: space-between;
    .info-box {
      height: 1.306667rem;
      background-color: #fff;
      margin-top: 0.266667rem;
      box-shadow: 0px 1px 0px 0px rgba(221, 221, 221, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.2rem;
      .info-title {
        margin-left: 0.32rem;
      }
      .info-img {
        margin-right: 0.24rem;
        width: 0.373333rem;
        height: 0.373333rem;
        overflow: hidden;
      }
    }
  }
}
</style>