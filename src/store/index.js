import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
// import Config from '../config/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户token
    auth: null,
    // 用户信息，包括登录状态
    userAutoInfo: {}
  },
  mutations,
  actions,
  getters
})
