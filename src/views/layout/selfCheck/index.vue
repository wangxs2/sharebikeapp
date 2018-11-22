
<template>
  <div class="containerSa">
      <div class="header">

        <mt-header title="自查">
            <mt-button class="iconfont icon-gengduo" style="font-size:24px" slot="right" @click="iconClick">
            </mt-button>
        </mt-header>
      </div>
      <div class="noneList" v-if="noneList">
            <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt="">
            <p style="color:#989898">暂时没有自查数据哦~</p>
      </div>
      <scroller style="top: 1.25rem;bottom:55px;height:82%" v-if="!noneList" :on-infinite="infinite" :on-refresh="refresh" infiniteText="上拉加载" noDataText="--我也是有底线的--" ref="my_scroller">
            <div class="iteamListSa" v-for="(iteam, index) in pageList" @click="detailClick(iteam)">
                <div class="leftSa">                
                    <img :src="iteam.status == 1 ? Ip + iteam.handleBeforeURLs[0] : Ip + iteam.handleAfterURLs[0]" alt="" width="90" height="90" srcset="">
                </div>
                <div class="rightSa">
                    <div class="topRight">
                        <span>{{FormatDate(iteam.updateTime)}}</span> 
                        <span style="margin-left:1rem" :class="iteam.status == 1 ? 'green' : 'red'">{{iteam.status == 1 ? '处理中' : "已处理"}}</span>
                    </div>
                    <div class="center">
                        {{iteam.orgName}}： 整理{{iteam.arrangeNum}}辆，清运{{iteam.cleanNum}}辆
                    </div>
                    <div class="bottomRight">
                        <span class="iconfont icon-weizhi"></span>
                        <span class="moreFont">{{iteam.handleAddr}}</span>
                    </div>
                </div>
            </div>
        </scroller>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      selected: "/layout/selfCheck",
      noneList: false,
      searchCondition: {
        page: "0",
        pageSize: "15"
      },
      pageList: []
    };
  },
  components: {},
  created() {
  },
  mounted() {},
  methods: {
    detailClick(row) {
      if (row.status == 2) {
        this.$router.push({
          path: "/selfCheckdetail",
          query: {
            message: row.sheetCode
          }
        });
      } else {
        this.$router.push({
          path: "/selfCheckAdd",
          query: {
            message: row.sheetCode
          }
        });
      }
    },
    iconClick() {
      this.$router.push("/selfCheckAdd");
    },
    infinite(done) {
      this.searchCondition.page++;
      this.$fetchGet("selfcheck/pageSelfCheck", this.searchCondition).then(
        res => {
          if (res.list.length !== 0) {
            this.pageList = this.pageList.concat(res.list);
            done();
          } else {
            done(true);
          }
        }
      );
    },
    refresh: function() {
      //下拉刷新
      // console.log("refresh");
      this.timeout = setTimeout(() => {
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1500);
    },
  }
};
</script>

<style lang="scss">
.containerSa {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .header {
    width: 100%;
    height: 1.173333rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1.173333rem;
    color: #fff;
  }
  .noneList {
    flex: 1;
    line-height: 1;
    text-align: center;
    margin-top: 2rem;
  }
  .iteamListSa {
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    border-bottom: 1px solid #eeeeee;
    .leftSa {
      display: flex;
      flex: 1;
    }
    .rightSa {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 0.2rem;
      flex-direction: column;
      .topRight {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        .green {
          color: #ffc000;
        }
        .red {
          color: #41cd76;
        }
      }
      .center {
        width: 100%;
        display: flex;
        flex: 1;
        box-sizing: border-box;
      }
      .bottomRight {
        display: flex;
        width: 100%;
        height: 20px;
        color: #989898;
        justify-content: flex-start;
        .moreFont {
          width: 68%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
