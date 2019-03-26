<template>
  <div class="music-list-detail">
    <div class="m-l-d-wrap wrap">
      <div class="m-l-detail-info">
        <div class="m-l-d-info-pic">
          <img :src="musicListDetail.coverImgUrl" alt="">
        </div>
        <div class="m-l-d-info-desc">
          <div class="title">
            <i></i>
            <span>{{musicListDetail.name}}</span>
          </div>
          <div class="creator-info">
            <img :src="creatorInfo.avatarUrl" alt="">
            <span>{{creatorInfo.nickname}}</span>
            <span>{{musicListDetail.createTime}} &nbsp;创建</span>
          </div>
          <div class="creator-tag">
            标签:
            <span v-for="item in musicListDetail.tags" :key="item">{{item}}</span>
          </div>
          <div class="creator-desc">
            介绍：
            <span>{{musicListDetail.description}}</span>
          </div>
        </div>
      </div>
      <div class="m-l-d-list">
        <div class="comment-title">
          <span class="--title">歌曲列表</span>
          <span>38首歌</span>
          <span>播放:25454次</span>
        </div>
        <s-test></s-test>
        <div class="comment-container">
          <s-music-list-table :columns="columns" :items="musicListTracks"></s-music-list-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // resource/comments 评论和热评
  // song/lyric?csrf_token=7f61ca4297752734这是歌词
  import Test from 'test'
  import MusicListTable from './musicListTable.vue'
  export default {
    components: {SMusicListTable: MusicListTable, STest: Test},
    data () {
      return {
        musicListDetail: [],
        creatorInfo: {},
        columns: [],
        musicListTracks: []
      }
    },
    beforeMount () {
      this.columns = [
        {
          // 序号
          headerName: '',
          headerStyle: {textAlign: 'center'},
          width: 150
        },
        {
          headerName: '歌曲标题',
          headerStyle: {textAlign: 'center'},
          width: 150
        },
        {
          headerName: '时长',
          headerStyle: {textAlign: 'center'},
          width: 150
        },
        {
          headerName: '歌手',
          width: 150
        },
        {
          headerName: '专辑',
          width: 150
        }
      ]
    },
    created () {
      let id = this.$route.query.id
      this.loadData(id)
    },
    methods: {
      loadData (id) {
        this.$ajax.get('http://localhost:3000/playlist/detail', {
          params: {
            id: id
          }
        }).then((rst) => {
          if (rst && rst.data.playlist) {
            let data = rst.data.playlist
            this.musicListDetail = data
            this.creatorInfo = data.creator
            this.musicListTracks = data.tracks
          }
        })
      }
    },
    watch: {
      '$route' () {
        let id = this.$route.query.id
        debugger
        this.loadData(id)
      }
    }
  }
</script>
