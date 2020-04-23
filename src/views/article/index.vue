<template>
 <div class="article-contanier">
     <!-- 卡片 -->
     <el-card class="filter-card">
  <div slot="header" class="clearfix">
     <!-- 面包屑路径导航 -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
     <el-breadcrumb-item>活动管理</el-breadcrumb-item>
     </el-breadcrumb>
     <!-- /面包屑 -->
  </div>
  <!-- 数据筛选表单 -->
  <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="状态">
      <el-radio-group v-model="form.resource">
        <el-radio label="全部"></el-radio>
        <el-radio label="草稿"></el-radio>
        <el-radio label="待审核"></el-radio>
        <el-radio label="审核通过"></el-radio>
        <el-radio label="审核失败"></el-radio>
        <el-radio label="已删除"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="form.region" placeholder="请选择频道">
        <el-option label="开发者资讯" value="shanghai"></el-option>
        <el-option label="ios" value="beijing"></el-option>
        <el-option label="c++" value="beijing"></el-option>
        <el-option label="android" value="beijing"></el-option>
        <el-option label="css" value="beijing"></el-option>
        <el-option label="数据库" value="beijing"></el-option>
        <el-option label="区块链" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
     <el-date-picker
        v-model="form.date1"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">筛选</el-button>
    </el-form-item>
  </el-form>
  <!-- /数据筛选表单 -->
</el-card>

 <el-card class="box-card">
  <div slot="header" class="clearfix">
      根据筛选条件...
  </div>
<!-- 数据列表 -->
<!--
    table表格组件
    1.需要展示的数组列表数据绑定给table组件的data属性 (不用v-for 自己会遍历)
    2.设计表格列 el-table-column  width可以设置表格列的宽度
        lable可以设置列的标题
        prop用来设定要渲染的列表项数据字段,只能展示文本
    3.需要放其他东西 按钮 图片 需要使用自定义列模板

 -->
<el-table
    :data="articles"
    stripe
    class="list-table"
    size="mini"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="封面"
    >
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
    >
    </el-table-column>
    <el-table-column
      label="状态">
      <!-- 自定义列模板 -->
      <!-- 如果需要在自定义列模板中当前遍历项数据,就在template上声明slot-scope="scope" -->
      <template slot-scope="scope">
        <el-tag type="warning" v-if="scope.row.status===0">草稿</el-tag>
        <el-tag v-else-if="scope.row.status===1">待审核</el-tag>
        <el-tag type="success" v-else-if="scope.row.status===2">审核通过</el-tag>
        <el-tag type="danger" v-else-if="scope.row.status===3">审核失败</el-tag>
        <el-tag type="info" v-else-if="scope.row.status===4">已删除</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="pubdate"
      label="发布时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template>
        <el-button
          size="mini"
          icon="el-icon-edit"
          circle
         ></el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          circle
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- /数据列表 -->
<!-- 列表分页 -->
  <el-pagination
    layout="prev, pager, next"
    :total="1000"
    background
    >
  </el-pagination>
  <!-- /列表分页 -->
  </el-card>
 </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
      })
    },
    onSubmit () {
      console.log('submit!!')
    }
  }
}
</script>
<style scoped lang="less">
.filter-card {
    margin-bottom: 30px;
}
.list-table {
    margin-bottom: 20px;
}
</style>
