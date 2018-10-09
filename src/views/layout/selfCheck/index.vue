
<template>
  <div class="containerSa">
      <div class="header">
        <!-- 自查
        <mt-button icon="more" slot="right"></mt-button> -->
        <mt-header title="自查">
            <mt-button class="iconfont icon-gengduo" style="font-size:24px" slot="right" @click="iconClick">
                
            </mt-button>
        </mt-header>
      </div>
        <div class="content" :style="{'-webkit-overflow-scrolling': scrollMode}">
          <div class="noneList" v-if="noneList">
            <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt="">
            <p style="color:#989898">暂时没有自查数据哦~</p>
          </div>
          <v-loadmore v-if="!noneList" :bottom-method="loadBottom" bottomDropText="释放更新" :bottomPullText="bottomPullText" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
            <div class="iteamList" v-for="(iteam, index) in pageList" @click="detailClick(iteam)">
                <div class="left">                
                    <img :src="iteam.status == 1 ? Ip + iteam.handleBeforeURLs[0] : Ip + iteam.handleAfterURLs[0]" alt="" width="90" height="90" srcset="">
                </div>
                <div class="right">
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
          </v-loadmore>
        </div>

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
      bottomPullText: "已加载全部数据",
      searchCondition: {
        //分页属性
        page: "1",
        pageSize: "100"
      },
      pageList: [],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: "touch" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    };
  },
  components: {
    "v-loadmore": Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    // 推荐应用组件时用a-b形式起名
  },
  created() {},
  mounted() {
    this.loadPageList(); //初次访问查询列表
  },
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
    // loadTop() {
    //组件提供的下拉触发方法
    //下拉加载
    // this.searchCondition.page = parseInt(this.searchCondition.page) - 1;
    // this.loadPageList();
    // this.$refs.loadmore.onTopLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    // },
    loadBottom() {
      // 上拉加载
      this.more(); // 上拉触发的分页查询
      this.$refs.loadmore.onBottomLoaded(); // 固定方法，查询完要调用一次，用于重新定位
    },
    loadPageList() {
      // 查询数据
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.$fetchGet("selfcheck/pageSelfCheck", this.searchCondition).then(
        data => {
          if (data.list.length == 0) {
            this.noneList = true;
          } else {
            this.noneList = false;
          }
          Indicator.close();
          // console.log(data);
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(data.hasNextPage);
          this.pageList = data.list;
          this.$nextTick(function() {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
            this.scrollMode = "touch";
          });
        }
      );
    },
    more() {
      // 分页查询
       Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      this.searchCondition.page = parseInt(this.searchCondition.page) + 1;
      this.$fetchGet("selfcheck/pageSelfCheck", this.searchCondition).then(
        data => {
          Indicator.close();
          this.pageList = this.pageList.concat(data.list);
          this.isHaveMore(data.hasNextPage);
        }
      );
    },
    isHaveMore(isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.bottomPullText = "已加载全部数据";
      this.allLoaded = true; //true是禁止上拉加载

      if (isHaveMore) {
        this.bottomPullText = "已加载全部数据";
        this.allLoaded = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
  .content {
    flex: 1;
    // overflow: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-top: 0.2rem;
    .noneList {
      flex: 1;
      line-height: 1;
      text-align: center;
      margin-top: 2rem;
    }
  }
}

</style>
<style  lang="scss">
.containerSa {
  .iteamList {
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    padding: 0.1rem 0.2rem;
    border-bottom: 1px solid #eeeeee;
    .left {
      display: flex;
      flex: 1;
    }
    .right {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 0.2rem;
      flex-direction: column;
      .topRight {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        // p{
        //   flex:1;
        // }
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
        padding-top: 0.2rem;
      }
      .bottomRight {
        display: flex;
        width: 100%;
        height: 20px;
        color: #989898;
        justify-content: flex-start;
        .moreFont {
          width: 81%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

