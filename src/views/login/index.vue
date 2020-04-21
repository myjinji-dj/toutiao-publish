<template>
 <div class="login-container">
    <!-- el-form表单组件 ,必须使用el-form-item组件包裹-->
  <el-form :model="user" ref="form" class="login-form" :rules="formRules">
       <div class="login-head">
         <div class="logo"></div>
       </div>
  <!--
    配置form表单验证
    1.必须给el-from 组件绑定model为表单数据对象
    2.给需要验证的表单项绑定 prop属性
    3.通过 el-from组件的rules属性配置验证规则
   -->
  <el-form-item prop="mobile">
    <el-input
      v-model="user.mobile"
      placeholder="输入手机号"
    ></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input
      v-model="user.code"
      placeholder="输入验证码"
    ></el-input>
  </el-form-item>
  <el-form-item>
    <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button class="login-btn" type="primary" @click="onLogin" :loading="loginLoading">登录</el-button>
  </el-form-item>
</el-form>

 </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        moblic: '', // 手机号
        code: ''// 验证码
      },
      checked: true,
      loginLoading: false,
      formRules: { // 表单验证规则匹配
        // 要验证的数据名称: 规则列表[]
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'change' },
          { pattern: /^{1[3|5|7|8|9]\d{9}}$/, message: '请输入正确的手机号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
    // 获取表单数据
    // 表单验证,验证通过,处理后端响应
      const user = this.user

      // 开启登录中的 loading
      this.loginLoading = true
      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        data: user
      }).then(res => {
        console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading
        this.loginLoading = false
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('密码或验证码错误')
        // 关闭loading
        this.loginLoading = false
      })
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom:0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-head{
        height: 57px;
        width: 300px;
        .logo {
            width: 200px;
            height: 57px;
            background: url('./logo_index.png') no-repeat;
            background-size: contain;
            margin: auto;
        }

    }
    .login-form {
        background-color: #fff;
        padding: 50px;
        min-width: 300px;
        .login-btn {
            width: 100%;
        }
    }
}
</style>
