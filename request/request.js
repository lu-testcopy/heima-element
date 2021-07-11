import axios from 'axios'
// 创建一个axios实例
const request = axios.create({
    // 配置根路径
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  })
  request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config);
    const user = window.localStorage.getItem('cookie')
    console.log(user);
    if(user) {
      config.headers.Authorization = user
    }
    return config;
  })

export default request