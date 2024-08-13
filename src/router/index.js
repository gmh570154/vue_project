import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {keepAlive} from "../api/base";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('../views/Video.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  console.log("router 拦截")
  let token = localStorage.getItem('Authorization');
  if (token) {  // 已登录，可以跳转
      next();
  } else {
        console.log("do keepalive check")   // 待优化，需要请求成功才能next
        var url_query = window.location.search
        var query =""
        if (url_query.indexOf("access_token") > 0){
          query = url_query
        }else{
          var current_url = window.location.origin
          console.log('http://192.168.110.128:8088/web/login' + "?redirect_uri=" + current_url + "&response_type=token&client_id=test_client_3")
          window.location.href = 'http://192.168.110.128:8088/web/login' + "?redirect_uri=" + current_url + "&response_type=token&client_id=test_client_3";
        }

        keepAlive(query).then(function (response) {
          console.log(response.data)
          next();
        })
  }
})


export default router
