<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  // watch:
  mounted() {
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    watchBackWXS() {
      console.log("点击了返回键")
      console.log(this.$route);
    }
  }
};
</script>

<style>
</style>
