import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from './router/axios';
import {keepAlive} from "./api/base";

Vue.prototype.$http= axios
Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App),
  data:{
      timer:'',
      query: ''
  },
  created :function () {
      this.doKeepAlive(); //定时器要执行的任务和间隔时间（毫秒）
      this.timer = setInterval(this.doKeepAlive, 60000);  //当前设置60s，实际上线3s
  },
  computed:{},
  methods:{  //axios异步请求
      doKeepAlive:function () {
          console.log("start keepalive")
          var url_query = window.location.search
          if (url_query.indexOf("access_token") > 0){
            this.query = url_query
          }else{
            this.query = ""
          }

          keepAlive(this.query).then(function (response) {
            console.log(response.data)
          })
      }
  },
  mouted:function(){},
  beforeDestroy:function() { //关闭窗口后清除定时器
      clearInterval(this.timer);
  }
}).$mount('#app')
