<template>
  <el-dialog
    title="提示"
    :visible.sync="$store.state.loginView"
    width="30%">
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
          <el-button type="primary" @click="submitForm(ruleForm)">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        ruleForm: {
          password: '',
          phone: ''
        },
        loading: false,
        dialogVisible: false
      }
    },
    methods: {
      submitForm () {
        this.$ajax(
          '/login/cellphone',
          {params: {phone: this.ruleForm.phone, password: this.ruleForm.password}}).then((resp) => {
            this.loading = true
            if (resp.data.code !== 200) {
              this.$message({
                message: '登录失败，请重试！',
                duration: 5000
              })
            }
          })
      }
    }
  }
</script>
