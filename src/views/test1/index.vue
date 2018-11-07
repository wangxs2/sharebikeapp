
<template>
<scroller :on-infinite="infinite"
            :on-refresh="refresh"
　　         ref="my_scroller">
       <!-- 项目内容 -->
</scroller>
</template>

<script>
export default {
  data: {
    return: {

    }
  },
  methods: {
    infinite(done) {
      //上拉加载
      if (this.noData) {
        setTimeout(() => {
          this.$refs.my_scroller.finishInfinite(2);
        });
        return;
      }
      let self = this;
      let i = 1;

      let start = this.list.length;
      setTimeout(() => {
        for (var k = 0; k < 9; k++) {
          self.list.push(k);
        }
        i++;
        if (start / i < 9) {
          self.noData = "没有更多数据";
        }
        self.$refs.my_scroller.resize();
        done();
      }, 1500);
    },
    refresh: function() {
      //下拉刷新
      console.log("refresh");
      this.timeout = setTimeout(() => {
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1500);
    }
  }
};
</script>               