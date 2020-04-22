<template>
 <div class="header-container">
    <div>
         <i class="el-icon-s-fold"></i>
         <span>江苏传智博客</span>
     </div>
     <el-dropdown>
         <div class="avatar-wrap">
             <img class="avatar" :src="user.photo" alt="">
             <span>{{ user.name }}</span>
             <i class="el-icon-arrow-down el-icon--right"></i>
         </div>
       <!-- <span>
         <i class="el-icon-arrow-down el-icon--right"></i>
       </span> -->
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item>设置</el-dropdown-item>
         <el-dropdown-item>退出</el-dropdown-item>
     </el-dropdown-menu>
</el-dropdown>
 </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'AppHeader',
  components: {},
  props: {},
  data () {
    return {
      user: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    // 组件初始化后获取请求资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 处理登录接口,其他接口都需要提供身份令牌才能获取数据
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    }
  }
}
</script>
<style scoped lang="less">
.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
}
.avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
}
</style>
