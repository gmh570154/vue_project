/**
 * 全站http配置
 *
 * axios参数说明
 */
import axios from 'axios'
import website from '@/config/website';

axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//HTTPrequest拦截
axios.interceptors.request.use(config => {
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  //config.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
  if (!isToken) {
    config.headers['Blade-Auth'] = 'bearer ' // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
  }
  //headers中配置serialize为true开启序列化
  if (config.method === 'post' && meta.isSerialize === true) {
    //config.data = serialize(config.data);
  }
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(res => {
  const status = res.status || 200
  const statusWhiteList = website.statusWhiteList || [];
  const message = res.data.msg || '未知错误';
  //如果在白名单里则自行catch逻辑处理
  if (statusWhiteList.includes(status)) return Promise.reject(res);
  //如果是401则跳转到登录页面
  if ((status === 401) || (status === 405)) {
    localStorage.removeItem('Authorization');
    var current_url = window.location.origin
    console.log("http: code" + status)
    console.log(res.data.sso_url + "?redirect_uri=" + current_url + "&response_type=token&client_id=test_client_3")
    window.location.href = res.data.sso_url + "?redirect_uri=" + current_url + "&response_type=token&client_id=test_client_3";
  }
  // 如果请求为非200否者默认统一处理
  if ((status === 500 ) || (status === 404 )) { // || status !== 200
    return Promise.reject(new Error(message))
  }
  localStorage.setItem('Authorization', true);
  return res;
}, error => {
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        // window.location.href = "/"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    console.log('服务器响应超时，请刷新当前页')
    error.message = '连接服务器失败'
  }
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)
})

export default axios;
