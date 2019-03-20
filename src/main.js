// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// axios
import axios from 'axios'
import {mixins} from './mixin/index.js'
// vuex
import Vuex from 'vuex'
import store from './store'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 路由
import router from './router'
// template and css
import App from './App'
import './css/main.styl'
// 混入路由跳转
import routerMixin from './router/mixin'
import {localStorage} from './storage/index'
(function () {
  Vue.config.productionTip = false
  Vue.prototype.$ajax = axios
  Vue.config.devtools = true
  axios.defaults.timeout = 5000
  axios.defaults.baseURL = 'http://localhost:3000/'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  Vue.config.productionTip = false

  Vue.use(Vuex)
  Vue.use(ElementUI)

  Vue.mixin(mixins)
  Vue.mixin(routerMixin)
  Vue.mixin({
    computed: {
      loggedIn () {
        return !!store.state.auth
      }
    }
  })
  // let href = window.location.href
  // 查看用户是否登陆过，若是登陆过就不重复登陆了
  let auth = localStorage.get('auth')
  if (auth) {
    store.commit('setAuth', auth)
  }
  router.beforeEach((to, from, next) => {
    let getUserStatus = localStorage.get('auth')
    if (getUserStatus) {
      store.state.auth = auth
      next()
      // 如果已登录，还想想进入登录注册界面，则定向回首页
      if (!to.meta.isLogin) {
        // this.$message.error('请先退出登录')
        next({
          path: '/'
        })
      }
    } else {
      if (to.matched.some(record => record.meta.isLogin)) {
        // 跳到登录页
        next({
          path: '/login'
        })
        return
      } else {
        next()
      }
    }
    next()
  })
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})()
