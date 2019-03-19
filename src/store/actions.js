// 在action中来获取数据，返回promise对象，然后在其他的地方直接调用dispitch（‘xxx’）这个
import axios from 'axios'
// 返回用户自己的创建和收藏的歌单
export function refreshUserInfo ({commit}, uid) {
  return new Promise((resolve, reject) => {
    axios.get('/user/playlist', {
      params: {
        uid: uid
      }
    }).then(res => {
      commit('setUserAutoInfo', res || {})
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}
