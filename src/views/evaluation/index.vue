<template>
  <div class="container">
    <div class="header">
      <div class="header-header">
        <div class="header-setting">
          <img src="@/assets/image/infoModification/nav_1_back@2x.png" alt @click="toSettings">
        </div>
        <div class="header-tittle" style="margin-left:0.6rem">2018年12月考评</div>
        <div class="header-tittle" @click="rulesBox=!rulesBox">更多</div>
      </div>
      <div class="header-content">
        <div class="tab-btns" @click="selectView">
          <div class="btn-left" viewType="1" :class="[viewTypesa == 1 ? 'tab-active' : '']">考评</div>
          <div class="btn-right" viewType="2" :class="[viewTypesa == 2 ? 'tab-active' : '']">被考评</div>
        </div>
        <div class="historical-rules" v-if="rulesBox">
            <div class="rules-box">
                <img src="@/assets/image/evaluation/history.png" alt="" srcset="">
                <span>历史考评</span>
            </div>
            <div class="rules-box" @click="toRules" style="border:none">
                <img src="@/assets/image/evaluation/ruls@2x (1).png" alt="" srcset="">
                <span>考评规则</span>
            </div>
        </div>
      </div>
    </div>
    <div class="content"></div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      userCount: {},
      viewTypesa: "1",
      rulesBox:false,
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
      this.$fetchGet("evaluation/monthEvaluation").then(res => {
        this.userCount = res;
      });
    },
    //进入个人信息修改
    toUserModi() {
      this.$router.push("/infoModification");
    },
    //进入个人中心
    toSettings() {
      this.$router.push("/layout/me");
    },
    //进入考评
    toEvaluation() {
      this.$router.push("/evaluation");
    },
    toRules(){
        this.$router.push("/evaluationrules");
    },
    //考评切换
    selectView(e) {
      let type = e.target.getAttribute("viewType");
      if (type) {
        this.viewTypesa = type;
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
  flex-direction: column;
  .header {
    width: 100%;
    height: 2.273333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    padding: 0 0.346667rem;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    .header-header {
      height: 1.173333rem;
      display: flex;
      flex-direction: row;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      .header-tittle {
        line-height: 1.173333rem;
        font-size: 0.48rem;
      }
      .header-setting {
        height: 0.48rem;
        width: 0.266667rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
    .header-content {
      display: flex;
      justify-content: center;
      position: relative;
      .tab-btns {
        display: flex;
        margin-bottom: 0.18rem;
        .btn-left {
          box-sizing: border-box;
          padding: 3px 20px;
          font-size: 0.373333rem;
          color: #ffffff;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border: 1px solid #ffffff;
          border-right: none;
        }
        .btn-right {
          box-sizing: border-box;
          padding: 3px 20px;
          // line-height: normal;
          font-size: 0.373333rem;
          color: #ffffff;
          border-top-right-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          border: 1px solid #ffffff;
          border-left: none;
        }
        .tab-active {
          color: #5076ff;
          background: #ffffff;
        }
      }
      .historical-rules{
          position: absolute;
          top: -0.2rem;
          right: -0.1rem;
          width: 2.8rem;
          height: 2rem;
          background: #ffffff;
          border-radius: 0.1rem;
          box-shadow: 0 0 0.1rem #dddddd;
          display: flex;
          flex-direction: column;
          .rules-box{
              display: flex;
              justify-content: flex-start;
              align-items: center;
              border-bottom: 1px solid #eeeeee;
              padding: 0.3rem;
              img{
                  width: 0.5rem;
                  height: 0.5rem;
                  margin-right: 0.1rem;
              }
              span{
                  color: #333333;
                  font-size: 0.373333rem;
              }
          }
      }
    }
  }
  .content {
    flex: 1;
  }
}
</style>



