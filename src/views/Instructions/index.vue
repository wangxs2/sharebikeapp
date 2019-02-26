<template>
  <div class="container">

    <div class="header">
      <img src="@/assets/image/evaluation/nav_1_back@2x.png"
           alt
           @click="toUserInfo">
      <div style="color:#333333"
           class="header-title">使用说明</div>
      <div></div>

    </div>

    <div class="content"
         ref="menuWrapper">
      <div class="content-top">
        <!-- <div class="menu-box">
          <div class="menu-iteam"
               v-for="(iteam,index) in menuList"
               :key="index"
               @click="toRouterIndex(iteam,index)">
            <img :src="iteam.imgUrl[selectIndex==index?1:0]">
            <span v-bind:style="{color:selectIndex==index?'#FFAE1F':'#ffffff'}">{{iteam.name}}</span>
          </div>
        </div> -->
      </div>
      <div class="content-bottom">
        <div class="content-bottom-box"
             style="margin-top:0.7rem">
          <div class="rules-bottom-img">
            自查
          </div>

          <div class="content-bottom-rules"
               style="width:100%;padding-bottom:0.5rem">
            <p style="text-align:left;margin:0;margin-top:0.8rem;line-height:0.64rem"><span style="font-weight: bolder">说明：</span>单车企业的巡检人员发现异常情况，主动处理</p>
            <div style="text-align:center">
              <img src="@/assets/image/Instructions/image_4@3x.png"
                   class="rules-img">
            </div>
            <p style="margin:0;margin-top:0.41rem;line-height:0.64rem"><span style="font-weight: bolder">1、发现异常：</span>巡检人员在街道上发现单车乱停放、或密 度大、或坏车较多等问题；</p>
            <p style="margin:0;margin-top:0rem;line-height:0.64rem"><span style="font-weight: bolder">2、登记：</span>在单车治理APP的第一栏“ <img class="rules-img1"
                   src="../../assets/image/login/icon_tab_1_pre@3x.png"><span style="color:#527AFF">自查</span> ”板块</p>
            <p style="justify-content: flex-start;margin:0;margin-top:0.1rem;">1）点击右上角有“ <img class="rules-img1"
                   src="../../assets/image/Instructions/icon_add@3x.png"> ”图标，即可进入自查登记页面；</p>
            <p style="justify-content: flex-start;margin:0;margin-top:0.18rem;">2）选择自查地点，然后拍摄现场的照片(不超过5张)；</p>
            <p style="justify-content: flex-start;margin:0;margin-top:0.18rem;line-height:0.64rem">3）点击页面左下方的 <span class="font-stylesa">暂存</span> 按钮，此时当前单会变成 <span class="font-stylesa1">处理中</span> 的状态；</p>
            <p style="justify-content: flex-start;margin:0;margin-top:0.18rem;">4）处理单车异常情况；</p>
            <p style="justify-content: flex-start;margin:0;margin-top:0.18rem;line-height:0.64rem">5）处理完成后，选择刚刚暂存的 <span class="font-stylesa1">处理中</span> 状态的自查单，上传处理后的照片，拍摄角度，保持一致，并填写整理数 量、清运数量；</p>
            <p style="justify-content: flex-start;margin:0;margin-top:0.18rem;line-height:0.64rem">6）点击页面右下方的 <span class="font-stylesa"
                    style="background:#5076FF">完成</span> 按钮，此时当前单会变成 <span class="font-stylesa1"
                    style="color:#09C504;border: 1px solid #09C504;">已处理</span> 的状态；</p>
          </div>
        </div>
        <div class="content-bottom-box"
             style="margin-top:0rem">
          <div class="rules-bottom-img">
            督办
          </div>

          <div class="content-bottom-rules"
               style="width:100%;padding-bottom:0.5rem">
            <p style="text-align:left;margin:0;margin-top:0.8rem;line-height:0.64rem"><span style="font-weight: bolder">说明：</span>巡检人员在街道上发现单车乱停放、或密 度大、或坏车较多等问题；</p>
            <div style="text-align:center">
              <img src="@/assets/image/Instructions/image_2@3x.png"
                   class="rules-img2">
            </div>
            <p style="margin:0;margin-top:0.41rem;line-height:0.64rem"><span style="font-weight: bolder">1、发现异常：</span>巡检人员在街道上发现单车乱停放、或密 度大、或坏车较多等问题；</p>
            <p style="margin:0;margin-top:0rem;line-height:0.64rem"><span style="font-weight: bolder">2、登记：</span>在单车治理APP的第二栏“ <img class="rules-img1"
                   src="../../assets/image/login/icon_tab_2_pre@3x.png"><span style="color:#527AFF">督办</span> ”板块</p>
            <p style="margin:0;margin-top:0.1rem;line-height:0.64rem">1）点击右上角有“ <img class="rules-img1"
                   src="../../assets/image/Instructions/icon_add@3x.png"> ”图标，即可进入派单登记页面；</p>
            <p style="margin:0;margin-top:0.16rem;line-height:0.64rem">2）选择派单地点，然后拍摄现场的照片(不超过5张)，选择“ <span style="color:#527AFF">派单企业</span> ”和“ <span style="color:#527AFF">处理方式</span> ”；</p>
            <p style="margin:0;margin-top:0.14rem;line-height:0.64rem">3）点击页面左下方的 <span class="font-stylesa"
                    style="background:#5076FF">派单</span> 按钮，此时企业会收到派单，当前单是 <span style="color:#FF0000;border: 1px solid #FF0000;"
                    class="font-stylesa1">未处理</span> 的状态；</p>
            <p style="margin:0;margin-top:0.18rem;">4）企业收到的派单会展示在督办的待办页面；</p>
            <p style="margin:0;margin-top:0.18rem;">5）企业按要求处理；</p>
            <p style="margin:0;margin-top:0.18rem;margin-left:0.5rem">1> 拍摄现场的照片（不超过5张）；</p>
            <p style="margin:0;margin-top:0.18rem;line-height:0.64rem;margin-left:0.5rem">2> 点击页面左下方的 <span class="font-stylesa">暂存</span> 按钮，此时当前单会变成 <span class="font-stylesa1">处理中</span> 的状态；</p>
            <p style="margin:0;margin-top:0.18rem;margin-left:0.5rem">3> 处理单车异常情况；</p>
            <p style="margin:0;margin-top:0.18rem;margin-left:0.5rem;line-height:0.64rem;">4> 处理完成后，选择刚刚暂存的 <span class="font-stylesa1">处理中</span>状态的待办单，上传处理后的照片，拍摄角度，保持一致， 并填写整理数量、清运数量；</p>
            <p style="margin:0;margin-top:0.18rem;margin-left:0.5rem;line-height:0.64rem;">5> 点击页面右下方的 <span class="font-stylesa">完成</span> 按钮，此时当前单就 处理完毕，在<span style="font-weight: bolder">“ 已处理 ”</span>列表下；</p>
            <p style="margin:0;margin-top:0.18rem;line-height:0.64rem">6）各企业处理完成后，会通知派单人员核实，派单人员 进入派单处理详情页面，可核实实际处理情况，可在页 面的右上角进行 <span style="font-weight: bolder">“ 反馈 ”</span>，根据实际情况可 <span class="font-stylesa"
                    style="background:#8F78F4">重新派单</span> 或 <span class="font-stylesa"
                    style="background:#5076FF">完结</span> 。</p>
          </div>
        </div>
        <div class="content-bottom-box"
             style="margin-top:0rem">
          <div class="rules-bottom-img">
            统计
          </div>

          <div class="content-bottom-rules"
               style="width:100%;padding-bottom:0.5rem">
            <p style="text-align:left;margin:0;margin-top:0.71rem;line-height:0.64rem"><span style="font-weight: bolder">说明：</span>
              此页面可统计的是各单车企业的近一周和近一个
              月的每天的治理情况，包括收到派单数、自检次数、整
              理次数、清运次数、整理车辆、清运车辆数。点击右上
              角的图标，可查看治理日报、周报和月报。
            </p>

          </div>
        </div>
        <div class="content-bottom-box"
             style="margin-top:0rem">
          <div class="rules-bottom-img">
            预警
          </div>

          <div class="content-bottom-rules"
               style="width:100%;padding-bottom:0.5rem">
            <p style="text-align:left;margin:0;margin-top:0.71rem;line-height:0.64rem"><span style="font-weight: bolder">说明：</span>
              该页面展示的是单车数量超过了预警数量的区域
              （仅包括禁停区和重点区）。
            </p>

          </div>
        </div>
        <div class="content-bottom-box"
             style="margin-top:0rem;margin-bottom:0.7rem">
          <div class="rules-bottom-img">
            我的
          </div>

          <div class="content-bottom-rules"
               style="width:100%;padding-bottom:0.5rem">
            <p style="text-align:left;margin:0;margin-top:0.71rem;line-height:0.64rem"><span style="font-weight: bolder">说明：</span>
              该页面个人中心页面，主要包括个人相关信息，
              个人的治理统计，修改密码、意见反馈、软件版本等信
              息。
            </p>

          </div>
        </div>
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
      selectIndex: 0,
      menuList: [
        {
          name: "自查",
          imgUrl: [
            require("@/assets/image/Instructions/icon_1_nor@3x.png"),
            require("@/assets/image/Instructions/icon_1_pre@3x.png")
          ],
        },
        {
          name: "督办",
          imgUrl: [
            require("@/assets/image/Instructions/icon_2_nor@3x.png"),
            require("@/assets/image/Instructions/icon_2_pre@3x.png")
          ],

        },
        {
          name: "统计",
          imgUrl: [
            require("@/assets/image/Instructions/icon_3_nor@3x.png"),
            require("@/assets/image/Instructions/icon_3_pre@3x.png")
          ],

        },
        {
          name: "预警",
          imgUrl: [
            require("@/assets/image/Instructions/icon_4_nor@3x.png"),
            require("@/assets/image/Instructions/icon_4_pre@3x.png")
          ],
        },
        {
          name: "我的",
          imgUrl: [
            require("@/assets/image/Instructions/icon_5_nor@3x.png"),
            require("@/assets/image/Instructions/icon_5_pre@3x.png")
          ],
        }
      ]
    };
  },
  components: {},
  mounted () {
    this.box = this.$refs.menuWrapper;
    //             监听这个dom的scroll事件
    this.box.addEventListener("scroll", this.handleScroll, false);
  },
  created () {
    if (this.$route.query.dailyType) {
      this.dailyType = this.$route.query.dailyType;
      this.getCleanArea();
    }
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    handleScroll () {
      if (this.$refs.menuWrapper.scrollTop < 139) {
        this.selectIndex = 0;
      }
      if (this.$refs.menuWrapper.scrollTop > 560) {
        // this.buttonScroll=true
        this.selectIndex = 1;
      }
      if (this.$refs.menuWrapper.scrollTop > 1519) {
        this.selectIndex = 2;
      }
    },
    //返回考评
    toUserInfo () {
      this.$router.push("/layout/me");
    },
    watchBackWXS () {
      this.toUserInfo();
    },
    toRouterIndex () {

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
    background: #ffffff;
    background-size: 100% 100%;
    flex: 1;
    .content-top {
      width: 100%;
      height: 4.87rem;
      background-image: url("../../assets/image/Instructions/image_1@3x.png");
      background-size: 100% 100%;
      // position: relative;
      .menu-box {
        position: fixed;
        display: flex;
        width: 100%;
        // height: 1.4rem;
        // background: #537bff;
        border-top: 1px solid #f6f6f6;
        z-index: 8887;
        box-sizing: border-box;
        padding-top: 0.55rem;
        padding-bottom: 0.55rem;
        .menu-iteam {
          flex: 1;
          width: 1px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.34rem;
          color: #aaaaaa;
          position: relative;

          img {
            width: 1rem;
            height: 1rem;
          }
          span {
            margin-top: 0.17rem;
          }
        }
      }
    }
    .content-bottom {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      // margin-bottom: 0.8rem;
      .content-bottom-box {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        // flex-direction: column;
        position: relative;
        .rules-bottom-img {
          position: absolute;
          top: -0.18rem;
          left: 20%;
          width: 60%;
          height: 1rem;
          line-height: 0.68rem;
          text-align: center;
          color: #ffffff;
          background-image: url("../../assets/image/Instructions/image_3@3x.png");
          background-size: 100% 100%;
        }
        .content-bottom-rules {
          margin: 0.28rem;
          // padding: 0.3rem 0.4rem;
          border-radius: 0.4rem;
          box-sizing: border-box;
          font-size: 0.37rem;
          color: #333333;
          display: flex;
          background: #ffffff;
          flex-direction: column;
          justify-content: center;
          .rules-img {
            height: 0.8rem;
            width: 7.6rem;
            margin-top: 0.44rem;
          }
          .rules-img2 {
            width: 8.8rem;
            height: 7rem;
            margin-top: 0.44rem;
          }
          p {
            .rules-img1 {
              width: 0.5rem;
              height: 0.5rem;
              vertical-align: middle;
              // margin-top: 0.2rem;
            }
            .font-stylesa {
              display: inline-block;
              background: #8f78f4;
              color: #ffffff;
              box-sizing: border-box;
              padding: 0rem 0.22rem;
              font-size: 0.34rem;
            }
            .font-stylesa1 {
              color: #ffc000;
              border: 1px solid #ffc000;
              box-sizing: border-box;
              padding: 0.04rem 0.12rem;
              border-radius: 0.12rem;
              font-size: 0.34rem;
            }
          }
        }
      }
    }
  }
}
</style>