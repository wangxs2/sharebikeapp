
<template>
  <div class="container">
    <!-- <div id="myMap"></div> -->
     <van-overlay :z-index="100" :show="showstart">
      <div class="wrapperfast">
        <van-loading type="spinner" size="48px" vertical color="#1989fa">上传中...</van-loading>
      </div>
    </van-overlay>
    <mt-popup class="imgMask"
              v-model="popupVisible"
              position="right">
      <span class="iconfont icon-guandiao"
            style="color:#fff;position:fixed;right:15px;top:15px"
            @click="popupVisible=false"></span>
      <mt-swipe style="width:100%;height:64%"
                :continuous="false"
                :touchstart="true"
                :speed="10"
                :auto="0"
                :defaultIndex="indexImage">
        <mt-swipe-item v-for="(iteam,index) in lageImg"
                       :key="index">
          <img :src="Ip+iteam"
               v-bind:style="{transform:'rotate('+rotateS+'deg)'}"
               width="100%">
        </mt-swipe-item>
      </mt-swipe>
      <!-- <img
        src="../../assets/image/login/rotate.svg"
        alt
        srcset
        width="50"
        height="50"
        style="position:fixed;right:44%;bottom:15px;"
        @click="rotate()"
      >-->
    </mt-popup>
    <mt-popup class="version-popup-box"
              v-model="popupVisible2"
              position="right">
      <div class="version-popup"
           style="padding-bottom:0">
        <p style="margin:0;text-align:center;">请输入{{bikeTitle}}车辆数</p>
        <div style="padding:0.6rem;padding-top:0rem;display: flex;flex-direction: column;flex:1">
          <div class="version-popup-content"
               v-for="(iteam,index) in bikeCleanCompany"
               :key="index">
            <p class="companyBike"
               :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1143? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'">{{iteam.name}}</p>
            <div style="margin-left:0.3rem;height:100%">
              <input v-if="bikeTitle=='整理'"
                     type="number"
                     v-model="iteam.arrangeNum">
              <input v-if="bikeTitle=='清运'"
                     type="number"
                     v-model="iteam.cleanNum">
            </div>
          </div>
        </div>
        <div class="bottomsa">
          <p @click="popupVisible2=false">取消</p>
          <p @click="submitBike()"
             style="border:none;color:#5076FF">确定</p>
        </div>
      </div>
    </mt-popup>
    <mt-popup v-model="popupVisible1"
              class="mapwhere"
              position="right">
      <div class="header">
        <img src="@/assets/image/infoModification/nav_1_back@2x.png"
             alt
             @click="popupVisible1=false">
        <div class="header-title">处理地址</div>
        <div></div>
      </div>

      <div id="myMap"></div>

    </mt-popup>
    <div class="header">
      <img src="@/assets/image/infoModification/nav_1_back@2x.png"
           alt
           @click="toHome">
      <div class="header-title">派单处理</div>
      <div style="font-size:18px"
           @click="iconClick">{{roleCode=="manage"?"转派":""}}</div>
    </div>
    <div class="content">
      <div class="superList">
        <div class="topsa"
             style="margin-top:0.3rem">
          <div class="fontext">派单信息</div>
          <div class="overimg">
            <div v-if="formMessage.overTimeFlag==1||formMessage.overTimeFlag==2"
                 class="overTimeFlag"></div>
            <div :class="formMessage.status == 2 ? 'red' : formMessage.status == 0?'blue':'green'">{{formMessage.status == 0 ? '未处理' : formMessage.status == 1 ?"处理中":formMessage.status == 2 ?"已处理":formMessage.status == 3 ?"已转派":"已完成"}}</div>
          </div>

        </div>
      </div>
      <div class="superList">
        <div class="topcloum">
          <div class="topcloumson">
            <p class="leftfont">单号</p>
            <p class="leftfont1">{{formMessage.sheetCode}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">时间</p>
            <p class="leftfont1">{{FormatDate(formMessage.dispatchTime)}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">地点</p>
            <div class="leftfont1"
                 @click="getMap1()">
              <p style="margin-top:0.1rem;color:#333333;text-decoration:underline">{{formMessage.handleSecAddr}}</p>
              <p style="margin-top:0.1rem;color:#aeaeae;text-decoration:underline">{{formMessage.handleAddr}}</p>
            </div>
            <!-- <p class="leftfont1"
               style="color:blue;text-decoration:underline"
               @click="getMap1()">{{formMessage.handleAddr}}</p> -->
          </div>
          <div class="topcloumson">
            <p class="leftfont">派单人</p>
            <p class="leftfont1">{{formMessage.dispatchUserName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">处理方式</p>
            <p class="leftfont1">{{formMessage.dealMethod==1?"整理":formMessage.dealMethod==2?"清运":"整理且清运"}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">企业</p>
            <p class="leftfont1">{{formMessage.orgName}}</p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">派单照片</p>
            <p class="leftfont1">
              <img v-for="(iteam,index) in formMessage.dispachPhotoURLs"
                   :src="Ip+iteam"
                   :key="index"
                   alt
                   srcset
                   @click="handOpen(formMessage.dispachPhotoURLs,index)">
            </p>
          </div>
          <div class="topcloumson">
            <p class="leftfont">备注</p>
            <p class="leftfont1">{{formMessage.dispachRemark}}</p>
          </div>
        </div>
      </div>
      <div class="superList">
        <div class="topsa"
             style="margin-top:0.3rem">
          <div class="fontext">转派记录</div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topsa"
             style="height:0.3rem;border:none;border-radius:0">
          <div></div>
          <div></div>
        </div>
      </div>
      <div class="superList">
        <div class="topcloum"
             style="padding:0 0.3rem"
             v-for="(item,index) in formMessage.sendRecordList"
             :key="index">
          <div class="topcloumson"
               style="padding-bottom:0">
            <div style="margin-top:-0.1rem">
              <span>{{splitsa(item.sendTime)}} {{splitsa1(item.sendTime)}}</span>
              <!-- <br>
              <span
                style="display: block;margin-top:0.1rem;font-size:0.3rem;color:#555555;margin-left:0.09rem"
              >{{splitsa(item.sendTime)}}</span>-->

              <p :class="index==formMessage.sendRecordList.length-1?(item.read==0?'reaed-two':'reaed-sa'):(item.read==0?'reaed-sa1':'reaed-sa')"
                 style="display: block;width:1.1rem;height:0.4rem;line-height:0.46rem;padding:0rem;text-align:center;box-sizing: border-box;border-radius: 12px;color: #ffffff;font-size: 0.3rem;margin-left:0.8rem;margin-top:0.2rem">{{index==formMessage.sendRecordList.length-1?(item.read==0?'未读':'已读'):(item.read==0?'已转派':'已读')}}</p>
            </div>
            <div class="topcloum"
                 style="margin:0;padding:0;align-items: center;padding-top:0rem;padding-left:0.2rem">
              <p style="width:0.26rem;height:0.26rem;border-radius:50%;background:#5076ff;"></p>
              <p v-if="index!==formMessage.sendRecordList.length-1"
                 style="display:flex;flex:1;width:1px;border-left: 1px dashed #5076ff;"></p>
            </div>
            <div class="topcloum"
                 style="margin:0;padding:0;flex:1;padding-left:0.2rem;margin-top:-0.1rem">
              <div class="topcloumson">
                <p class="leftfont"
                   style="width:22%">{{index==0?'派单人':'转派人'}}</p>
                <p class="leftfont1"
                   style="width:78%">{{item.sendMan}}</p>
              </div>
              <div class="topcloumson">
                <p class="leftfont"
                   style="width:22%">接单人</p>
                <p class="leftfont1"
                   style="width:78%;word-break:break-all">{{item.receiveMan}}</p>
              </div>
              <div class="topcloumson">
                <p class="leftfont"
                   style="width:22%">备注</p>
                <p class="leftfont1"
                   style="width:78%">{{item.sendRemark}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="superList">
        <div class="iteamImage">
          <div style="padding-left:0.3rem">
            <img src="../../assets/image/selfcheck/icon_4_picture.png"
                 width="24"
                 height="24"
                 alt
                 srcset>
            <span>整理前</span>
          </div>
          <div class="imageList">
            <div v-for="(iteam,index) in formMessage.handleBeforeURLs"
                 :key="index"
                 class="detailIcon">
              <img :src="Ip+iteam"
                   alt
                   srcset
                   width="100px"
                   height="100px"
                   @click="handOpen(formMessage.handleBeforeURLs,index)">
              <span @click="detailImage(1,index)">
                <img src="@/assets/image/close@2x.png"
                     width="30"
                     height="30"
                     alt
                     srcset>
              </span>
            </div>
            <div v-if="formMessage.handleBeforeURLs.length<5"
            @click="clickImage"
                 style="width:100px;height:100px;background:#F2F2F2;box-sizing: border-box;padding:24px">
                <!-- <van-uploader
              v-model="fileList"
              multiple
              :max-count='4'
              :before-read="beforeRead"
              :preview-image="false"
              :accept="'image/png,image/jpeg'"
              :after-read="afterRead"
            >
                <img alt="等待传图" width="52px" height="52px" src="../../assets/image/icon_add.png" />
            </van-uploader> -->
            <img alt="等待传图" width="52px" height="52px" src="../../assets/image/icon_add.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="superList">
        <div class="iteamImage">
          <div style="padding-left:0.3rem">
            <img src="../../assets/image/selfcheck/icon_4_picture.png"
                 width="22"
                 height="22"
                 alt
                 srcset>
            <span>整理后</span>
          </div>
          <div class="imageList">
            <div v-for="(iteam,index) in formMessage.handleAfterURLs"
                 :key="index"
                 class="detailIcon">
              <img :src="Ip+iteam"
                   alt
                   srcset
                   width="100px"
                   height="100px"
                   @click="handOpen(formMessage.handleAfterURLs,index)">
              <span @click="detailImage(2,index)">
                <img src="@/assets/image/close@2x.png"
                     width="30"
                     height="30"
                     alt
                     srcset>
              </span>
            </div>
            <div v-if="formMessage.handleAfterURLs.length<5"
            @click="clickImage1"
                 style="width:100px;height:100px;background:#F2F2F2;box-sizing: border-box;padding:24px">
              <!-- <van-uploader
              v-model="fileList1"
              multiple
              :max-count='4'
              :before-read="beforeRead"
              :preview-image="false"
              :accept="'image/png,image/jpeg'"
              :after-read="afterRead1"
            >
                <img alt="等待传图" width="52px" height="52px" src="../../assets/image/icon_add.png" />
            </van-uploader> -->
            <img alt="等待传图" width="52px" height="52px" src="../../assets/image/icon_add.png" />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="superList" style="margin-top:0.2rem">
          <div class="iteamForm">
            <img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="24" height="24" alt="" srcset="">
            <div class="rightsa">
              <span
                v-if="ifCleanByBike==1"
                style="flex:1;line-height:100%;text-align:right;"
              >{{formMessage.arrangeNum}}</span>
              <input
                v-if="ifCleanByBike==0"
                style="text-align:right;"
                type="number"
                placeholder="请输入"
                v-model="formMessage.arrangeNum"
              >
            </div>
            <span
            v-if="ifCleanByBike==1"
            class="iconfont icon-jiantou1"
            style="color:#999999;font-size:0.8rem;text-align:right"
            @click="dealDetailList('整理')"
          ></span>
          </div>
          <div class="iteamForm">
            <img src="../../assets/image/selfcheck/icon_5_num1@3x.png" width="24" height="24" alt="" srcset="">
            <div class="rightsa" style="border:none">
              <span
                v-if="ifCleanByBike==1"
                style="flex:1;line-height:100%;text-align:right;"
              >{{formMessage.cleanNum}}</span>
              <input
                v-if="ifCleanByBike==0"
                style="text-align:right;"
                type="number"
                placeholder="请输入"
                v-model="formMessage.cleanNum"
              >
            </div>
            <span
            v-if="ifCleanByBike==1"
            class="iconfont icon-jiantou1"
            style="color:#999999;font-size:0.8rem;"
            @click="dealDetailList('清运')"
          ></span>
          </div>
      </div>-->
      <div class="superList"
           style="margin-top:0.2rem;">
        <div class="iteamForm"
             style="padding-right:0.3rem">
          <img src="../../assets/image/selfcheck/icon_5_num1@3x.png"
               width="24"
               height="24"
               alt
               srcset>
          <div class="rightsa"
               style="border:none">
            <span>整理数</span>
            <span v-if="ifCleanByBike==1"
                  style="flex:1;line-height:100%;text-align:right;">{{formMessage.arrangeNum}}</span>
            <input v-if="ifCleanByBike==0"
                   style="text-align:right;"
                   type="number"
                   placeholder="请输入"
                   v-model="formMessage.arrangeNum">
          </div>
          <span v-if="ifCleanByBike==1"
                class="iconfont icon-jiantou1"
                style="color:#999999;font-size:0.8rem;text-align:right"
                @click="dealDetailList('整理')"></span>
        </div>
      </div>
      <div class="superList"
           style="margin-top:0.05rem;">
        <div>
          <div class="iteamForm"
               style="padding:0"
               v-if="isNumberbike">
            <div v-for="(iteam,index) in bikeCleanCompany1"
                 :key="index"
                 :class="index == (bikeCleanCompany1.length-1) ? 'border-bike':'border-bike2'"
                 style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem;">
              <h7 style="color:#333333;font-size:0.52rem;margin-bottom:0.11rem;margin:0">{{iteam.arrangeNum==''||iteam.arrangeNum==undefined?0:iteam.arrangeNum}}</h7>
              <span class="companyBike"
                    style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                    :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1143? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'">{{iteam.name}}</span>
            </div>
          </div>
          <div v-if="isNumberbike&&bikeCleanCompany2.length>0"
               class="iteamForm"
               style="border-top:1px solid #eeeeee">
            <div v-for="(iteam,index) in bikeCleanCompany2"
                 :key="index"
                 :class="index == 2||index==bikeCleanCompany2.length-1 ? 'border-bike':'border-bike2'"
                 style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem">
              <h7 style="color:#333333;font-size:0.52rem;margin-bottom:0.1rem;margin:0">{{iteam.arrangeNum==''||iteam.arrangeNum==undefined?0:iteam.arrangeNum}}</h7>
              <span class="companyBike"
                    style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                    :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1143? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'">{{iteam.name}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="superList"
           style="margin-top:0.2rem;">
        <div class="iteamForm"
             style="padding-right:0.3rem">
          <img src="../../assets/image/selfcheck/icon_5_num1@3x.png"
               width="24"
               height="24"
               alt
               srcset>
          <div class="rightsa"
               style="border:none">
            <span>清运数</span>
            <span v-if="ifCleanByBike==1"
                  style="flex:1;line-height:100%;text-align:right;">{{formMessage.cleanNum}}</span>
            <input v-if="ifCleanByBike==0"
                   style="text-align:right;"
                   type="number"
                   placeholder="请输入"
                   v-model="formMessage.cleanNum">
          </div>
          <span v-if="ifCleanByBike==1"
                class="iconfont icon-jiantou1"
                style="color:#999999;font-size:0.8rem;"
                @click="dealDetailList('清运')"></span>
        </div>
      </div>
      <div class="superList"
           style="margin-top:0.05rem;">
        <div>
          <div class="iteamForm"
               style="padding:0"
               v-if="isNumberbike1">
            <div v-for="(iteam,index) in bikeCleanCompany1"
                 :key="index"
                 :class="index == (bikeCleanCompany1.length-1) ? 'border-bike':'border-bike2'"
                 style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem;">
              <h7 style="color:#333333;font-size:0.52rem;margin-bottom:0.11rem;margin:0">{{iteam.cleanNum==''||iteam.cleanNum==undefined?0:iteam.cleanNum}}</h7>
              <span class="companyBike"
                    style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                    :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1143? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'">{{iteam.name}}</span>
            </div>
          </div>
          <div v-if="isNumberbike1&&bikeCleanCompany2.length>0"
               class="iteamForm"
               style="border-top:1px solid #eeeeee">
            <div v-for="(iteam,index) in bikeCleanCompany2"
                 :key="index"
                 :class="index == 2||index==bikeCleanCompany2.length-1? 'border-bike':'border-bike2'"
                 style="display: flex;flex:1;flex-direction: column;justify-content:center;align-items: center;margin:0.2rem;width:30%">
              <h7 style="color:#333333;font-size:0.52rem;margin-bottom:0.1rem;margin:0">{{iteam.cleanNum==''||iteam.cleanNum==undefined?0:iteam.cleanNum}}</h7>
              <span class="companyBike"
                    style="font-size:0.28rem;width:1rem;height:0.5rem;line-height: 0.32rem;padding:0.1rem"
                    :class="iteam.id == 1006 ? 'mobike' : iteam.id == 1007? 'ofo':iteam.id == 1143? 'jiujiu':iteam.id == 1015? 'haluo':iteam.id == 1059? 'xiangqi':'other'">{{iteam.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button type="button"
              class="buttonSa"
              @click="save()">暂存</button>
      <button type="button"
              class="buttonSa1"
              @click="submit()">完成</button>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  computed: {},
  data () {
    return {
      time: "",
       fileList: [],
      fileList1: [],
      showstart:false,
      popupVisible: false,
      popupVisible2: false,
      popupVisible1: false,
      isNumberbike: false,
      isNumberbike1: false,
      bigImage: "",
      rotateS: 0,
      roleCode: "",
      myMap: null,
      slide1: [],
      slide2: [],
      slide: [],
      placeData: [],
      sheetCode: "",
      imageStatus: 0,
      iteamList: {},
      handleBefore: [],
      lageImg: [], //轮播显示图片
      ifCleanByBike: "", //是否分成企业填写整理数
      bikeTitle: "",
      indexImage: 0,
      handleAfter: [],
      bikeCleanCompany: [],
      bikeCleanCompany1: [],
      bikeCleanCompany2: [],
      formMessage: {
        // handleTime: Date.now(),
        handleAddr: "",
        arrangeNum: "",
        gpsLongitude: "",
        gpsLatitude: "",
        dispachRemark: "",
        createTime: '',
        handleBeforeURLs: [],
        handleAfterURLs: [],
        cleanNum: "",
        sheetCode1: "",
        remark: "",
        //c查询条件
        viewTypesa: "",
        areakids: [],
        areaarr: [],
        searchCondition: {},
        menuListTop: [],
        downIcon: -1
      }
    };
  },
  components: {},
  watch: {
    bikeCleanCompany: function (val) {
      val.forEach((iteam) => {
        if (iteam.arrangeNum > 100 || iteam.cleanNum > 100) {
          iteam.arrangeNum = 0
          iteam.cleanNum = 0
          return
        }
      })
    }
  },
  mounted () { },
  created () {
    this.roleCode = localStorage.roleCode;
    if (this.$route.query.id) {
      this.sheetCode = this.$route.query.id;
      this.viewTypesa = this.$route.query.viewTypesa;
      this.getMessage(this.sheetCode);
      if (this.$route.query.downIcon || this.$route.query.downIcon == 0) {
        this.searchCondition = this.$route.query.searchCondition;
        this.menuListTop = this.$route.query.menuListTop;
        this.downIcon = this.$route.query.downIcon;
        this.areakids = this.$route.query.areakids;
        this.areaarr = this.$route.query.areaarr;
      }
    }
    // this.getComanylist();
    this.getbikeCleanCompany();
    window.getImage = this.getImage;
    window.watchBackWXS = this.watchBackWXS;
    this.getMap();
  },
  methods: {
      clickImage1 () {
      this.imageStatus = 2;
      this.downPictur("bikeImg");
    },
    clickImage () {
      this.imageStatus = 1;
      this.downPictur("bikeImg");
    },
     afterRead(file) {
      this.showstart = true;
      console.log(file)
      if (file&&!Array.isArray(file)){   
          file=[file]
      }
      console.log(file)
      file.forEach(iteam=>{
        lrz(iteam.file, {
          quality: 0.2    //自定义使用压缩方式
        })  
        .then(rst=> {
          console.log(rst)
          let formdata = new FormData();
          formdata.append("files", rst.file);
          formdata.append("imgType", "bikeImg");
          this.$fetchPost("uploadFiles", formdata, "json").then(res => {
            if (res.data) {
              this.handleBefore.push(res.data[0].fileName);
              this.formMessage.handleBeforeURLs.push(res.data[0].filePath);
              this.showstart = false;
              //  file.file.status = 'done';
            }
          });
        })
      })
      
     
    },
    afterRead1(file) {
      this.showstart = true;
      console.log(file)
      if (file&&!Array.isArray(file)){   
          file=[file]
      }
      console.log(file)
      file.forEach(iteam=>{
        lrz(iteam.file, {
          quality: 0.2    //自定义使用压缩方式
        })  
        .then(rst=> {
          console.log(rst)
          let formdata = new FormData();
          formdata.append("files", rst.file);
          formdata.append("imgType", "bikeImg");
          this.$fetchPost("uploadFiles", formdata, "json").then(res => {
            if (res.data) {
               this.handleAfter.push(res.data[0].fileName);
              this.formMessage.handleAfterURLs.push(res.data[0].filePath);
              this.showstart = false;
              //  file.file.status = 'done';
            }
          });
        })
      })
      
     
    },
    beforeRead(file){
      // this.showstart = true;
      if(file.length>4){
        MessageBox.alert("", {
          message: "最多上传4张照片",
          title: "提示"
        }).then(action => {});
      }
       return true;
      
    },
   
    rotate () {
      this.rotateS = this.rotateS + 90;
    },
    getbikeCleanCompany () {
      this.$fetchGet("count/bikeCleanCompany")
        .then(res => {
          res.forEach(iteam => {
            iteam.orgId = iteam.id;
          });
          this.bikeCleanCompany = res;
        })
        .catch(res => { });
    },
    submitBike () {
      this.bikeCleanCompany.forEach((iteam) => {
        if (iteam.arrangeNum > 100 || iteam.cleanNum > 100) {
          iteam.arrangeNum = 0
          iteam.cleanNum = 0
          return
        }
      })
      this.popupVisible2 = false;
      if (this.bikeTitle == "整理" && this.sum(this.bikeCleanCompany) !== 0) {
        this.isNumberbike = true;
        this.formMessage.arrangeNum = this.sum(this.bikeCleanCompany);
      } else if (this.bikeTitle == "整理" && this.sum(this.bikeCleanCompany) == 0) {
        this.isNumberbike = false;
        this.formMessage.arrangeNum = 0;
      }
      else if (
        this.bikeTitle == "清运" &&
        this.sum1(this.bikeCleanCompany) !== 0
      ) {
        this.isNumberbike1 = true;
        this.formMessage.cleanNum = this.sum1(this.bikeCleanCompany);
      } else if (
        this.bikeTitle == "清运" &&
        this.sum1(this.bikeCleanCompany) == 0
      ) {
        this.isNumberbike1 = true;
        this.formMessage.cleanNum = 0;
      }

      if (this.bikeCleanCompany.length > 3) {
        this.bikeCleanCompany1 = this.bikeCleanCompany.slice(0, 3);
        this.bikeCleanCompany2 = this.bikeCleanCompany.slice(
          3,
          this.bikeCleanCompany.length
        );
      } else {
        this.bikeCleanCompany1 = this.bikeCleanCompany;
      }
    },
    dealDetailList (val) {
      this.bikeTitle = val;
      this.popupVisible2 = true;
    },
    watchBackWXS () {
      if (this.popupVisible || this.popupVisible1) {
        this.popupVisible = false;
        this.popupVisible1 = false
      } else {
        this.toHome();
      }

    },
    //获取分企业添加的列表
    // getComanylist() {
    //   this.$fetchGet("cleanConfig/ifCleanByBike")
    //     .then(res => {
    //       this.ifCleanByBike = res;
    //     })
    //     .catch(res => {});
    // },
    toHome () {
      this.$router.push({
        path: "/layout/needtodo",
        query: {
          name: "2",
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areaarr: this.areaarr,
          areakids: this.areakids,
          viewTypesa: this.viewTypesa
        }
      });
    },
    getMap1 () {
      this.popupVisible1 = true;
      this.getMap();
    },
    getMap () {
      this.myMap = new AMap.Map("myMap");
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        useNative: true,
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      geolocation.getCurrentPosition((status, result) => {
        this.formMessage.gpsLongitude = result.position.lng;
        this.formMessage.gpsLatitude = result.position.lat;
        var markers = [{
          icon: require('../../assets/image/supervise/iconren.png'),
          label: {
            offset: new AMap.Pixel(-20, -30),
            content: "<div class='info'>处理位置</div>"
          },
          position: [this.formMessage.gaodeLongitude, this.formMessage.gaodeLatitude]
        }, {
          icon: require('../../assets/image/supervise/iconpr.png'),
          label: {
            offset: new AMap.Pixel(-20, -30),
            content: "<div class='info'>当前位置</div>"
          },
          position: [result.position.lng, result.position.lat]
        }];

        // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
        markers.forEach((marker) => {
          new AMap.Marker({
            map: this.myMap,
            icon: marker.icon,
            label: marker.label,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-13, -30)
          });
        });
        this.myMap.setFitView();

      });
    },
    iconClick () {
      this.$router.push({
        path: "/transfer",
        query: {
          sheetCode1: this.sheetCode1,
          message: this.sheetCode,
          viewTypesa: this.viewTypesa,
          searchCondition: this.searchCondition,
          menuListTop: this.menuListTop,
          downIcon: this.downIcon,
          areakids: this.areakids,
          areaarr: this.areaarr
        }
      });
    },
    handOpen (val, index) {
      // this.rotateS = 0;
      // this.popupVisible = true;
      // val = val.replace(".400x400.jpg", ".square.jpg");
      // this.bigImage = val;
      this.rotateS = 0;
      this.lageImg = [];
      this.popupVisible = true;
      val.forEach(iteam => {
        iteam = iteam.replace(".400x400.jpg", ".square.jpg");
        this.lageImg.push(iteam);
      });
      this.indexImage = index;
    },
    getImage (val, row) {
      if (this.imageStatus == 1) {
        this.handleBefore.push(val);
        this.formMessage.handleBeforeURLs.push(row);
      }
      if (this.imageStatus == 2) {
        this.handleAfter.push(val);
        this.formMessage.handleAfterURLs.push(row);
      }
    },
    detailImage (index, id) {
      MessageBox.confirm("是否确认删除图片?").then(action => {
        if (action == "confirm") {
          //确认的回调
          if (index == 1) {
            this.handleBefore.splice(id, 1);
            this.formMessage.handleBeforeURLs.splice(id, 1);
          } else {
            this.handleAfter.splice(id, 1);
            this.formMessage.handleAfterURLs.splice(id, 1);
          }
        }
      });
    },
  
    handleClose () {
    },
    splitsa (val) {
      return (
        val.split(" ")[0].split("-")[1] + "-" + val.split(" ")[0].split("-")[2]
      );
    },
    splitsa1 (val) {
      return (
        val.split(" ")[1].split(":")[0] + ":" + val.split(" ")[1].split(":")[1]
      );
    },
    //计算综合整理数的方法
    sum (arr) {
      var s = 0;
      arr.forEach(function (val, idx, arr) {
        if (val.arrangeNum) {
          s += Number(val.arrangeNum);
        }
      }, 0);
      return s;
    },
    sum1 (arr) {
      var s = 0;
      arr.forEach(function (val, idx, arr) {
        if (val.cleanNum) {
          s += Number(val.cleanNum);
        }
      }, 0);
      return s;
    },
    getMessage (val) {
      this.$fetchGet("cleanConfig/ifCleanByBike").then(res => {
        this.ifCleanByBike = res;
        this.$fetchGet("dispatch/dispatchDetail", {
          id: val
        })
          .then(res => {
            if (res.status == 1) {
              this.sheetCode1 = res.dispatchDetail.sheetCode;
              this.formMessage = res.dispatchDetail;
              // if (this.formMessage.handleTime == undefined) {
              //   this.formMessage.handleTime = Date.now();
              // }
              this.handleBefore = res.dispatchDetail.handleBefore.split(";");
              this.handleAfter = res.dispatchDetail.handleAfter.split(";");
              if (res.dispatchDetail.arrangeNum > 0 && this.ifCleanByBike == 1) {
                this.isNumberbike = true;
                res.dispatchDetail.dispatchDealDetailList.forEach(iteam => {
                  iteam.id = iteam.orgId;
                  iteam.name = iteam.orgName;
                });
                this.bikeCleanCompany = res.dispatchDetail.dispatchDealDetailList;
                if (res.dispatchDetail.dispatchDealDetailList.length > 3) {
                  this.bikeCleanCompany1 = this.bikeCleanCompany.slice(0, 3);
                  this.bikeCleanCompany2 = this.bikeCleanCompany.slice(
                    3,
                    this.bikeCleanCompany.length
                  );
                } else {
                  this.bikeCleanCompany1 = res.dispatchDetail.dispatchDealDetailList;
                }
              }
              if (res.dispatchDetail.cleanNum > 0 && this.ifCleanByBike == 1) {
                this.isNumberbike1 = true;
                res.dispatchDetail.dispatchDealDetailList.forEach(iteam => {
                  iteam.id = iteam.orgId;
                  iteam.name = iteam.orgName;
                });
                this.bikeCleanCompany = res.dispatchDetail.dispatchDealDetailList;
                if (res.dispatchDetail.dispatchDealDetailList.length > 3) {
                  this.bikeCleanCompany1 = this.bikeCleanCompany.slice(0, 3);
                  this.bikeCleanCompany2 = this.bikeCleanCompany.slice(
                    3,
                    this.bikeCleanCompany.length
                  );
                } else {
                  this.bikeCleanCompany1 = res.dispatchDetail.dispatchDealDetailList;
                }
              }
            }
          })
          .catch(res => { });
      });
    },
    save () {
      if (this.formMessage.handleBeforeURLs.length == 0) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => { });
      } else if (this.formMessage.arrangeNum > 100 || this.formMessage.cleanNum > 100) {
        MessageBox.alert("", {
          message: "整理或清运数量有误",
          title: "提示"
        }).then(action => { });
      } else {
        let obj = {};
        obj.dispatchDetail = this.formMessage;
        obj.dispatchDetail.createTime = this.formMessage.dispatchTime;
        obj.dispatchDealDetailList = this.bikeCleanCompany;
        obj.dispatchDetail.handleBefore = this.handleBefore.join(";");
        obj.dispatchDetail.handleAfter = this.handleAfter.join(";");
        obj.finish = 0;
        this.$fetchPost("dispatch/saveDispatchDetail", obj, "json")
          .then(res => {
            if (res.status == -1) {
              MessageBox.alert("", {
                message: res.message,
                title: "提示"
              }).then(action => { });
            } else {
              MessageBox.alert("", {
                message: "保存成功",
                title: "提示"
              }).then(action => {
                this.$router.push("/layout/needtodo");
              });
            }
          })
          .catch(res => {
            MessageBox.alert("", {
              message: "请求超时",
              title: "提示"
            }).then(action => { });
          });
      }
    },
    submit () {
      console.log(this.formMessage.arrangeNum)
        console.log(this.formMessage.cleanNum)
      if (this.formMessage.handleBeforeURLs.length == 0) {
        MessageBox.alert("", {
          message: "请上传整理前照片",
          title: "提示"
        }).then(action => { });
      } else if (this.formMessage.handleAfterURLs.length == 0) {
        MessageBox.alert("", {
          message: "请上传整理后照片",
          title: "提示"
        }).then(action => { });
      } else if (
        (this.formMessage.arrangeNum == "" &&
          this.formMessage.cleanNum == "") ||(this.formMessage.arrangeNum == undefined&&this.formMessage.cleanNum == undefined)||
        (this.formMessage.arrangeNum < 0 || this.formMessage.cleanNum < 0) ||
        (this.formMessage.arrangeNum == 0 && this.formMessage.cleanNum == 0) || this.formMessage.arrangeNum > 100 || this.formMessage.cleanNum > 100
      ) {
        
        MessageBox.alert("", {
          message: "整理或清运数量有误",
          title: "提示"
        }).then(action => { });
      } else {
        MessageBox.confirm("", {
          message: "是否确认处理完成",
          title: "提示"
        }).then(action => {
          if (action == "confirm") {
            let obj = {};
            obj.dispatchDetail = this.formMessage;
            obj.dispatchDetail.createTime = this.formMessage.dispatchTime;
            obj.dispatchDealDetailList = this.bikeCleanCompany;
            obj.dispatchDetail.handleBefore = this.handleBefore.join(";");
            obj.dispatchDetail.handleAfter = this.handleAfter.join(";");
            obj.finish = 1;
            this.$fetchPost("dispatch/saveDispatchDetail", obj, "json")
              .then(res => {
                if (res.status == -1) {
                  MessageBox.alert("", {
                    message: res.message,
                    title: "提示"
                  }).then(action => { });
                } else {
                  MessageBox.alert("", {
                    message: "提交成功",
                    title: "提示"
                  }).then(action => {
                    this.$router.push("/layout/needtodo");
                  });
                }
              })
              .catch(res => {
                MessageBox.alert("", {
                  message: "请求超时",
                  title: "提示"
                }).then(action => { });
              });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  padding: 0;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background-color: #f2f2f2;
  .wrapperfast {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  
  }
  .companyBike {
    color: #fff;
    font-size: 0.34rem;
    padding: 0.1rem 0.2rem;
    border-radius: 0.3rem;
    box-sizing: border-box;
    margin: 0;
    width: 1.2rem;
    height: 0.6rem;
    text-align: center;
    line-height: 0.44rem;
  }
  .mobike {
    background: #f25b4a;
  }
  .ofo {
    background: #fbc303;
    color: #333333;
  }
  .haluo {
    background: #01a1ff;
  }
  .jiujiu {
    background: #4DC5BC;
  }
  .xiangqi {
    background: #00cb4b;
  }
  .other {
    background: #9a6eff;
  }
  .version-popup-box {
    height: 100%;
    width: 100%;
    background: transparent;
    color: #282828;
    display: flex;
    align-items: center;
    .version-popup {
      margin: 0 auto;
      background: #fff;
      height: 9rem;
      width: 8.82rem;
      border-radius: 0.16rem;
      display: flex;
      flex-direction: column;
      padding: 0.4rem 0;
      .version-popup-content {
        display: flex;
        justify-content: flex-start;
        margin-top: 0.4rem;
        height: 1.2rem;
        box-sizing: border-box;
        align-items: center;
        input {
          height: 90%;
          border-bottom: 1px solid #dddddd;
        }
      }
      .bottomsa {
        width: 100%;
        height: 1rem;
        border-top: 1px solid #eeeeee;
        color: #999999;
        display: flex;
        justify-content: space-between;
        p {
          margin: 0;
          padding: 0;
          width: 50%;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-right: 1px solid #eeeeee;
        }
      }
    }
  }
  .imgMask {
    width: 100%;
    height: 100%;
    line-height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .mapwhere {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;
    background: #fff;
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

    #myMap {
      width: 100%;
      flex: 1;
    }
  }
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
    width: 100%;
    flex: 1;
    height: 1px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    align-items: center;
    margin-bottom: 0.2rem;
    .superList {
      width: 100%;
      box-sizing: border-box;

      border-radius: 2px;
      .green {
        color: #ffc000;
        // border: 1px solid #ffc000;
        // box-sizing: border-box;
        // padding: 0.06rem;
        // border-radius: 5px;
      }
      .red {
        color: #41cd76;
        // border: 1px solid #41cd76;
        // box-sizing: border-box;
        // padding: 0.06rem;
        // border-radius: 5px;
      }
      .blue {
        color: red;
        // border: 1px solid red;
        // box-sizing: border-box;
        // padding: 0.06rem;
        // border-radius: 5px;
      }
      .iteamForm {
        display: flex;
        justify-content: flex-start;
        width: 100%;
        box-sizing: border-box;
        padding: 0.3rem;
        background-color: #ffffff;
        align-items: center;
        .border-bike {
          border: none;
        }
        .border-bike2 {
          border-right: 1px solid #dddddd;
        }
        .rightsa {
          width: 100%;
          margin: 0;
          padding: 0;
          margin-left: 0.3rem;
          border-bottom: 1px solid #eeeeee;
          height: 1rem;
          line-height: 0.6rem;
          display: flex;
          justify-content: space-between;
          // text-align:right;
          align-items: center;
          padding-right: 0.3rem;
          input {
            margin-bottom: 0.4rem;
          }
        }
        .rightsa1 {
          width: 100%;
          margin: 0;
          padding: 0;
          margin-left: 0.3rem;
          display: flex;
          justify-content: space-between;
          padding-right: 0.3rem;
        }
      }
      .iteamImage {
        width: 100%;
        display: flex;
        background-color: #ffffff;
        flex-direction: column;
        box-sizing: border-box;
        margin-top: 0.2rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        .imageList {
          display: flex;
          flex-wrap: wrap;
          box-sizing: border-box;
          padding-left: 0.3rem;
          padding-top: 0.2rem;
          .detailIcon {
            position: relative;
            margin-right: 0.2rem;
            span {
              position: absolute;
              right: 0px;
              top: 0px;
            }
          }
        }
        div {
          img {
            border: none;
            margin-bottom: -4px;
          }
          vertical-align: middle;
          span {
            font-size: 0.4rem;
            margin-left: 0.3rem;
          }
        }
      }
      .topsa {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        margin: 0 0.3rem;
        background: #fff;
        padding: 0.3rem;
        border-top-left-radius: 0.12rem;
        border-top-right-radius: 0.12rem;
        border-bottom: 1px solid #f2f2f2;
        .overimg {
          display: flex;
          justify-content: flex-start;
          .overTimeFlag {
            width: 0.57rem;
            height: 0.51rem;
            background-image: url("../../assets/image/me/overtimg.gif");
            background-size: 100% 100%;
            margin-right: 0.12rem;
          }
        }
        .fontext {
          position: relative;
          margin-left: 0.3rem;
          &::before {
            content: "";
            position: absolute;
            top: 0.015rem;
            left: 0px;
            width: 0.1rem;
            height: 0.4rem;

            background: #5076ff;
            margin-left: -0.25rem;
          }
        }
      }
      .topcloum {
        background: #fff;

        display: flex;
        box-sizing: border-box;
        margin: 0 0.3rem;
        padding: 0.3rem;
        flex-direction: column;
        border-bottom-left-radius: 0.12rem;
        border-bottom-right-radius: 0.12rem;
        .reaed-sa {
          background: #aaaaaa;
        }
        .reaed-sa1 {
          background: #5076ff;
        }
        .reaed-two {
          background: #ff0000;
        }
        .topcloumson {
          display: flex;
          justify-content: flex-start;
          padding-bottom: 0.3rem;

          .leftfont {
            width: 25%;
            color: #999999;
            font-size: 0.37rem;
          }
          .leftfont1 {
            width: 75%;
            img {
              margin-right: 0.2rem;
              width: 2.5rem;
              height: 2.5rem;
            }
          }
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

