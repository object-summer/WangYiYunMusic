import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.store({
  state: {
    logined: false
  },
  mutations: {
    setLogined (state, data) {
      state.loadend = data
    }
  }
})
