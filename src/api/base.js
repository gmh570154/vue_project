import request from '@/router/axios';

export const keepAlive = (query) => {
  return request({
    url: '/rest/keepalive' + query,
    method: 'get',
    params: {}
  })
}

export const userVar = (query) => {  //todo
  return request({
    url: '/rest/uservar' + query,
    method: 'get',
    params: {}
  })
}