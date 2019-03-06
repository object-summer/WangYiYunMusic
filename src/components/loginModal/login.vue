<template>
  <el-dialog
    title="提示"
    :visible.sync="visible"
    modal
    close-on-press-escape
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
          <el-button type="primary" @click="login(ruleForm)">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
  import router from '@/router'
  import store from '../../store'
  export default {
    data () {
      return {
        ruleForm: {
          password: '',
          phone: ''
        },
        loading: false,
        visible: false
      }
    },
    methods: {
      // ...mapMutations(['changeLogin']),
      open() {
        this.visible = true
      },
      close() {
        this.visible = false
      },
      loginModal () {
        return new Promise((resolve, reject) => {
          this.$ajax.get('http://localhost:3000/login/cellphone',
          {
            params:
              {
                phone: this.ruleForm.phone,
                password: this.ruleForm.password
              }
          })
          .then(res => {
            if (!res.data.bindings[0] || res.data.bindings[0].expired) {
              reject(new Error('登陆过期'))
              router.push('/login')
              return
            }
            store.commit('setUserInfo', res.data.profile)
        router.push('/login')
            if (res.code === 200) {

            }
            resolve(res)
          }, err => {
              router.push('/login')
              reject(err)
            })
        })
      },
      login() {
        if (this.ruleForm.phone === '' || this.ruleForm.password === '') {
          alert('账号或密码不能为空')
        } else {
          this.loginModal()
        }
      }
    }
  }
</script>
