<template>
  <div class="container">
    <div class="header">
      <img src="@/assets/image/warningDetail/nav_1_back@2x.png" alt="" @click="iconReturn">
      <div class="header-title">找回密码</div>
    </div>
    <div class="content">
    
      
    </div>

  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {};
  },
  components: {},
  mounted() {},
  created() {},
  mounted() {},
  methods: {
    iconReturn() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
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
    img {
      height: 0.48rem;
      width: 0.266667rem;
    }
  }
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.32rem;
    box-sizing: border-box;
  }
 
}

</style>

