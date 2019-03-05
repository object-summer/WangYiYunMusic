// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// axios
import axios from 'axios'

// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 路由
import router from './router'

// template and css
import App from './App'
import './css/main.styl'

// vuex
import Vuex from 'vuex'
import store from './store'
import {mixins} from './mixin/index.js'
// 组件集合
import loginModal from './components/loginModal'
Vue.mixin(mixins)
// Vue.config.productionTip = false
Vue.prototype.$ajax = axios
// Vue.config.devtools = true
// axios.defaults.timeout = 5000
// axios.defaults.baseURL = 'http://localhost:8081/'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
//router.beforeEach
// if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//   store.dispatch('GetInfo').then(res => { // 拉取user_info
//     const roles = res.data.role;
//   next();//resolve 钩子
// })
