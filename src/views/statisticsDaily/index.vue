<template>
  <div class="container">
    <!-- 时间选择 -->
    <mt-datetime-picker
    v-if="dailyType!=='month'"
      year-format="{value} 年"
      Format="yyyy-MM"
      month-format="{value} 月"
      @confirm="selectDate"
      ref="picker"
      type="date"
      v-model="pickerValue"
    ></mt-datetime-picker>
    <!-- 时间选择 -->
    <mt-datetime-picker
    v-if="dailyType=='month'"
      year-format="{value} 年"
      Format="yyyy-MM"
      month-format="{value} 月"
      @confirm="selectDate"
      ref="picker"
      type="date"
      v-model="pickerValue"
      class="dailyBox"
    ></mt-datetime-picker>
    <!-- 时间选择 -->
    <div class="header">
      <img src="@/assets/image/evaluation/nav_1_back@2x.png" alt @click="toUserInfo">
      <div style="color:#333333" class="header-title">治理{{dailyType=='week'?'周报':dailyType=='month'?'月报':'日报'}}</div>
      <img
        style="width:0.48rem;height:0.48rem"
        src="@/assets/image/statisticsDaily/icon_data@3x.png"
        @click="openPicker"
        alt
        srcset
      >
      <!-- <span style="color:#333333;font-size:0.28rem" @click="openPicker" v-if="downIcon1">{{dayDate.split('-')[1]+'/'+dayDate.split('-')[2]}}</span> -->
    </div>
    <!-- <p v-if="dataDetail.status==0" style="color:rgb(170, 170, 170);text-align:center">暂无日报数据~</p> -->
    <!-- <p v-if="dataDetail.status==0" style="color:rgb(170, 170, 170);text-align:center">可点击右上角选择时间查看以往日报数据</p> -->
    <div class="content">
      <div class="content-top">
        <div
          style="display:flex;align-items: center;position:absolute;right:0.3rem;top:0.3rem"
          v-if="companyDetail.length>1"
        >
          <span style="color:#f9faff">{{areaName}}</span>
          <span
            style="color:#f9faff;font-size:0.59rem;margin-left:0.1rem"
            class="iconfont icon-jiantou"
            v-show="downIcon"
            @click="downIcon=!downIcon"
          ></span>
          <span
            style="color:#f9faff;font-size:0.59rem;margin-left:0.1rem"
            class="iconfont icon-arrow-up"
            v-show="!downIcon"
            @click="downIcon=!downIcon"
          ></span>
        </div>
        <div class="companyList" v-show="!downIcon">
          <p
            style="margin:0;"
            class="companyList-son"
            v-for="(iteam,index) in companyDetail"
            :key="index"
            @click="changeCompany(iteam)"
          >{{iteam.value}}</p>
        </div>
      </div>
      <div class="content-bottom">
        <div
          class="content-bottom-box"
          style="marrin-top:0.4rem;position: absolute;top: -0.5rem;left: 0;"
        >
          <div class="content-bottom-img">
            <h1
              style="font-size:0.5rem;margin:0;margin-top:0.2rem;text-align:center"
            >{{dataDetail.title}}</h1>
            <p
              style="font-size:0.4rem;margin:0;color:#afbffe;text-align:center;margin-right:0.6rem"
            >《单车治理》{{dataDetail.dayDate}}</p>
          </div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:1.1rem;left:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:1.1rem;right:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <div
            class="content-bottom-rules"
            style="width:100%;margin-top:1.8rem;padding-bottom:0.5rem"
          >
            <div class="content-bottom-list">
              <p
                style="margin:0;padding:0.3rem;line-height:0.62rem;padding-bottom:0;text-indent:0.8rem"
              >{{dataDetail.status==0?dataDetail.dispatchDealSummary:dataDetail.cleanByUserSummary}}</p>
              <p
                style="margin:0;padding:0.3rem;line-height:0.62rem;padding-bottom:0;text-indent:0.8rem"
                v-html="dispatchContentSummary"
              ></p>
              <p
                style="margin:0;padding:0.3rem;line-height:0.62rem;padding-top:0;text-indent:0.8rem"
                v-html="dispatchContentSummary1"
              ></p>
              
            </div>
            <div
              class="content-bottom-list"
              v-if="dataDetail.status==1"
            >
              <table class="tableSa" cellspacing="0">
                <thead>
                  <tr>
                    <th>{{dataDetail.type!=='bike'?'派单单位':'姓名'}}</th>
                    <th>{{dataDetail.type!=='bike'?'派单数':'处理单'}}</th>
                    <th>{{dataDetail.type!=='bike'?'派单详情':'自查'}}</th>
                    <th>{{dataDetail.type!=='bike'?'已处理':'整理'}}</th>
                    <th>{{dataDetail.type!=='bike'?'处理中':'清运'}}</th>
                    <th v-if="dataDetail.type!=='bike'">未处理</th>
                  </tr>
                </thead>
                <tbody v-if="dataDetail.type!=='bike'">
                  <tr v-for="(item,index) in dataDetail.dispatchByAreaList" :key="index">
                    <td>
                      <p style="width:2.2rem;">{{item.dispatchUnit}}</p>
                    </td>
                    <td style="color:#3E68FF">{{item.dispatchCount}}</td>
                    <td>
                      <p style="width:1.8rem;" v-for="(iteam,index) in item.userList" :key="index">
                        <span
                          style="width:1.2rem;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;"
                        >{{iteam.userName}}:</span>
                        <span>{{iteam.dispatchCount}}</span>
                      </p>
                    </td>
                    <td style="color:#09C504">{{item.done}}</td>
                    <td style="color:#FF7E00">{{item.doing}}</td>
                    <td style="color:#FF1717">{{item.willdo}}</td>
                  </tr>
                </tbody>
                <tbody v-if="dataDetail.type=='bike'">
                  <tr v-for="(item,index) in dataDetail.cleanByUserList" :key="index">
                    <td>
                      <p style="width:2.2rem;">{{item.userName}}</p>
                    </td>
                    <td style="color:#3E68FF">{{item.done}}/{{item.receiveCount}}</td>
                    <td>
                      {{item.checkCount}}
                    </td>
                    <td style="color:#09C504">{{item.arrangeNum}}</td>
                    <td style="color:#FF7E00">{{item.cleanNum}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="content-bottom-box" style="margin-top:0rem">
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:-0.6rem;left:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <img
            style="width:0.28rem;height:1.1rem;position:absolute;top:-0.6rem;right:0.5rem;"
            src="@/assets/image/statisticsDaily/lianjie@3x.png"
            alt
            srcset
          >
          <div class="content-bottom-rules" style="width:100%;margin-top:0rem">
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">{{dataDetail.type==='bike'?'派单处理情况':'各企业派单处理情况'}}</div>
              <div style="padding-top:0.98rem">
                <div
                  class="content-bottom-list"
                  style="padding:0.3rem;border-left:1px solid #FEB621"
                >
                  <h6 style="margin:0;font-size:0.4rem;margin-bottom:0.2rem">当日派单处理</h6>
                  <div style="display:flex;justify-content: space-between;width:100%;">
                    <p style="margin:0">整理总车辆数：{{dispatchCount}}</p>
                    <p style="margin:0">清运总车辆数：{{checkCount}}</p>
                  </div>
                </div>
                <div v-for="(item,index) in dataDetail.detailByOrgList" :key="index">
                  <div
                    style="display:flex;justify-content:flex-start;width:100%;align-items: center;margin-bottom:0.1rem"
                  >
                    <img
                      v-if="item.orgId==1006"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/icon_1_mobai@3x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1007"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/icon_2_ofo@3x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1014"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/赳赳@2x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1015"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/哈罗@2x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1059"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/享骑@2x.png"
                      alt
                      srcset
                    >
                    <p
                      v-if="item.orgId!==1006&&item.orgId!==1007&&item.orgId!==1014&&item.orgId!==1015&&item.orgId!==1059"
                      class="other"
                    >{{item.orgName}}</p>
                    <!-- <p class="other">产研院</p> -->
                    <p
                      style="margin:0;font-size:0.39rem;margin-left:0.3rem"
                    >收到派单：{{item.receiveCount}}单</p>
                  </div>
                  <div
                    class="content-bottom-list"
                    style="padding:0.3rem;border-left:1px solid #FEB621"
                  >
                    <div
                      style="display:flex;flex-direction: column;border:1px solid #F2F2F2;width:100%;"
                    >
                      <div
                        style="display:flex;justify-content: space-between;width:100%;border-bottom:1px solid #F2F2F2"
                      >
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.done}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">已处理</span>
                        </div>
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{(item.doing+item.willdo)}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">未处理</span>
                        </div>
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{((item.doneRate)*100).toFixed(2)}}%</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">完成率</span>
                        </div>
                      </div>
                      <div style="display:flex;justify-content: space-between;width:100%;">
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.arrangeNum}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">整理数</span>
                        </div>
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.cleanNum}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">清运数</span>
                        </div>
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.avgDealTimeHour==undefined?'-':item.avgDealTimeHour}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">处理时长</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="content-bottom-rules-box">
              <div class="content-bottom-rules-box1">{{dataDetail.type==='bike'?'自查情况':'各企业自查情况'}}</div>
              <div style="padding-top:0.98rem">
                <div
                  class="content-bottom-list"
                  style="padding:0.3rem;border-left:1px solid #FEB621"
                >
                  <h6 style="margin:0;font-size:0.4rem;margin-bottom:0.2rem">当日自查</h6>
                  <div style="display:flex;justify-content: space-between;width:100%;">
                    <p style="margin:0">整理总车辆数：{{dispatchCount1}}</p>
                    <p style="margin:0">清运总车辆数：{{checkCount1}}</p>
                  </div>
                </div>
                <div v-for="(item,index) in dataDetail.selfCheckByOrgList" :key="index">
                  <div
                    style="display:flex;justify-content:flex-start;width:100%;align-items: center;margin-bottom:0.1rem"
                  >
                    <img
                      v-if="item.orgId==1006"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/icon_1_mobai@3x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1007"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/icon_2_ofo@3x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1014"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/赳赳@2x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1015"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/哈罗@2x.png"
                      alt
                      srcset
                    >
                    <img
                      v-if="item.orgId==1059"
                      class="saDaily"
                      src="@/assets/image/statisticsDaily/享骑@2x.png"
                      alt
                      srcset
                    >
                    <p
                      v-if="item.orgId!==1006&&item.orgId!==1007&&item.orgId!==1014&&item.orgId!==1015&&item.orgId!==1059"
                      class="other"
                    >{{item.orgName}}</p>
                    <!-- <p style="margin:0;font-size:0.39rem;margin-left:0.3rem">收到派单：{{item.receiveCount}}单</p> -->
                  </div>
                  <div
                    class="content-bottom-list"
                    style="padding:0.3rem;border-left:1px solid #FEB621"
                  >
                    <div
                      style="display:flex;flex-direction: column;border:1px solid #F2F2F2;width:100%;"
                    >
                      <!-- <div style="display:flex;justify-content: space-between;width:100%;border-bottom:1px solid #F2F2F2">
                        <div style='display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%'>
                          <span :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':''" style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem">{{item.done}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">已处理</span>
                        </div>
                        <div style='display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%'>
                          <span :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':''" style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem">{{(item.doing+item.willdo)}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">未处理</span>
                        </div>
                        <div style='display:flex;flex-direction: column;justify-content:center;padding:0.2rem;margin:0.1rem 0;width:100%'>
                          <span :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':''" style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem">{{(item.doneRate)*100/100}}%</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">完成率</span>
                        </div>
                      </div>-->
                      <div style="display:flex;justify-content: space-between;width:100%;">
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.checkCount==0?'-':item.checkCount}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">自查数</span>
                        </div>
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;border-right:1px solid #F2F2F2;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.arrangeNum==0?'-':item.arrangeNum}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">整理数</span>
                        </div>
                        <div
                          style="display:flex;flex-direction: column;justify-content:center;padding:0.2rem;margin:0.1rem 0;width:100%"
                        >
                          <span
                            :class="item.orgId == 1006 ? 'mobike' : item.orgId == 1007? 'ofo':item.orgId == 1014? 'jiujiu':item.orgId == 1015? 'haluo':item.orgId == 1059? 'xiangqi':'other1'"
                            style="text-align:center;margin-bottom:0.15rem;font-size:0.44rem"
                          >{{item.cleanNum==0?'-':item.cleanNum}}</span>
                          <span style="text-align:center;color:#666666;font-size:0.34rem">清运数</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p style="text-align:center;font-size:0.32rem;color:#FFFFFF">今日治理日报到此结束，谢谢查阅</p>
        <div class="rules-bottom-img"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { MessageBox } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      popupVisible: false,
      downIcon1: false,
      downIcon: true,
      pickerValue: new Date(), // 选择的时间
      version: "",
      versionTime: "",
      dailyType:'',//tb
      dispatchContentSummary: "",
      dispatchContentSummary1: "",
      dispatchCount: 0,
      dayDate: "",
      areaId: "",
      checkCount: 0,
      dispatchCount1: 0,
      checkCount1: 0,
      areaName: "",
      companyDetail: [],
      dataDetail: {}
    };
  },
  components: {},
  mounted() {},
  created() {
    if(this.$route.query.dailyType){
      this.dailyType=this.$route.query.dailyType;
       this.getCleanArea();
    }
    window.watchBackWXS = this.watchBackWXS;
  },
  methods: {
    //返回考评
    toUserInfo() {
      this.$router.push("/layout/count");
    },
    watchBackWXS() {
      this.toUserInfo();
    },
    // 打开时间选择框
    openPicker() {
      this.$refs.picker.open();
    },
    // 选中时间事件
    selectDate(val) {
      this.downIcon1 = true;
      if(this.dailyType!=='month'){
        this.dayDate = this.FormatDate5(val);
      }else{
        this.dayDate = val.Format("yyyy-MM");
      }
      console.log(this.dayDate);
      this.getData();
    },
    changeCompany(val) {
      this.areaName = val.value;
      this.downIcon = true;
      this.areaId = val.key;
      this.getData();
    },
    getData() {
      this.dispatchCount = 0;
      this.checkCount = 0;
      this.dispatchCount1 = 0;
      this.checkCount1 = 0;
      this.$fetchGet("cleanDaily/getCleanDaily", {
        areaId: this.areaId,
        dayDate: this.dayDate,
        dailyType:this.dailyType,
      }).then(res => {
        if (res.status == 1) {
          this.dataDetail = res;
          console.log(this.dataDetail.type);
          res.detailByOrgList.forEach(element => {
            this.dispatchCount += element.arrangeNum;
            this.checkCount += element.cleanNum;
          });
          if(res.selfCheckByOrgList){
              res.selfCheckByOrgList.forEach(element => {
              this.dispatchCount1 += element.arrangeNum;
              this.checkCount1 += element.cleanNum;
            });
          }
          
          if (res.dispatchContentSummary) {
            this.dispatchContentSummary = res.dispatchContentSummary.split(
              "<###>"
            )[0];
            this.dispatchContentSummary1 = res.dispatchContentSummary.split(
              "<###>"
            )[1];
          }
        } else {
          this.dataDetail = res;
          this.dispatchContentSummary = res.dispatchContentSummary;
          this.dispatchContentSummary1 = "";
        }
      });
    },
    //获取地区列表
    getCleanArea() {
      this.$fetchGet("cleanDaily/getCleanArea").then(res => {
        this.companyDetail = res;
        this.areaId = res[0].key;
        this.areaName = res[0].value;
        this.getData();
        // this.$fetchGet("cleanDaily/getCleanDaily", {
        //   areaId: this.areaId,
        //   dayDate: this.dayDate
        // }).then(res => {
        //   if(res.status==1){
        //     this.dataDetail = res;
        //   console.log(res.dispatchContentDetail);
        //   res.detailByOrgList.forEach(element => {
        //       this.dispatchCount+=element.arrangeNum;
        //       this.checkCount+=element.cleanNum
        //   });
        //   res.selfCheckByOrgList.forEach(element => {
        //       this.dispatchCount1+=element.arrangeNum;
        //       this.checkCount1+=element.cleanNum
        //   });
        //   this.dispatchContentSummary=res.dispatchContentSummary.split('<###>')[0];
        //   this.dispatchContentSummary1=res.dispatchContentSummary.split('<###>')[1]
        //   }

        // });
      });
    }
  }
};
</script>
<style>
.dailyBox .picker-items .picker-slot.picker-slot-center:nth-of-type(3) {
    display: none !important;
    background: #00c458;
  }
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  .header {
    height: 1.173333rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    font-size: 0.48rem;
    padding: 0 0.32rem;
    box-sizing: border-box;
    flex-shrink: 0;
    img {
      height: 0.48rem;
      width: 0.466667rem;
    }
  }
  .content {
    overflow-y: scroll;
    color: #282828;
    font-size: 0.426667rem;
    background: url("../../assets/image/statisticsDaily/bg@3x.png");
    background-size: 100% 100%;

    .content-top {
      width: 100%;
      height: 5.6rem;
      background-image: url("../../assets/image/statisticsDaily/iamge_1@3x.png");
      background-size: 100% 100%;
      position: relative;
      .companyList {
        position: absolute;
        right: 0.3rem;
        top: 0.9rem;
        padding: 0 0.2rem;
        background: #ffffff;
        border-radius: 0.1rem;
        box-shadow: 0 0 0.1rem #dddddd;
        .companyList-son {
          color: #333333;
          padding: 0.2rem;
          font-size: 0.373333rem;
        }
      }
    }
    .content-bottom {
      width: 100%;
      height: 100%;
      position: relative;
      .content-bottom-box {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;
        position: relative;
        .content-bottom-img {
          width: 96%;
          height: 2rem;
          background-image: url("../../assets/image/statisticsDaily/image_2@3x.png");
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.8rem;
          color: #ffffff;
          font-size: 0.44rem;
        }
        .content-bottom-font {
          font-size: 0.34rem;
          color: #fe876b;
        }
        .content-bottom-rules {
          margin: 0.2rem;
          padding: 0.3rem;
          border-radius: 0.2rem;
          color: #333333;
          display: flex;
          background: #ffffff;
          flex-direction: column;
          .mobike {
            color: #f25b4a;
          }
          .ofo {
            color: #fbc303;
          }
          .haluo {
            color: #01a1ff;
          }
          .jiujiu {
            color: #fd3121;
          }
          .xiangqi {
            color: #00cb4b;
          }
          .other1 {
            color: #9a6eff;
          }
          .content-bottom-list {
            display: flex;
            flex-direction: column;
            font-size: 0.39rem;
            align-items: flex-start;
            margin-bottom: 0.1rem;
            .tableSa {
              width: 100%;
              border-bottom: 1px solid #eeeeee;
              border-right: 1px solid #eeeeee;
              // border-bottom: none;
              th {
                color: #888888;
                font-size: 0.26rem;
                border: 1px solid #eeeeee;
                border-bottom: none;
                width: 16.6%;
                height: 1rem;
                border-right: none;
              }
              tr {
                border: 1px solid #eeeeee;
              }
              td {
                border: 1px solid #eeeeee;
                border-right: none;
                border-bottom: none;
                text-align: center;
                font-size: 0.34rem;
                padding: 0.1rem;
                p {
                  margin: 0.1rem 0;
                }
              }
            }
            img {
              width: 0.5rem;
              height: 0.5rem;
            }
            .standard-rules {
              display: flex;
              flex-direction: column;
              .standard-rules-list {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 0.06rem;
              }
            }
          }
          .content-bottom-rules-box {
            display: flex;
            flex-direction: column;
            position: relative;
            margin-top: 0.5rem;
            padding: 0 0.4rem;
            .saDaily {
              width: 1.47rem;
              height: 0.54rem;
              margin-left: -0.3rem;
            }
            .other {
              background: #9a6eff;
              color: #ffffff;
              padding: 0.06rem 0.3rem;
              box-sizing: border-box;
              border-radius: 12px;
              font-size: 0.35rem;
              margin: 0;
              margin-left: -0.3rem;
            }
            .content-bottom-rules-box1 {
              position: absolute;
              top: 0;
              left: -0.419999rem;
              margin: 0;
              background: url("../../assets/image/statisticsDaily/image_label@3x.png");
              background-size: 100% 100%;
              width: 4.8rem;
              height: 1rem;
              line-height: 1rem;
              text-align: left;
              color: #ffffff;
              box-sizing: border-box;
              padding-left: 0.6rem;
              font-size: 0.44rem;
            }
          }
        }
      }
      .rules-bottom-img {
        width: 100%;
        height: 1.8rem;
        margin-top: 0.4rem;
        text-align: center;
        color: #ffffff;
        font-size: 0.3rem;
        background-image: url("../../assets/image/statisticsDaily/iamge_3@3x.png");
        background-size: 100% 100%;
      }
    }
  }
}
</style>