<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
@import url("./assets/iconfont/iconfont.css");
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
  font-size: 0.4rem;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* mintUI */
.mint-loadmore{
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
}
.mint-tabbar > .mint-tab-item{
  color: #AAAAAA;
}
.mint-swipe-indicator.is-active{
  background: #ccc;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background: #fff;
  color: #5076FF;
}
.mint-header-title{
  font-size: .48rem;
}
.mintui{
  font-size: 24px;
}
.mint-swipe-items-wrap{
  overflow:scroll;
}
.mint-header {
  height: 1.173333rem;
  font-size: 16px;
  background: -webkit-linear-gradient(left, #6698ff, #5076ff);
}
input ,textarea ,button{
  border: none;
  outline: none;
}
/* mintUI */
</style>
