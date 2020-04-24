// axios 请求模块

// 引入
import axios from 'axios'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  // 定义后端返回数据的处理 (参数data 是 后端返回的未经处理的JSON格式字符串)
  transformResponse: [function (data) {
    // Do whatever you want to transform the data
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(
  // 所有请求会经过这里
  // config 是当前请求相关的配置信息对象
  // config是可以修改的
  function (config) {
    // 可以在允许请求发送之前设置统一业务处理
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录用户信息,就统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // return config后请求才会真正发出去
    return config
  },
  // 请求失败 经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 导出
export default request
