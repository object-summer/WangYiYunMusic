import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Menu from '../components/menu.vue'
import Main from '../components/Main.vue'
import Login from '../components/login'
import ErrorTip from '../components/errorTip/error'
import '../css/main.styl'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/menu',
          component: Menu
        }
      ]
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
