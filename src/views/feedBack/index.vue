
<template>
  <div class="container">
      <div class="header">  
        <mt-header title="处理情况反馈">  
            <mt-button class="iconfont icon-fanhui" style="font-size:24px;color:#fff" slot="left" @click="iconClick">                
            </mt-button>       
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm" style="height:100px">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>处理情况</span>
            <textarea cols="50" rows="10" placeholder="请输入处理情况" v-model="formMessage.remark" style="margin-top:0.46rem"></textarea>
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
            <span style="padding-left:0.5rem">核实照片</span>
          </p>
          <p class="imageClean">
             <i class="iconfont icon-xiangji" style="color:#e6e6e6;padding-left:1rem;font-size:50px"></i>
               <vue-preview :slides="slide" @close="handleClose"></vue-preview>             
          </p>
        </div>
        <div class="iteamImage">
          <p>
            <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
            <span style="padding-left:0.5rem">派单</span>
          </p>
          <p class="imageClean">
                <mt-checklist
                    v-model="value"
                    :options="options" @change="getCompany">
                </mt-checklist>
          </p>
        </div>
        </form>
       
      </div>
      <div class="bottom">
          <button type="button" class="buttonSa" @click.native="save()">重新派单</button>
          <button type="button" class="buttonSa1" @click.native="submit()">完成</button>
      </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      time: "",
      slide1: [],
      slide: [],
      sheetCode: "",
      iteamList: {},
      options: [],
      value: [],
      formMessage: {
        handleTime: Date.now(),
        handleAddr: "",
        arrangeNum: "",
        cleanNum: "",
        remark: "",
        handleBeforeURLs: [],
        handleAfterURLs: []
      }
    };
  },
  components: {},
  mounted() {},
  created() {
    this.getAll();
    if (this.$route.query.message) {
      this.sheetCode = this.$route.query.message;
    }
  },
  mounted() {
    console.log(this.$store.getters.imageUrl);
  },
  methods: {
    getAll() {
      this.$fetchGet("count/bikeCompany").then(res => {
        res.forEach(iteam => {
          let obj = {};
          obj.label = iteam.name;
          obj.value = iteam.id;
          this.options.push(obj);
        });
      });
    },
    getCompany(val) {
      this.value = val;
      console.log(this.value);
    },
    iconClick() {
      this.$router.push({
        path: "/superviseDetail",
        query: {
          message: this.sheetCode
        }
      });
    },
    clickImage() {
      window.webkit.messageHandlers.photo.postMessage({ body: "Photograph" });
    },
    clickImage1() {
      window.webkit.messageHandlers.photo.postMessage({ body: "Photograph" });
    },
    handleClose() {
      console.log("close event");
    },
    save() {
      this.$fetchPost("selfcheck", this.formMessage)
        .then(res => {})
        .catch(res => {
          MessageBox.alert("", {
            message: "登录超时",
            title: "提示"
          }).then(action => {});
        });
    },
    submit() {}
  }
};
</script>

<style lang="scss" scoped>
input {
  width: 80%;
  margin: 0 1rem;
  text-align: right;
}
textarea {
  width: 80%;
  margin: 0.733333rem 1rem 0 1rem;
  text-align: right;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .header {
    width: 100%;
    height: 1rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 1rem;
    color: #fff;
  }
  .content {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;

    .iteamForm {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 55px;
      line-height: 55px;
      box-sizing: border-box;
      padding: 0 0 0 0.4rem;
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        padding-left: 0.5rem;
        // .imageSa{
        //   display: flex;
        //   flex-direction:row;
        // }
        span {
          color: #282828;
          font-size: 0.4rem;
          text-align: left;
          width: 27%;
        }
      }
    }
    .iteamImage {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 0.5rem;
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        padding: 0 0 0 0.4rem;
        span {
          font-size: 0.4rem;
        }
      }
    }
  }
  .bottom {
    display: flex;
    flex-direction: row;
    .buttonSa {
      border: none;
      border-radius: 0;
      text-align: center;
      width: 50%;
      height: 1.5rem;
      color: #fff;
      line-height: 1.5rem;
      font-size: 0.5rem;
      background: -webkit-linear-gradient(left, #c69efc, #8f78f4);
    }
    .buttonSa1 {
      border: none;
      border-radius: 0;
      text-align: center;
      width: 50%;
      height: 1.5rem;
      color: #fff;
      line-height: 1.5rem;
      font-size: 0.5rem;
      background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    }
  }
}
</style>
<style  lang="scss">
</style>

