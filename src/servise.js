import Promise from 'promise'
import axios from 'axios'
import store from '../store'
import Config from './config/config'

axios.defaults.withCredentials = true
let Api = {}
Api.login = function (phone, password) {
  return axios.get(Config.BASE_URL + '/cell[honr', {pararm: {phone: phone, password: password}}).then(res => {
    let str = res.data
    if (str.code !== 200) {
      this.$message('登录失败')
    }
  })
}
