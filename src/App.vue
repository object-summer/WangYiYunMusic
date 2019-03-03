<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style lang="scss">
  @import "/css/ele.scss"
</style>
<style lang="stylus">
  @require "/css/main.styl"
</style>
