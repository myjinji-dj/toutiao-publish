<template>
 <div class="image-container">
    <el-card class="box-card">
  <div slot="header" class="clearfix">
 <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>素材管理</el-breadcrumb-item>
 </el-breadcrumb>
  </div>
 <!-- ---------单选框 ---------- -->
 <div  class="radio">
 <el-radio-group
 v-model="collect"
 @change="onChangeImage"
 size="small"
 >
      <el-radio-button
      :label="false"
      >全部</el-radio-button>
      <el-radio-button
      :label="true"
      >收藏</el-radio-button>
    </el-radio-group>
    <el-button
    size="small"
    type="success"
    @click="dialogVisible = true"
    >上传素材
    </el-button>
 </div>
 <!-- --------素材 -------------->
 <!-- gutter栅格间隔  -->
 <el-row
 class="images"
 :gutter="20">
  <el-col
  class="images-col"
  :lg="4"
  :md="6"
  :sm="12"
  :xs="20"
  v-for="image in imageList" :key="image.id">
      <el-image
      class="images-me"
      style="height: 200px"
      :src="image.url"
      fit="cover"
      >
      </el-image>
       <!-- 收藏/删除图标 -->
      <div class="isIcon">
        <span class="btn cellect-btn">
        <i
        class="icon el-icon-star-off"
        :style=" image.is_collected ? 'color: red' : 'color: white'"
        @click="oncellect(image.id, !image.is_collected)"></i></span>
        <span class="btn delete-btn"><i
        class="icon el-icon-delete"
        @click="ondeleteImage(image.id)"></i></span>
      </div>
  </el-col>
</el-row>
<!--   分页
@current-change分页发生改变时触发
-->
<el-pagination
  background
  layout="prev, pager, next"
  :total="totalCount"
  @current-change="onCurrentChange"
  :page-size="pageSize"
  :current-page.sync="currentPage"
  >
</el-pagination>

<!-- 弹层 -->
<!-- dialogVisible 显示弹层状态
    append-to-body 弹层插入至 body 元素上
 -->
<el-dialog
  title="上传素材"
  :visible.sync="dialogVisible"
  :append-to-body= true
  >
  <!-- upload上传
  组件自己可以请求提交上传 需要自己配置信息更麻烦!!何必呢?????
  请求方法默认POST
  action 完整路径
  headers 请求头
  name 上传的接口字段名
  -->
  <el-upload
  v-if="dialogVisible"
  class="upload-demo"
  drag
  action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
  :headers="uploadHeaders"
  name="image"
  multiple
  :on-success="onUploadSuccess">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
</el-dialog>
</el-card>
</div>
</template>

<script>
import { getImage, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    // 配置token
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false, // 收藏
      imageList: [], // 素材列表
      dialogVisible: false, // 弹层显示
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0, // 总页数
      pageSize: 10, // 每页显示条目个数
      currentPage: 1 // 当前页数
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImage(false)
  },
  mounted () {},
  methods: {
    // 获取素材 并渲染到页面
    loadImage (collect = false) {
      getImage({
        page: this.currentPage,
        per_page: this.pageSize,
        collect
      }).then(res => {
        console.log(res)
        // 获取数据成功 渲染到页面
        // this.imageList = res.data.data.results
        // this.totalCount = res.data.data.total_count
        // 对象解构
        const { results, total_count: totalCount } = res.data.data
        this.imageList = results
        this.totalCount = totalCount
      })
    },
    // 当全部和收藏按钮发生改变时
    onChangeImage (value) {
      this.loadImage(value)
    },
    // 添加素材 上传成功
    onUploadSuccess () {
      // 关闭弹层
      this.dialogVisible = false
      // 更新素材列表
      this.loadImage(false)
    },
    // 页数发生改变时获取当前页
    onCurrentChange () {
      // 重新渲染被点击页面 ???????????????????
      this.loadImage(this.collect)
    },
    // 收藏素材
    oncellect (id, collect) {
      // console.log('行不行')
      collectImage(id, collect).then(res => {
        // console.log(res)
        if (collect) {
          // 重新渲染页面
          this.collect = false // ?????????????????????
          this.loadImage(false)
          this.$message({
            type: 'success',
            message: 'OK 收藏成功'
          })
        } else {
          // 收藏页面取消时, 跳转到全部页面, 按钮的type转为全部
          this.collect = false
          this.loadImage()
          this.$message({
            type: 'danger',
            message: '取消收藏了再见'
          })
        }
      }).catch(err => {
        console.log('错误：' + err)
      })
    },
    // 删除素材
    ondeleteImage (id) {
      console.log('delete')
      deleteImage(id).then(res => {
        console.log(res)
        // 删除成功
        this.loadImage(false)
        this.$message('删除素材成功')
      })
    }
  }
}
</script>
<style scoped lang="less">
.images {
  margin: 20px 0;
  .images-col {
    position: relative;
    .isIcon {
      width: 92%;
      height: 40px;
      text-align: center;
      position: absolute;
      bottom: 0;
      background: rgba(0,0,0,.4);
      .btn {
        display: inline-block;
        height: 40px;
        width: 40px;
        line-height: 40px;
        .icon {
          color: #fff;
        }
        .sc{
          color: red;
        }
      }
      }
}
}
.radio {
    display: flex;
    justify-content: space-between;
}
</style>
