const api ={
  // 这里存放的是各类api
  // 登录相关的api
  login: {
    USER_LOGIN_SATATUS: '/login/status',
    USER_LOGIN_PHONE: '/login'
  },
  // 用户相关
  user: {
    USER_INFO_DETAIL: '/user/detail',
    // 获取用户信息，歌单，收藏，mv，dj数量
    USER_INFO: '/user/subcount'
  },
  find: {
    // banner 幻灯片列表
    BANNER_LISTS: `/banner`,

    // 音乐搜索
    MUSIC_SEARCH: `/search`,

    // 最新音乐
    NEW_SONG_LISTS: `/personalized/newsong`
  }
}
export default api
