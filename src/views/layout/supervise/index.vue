
<template>
  <div class="containerSa">
      <div class="header">
        <mt-header title="派单">
            <mt-button class="iconfont icon-gengduo" style="font-size:24px" slot="right" @click="iconClick">
                
            </mt-button>
        </mt-header>
      </div>
      <div class="noneList" v-if="noneList">
            <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt="">
            <p style="color:#989898">暂时没有数据哦~</p>
      </div>
      <scroller style="top: 1.25rem;bottom:55px;height:82%" v-if="!noneList" :on-infinite="infinite" :on-refresh="refresh" infiniteText="上拉加载" noDataText="--我也是有底线的--" ref="my_scroller">
            <div class="iteamListSa" v-for="(iteam, index) in pageList" :key="index" @click="detailClick(iteam)">
              <div class="leftSa">                  
                  <img v-if="iteam.dispachPhotoURLs.length!==0" :src="Ip + iteam.dispachPhotoURLs[0]" alt="" width="90" height="90" srcset="">
                  <img v-if="iteam.dispachPhotoURLs.length==0" src="../../../assets/image/selfcheck/image_no data@3x.png" alt="" width="90" height="90" srcset="">
              </div>
              <div class="rightSa">
                  <div class="topRight">
                      <span>{{FormatDate(iteam.dispatchTime)}}</span>
                       <span style="margin-left:1rem" :class="iteam.status == 2 ? 'red':iteam.status == 0 ? 'blue':iteam.status == 4 ? 'pink' : 'green'">{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"重新派单":"已完成"}}</span>
                      <!-- <p style="width:0.1rem"></p> -->
                  </div>
                  <div class="center">
                    <span>{{iteam.dispatchReceive}}</span>
                    <span v-if="iteam.status == 2||iteam.status==4" style="margin-left:0.1rem">【{{iteam.dealTime}}】</span>
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
      selected: "/layout/supervise",
      noneList: false,
      searchCondition: {
        page: 0,
        pageSize: 15
      },
      pageList: []
    };
  },
  components: {},
  mounted() {
    // this.loadPageList();
    if (this.$route.query.supervise) {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          supervise: this.$route.query.supervise,
          statuSa: 2
        }
      });
    }
  },
  created() {},
  methods: {
    detailClick(row) {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          supervise: row.sheetCode,
          statuSa: row.status
        }
      });
    },
    iconClick() {
      this.$router.push("/superviseAdd");
    },
    infinite(done) {
      this.searchCondition.page++;
      this.$fetchGet("dispatch/pageDispatch", this.searchCondition).then(
        res => {
          if (res.list.length !== 0) {
            // this.noneList=false
            this.pageList = this.pageList.concat(res.list);
            done();
          } else {
            // this.noneList=true
            done(true);
          }
        }
      );
    },
    refresh: function() {
      //下拉刷新
      // console.log("refresh");
      this.$fetchGet("dispatch/pageDispatch",{
        page: 1,
        pageSize: 15
      }).then(
        res => {
          this.pageList=res.list
        }
      );
      this.timeout = setTimeout(() => {
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1000);
    }
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
        .blue{
          color: red;
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


