import Promise from 'promise'
import axios from 'axios'
import store from './store'
import Config from './config/config'
import router from './router/index'
import localStorage from './storage/index'

axios.defaults.withCredentials = true
let Api = {}
Api.login = function (phone, password) {
  return axios.get(Config.BASE_URL + '/login/cellphone', {params: {phone: phone, password: password}}).then(resp => {
    let rst = resp.data
    if (rst.code !== 200) {
      this.$message('登录失败')
      router.push('/errorTip')
      localStorage.set('MaintenanceMessage', rst.errorMessage)
      return Promise.reject(new Error(rst.errorMessage))
    }
    localStorage.set('last-login-phone', {phone})
    store.commit('setAuth', rst)// 拿到token，有4小时的失效，如果失效，要回跳到login页面
    store.commit('setUserInfo', rst)
    return rst
  })
}
export default Api
