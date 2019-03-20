<template>
  <div class="recommend-wrap">
    <div class="recommend-wrap">
      <part-base-table v-loading="loading" :items="currentMusicList"></part-base-table>
    </div>
    <div class="pagination-wrapper">
      <el-pagination
        :pager-count="5"
        layout="prev, pager, next"
        :total="pagination.totalCount" :page-size="pagination.pageSize" :current-page="+pagination.pageIndex" @current-change="loadData"></el-pagination>
    </div>
  </div>
</template>

<script>
  import PartBaseTable from '../components/PartBaseTable'
  export default {
    components: {PartBaseTable},
    data () {
      return {
        loading: false,
        pagination: {
          totalCount: 0,
          pageIndex: 1,
          pageSize: 15
        },
        currentMusicList: [],
        page: ''
      }
    },
    mounted () {
      this.loadData()
    },
    methods: {
      loadData (pageIndex, cat, type) {
        this.loading = true
        this.$ajax.get('http://localhost:3000/top/playlist', {
          params: {
            limit: pageIndex ? pageIndex * this.pagination.pageSize : this.pagination.pageSize,
            order: !type ? this.$store.state.hot ? 'new' : 'hot' : type,
            cat: cat
          }
        }).then((rst) => {
          if (rst && rst.data.playlists) {
            this.musicList = rst.data.playlists
            this.pagination.totalCount = rst.data.total
            let newItems = []
            let currentKey = pageIndex ? (pageIndex - 1) * this.pagination.pageSize : 0
            for (let i = currentKey; i < (currentKey + this.pagination.pageSize); i++) {
              newItems.push(this.musicList[i])
            }
            this.currentMusicList = newItems
          }
        })['finally'](() => {
          this.loading = false
        })
      }
    },
    watch: {
      '$route' () {
        let cat = this.$route.query.cat
        let type = this.$route.query.order
        this.loadData(0, cat, null)
        this.loadData(0, null, type)
      }
    }
  }
</script>
