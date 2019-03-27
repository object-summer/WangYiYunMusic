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
            <div class="desc-text" ref="descText">介绍：{{musicListDetail.description}}</div>
            <div class="mask" v-if="maskDesc">
              ^^^^
            </div>
          </div>
        </div>
      </div>
      <div class="m-l-d-list">
        <div class="comment-title">
          <span class="--title">歌曲列表</span>
          <span>38首歌</span>
          <span>播放:25454次</span>
        </div>
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
  import SMusicListTable from './musicListTable.vue'
  import _ from 'lodash'
  export default {
    components: {SMusicListTable},
    data () {
      return {
        musicListDetail: [],
        creatorInfo: {},
        columns: {},
        musicListTracks: [],
        maskDesc: ''
      }
    },
    beforeMount () {
      let that = this
      this.columns = [
        {
          // 序号,播放
          field: 'number',
          headerName: '',
          headerStyle: {textAlign: 'center'},
          width: 150,
          cellStyle: {textAlign: 'center'},
          template: '<div class="sort-play"><span>{{data}}</span><span>按钮</span></div>',
          context: {
            checkDetail () {
              let data = _.cloneDeep(this.data)
              that.$emit('checkDetail', data)
            }
          }
        },
        {
          field: 'title',
          headerName: '歌曲标题',
          headerStyle: {textAlign: 'center'},
          cellStyle: {textAlign: 'center'},
          width: 200
        },
        {
          field: 'title',
          headerName: '时长',
          headerStyle: {textAlign: 'center'},
          cellStyle: {textAlign: 'center'},
          width: 80
        },
        {
          field: 'auth',
          headerName: '歌手',
          cellStyle: {textAlign: 'center'},
          width: 200
        },
        {
          field: 'zhuanji',
          headerName: '专辑',
          cellStyle: {textAlign: 'center'},
          width: 150
        }
      ]
    },
    created () {
      let id = this.$route.query.id
      this.loadData(id)
    },
    computed: {
      // descHeight () {
      //   this.$nextTick(() => {
      //     let descOffsetHeight = this.$refs.descText.offsetHeight
      //     return descOffsetHeight
      //   })
      // }
    },
    mounted () {
      this.querMaskHeight()
    },
    methods: {
      // TODO 计算介绍的高度，高于98则显示展开
      querMaskHeight () {
        console.log(this.descHeight)
        setTimeout(() => {
          let descOffsetHeight = this.$refs.descText.offsetHeight
          if (descOffsetHeight > 98) {
            this.maskDesc = true
          } else {
            this.maskDesc = false
          }
        })
      },
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
