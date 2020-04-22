// 用户相关请求模块
import request from '@/utils/request'
// 用户登陆
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    // data:this.user
    data
  })
}

// 获取用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    // 后端要求 把需要授权的用户身份放到请求头
    // axios通过 headers 选项设置请求头
    // 属性名: Authorization
    // 属性值: Bearer空格token数据
    headers: {
      // 属性名和值都得看接口的要求
      // 属性名：Authorization，接口要求的
      // 属性值：Bearer空格token数据
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg5MDkxMjYsInVzZXJfaWQiOjEsInJlZnJlc2giOmZhbHNlLCJ2ZXJpZmllZCI6dHJ1ZX0.EdKErKDqMc3snkYxqt02jSa8t9G44002yWKY3CMOMJg'
    }
  })
}
// 修改用户信息
