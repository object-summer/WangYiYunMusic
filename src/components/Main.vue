<template>
  <div>
    <s-menu :menus="menus"></s-menu>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Menu from './menu.vue'
  export default {
    components: {SMenu: Menu},
    data () {
      return {
        menu: []
      }
    },
    created () {
      this.menus = [
        {index: 'home', defaultLink: '/music', label: '首页'},
        {index: 'PlayList', defaultLink: '/PlayList', label: '歌单', match: /^\/PlayList/g},
        {index: 'Rank', defaultLink: '/Rank', label: '排行榜', match: /^\/Rank/g},
        {index: 'Anchor', defaultLink: '/Anchor', label: '主播电台', match: /^\/Anchor/g},
        {index: 'Album', defaultLink: '/Album', label: '热门新碟', match: /^\/Album/g}
      ]
    }
  }
</script>
