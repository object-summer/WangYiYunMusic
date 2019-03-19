import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main.vue'
import Login from '../components/login'
import ErrorTip from '../components/errorTip/error'
import Music from '../components/Music.vue'
import UserCenter from '../components/userCenter.vue'
import Rank from '../components/Rank.vue'
import Album from '../components/Album.vue'
import Anchor from '../components/Anchor.vue'
import PlayList from '../components/PlayList.vue'
import PlayListContainer from '../components/PlayListContainer.vue'
import MyMusic from '../components/MyMusic.vue'
import Updata from '../components/Updata.vue'
import '../css/main.styl'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      meta: {isLogin: true},
      component: Main,
      children: [
        {
          path: '',
          redirect: '/music',
          meta: {isLogin: true}
        },
        {
          path: 'music',
          component: Music,
          meta: {isLogin: true}
        },
        {
          path: 'UserCenter',
          component: UserCenter,
          meta: {isLogin: true}
        },
        {
          path: 'Rank/',
          component: Rank,
          meta: {isLogin: true},
          children: [
            {
              path: '11',
              component: Rank
            }
          ]
        },
        {
          path: 'PlayList',
          component: PlayListContainer,
          meta: {isLogin: true},
          children: [
            {
              path: '',
              component: PlayList,
              meta: {isLogin: true}
            }
          ]
        },
        {
          path: 'Album',
          component: Album,
          meta: {isLogin: true}
        },
        {
          path: 'Anchor',
          component: Anchor,
          meta: {isLogin: true}
        },
        {
          path: 'MyMusic',
          component: MyMusic,
          meta: {isLogin: true}
        }
      ]
    },
    {
      path: '/updata',
      component: Updata
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/errorTip',
      component: ErrorTip
    }
  ]
})
