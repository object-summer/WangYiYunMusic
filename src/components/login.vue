<template>
  <div class="login-wrap" v-loading="loading">
    <span>登录界面</span>
    <el-form :model="ruleForm" status-icon ref="ruleForm2" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="pass">
        <el-input type="phone" v-model="ruleForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doLogin(ruleForm)">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Api from '../servise.js'
  import myMixin from '../router/mixin'
  import router from '../router/index'
  export default {
    mixins: [myMixin],
    data () {
      return {
        ruleForm: {
          password: '',
          phone: ''
        },
        loading: false
      }
    },
    computed: {
      backUrl () {
        return this.$route.query && (this.$route.query.backUrl || '')
      }
    },
    methods: {
      doLogin () {
        console.log(this.$store.state.auth)
        if (!/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(this.ruleForm.phone)) {
          this.$message.error('请输入正确的手机号')
          return
        }
        this.loading = true
        Api.login(this.ruleForm.phone, this.ruleForm.password).then((resp) => {
          if (resp.code === '510') {
            router.push({path: '/errorTip'})
            this.$store.commit('logout')
            return Promise.reject(new Error(resp.errorMessage))
          }
          this.$message('登录成功')
          if (this.backUrl) {
            this.routeTo(this.backUrl)
          } else {
            this.routeTo('music')
          }
        })['finally'](() => {
          this.loading = false
        })
      },
      resetForm () {
        this.ruleForm = {}
      }
    }
  }
</script>
