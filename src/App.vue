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
  font-size: 16px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* mintUI */
.mint-tabbar > .mint-tab-item.is-selected {
  background: #fff;
  color: #5076ff;
}
.mint-header {
  height: 1rem;
  font-size: 16px;
  background: -webkit-linear-gradient(left, #6698ff, #5076ff);
}
input ,textarea ,button{
  border: none;
  outline: none;
}
/* mintUI */
</style>
