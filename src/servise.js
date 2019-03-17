import Promise from 'promise'
import axios from 'axios'
import store from './store'
import Config from './config/config'
import router from './router/index'
import {localStorage} from './storage/index'

axios.defaults.withCredentials = true
let Api = {}
Api.login = function (phone, password) {
  return axios.get(Config.BASE_URL + '/login/cellphone', {params: {phone: phone, password: password}}).then(resp => {
    let rst = resp.data
    if (rst.code !== 200) {
      this.$message.error('登录失败')
      router.push('/errorTip')
      return Promise.reject(new Error(rst.errorMessage))
    }
    localStorage.set('auth', rst)
    store.commit('setAuth', rst)
    return rst
  })
}
export default Api
