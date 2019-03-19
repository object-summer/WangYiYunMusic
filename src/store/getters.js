// 用户信息，uid
export const userInfo = (state) => {
  return state.auth && state.auth.profile
}
