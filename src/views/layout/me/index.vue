<template>
  <div class="container">
    <div class="header">
      <div class="header-header">
        <div class="header-setting"></div>
        <div class="header-tittle">个人中心</div>
        <div class="header-setting"><img src="@/assets/image/me/icon_nav_set@2x.png" alt="" @click="iconClick"></div>
      </div>
      <div class="header-content">
        <img class="user-avatar" :src="Ip + userInfo.imageURL" alt="" v-if="userInfo.imageURL">
        <img class="user-avatar" src="@/assets/image/me/默认头像@2x.png" alt="" v-else>
        <div class="user-info">
          <div class="user-name" v-text="userInfo.realName"></div>
          <div class="user-gender">
            <img src="@/assets/image/me/icon_woman@2x.png" alt="" v-if="userInfo.sex == 'W'">
            <img src="@/assets/image/me/icon_man@2x.png" alt="" v-else>
          </div>
        </div>
        <div class="user-email" v-text="'email: ' + userInfo.emailAddr"></div>
      </div>
    </div>
    <div class="content">
      <div class="static-box">
        <div class="static-box-left">
          <div class="static-img"><img src="@/assets/image/me/icon_3@2x.png" alt=""></div>
          <div class="static-title">收到派单</div>
        </div>
        <div class="static-data" v-text="userCount.dispatch"></div>
      </div>
      <div class="static-box">
        <div class="static-box-left">
          <div class="static-img"><img src="@/assets/image/me/icon_1@2x.png" alt=""></div>
          <div class="static-title">自检次数</div>
        </div>
        <div class="static-data" v-text="userCount.selfCheck"></div>
      </div>
      <div class="static-box">
        <div class="static-box-left">
          <div class="static-img"><img src="@/assets/image/me/icon_2@2x.png" alt=""></div>
          <div class="static-title">整理车辆</div>
        </div>
        <div class="static-data" v-text="userCount.arrangeNum"></div>
      </div>
      <div class="static-box">
        <div class="static-box-left">
          <div class="static-img"><img src="@/assets/image/me/icon_3@2x.png" alt=""></div>
          <div class="static-title">清运车辆</div>
        </div>
        <div class="static-data" v-text="userCount.cleanNum"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      userCount: {}
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getData();
  },
  methods: {
    //获取数据
    getData() {
      this.$fetchGet("count/countByUser").then(res => {
        this.userCount = res;
      });
    },
    //进入个人信息修改
    iconClick() {
      this.$router.push("/infoModification");
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
    width: 100%;
    height: 5.973333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    padding: 0 0.346667rem;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;

    .header-header {
      height: 1.173333rem;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      .header-tittle {
        line-height: 1.173333rem;
        font-size: 0.48rem;
      }
      .header-setting {
        height: 0.48rem;
        width: 0.48rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .header-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .user-avatar {
        height: 1.706667rem;
        width: 1.706667rem;
        border: 0.106667rem solid rgb(169, 191, 252);
        border-radius: 50%;
      }
      .user-info {
        display: flex;
        height: 0.48rem;
        width: 8rem;
        justify-content: center;
        margin-top: 0.293333rem;
        .user-name {
          font-size: 0.426667rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user-gender {
          margin-left: 0.466667rem;
          height: 0.48rem;
          width: 0.48rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .user-email {
        margin-top: 0.36rem;
        font-size: 0.346667rem;
        width: 9rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .content {
    flex: 1;
    .static-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0px 1px 0px 0px rgba(221, 221, 221, 0.5);
      margin-bottom: 1px;
      height: 2.133333rem;
      .static-box-left {
        display: flex;
        align-items: center;
        margin-left: 0.32rem;
        .static-img {
          height: 0.64rem;
          width: 0.64rem;
          img {
            height: 100%;
            width: 100%;
          }
        }
        .static-title {
          margin-left: 0.24rem;
          color: #282828;
          font-size: 0.4rem;
        }
      }
      .static-data {
        margin-right: 0.36rem;
        color: #282828;
        font-size: 0.586667rem;
      }
    }
  }
}
</style>



