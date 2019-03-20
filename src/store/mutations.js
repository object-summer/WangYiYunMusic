import {localStorage} from '../storage/index'
export const setUserAutoInfo = (state, data) => {
  state.userAutoInfo = data
}
export const setAuth = (state, auth) => {
  state.auth = auth
  localStorage.set('auth', auth)
}
export const logout = (state, data) => {
  setAuth(state, null)
  setUserAutoInfo(state, null)
  sessionStorage.clear()
}
// 改变歌单页面的new hot
export const changeHot = (state, data) => {
  state.hot = data
}
