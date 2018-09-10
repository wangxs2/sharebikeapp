<template>
  <div>
    <el-button type="primary" @click="sendBtn">发送socket请求</el-button>
    <el-input type="textarea" :disabled="true" :autosize="{ minRows: 30 }" v-model="response">
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: "", //socket对象
      response: "", //返回数据
      WS_URL: "ws://10.1.4.94:8888/babyrobot/websocket"
    };
  },
  created() {
    this.websocket();
  },
  mounted() {},
  methods: {
    sendBtn() {
      let sendDate = {
        robotCode: 10000,
        code: 101,
        weightStatus: 0,
        lengthStatus: 0
      };
      // console.log(123)
      this.ws.send(JSON.stringify(sendDate));
    },
    websocket() {
      this.ws = new WebSocket(this.WS_URL);
      this.ws.onopen = () => {
        console.log("已连接...");
      };
      this.ws.onmessage = evt => {
        // console.log(evt);
        this.response = evt.data;
        console.log("数据已接收...");
      };
      this.ws.onclose = function() {
        // 关闭 websocket
        console.log("连接已关闭...");
      };
      // 路由跳转时结束websocket链接
      this.$router.afterEach(() => {
        this.ws.close();
      });
    }
  }
};
</script>