<template >
  <div class="main-header">
    <div class="wrap">
      <div class="main-menu-logo">
        <a href="/"></a>
      </div>
      <div class="main-menu-tab">
        <el-menu class="el-menu-demo" mode="horizontal" @select="onSelect">
          <el-menu-item v-for="item in menus" :index="item.index" :key="item.index" :label="item.label">{{item.label}}</el-menu-item>
        </el-menu>
      </div>
      <div class="all-search">
        <el-input v-model="keyWord" placeholder="音乐/专辑/歌手/歌单/用户"></el-input>
      </div>
      <div class="main-menu-right-actions">
        <div class="login-exit" v-if="!loggedIn">
          <span @click="doLogin">登录</span><i>/</i><span @click="register">注册</span>
        </div>
        <template v-else>
          <el-dropdown>
            <span class="el-dropdown-link user-img">
              <img src="/static/assets/images/user.jpg" alt=""/>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="routeTo('/myMusic')">
                <i>图标</i>
                <span>我的主页</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <i>图标</i>
                <span>消息</span>
              </el-dropdown-item>
              <el-dropdown-item @click.native="routeTo('/updata')">
                <i>图标</i>
                <span>设置</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <i>图标</i>
                <span @click="doLogout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </div>
    </div>
  </div>
</template >
<script>
  import _ from 'lodash'
  export default {
    props: {
      menus: {
        default () {
          return []
        }
      }
    },
    data () {
      return {
        selected: '',
        keyWord: '',
        activeIndex: null
      }
    },
    methods: {
      refreshIndex () {
        // 某些父路由下面的子路由时，对应的菜单显示高亮
        if (this.menus) {
          for (let menu of this.menus) {
            if (this.$route.path.match(menu.match)) {
              this.activeIndex = null
              this.$nextTick(() => {
                this.activeIndex = menu.index
              })
              return
            }
          }
          this.activeIndex = null
        }
      },
      onSelect (index) {
        let menu = _.find(this.menus, e => e.index === index)
        menu && this.routeTo(menu.defaultLink)
        this.$nextTick(() => {
          this.refreshIndex()
        })
      },
      doLogin () {
        this.openLoginModal()
      },
      register () {
        console.log('11')
      },
      doLogout () {
        this.$store.commit('logout')
        this.$message('已退出')
      }
    },
    watch: {
      $route () {
        this.refreshIndex()
      }
    }
  }
</script>
