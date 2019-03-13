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
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.mixin(routerMixin)

// 组件集合
Vue.mixin(mixins)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.config.devtools = true
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:3000/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
