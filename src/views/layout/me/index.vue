

<template>
  <div class="container">
      <div class="header">
       
        <mt-header title="预警">
            <!-- <mt-button class="iconfont icon-zhanghao"  slot="right" @click="iconClick">
                
            </mt-button> -->
        </mt-header>
      </div>
      <div class="content" >
      
      </div>
  </div>
</template>

<script>
import { Loadmore } from "mint-ui";
export default {
  computed: {},
  data() {
    return {
      selected: "/layout/count",
     
    };
  },
  components: {
   
  },
  mounted() {
  },
  created() {},
  mounted() {
  },
  methods: {
 
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
    height: 2.666667rem;
    background: -webkit-linear-gradient(left, #6698ff, #5076ff);
    text-align: center;
    line-height: 2.666667rem;
    color: #fff;
  }
  .content {
    flex: 1;
  }
}
.green {
  color: #ffc000;
}
.red {
  color: #41cd76;
}
</style>
<style  lang="scss" scoped>
.container {
}
</style>


