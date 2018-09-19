
<template>
  <div class="containerSa">
      <div class="header">
        <mt-header title="督办">
        </mt-header>
      </div>
      <div class="content" :style="{'-webkit-overflow-scrolling': scrollMode}">
        <nav @click="selectComany($event)">
          <div v-for="item in company" :key="item.id" :companyId="item.id" :class="[activeComany == item.id ? 'nav-active' : '']" class="nav-item">{{item.name}}</div>
        </nav>
        <div class="noneList" v-if="noneList">
            <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt="">
            <p style="color:#989898">暂时没有数据哦~</p>
        </div>
        <v-loadmore style="height:92%" v-if="!noneList" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" bottomPullText="已加载全部数据" :auto-fill="false" ref="loadmore">
          <div class="iteamList" v-for="(iteam, index) in pageList" @click="detailClick(iteam)">
              <div class="left">                  
                  <img v-if="iteam.dispachPhotoURLs.length!==0" :src="iteam.status == 2 ?Ip + iteam.handleAfterURLs[0]:Ip + iteam.dispachPhotoURLs[0]" alt="" width="90" height="90" srcset="">
                  <img v-if="iteam.status !== 2&&iteam.dispachPhotoURLs.length==0" src="../../../assets/image/selfcheck/image_no data@3x.png" alt="" width="90" height="90" srcset="">
              </div>              
              <div class="right">
                  <div class="topRight">
                      <span>{{FormatDate(iteam.dispatchTime)}}</span> 
                      <span style="margin-left:1rem" :class="iteam.status == 2 ? 'red' : 'green'">{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"处理中":"已完成"}}</span>
                  </div>
                  <div class="center">
                      当前处理人：{{iteam.currentHandler}}
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
import { Indicator } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      selected: "/layout/needtodo",
      noneList: false,
      searchCondition: {
        //分页属性
        page: "1",
        pageSize: "10",
        status: ""
      },
      company: [
        {
          id: 1,
          name: "待办"
        },
        {
          id: 2,
          name: "已办"
        }
      ], //导航
      activeComany: 1,
      pageList: [],
      allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: "auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
    };
  },
  components: {
    "v-loadmore": Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    // 推荐应用组件时用a-b形式起名
  },
  created() {
    if (this.$route.query.name == "2") {
      this.activeComany = 2;
      this.searchCondition.status = 2;
    }
  },
  mounted() {
    this.loadPageList(); //初次访问查询列表
  },
  methods: {
    detailClick(row) {
      if (row.status == 2) {
        this.$router.push({
          path: "/needtodoDetail",
          query: {
            id: row.id
          }
        });
      } else {
        this.$router.push({
          path: "/needtodoAdd",
          query: {
            id: row.id
          }
        });
      }
    },
    // 导航标签
    selectComany(e) {
      let id = e.target.getAttribute("companyId");
      this.activeComany = id;
      if (id == 1) {
        this.searchCondition.page = "1";
        this.searchCondition.status = "";
        this.loadPageList();
      } else if (id == 2) {
        this.searchCondition.page = "1";
        this.searchCondition.status = 2;
        this.loadPageList();
      }
    },
    iconClick() {
      this.$router.push("/selfCheckAdd");
    },
    // loadTop() {
    //组件提供的下拉触发方法
    //下拉加载
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
      this.$fetchGet("dispatch/pageDispatchToDo", this.searchCondition).then(
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
      this.searchCondition.page = parseInt(this.searchCondition.page) + 1;
      this.$fetchGet("dispatch/pageDispatchToDo", this.searchCondition).then(
        data => {
          this.pageList = this.pageList.concat(data.list);
          this.isHaveMore(data.hasNextPage);
        }
      );
    },
    isHaveMore(isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      this.allLoaded = true; //true是禁止上拉加载
      if (isHaveMore) {
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
  .header {
    width: 100%;
    // height: 1rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1rem;
    color: #fff;
  }
  .content {
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    box-sizing: border-box;
    // padding-top: 0.2rem;
    nav {
      width: 100%;
      height: 1.066667rem;
      box-shadow: 0 0 1px #ddd;
      // border-bottom: 1px solid #ddd;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .nav-item {
        flex: 1;
        text-align: center;
        color: #656565;
        font-size: 0.426667rem;
        line-height: 1.066667rem;
      }
      .nav-active {
        position: relative;
        color: #5076ff;
        &::after {
          content: "";
          position: absolute;
          bottom: 0px;
          left: 0;
          width: 100%;
          height: 0.04rem;
          background: #5076ff;
          // margin-left: -0.586667rem;
        }
      }
    }
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
    padding: 0.2rem 0.2rem;
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
        .green {
          color: #ffc000;
        }
        .red {
          color: #41cd76;
        }
      }
      .bottomRight {
        display: flex;
        width: 100%;
        height: 20px;
        color: #989898;
        justify-content: flex-start;
        .moreFont {
          width: 66%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>

