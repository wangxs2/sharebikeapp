
<template>
  <div class="containerSa">
      <div class="header">
        <mt-header title="督办">
        </mt-header>
      </div>
      <div class="content">
        <nav @click="selectComany($event)">
          <div v-for="item in company" :key="item.id" :companyId="item.id" :class="[activeComany == item.id ? 'nav-active' : '']" class="nav-item">{{item.name}}</div>
        </nav>
        <div class="noneList" v-if="noneList">
            <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt="">
            <p style="color:#989898">暂时没有数据哦~</p>
        </div>
        <scroller style="top: 2.5rem;bottom:55px;height:82%;overflow:hidden" v-if="!noneList" :on-infinite="infinite" :on-refresh="refresh" infiniteText="上拉加载" noDataText="--我也是有底线的--" ref="my_scroller">
            <div class="iteamListSa" v-for="(iteam, index) in pageList" :key="index" @click="detailClick(iteam)">
              <div class="leftSa">                  
                  <img v-if="iteam.dispachPhotoURLs.length!==0" :src="Ip + iteam.dispachPhotoURLs[0]" alt="" width="90" height="90" srcset="">
                  <img v-if="iteam.dispachPhotoURLs.length==0" src="../../../assets/image/selfcheck/image_no data@3x.png" alt="" width="90" height="90" srcset="">
              </div>
              <div class="rightSa">
                  <div class="topRight">
                      <span>{{FormatDate(iteam.dispatchTime)}}</span>
                       <span style="margin-left:1rem" :class="iteam.status == 2 ? 'red':iteam.status == 0 ? 'blue':iteam.status == 4 ? 'pink' : 'green'">{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"已转派":"已完成"}}</span>
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
        page: 0,
        pageSize: 15,
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
    };
  },
  components: {

  },
  created() {
    if (this.$route.query.name == "2") {
      this.activeComany = 2;
      this.searchCondition.status = 2;
    }
  },
  mounted() {
  },
  methods: {
    detailClick(row) {
      console.log(row)
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
      this.pageList=[]
      if (id == 1) {
        this.searchCondition.page = 0;
        this.searchCondition.status = "";
        this.infinite();
      } else if (id == 2) {
        this.searchCondition.page = 0;
        this.searchCondition.status = 2;
        this.infinite();
      }
    },
    iconClick() {
      this.$router.push("/selfCheckAdd");
    },
   infinite(done) {
      console.log("infinite");
      this.searchCondition.page++;
      this.$fetchGet("dispatch/pageDispatchToDo", this.searchCondition).then(
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
      this.$fetchGet("dispatch/pageDispatchToDo",{
        page: 1,
        pageSize: 15,
        status:this.searchCondition.status
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

<style lang="scss" scoped>
._v-container{
  height: 84% !important;
  background-color: transparent;
}
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
<style lang="scss">
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
</style>
