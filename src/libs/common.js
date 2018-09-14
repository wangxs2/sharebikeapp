
import echarts from 'echarts' //引入echarts

import * as http from './http'

export default {
  install(Vue, options) {
    /* *
     *成功提示
     */
    Vue.prototype.Gsuccess = function (msg) {

    }
    /* *
     *警告提示
     */
    Vue.prototype.Gwarning = function (msg) {

    }
    /* *
     *失败提示
     */
    Vue.prototype.Gerror = function (msg) {

    }

    /* *
     *@method echarts
     */
    Vue.prototype.$echarts = echarts;

    /* *
     *@method 引入axios
     */
    // Vue.prototype.$axios = Axios;
    Vue.prototype.$fetchGet = http.fetchGet;
    Vue.prototype.$fetchPost = http.fetchPost;
    Vue.prototype.$fetchPut = http.fetchPut;
    Vue.prototype.$fetchDelete = http.fetchDelete;

    /* *
     *@method 返回功能
     */
    Vue.prototype.getBack = function () {
      this.$router.go(-1)
    }

    /* *
     *@method 判断子串
     *@param {String} 需要判断的子串
     *@return {Boolean}
     */
    Vue.prototype.isContains = function (substr) {
      var str = localStorage.getItem("auth");
      return new RegExp(substr, 'g').test(str);
    };

    /* 
     *@method 删除文件的时间戳
     *@param {Str} 文件名
     *@return {Str} 删除时间戳后的文件名
     * */
    Vue.prototype.deletetimestamp = function (name) {
      let str = '';
      let oldname = name.lastIndexOf('.');
      let fileName = name.substring(0, oldname);
      let fileType = name.substring(oldname, oldname.length)
      fileName = fileName.substring(0, fileName.length - 13);
      str = fileName + fileType;
      return str;
    };

    /* *
     *@method 获取cookie
     *@param {String} 获取coolie的key
     *@return {String} 获取coolie的value
     */
    Vue.prototype.getCookie = function (name) {
      var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
    };

    /* *
     *@method 深拷贝 
     *@param {Obj} 需要拷贝的 对象 数组
     *@return {Obj}
     */
    Vue.prototype.cloneObj = function (obj) {
      let _this = this;
      let str, newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      } else if (window.JSON) {
        str = JSON.stringify(obj);
        newobj = JSON.parse(str);
      } else {
        for (var i in obj) {
          newobj[i] = typeof obj[i] === 'object' ? _this.cloneObj(obj[i]) : obj[i];
        }
      }
      return newobj;
    };
    Vue.prototype.downPictur = function (ios, andio) {
      let ua = navigator.userAgent.toLowerCase();
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //Ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
        // ios
        // window.webkit.messageHandlers.login.postMessage({ body: "nowlogin" });
        window.webkit.messageHandlers.photo.postMessage({ body: "Photograph" });
      } else if (/(Android)/i.test(navigator.userAgent)) {
        // andio
        //Android终端
        // Android.requestTerminal()
        Android.requestPicture();
      }
    };
    Vue.prototype.downApp = function (ios, andio) {
      let ua = navigator.userAgent.toLowerCase();
      let isAndroid = ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1; //Ios终端
      let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //Ios
        // ios
        window.webkit.messageHandlers.login.postMessage({ body: "nowlogin" });
        // window.webkit.messageHandlers.photo.postMessage({ body: "Photograph" });
      } else if (/(Android)/i.test(navigator.userAgent)) {
        // andio
        //Android终端
        Android.requestTerminal()
        // Android.requestPicture();
      }
    };
      /* *
       *全局过滤 时间
       */
      Vue.prototype.FormatDate = function (date) {
        let nstr = new Date(date)//当天时间  
        let now_year = nstr.getFullYear() //年份  
        let now_month = (nstr.getMonth() + 1) < 10 ? '0' + (nstr.getMonth() + 1) : nstr.getMonth() + 1 //月份 
        let now_day = nstr.getDate() < 10 ? '0' + nstr.getDate() : nstr.getDate() //日期  
        let now_hours=nstr.getHours()<10?'0'+nstr.getHours():nstr.getHours() //时 
        let now_minut=nstr.getMinutes()<10?'0'+nstr.getMinutes():nstr.getMinutes() //分
        // let now_second=nstr.getSeconds()<10?'0'+nstr.getSeconds():nstr.getSeconds() //秒
        return now_year + "-" + now_month + "-" + now_day+ " " +now_hours+":" + now_minut
      };

    Vue.filter('FormatTime', (value, arg) => {
      if (value) {
        return new Date(value).Format(arg)
      }
    });

    /* *
     *全局过滤 性别
     */
    Vue.filter('FormatSex', (value) => {
      if (value == 0) {
        return "男"
      } else if (value == 1) {
        return "女"
      }
    });
  }
}
