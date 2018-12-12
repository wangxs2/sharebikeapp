
<template>
  <div class="containerSa2">
      <div class="header">
        <div>
          <!-- <img
            src="../../../assets/image/selfcheck/icon_2_address@3x.png"
            width="24"
            height="24"
            alt
            srcset
          > -->
        </div>
        <div class="tab-btns" @click="selectView">
          <div class="btn-left" viewType="1" :class="[viewTypesa == 1 ? 'tab-active' : '']">待办</div>
          <div class="btn-right" viewType="2" :class="[viewTypesa == 2 ? 'tab-active' : '']">已办</div>
        </div>
        <div>

        </div>
      </div>
      <div class="content">
        <div class="version-popup-box">
      <div class="version-popup">
        <div @click="sort">
          <span
            class="version-popup-font"
            :class="[areaname.name == '区域' ? '' : 'version-popup-font-active']"
          >{{areaname.name}}</span>
          <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-show="downIcon"></span>
          <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-show="!downIcon"></span>
        </div>
        <div @click="sort1">
          <span class="version-popup-font" :class="[companyname.name == '处理人' ? '' : 'version-popup-font-active']">{{companyname.name}}</span>
          <span style="color:#AAAAAA" class="iconfont icon-jiantou" v-show="downIcon1"></span>
          <span style="color:#AAAAAA" class="iconfont icon-arrow-up" v-show="!downIcon1"></span>
        </div>
        
      </div>
    </div>
    <!-- 区域的划分 -->
    <div class="version-popup-box1" v-show="!downIcon">
      <div class="version-popup">
        <div class="variable">
          <div class="menself">
            <p v-if="areakids.length==0" style="color:#999999;text-align:center">暂无数据</p>
            <div style="padding:0rem;background: #f2f2f2;">
              <div class="areacheck" v-if="areaarr.length>0">
                <p
                  class="areachecklist"
                  @click="areaTypeclick(iteam,index)"
                  :class="[viewType == iteam.id ? 'tab-active' : '']"
                  v-for="(iteam, index) in areaarr"
                  :key="index"
                >{{iteam.name}}</p>
              </div>
            </div>
            <div>
              <p
                class="menselflist"
                @click="areaTypeclick1(iteam)"
                v-for="(iteam, index) in areakids"
                :key="index"
                :class="[viewType1 == iteam.id ? 'menselflist-active' : '']"
              >{{iteam.name}}</p>
              <!-- <p v-if="areakids.length==0" style="text-align:center;color:#999999">暂无数据</p> -->
            </div>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset()">重置</p>
          <p @click="submit()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!-- 区域的划分 -->
    <!-- 处理人弹框 -->
    <div class="version-popup-box1" v-show="!downIcon1">
      <div class="version-popup">
        <div class="variable">
          <div class="menself">
            <p v-if="menData.length==0" style="color:#999999;text-align:center">暂无数据</p>
            <p class="menselflist" v-for="(iteam, index) in menData" :key="index"  @click="menTypeclick(iteam)" :class="[menType == iteam.id ? 'menselflist-active' : '']">{{iteam.realName}}</p>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="menReset1()">重置</p>
          <p @click="submit1()" style="border:none">确定</p>
        </div>
      </div>
    </div>
    <!-- 处理人弹框 -->
        <div class="noneList" v-if="noneList">
            <img src="../../../assets/image/selfcheck/image_no data@3x.png" width="200" height="180" alt="">
            <p style="color:#989898">暂时没有数据哦~</p>
        </div>
        <scroller style="top: 2.4rem;bottom:55px;height:82%;overflow:hidden" v-if="!noneList" :on-infinite="infinite" :on-refresh="refresh" infiniteText="上拉加载" noDataText="--我也是有底线的--" ref="my_scroller">
          <div class="iteamsa">
            <div class="iteamListSa" v-for="(iteam, index) in pageList" :key="index" @click="detailClick(iteam)">
              <div class="leftSa">                  
                  <img v-if="iteam.dispachPhotoURLs.length!==0" :src="Ip + iteam.dispachPhotoURLs[0]" alt="" width="90" height="90" srcset="">
                  <img v-if="iteam.dispachPhotoURLs.length==0" src="../../../assets/image/selfcheck/image_no data@3x.png" alt="" width="90" height="90" srcset="">
              </div>
              <div class="rightSa">
                  <div class="topRight">
                      <span>{{FormatDate(iteam.dispatchTime)}}</span>
                       <span style="font-size:0.36rem" :class="iteam.status == 2 ? 'red':iteam.status == 0 ? 'blue':iteam.status == 4 ? 'pink' : 'green'">{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"已转派":"已完成"}}</span>
                      <!-- <p style="width:0.1rem"></p> -->
                  </div>
                  <div class="center">
                    <p>{{iteam.dispatchReceive}}</p>
                    <p v-if="iteam.status == 2||iteam.status==4" style="margin-left:0.1rem;margin-top:0.2rem"><span style='color:#666666;'>处理时长：</span><span style='color:#5076FF;'>{{iteam.dealTime}}</span></p>
                  </div>
                  <div class="bottomRight">
                      <span class="iconfont icon-weizhi"></span>
                      <span class="moreFont">{{iteam.handleAddr}}</span>
                  </div>
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
      viewType: "",
      viewType1: "",
      viewType2: "",
      popupVisible: true,
      viewTypesa:1,//待办
      areaflag: true, //是否包含flag
      menType: "",
      downIcon: true,
      downIcon1: true,
      downIcon2: true,
      areaname: {
        name: "区域",
        id: ""
      },
      companyname: {
        name: "处理人",
        id: ""
      },
      noneList: false,
      searchCondition: {
        //分页属性
        page: 0,
        pageSize: 15,
        status: "",
        handleBy:"",
        areaId:"",
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
      UserArea: [],
      pageList: [],
      companyData: [], //查询单车企业
      areaarr: [],
      areaarr1: [],
      areakids: [],
      menData: []
    };
  },
  components: {

  },
  created() {
    if (this.$route.query.name == "2") {
      this.activeComany = 2;
      this.searchCondition.status = 2;
    }
    // this.getBikeCompany();
    this.getBikeMen();
    this.getorgsTree();
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
    menReset() {
      this.viewType='';
      this.viewType1='';
      this.areaname.name = "区域";
      this.pageList=[];
      this.searchCondition.areaId='';
      this.searchCondition.page= "0",
      this.searchCondition.pageSize= "15",
      this.infinite();
      this.downIcon=true;
    },
    menReset1() {
      this.viewType2='';
      this.companyname.name = "处理人";
      this.pageList=[];
      this.searchCondition.handleBy='';
      this.searchCondition.page= "0",
      this.searchCondition.pageSize= "15",
      this.infinite();
      this.downIcon1=true;
    },
    submit(){
      this.pageList=[];
      this.searchCondition.areaId=this.areaname.id;
      this.searchCondition.page= "0",
      this.searchCondition.pageSize= "15",
      this.infinite();
      this.downIcon=true;
    },
    submit1(){
      this.pageList=[];
      this.searchCondition.handleBy=this.companyname.id;
      this.searchCondition.page= "0",
      this.searchCondition.pageSize= "15",
      this.infinite();
      this.downIcon1=true;
    },
    //代办切换
    selectView(e) {
      let type = e.target.getAttribute("viewType");
      if (type) {
        this.viewTypesa = type;
          this.activeComany = type;
          this.pageList=[]
          if (type == 1) {
            this.searchCondition.page = 0;
            this.searchCondition.status = "";
            this.infinite();
          } else if (type == 2) {
            this.searchCondition.page = 0;
            this.searchCondition.status = 2;
            this.infinite();
          }


      }
    },
     //切换图片；
    sort() {
      this.downIcon = !this.downIcon;
      this.downIcon1 = true;
      this.downIcon2 = true;
    },
    sort1() {
      this.downIcon1 = !this.downIcon1;
      this.downIcon = true;
      this.downIcon2 = true;
    },
        getorgsTree() {
      //获取组织树数据
      this.$fetchGet("org/getUserArea").then(res => {
        this.UserArea = res;
        let originTree = this.parseChildren(1, res.slice(0));
        this.deleteChildren(originTree);
        this.areakids = originTree;
      });
    },
    parseChildren(pid, json) {
      //格式父级权限
      var arr = [];
      $.each(json, (index, item) => {
        // item.Ids = item.pid + "," + item.id;
        if (item.pid === pid) {
          arr.push(item);
          item.children = this.parseChildren(item.id, json);
        }
      });
      return arr;
    },
    deleteChildren(menuData) {
      //删除空的child
      $.each(menuData, (index, item) => {
        if (item.children && item.children.length) {
          this.deleteChildren(item.children);
        } else {
          delete item.children;
        }
      });
    },
    // 获取单车企业数据
    getBikeCompany() {
      this.$fetchGet("count/bikeCompany").then(res => {
        this.companyData = res;
      });
    },
    //获取处理人数据
    getBikeMen() {
      this.$fetchGet("dispatch/listSearchUser", {
        type: "3"
      }).then(res => {
        this.menData = res;
      });
    },
    menTypeclick(val) {
      this.menType = val.id;
      this.menname.name = val.realName;
      this.menname.id = val.id;
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
      this.$fetchGet("dispatch/pageDispatchToDo",{
        page: 1,
        pageSize: 15,
        status:this.searchCondition.status,
         handleBy:this.searchCondition.handleBy,
        areaId:this.searchCondition.areaId,
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
  height: 88% !important;
  background-color: transparent;
}
.containerSa2 {
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
    .tab-btns {
        display: flex;
        margin: 10px 0 10px 0;
        .btn-left {
          box-sizing: border-box;
          padding: 6px 20px;
          font-size: 0.373333rem;
          color: #ffffff;
          border-top-left-radius: 0.5rem;
          border-bottom-left-radius: 0.5rem;
          border: 1px solid #ffffff;
          border-right: none;
        }
        .btn-right {
          box-sizing: border-box;
          padding: 6px 20px;
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
  }
  .content {
    flex: 1;
    overflow: hidden;
    flex-direction: column;
    box-sizing: border-box;
    background: #f2f2f2;
    .iteamsa {
    width:100%;
    box-sizing: border-box;
     .iteamListSa {
        display: flex;
        justify-content: space-between;
        background: #ffffff;
        box-sizing: border-box;
         margin-bottom: 0.2rem;
         padding: 0.3rem;
        border-bottom: 1px solid #eeeeee;
        .leftSa {
          // display: flex;
          // flex: 1;
        }
        .rightSa {
          width: 0;
          display: flex;
          flex: 1;
          box-sizing: border-box;
          padding: 0 0.2rem;
          flex-direction: column;
          .topRight {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .green {
              color: #ffc000;
              border: 1px solid #ffc000;
                box-sizing: border-box;
                padding: 0.06rem;
                border-radius: 5px;
            }
            .red {
              color: #41cd76;
              border: 1px solid #41cd76;
                box-sizing: border-box;
                padding: 0.06rem;
                border-radius: 5px;
            }
            .blue{
              color: red;
              border: 1px solid red;
                box-sizing: border-box;
                padding: 0.06rem;
                border-radius: 5px;
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
    .version-popup-box {
    height: 1.2rem;
    width: 100%;
    background: #ffffff;
    border-bottom: 1px solid #eeeeee;
    color: #282828;
    position: fixed;
    top: 1.173333rem;
    left: 0;
    z-index: 8888;
    .version-popup {
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      justify-content: center;
      div {
        display: flex;
        flex: 1;
        width: 1.8rem;
        justify-content: center;
        margin: 0.2rem;
        border-right: 1px solid #eeeeee;
        .version-popup-font {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #333333;
        }
        .version-popup-font-active {
          color: #5076ff;
        }
      }
    }
  }
  .version-popup-box1 {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.5);
    color: #282828;
    position: fixed;
    top: 2.369rem;
    left: 0;
    z-index: 8888;
    .version-popup {
      display: flex;
      width: 100%;
      height: 60%;
      background: #ffffff;
      flex-direction: column;
      .variable {
        width: 100%;
        flex: 1;
        border-top: 1px solid #eeeeee;
        overflow: hidden;
        overflow-y: scroll;
        .menself {
          display: flex;
          flex-direction: column;
          .menselflist {
            margin: 0 0.3rem;
            padding: 0.3rem;
            border-bottom: 1px solid #eeeeee;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .menselflist-active {
            color: #5076ff;
          }
          .areacheck {
            height: 1rem;
            width: 100%;
            display: flex;
            line-height: 1rem;
            align-items: center;
            flex-direction: row;
            // padding: 0rem 0.3rem;
            // padding-right: 0.3rem;
            .areachecklist {
              margin: 0;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              flex: 1;
              height: 1rem;
              text-align: center;
              // padding: 0;
            }
            .tab-active1 {
              color: #5076ff;
            }
            .tab-active {
              color: #5076ff;
              position: relative;
              &::after {
                content: "";
                position: absolute;
                bottom: 0px;
                left: 50%;
                width: 1.173333rem;
                height: 0.08rem;
                background: #5076ff;
                margin-left: -0.586667rem;
              }
            }
          }
          .mencheck {
            margin: 0.3rem;
            padding: 0;
            padding-bottom: 0.3rem;
            margin-bottom: 0rem;
            color: #333333;
            border-bottom: 1px solid #eeeeee;
          }
        }
      }
      .bottomsa {
        width: 100%;
        height: 1rem;
        border-top: 1px solid #eeeeee;
        color: #999999;
        display: flex;
        justify-content: space-between;
        p {
          margin: 0;
          padding: 0;
          width: 50%;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-right: 1px solid #eeeeee;
        }
      }
    }
  }
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

</style>
