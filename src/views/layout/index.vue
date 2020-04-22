<template>
<el-container class="layout-container">
  <el-aside class="aside" width="200px">
      <app-aside class="aside-menu" />
  </el-aside>
  <el-container>
    <el-header class="header">
      <app-header />
    </el-header>
    <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
    </el-main>
  </el-container>
</el-container>

 <!-- <div class="layout-container">
     <div>顶部导航栏</div>
     <div>侧边导航栏</div>
    <router-view />
 </div> -->

</template>

<script>
import AppAside from './components/aside'
import AppHeader from './components/header'
export default {
  name: 'LayoutIndex',
  components: {
    AppAside,
    AppHeader
  },
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.layout-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
}
.aside {
    background-color: #58bcbc;
    .aside-menu {
        width: 100%
    }
}
.header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;

}
.main {
    background-color: #3ba07c;
}

</style>
