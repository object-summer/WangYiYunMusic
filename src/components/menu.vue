<template >
  <div class="main-menu">
    <div class="main-menu-logo">
      <a href="/"></a>
    </div>
    <div class="main-menu-tab">
      <el-menu class="el-menu-demo" mode="horizontal">
        <el-menu-item v-for="item in menu" index="1" :key="item.index" :label="item.label">{{item.label}}</el-menu-item>
      </el-menu>
    </div>
    <div class="main-menu-right-actions">
      <div class="login-exit">
        <span @click="openLogin">登录</span><i>/</i><span @click="register">注册</span>
      </div>
      <el-dropdown v-if="logined">
        <span class="el-dropdown-link user-img">
          <img src="/static/assets/images/user.jpg" alt=""/>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i>图标</i>
            <span>我的主页</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i>图标</i>
            <span>消息</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i>图标</i>
            <span>设置</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <i>图标</i>
            <span @click="exit">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template >
<script>
  export default {
    props: {
      menu: {
        default () {
          return []
        }
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      openLogin () {
        this.store.commit('setLogined', true)
      },
      exit () {
        this.$ajax('http://localhost:8081/logout').then((resp) => {
          let rst = resp.code
          if (rst === 200) {
          this.store.commit('setLogined', false)
          }
        })
      },
      register () {
        console.log('11')
      }
    }
  }
</script>
// <style lang="stylus">
//   @require "./css/main.styl"
// </style>
