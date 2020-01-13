<template>
  <div class="layout">
    <div class="appMain">
      <!-- <keep-alive include="test-keep-alive">
        <appMain></appMain>
      </keep-alive> -->
      <appMain></appMain>
    </div>
    <div class="bottom">
      <div
        class="menu-iteam"
        v-for="(iteam,index) in menuList"
        :key="index"
        @click="toRouterIndex(iteam,index)"
      >
        <span class="badge" v-if="index==2&&ruleStatus3"></span>
        <span
          class="badge1"
          v-if="(index==0&&ruleStatus1)||(index==1&&ruleStatus2)"
        >{{index==0?selfCheckNum:dispatchkNum}}</span>
        <img :src="iteam.imgUrl[selectIndex==index?0:1]" />
        <span v-bind:style="{color:selectIndex==index?'#5076FF':'#AAAAAA'}">{{iteam.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import appMain from "./components/appMain";
export default {
  components: {
    appMain
  },
  computed: {},
  data() {
    return {
      longitude: "",
      latitude: "",
      ruleStatus: false,
      selfCheckNum: "",
      dispatchkNum: "",
      selected: "",
      ruleStatus1: false,
      ruleStatus2: false,
      ruleStatus3: false,
      roleCode: "",
      imgUrl: [
        require("../../assets/image/login/icon_tab_1_nor@3x.png"),
        require("../../assets/image/login/icon_tab_2_nor@3x.png"),
        require("../../assets/image/login/icon_tab_3_nor@3x.png"),
        require("../../assets/image/login/icon_tab_4_nor@3x.png"),
        require("../../assets/image/login/icon_tab_5_nor@3x.png")
      ],
      selectIndex: "",
      menuList: [
        {
          name: "自查",
          imgUrl: [
            require("@/assets/image/login/icon_tab_1_pre@3x.png"),
            require("@/assets/image/login/icon_tab_1_nor@3x.png")
          ],
          pathUrl: "/layout/selfCheck"
        },
        {
          name: "督办",
          imgUrl: [
            require("@/assets/image/login/icon_tab_2_pre@3x.png"),
            require("@/assets/image/login/icon_tab_2_nor@3x.png")
          ],
          pathUrl: "/layout/supervise",
          pathUrlTodo: "/layout/needtodo"
        },
        {
          name: "统计",
          imgUrl: [
            require("@/assets/image/login/icon_tab_3_pre@3x.png"),
            require("@/assets/image/login/icon_tab_3_nor@3x.png")
          ],
          pathUrl: "/layout/count"
        },
        {
          name: "预警",
          imgUrl: [
            require("@/assets/image/login/icon_tab_4_pre@3x.png"),
            require("@/assets/image/login/icon_tab_4_nor@3x.png")
          ],
          pathUrl: "/layout/warning"
        },
        {
          name: "我的",
          imgUrl: [
            require("@/assets/image/login/icon_tab_5_pre@3x.png"),
            require("@/assets/image/login/icon_tab_5_nor@3x.png")
          ],
          pathUrl: "/layout/me"
        }
      ]
    };
  },
  mounted() {
    // this.getMap();
  },
  activated() {
    // this.selected = this.$route.path;
  },
  watch: {
    $route: function(val, oldval) {
      // this.selectIndex=val.path;
      if (val) {
        this.getRouterIndex(val);
      }
    }
  },
  created() {
    this.getRules();
    this.getRouterIndex(this.$route);
    this.roleCode = localStorage.roleCode;
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    getRules() {
      //获取是否有红点
      this.$fetchGet("count/willdo").then(res => {
        this.ruleStatus =
          res.evaluation === "true"
            ? (this.ruleStatus = true)
            : (this.ruleStatus = false);
        this.ruleStatus3 = res.daily === "false" ? false : true;
        if (res.selfCheck > 0) {
          this.ruleStatus1 = true;
          this.selfCheckNum = res.selfCheck;
        }
        if (res.dispatch > 0) {
          this.ruleStatus2 = true;
          this.dispatchkNum = res.dispatch;
        }
      });
    },
    watchBackWXS() {
      return;
    },
    getRouterIndex(val) {
      // this.selectIndex = this.menuList.findIndex(iteam => {
      //   return val.path == iteam.pathUrl || val.path == iteam.pathUrlTodo;
      // });
      for (var i = this.menuList.length - 1; i >= 0; i--) {
        if (
          val.path == this.menuList[i].pathUrl ||
          val.path == this.menuList[i].pathUrlTodo
        ) {
          this.selectIndex = i;
        }
      }
    },
    toRouterIndex(val, index) {
      console.log(this.roleCode);
      console.log(index);
      if (
        (this.roleCode == "clean" || this.roleCode == "manage") &&
        index == 1
      ) {
        this.$router.push(val.pathUrlTodo);
      } else {
        this.$router.push(val.pathUrl);
      }
    },
    getMap() {
      let that = this;
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            var mk = new BMap.Marker(r.point);
            that
              .$fetchPut("user/updateByUser", {
                longitude: r.point.lng,
                latitude: r.point.lat
              })
              .then(data => {});
          } else {
            MessageBox.alert("", {
              message: "failed" + this.getStatus(),
              title: "提示"
            }).then(action => {});
          }
        },
        { enableHighAccuracy: true }
      );
      setTimeout(() => {
        this.getMap();
      }, 300000);
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .appMain {
    flex: 1;
    overflow: hidden;
    overflow-y: scroll;
  }
  .bottom {
    display: flex;
    width: 100%;
    height: 1.4rem;
    border-top: 1px solid #f6f6f6;
    z-index: 100;
    background: #fff;
    .menu-iteam {
      flex: 1;
      width: 1px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 0.34rem;
      color: #aaaaaa;
      position: relative;
      .badge {
        position: absolute;
        top: 0;
        right: 0.4rem;
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: red;
      }
      .badge1 {
        position: absolute;
        top: 0;
        right: 0.28rem;
        display: block;
        width: 15px;
        height: 15px;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        font-size: 0.26rem;
        line-height: 15px;
        background: red;
      }
      img {
        width: 0.6rem;
        height: 0.6rem;
      }
      span {
        margin-top: 0.08rem;
      }
    }
  }
}
</style>
