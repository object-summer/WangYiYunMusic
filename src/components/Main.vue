<template>
  <div>
    <s-menu :menu="menu"></s-menu>
    <transition>
      <router-view></router-view>
    </transition>
    <s-footer></s-footer>
  </div>
</template>

<script>
  import Menu from './menu.vue'
  import Footer from './footer.vue'
  export default {
    components: {SMenu: Menu, SFooter: Footer},
    data () {
      return {
        menu: ''
      }
    },
    created () {
      this.menu = [
        {index: 'home', defaultLink: '/', label: '首页'},
        {index: 'rankingList', defaultLink: '/rankingList', label: '排行榜'},
        {index: 'songList', deafaultLink: '/songList', label: '歌单'},
        {index: 'zhubo', defaultLink: '/zhubo', label: '主播电台'}
      ]
    }
  }
</script>
