<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/evaluation/nav_1_back@2x.png" alt @click="toUserInfo">
      <div style="color:#333333" class="header-title">考评规则</div>
      <div></div>
    </div>
    <div class="content">
      <div class="content-top"></div>
      <div class="content-bottom">
        <div class="content-bottom-box" style="marrin-top:0.4rem">
          <div class="content-bottom-img">1.派单响应及时性</div>
        </div>
        <div class="content-bottom-box" style="margin-top:0.4rem;margin-bottom:0.2rem">
          <div class="content-bottom-font">——此项由系统评分——</div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <div class="content-bottom-rules">
            <div class="content-bottom-list">
              <span style="letter-spacing:0.78rem">说</span>
              <span>明：</span>
              <span style="line-height:0.6rem;margin-top:-0.06rem;">巡查人员发现异常情况登记后到企业处理派单的时间</span>
            </div>
            <div class="content-bottom-list">
              <span>分值占比：</span>
              <span>40%</span>
            </div>
            <div class="content-bottom-list">
              <span>评分标准：</span>
              <div class="standard-rules" style="margin-top:-0.07rem;">
                <div class="standard-rules-list">
                  <span style="width:2.7rem">0.5小时以内</span>
                  <div>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                  </div>
                </div>
                <div class="standard-rules-list">
                  <span style="width:2.7rem">0.5小时-1小时</span>
                  <div>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                  </div>
                </div>
                <div class="standard-rules-list">
                  <span style="width:2.7rem">1小时-1.5小时</span>
                  <div>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                  </div>
                </div>
                <div class="standard-rules-list">
                  <span style="width:2.7rem">1.5小时-2小时</span>
                  <div>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                  </div>
                </div>
                <div class="standard-rules-list">
                  <span style="width:2.7rem">2小时以上</span>
                  <div>
                    <img src="@/assets/image/evaluation/stars.png" alt srcset>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <div class="content-bottom-img">2.处理结果有效性</div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <div class="content-bottom-rules">
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">
                <span>拍照角度一致性</span>
              </div>
              <div>
                <div class="content-bottom-list">
                  <span style="letter-spacing:0.78rem">说</span>
                  <span>明：</span>
                  <span style="line-height:0.6rem;margin-top:-0.06rem;">照片角度是否一致，是否能看出是同一个 地点，照片的视野范围是否太小</span>
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
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">
                <span>处理数量与照片的一致性</span>
              </div>
              <div>
                <div class="content-bottom-list">
                  <span style="letter-spacing:0.78rem">说</span>
                  <span>明：</span>
                  <span style="line-height:0.6rem;margin-top:-0.06rem;">实际整理或清运数量是否与照片展现的一致，整理和清运数量是否写反</span>
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
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">
                <span>整理后的照片</span>
              </div>
              <div>
                <div class="content-bottom-list">
                  <span style="letter-spacing:0.78rem">说</span>
                  <span>明：</span>
                  <span style="line-height:0.6rem;margin-top:-0.06rem;">整理后，其他企业的单车或社会车辆是否停放错乱，照片清晰</span>
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
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">
                <span>处理方式</span>
              </div>
              <div>
                <div class="content-bottom-list">
                  <span style="letter-spacing:0.78rem">说</span>
                  <span>明：</span>
                  <span style="line-height:0.6rem;margin-top:-0.06rem;">派单的处理方式与企业的处理方式是否一致，反例：派单要求清运，而企业只做了整理的处理</span>
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
      version: "",
      versionTime: "",
      versionDetail: []
    };
  },
  components: {},
  mounted() {},
  created() {
  },
  methods: {
    //返回考评
    toUserInfo() {
      this.$router.push("/evaluation");
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
  background-color: #ffffff;
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
    // height: 100%;
    // flex: 1;
    // display: flex;
    // flex-direction: column;
    overflow-y: scroll;
    color: #282828;
    font-size: 0.426667rem;
    .content-top {
      width: 100%;
      height: 5.2rem;
      background-image: url("../../assets/image/evaluation/font-img.png");
      background-size: 100% 100%;
    }
    .content-bottom {
      width: 100%;
      height: 100%;

      //   display: flex;
      //   flex-direction: column;

      //   flex:none;
      .content-bottom-box {
        width: 100%;
        margin: 0.3rem 0;
        display: flex;
        justify-content: center;
        .content-bottom-img {
          width: 62%;
          height: 0.8rem;
          background-image: url("../../assets/image/evaluation/bj@2x.png");
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
          border: 0.06rem solid #fe876b;
          border-radius: 0.2rem;
          color: #ff4e25;
          display: flex;
          flex-direction: column;
          .content-bottom-list {
            display: flex;
            justify-content: flex-start;
            font-size: 0.39rem;
            align-items: flex-start;
            margin-bottom: 0.2rem;
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
            .content-bottom-rules-box1 {
              text-align: center;
              margin: 0.4rem 0 0.6rem 0;
              span {
                margin: 0;
                padding: 0.1rem 0.4rem;
                background: rgba(255, 156, 106, 0.6);
                color: #ff4e25;
                border-radius: 0.5rem;
                text-align: center;
              }
            }
          }
        }
      }
      .rules-bottom-img {
        width: 100%;
        height: 1.8rem;
        margin-top: 1rem;
        background-image: url("../../assets/image/evaluation/bj_4@2x.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>