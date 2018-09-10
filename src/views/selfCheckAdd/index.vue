
<template>
  <div class="container">
      <div class="header">
      
        <mt-header title="添加企业自查">   
            <router-link to="/layout/selfCheck" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>         
        </mt-header>
      </div>
      <div class="content">
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>时间</span>
            <input type="text" placeholder="请选择时间">
          </p>
        </div>
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>地点</span>
            <input type="text" placeholder="请选择地点">
          </p>
        </div>
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>整理数</span>
            <input type="text" placeholder="请选择整理数">
          </p>
        </div>
        <div class="iteamForm">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>清运数</span>
            <input type="text" placeholder="请选择清运数">
          </p>
        </div>
        <div class="iteamForm" style="height:100px">
          <i class="iconfont icon-zihangche1" style="color:#6698FF"></i>
          <p>
            <span>备注</span>
            <textarea cols="50" rows="10" placeholder="请选择备注"></textarea>
          </p>
        </div>
        </form>
       
      </div>
      <div class="bottom">
          <button type="button" class="mui-btn buttonSa">暂存</button>
          <button type="button" class="mui-btn buttonSa1">完成</button>
      </div>
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      time: ""
    };
  },
  components: {},
  mounted() {},
  created() {},
  mounted() {},
  methods: {}
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
    .iteamForm {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      height: 55px;
      line-height: 55px;
      box-sizing: border-box;
      padding: 0 0 0 0.8rem;
      p {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        padding-left: 1rem;
        span {
          color: #282828;
          font-size: 0.4rem;
          text-align: left;
          width: 22%;
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

