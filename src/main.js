// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import './css/main.styl'
import Vuex from 'vuex'
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false

Vue.prototype.$ajax = axios
Vue.config.devtools = true
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8081/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
