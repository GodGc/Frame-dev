import axios from 'axios';
import {message } from 'antd';

//request-interceptor
axios.interceptors.request.use(
  config => {
    //获取储存在本地的token值
    let token = window.localStorage.getItem('token');
      //这边可根据自己的需求设置headers
    if (token !== null) {
      config.headers.Token = token;
    }
    else {
      config.headers.Token = '';
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);


// respone-interceptor
axios.interceptors.response.use(
  response => {
    const res = response;
    
    if(res && res.data && res.data.status == 10005){
      message.warning('会话超时，请重新登录');
      setTimeout(() => {
        location.href = '#/user/login'
      }, 1500);
    }
    return response;
  },
  error => {
      return Promise.reject(error)
  }
)

export default axios;

