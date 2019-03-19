<template>
  <div>aa</div>
</template>

<script>
  export default {
    data () {
      return {
        musicList: ''
      }
    },
    methods: {
      loadMusicList () {
        this.$ajax.get('http://localhost:3000/top/playlist').then((resp) => {
          this.hotPlayList = resp.data.tags
        })
      }
    }
  }
</script>
