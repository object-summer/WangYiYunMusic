/*
  孤立模块，获取后台数据
*/
import axios from 'axios'

let http = axios.create({
  baseURL: 'https:localhost:3000',
  headers: {'X-Custom-Header': 'foobar'},
  timeout: 15000,
  withCredentials: true
})
/**
 * 请求拦截
 */
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(res => {
  if (res.data.code === 200) {
    return res
  }
  if ('success' in res.data) {
    return res
  }
  let msg = res.data.msg ? res.data.msg : '数据请求报错'
  this.$msg({text: msg, background: '#FF3366'})
  return Promise.reject(res)
}, error => {
  return Promise.reject(error)
})
export default http
