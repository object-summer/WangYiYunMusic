export const setUserStatus = (state, data) => {
  state.loginStatus = data
}
export const setUserInfo = (state, data) => {
  state.userInfo = data
}
export const setAuth = (state, data) => {
  state.auth = data
}
export const logout = (state, data) => {
  setAuth(state, null)
  setUserInfo(state, null)
  setUserStatus(state, false)
}
