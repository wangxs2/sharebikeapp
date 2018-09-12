

<template>
  <div class="container">
      <div class="header">
       
        <mt-header title="派单处理详情">
           <router-link to="/layout/supervise" slot="left">
                <mt-button icon="back" style="font-size:24px"></mt-button>
            </router-link>
             <mt-button style="font-size:18px" slot="right" @click="iconClick">
                反馈
            </mt-button>        
        </mt-header>
      </div>
      <div class="content">
        <mt-swipe :auto="0">
            <mt-swipe-item v-for="(iteam,index) in iteamList" :key="index">
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-zihangche1" style="color:#6698FF;font-size:24px"></span>
                        <span>时间：</span>
                        <span>{{FormatDate(iteam.dispatchTime)}}</span>
                        
                    </div>
                    <div :class="iteam.status == 2 ? 'red' : 'green'">{{iteam.status == 0 ? '未处理' : iteam.status == 1 ?"处理中":iteam.status == 2 ?"已处理":iteam.status == 3 ?"重新派单":"已完成"}}</div>

                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-weizhi" style="color:#6698FF;font-size:24px"></span>
                        <span>地点：</span>
                        <span>{{iteam.handleAddr}}</span>
                        
                    </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-weizhi" style="color:#6698FF;font-size:24px"></span>
                        <span>派单人：</span>
                        <span>{{iteam.dispatchUserName}}</span>
                        
                    </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-weizhi" style="color:#6698FF;font-size:24px"></span>
                        <span>企业：</span>
                        <span>{{iteam.orgName}}</span>
                        
                    </div>

                </div>
                <div class="imageClean" style="padding:0.3rem 0.213333rem">
                    <div>
                        <span class="iconfont icon-weizhi" style="color:#6698FF;font-size:24px"></span>
                        <span>派单前</span>                                
                    </div>
                    <div>
                        <vue-preview :slides="slide" @close="handleClose"></vue-preview>
                    </div>

                </div>
                <div class="iteamList">
                    <div class="moreText">
                        <span class="iconfont icon-zihangche1" style="color:#6698FF;font-size:24px"></span>
                        <span style="width:25%;margin-left:0.1rem">派单备注：</span>
                        <span class="textFont">{{iteam.dispatchRemark}}</span>                
                    </div>
                </div>
                <div class="imageClean" style="padding:0.3rem 0.213333rem">
                    <div>
                        <span class="iconfont icon-weizhi" style="color:#6698FF;font-size:24px"></span>
                        <span>处理前</span>                                
                    </div>
                    <div>
                        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
                    </div>
                </div>
                <div class="imageClean" style="padding:0.3rem 0.213333rem">
                    <div>
                        <span class="iconfont icon-weizhi" style="color:#6698FF;font-size:24px"></span>
                        <span>处理后</span>                                
                    </div>
                    <div>
                        <vue-preview :slides="slide1" @close="handleClose"></vue-preview>
                    </div>
                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-zihangche1" style="color:#6698FF;font-size:24px"></span>
                        <span>整理数：</span>
                        <span>{{iteam.arrangeNum}}</span>                
                    </div>
                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-zihangche1" style="color:#6698FF;font-size:24px"></span>
                        <span>清运数：</span>
                        <span>{{iteam.cleanNum}}</span>
                        
                    </div>

                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-zihangche1" style="color:#6698FF;font-size:24px"></span>
                        <span>处理人：</span>
                        <span>{{iteam.handleUserName}}</span>                
                    </div>
                </div>
                <div class="iteamList">
                    <div>
                        <span class="iconfont icon-zihangche1" style="color:#6698FF;font-size:24px"></span>
                        <span>处理时间：</span>
                        <span>{{FormatDate(iteam.handleTime)}}</span>
                        
                    </div>

                </div>
            </mt-swipe-item>
        </mt-swipe>

      </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";

export default {
  computed: {},
  data() {
    return {
      slide: [],
      slide1: [],
      sheetCode: "",
      iteamList: []
    };
  },
  components: {},
  mounted() {},
  created() {
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
      this.getMessage(this.sheetCode);
    }
  },
  mounted() {},
  methods: {
    handleClose() {
      console.log("close event");
    },
    iconClick() {
      this.$router.push(
          {
            path:"/feedBack",
            query: {
                message: this.sheetCode
            }
          }
          );
    },
    getMessage(val) {
      this.$fetchGet("dispatch/listDispatchDetails", {
        sheetCode: val
      })
        .then(res => {
            console.log(res)
          var obj = {};
          this.iteamList = res;
        //   this.iteamList.handleBeforeURLs.forEach(iteam => {
        //     let obj = {};
        //     console.log(iteam);
        //     obj.w = 600;
        //     obj.h = 600;
        //     obj.msrc = this.Ip + iteam;
        //     obj.src = this.Ip + iteam;
        //     this.slide.push(obj);
        //   });
        //   this.iteamList.handleAfterURLs.forEach(iteam => {
        //     let obj = {};
        //     console.log(iteam);
        //     obj.w = 600;
        //     obj.h = 600;
        //     obj.msrc = this.Ip + iteam;
        //     obj.src = this.Ip + iteam;
        //     this.slide1.push(obj);
        //   });
        })
        .catch(res => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.green {
  color: #ffc000;
}
.red {
  color: #41cd76;
}
.container {
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
    overflow: hidden;
    overflow-y: scroll;
    .iteamImage {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.213333rem;
      flex-direction: column;
    }
    .iteamList {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      padding: 0.3rem 0.213333rem;
      justify-content: space-between;
      .moreText {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        .textFont {
          width: 80%;
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>



