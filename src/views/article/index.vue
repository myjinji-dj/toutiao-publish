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
  <el-form ref="form"  :disabled="loading" :model="form" label-width="80px" size="mini">
        <el-form-item label="状态">
      <el-radio-group v-model="status">
        <el-radio :label="null">全部</el-radio>
        <el-radio :label="0">草稿</el-radio>
        <el-radio :label="1">待审核</el-radio>
        <el-radio :label="2">审核通过</el-radio>
        <el-radio :label="3">审核失败</el-radio>
        <el-radio :label="4">已删除</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="频道">
      <el-select v-model="channelId" placeholder="请选择频道">
        <el-option
          label="全部"
          :value="null">
        </el-option>
        <el-option
        :label="channel.name"
        :value="channel.id"
        v-for="(channel, index) in channels"
        :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="日期">
     <el-date-picker
        v-model="queryDate"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        >
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button  :disabled="loading" type="primary" @click="loadArticles(1)">查询</el-button>
    </el-form-item>
  </el-form>
  <!-- /数据筛选表单 -->
</el-card>

 <el-card class="box-card">
  <div slot="header" class="clearfix">
      根据筛选条件共查询到 {{ tocalCount }} 条数据:
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
    style="width: 100%"
    v-loading="loading">
    <el-table-column
      prop="date"
      label="封面">
    <template slot-scope="scope">
      <el-image
      style="width: 100px; height: 100px"
      :src="scope.row.cover.images[0]"
      fit="cover"
      lazy
      >
      <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div></el-image>
      <!-- <img
      class="cover-article"
      v-if="scope.row.cover.images[0]"
      :src="scope.row.cover.images[0]"
      >
      <img
      v-else
      class="cover-article"
      src="./cover.jpg"
      > -->
    </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
    >
    </el-table-column>
    <el-table-column
      label="状态"
      >
      <!-- 自定义列模板 -->
      <!-- 如果需要在自定义列模板中当前遍历项数据,就在template上声明slot-scope="scope" -->
      <template slot-scope="scope">
        <el-tag :type="articleStatus[scope.row.status].type">{{ articleStatus[scope.row.status].text }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="pubdate"
      label="发布时间">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
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
          @click='onDelArticle(scope.row.id)'
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- /数据列表 -->
<!-- 列表分页 -->
  <el-pagination
    layout="prev, pager, next"
    :total="tocalCount"
    background
    @current-change="onCurrentChange"
    :page-size="pageSize"
    :disabled="loading"
    :current-page.sync="page"
    >
  </el-pagination>
  <!-- /列表分页 -->
  </el-card>
 </div>
</template>

<script>
import {
  getArticles,
  getArticleChannels,
  delArticle
} from '@/api/article'
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
      articles: [], // 文章数据列表
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      tocalCount: 0, // 文章总数
      pageSize: 10, // 每页数量
      status: null, // 文章状态 空为全部
      channels: [], // 频道列表
      channelId: null, // 查询频道
      queryDate: null, // 日期筛选范围
      loading: true, // 获取内容加载中true开启
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 获取文章
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        // 进行判断 如果取消日期后没有日期 为null显示全部文章
        begin_pubdate: this.queryDate ? this.queryDate[0] : null,
        end_pubdate: this.queryDate ? this.queryDate[1] : null
      }).then(res => {
        // this.articles = res.data.data.results
        const { results, total_count: tocalCount } = res.data.data
        this.articles = results
        this.tocalCount = tocalCount
        this.loading = false
      })
    },
    onSubmit () {
      console.log('submit!!')
    },
    // 当前页变动时 由传入的page页数 重新(调用)获取文章列表
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    // 获取频道
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    // 删除文章
    onDelArticle (articleId) {
      this.$confirm('确认删除吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle(articleId.toString()).then(res => {
          // console.log(res)
          // 更新渲染
          this.loadArticles(this.page)
        })
        this.$message({
          type: 'success',
          message: '好的你已经失去我了'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '还好我还在'
        })
      })
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
.cover-article {
  width: 60px;
  background-size: cover;
}

</style>
