import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // 命名路由layout有一个默认子路由,这个名字没有意义
    // 正确做法, 如果有默认子路由,就不给父路由起名字
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // path 为空
        name: 'home',
        component: Home
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
