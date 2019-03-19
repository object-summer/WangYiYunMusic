<template>
  <div class="play-list-wrap wrap">
    <div class="play-list">
      <div class="comment-title">
        <span class="--title">全部</span>
        <span class="select-item" @click="CatSwitch">
          全部选择
          <i> > </i>
        </span>
        <div class="new-hot">
          <span :class="{active : hot}" @click="selectList">最新</span><span :class="{active : !hot}" @click="selectList">最热</span>
        </div>
        <play-music-list v-loading="loading" v-if="catVisible" :items="subList" @selectTag="selectTag" :allList="allList"></play-music-list>
      </div>
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
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import PlayMusicList from '../components/parts/PlayMusicMenu'
  import PartBaseTable from '../components/PartBaseTable'
  export default {
    components: {PlayMusicList, PartBaseTable},
    data () {
      return {
        loading: false,
        catlist: [],
        subList: [],
        musicList: [],
        sub: [],
        catVisible: false,
        hot: true,
        pagination: {
          totalCount: 0,
          pageIndex: 1,
          pageSize: 15
        },
        currentMusicList: [],
        page: ''
      }
    },
    created () {
      this.loadMusicList()
      this.loadData()
    },
    methods: {
      selectList () {
        this.hot = !this.hot
        this.loadData()
      },
      selectTag (cat) {
        this.loadData(0, cat)
      },
      loadData (pageIndex, cat) {
        this.loading = true
        this.$ajax.get('http://localhost:3000/top/playlist', {
          params: {
            limit: pageIndex ? pageIndex * this.pagination.pageSize : this.pagination.pageSize,
            order: this.hot ? 'new' : 'hot',
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
      },
      loadMusicList () {
        this.$ajax.get('http://localhost:3000/playlist/catlist').then((resp) => {
          this.catlist = resp.data.categories
          this.subList = resp.data.sub || {}
          this.allList = resp.data.all
          if (this.subList) {
            let newItems = []
            let catalogue = {}
            _.forEach(_.sortBy(this.subList, e => e.category), e => {
              if (!catalogue[e.category]) {
                catalogue[e.category] = true
                let group = {
                  category: e.category,
                  items: [e]
                }
                newItems.push(group)
              } else {
                for (let i = 0; i < newItems.length; i++) {
                  if (e.category === newItems[i].category) {
                    newItems[i].items.push(e)
                    break
                  }
                }
              }
            })
            for (let item in this.catlist) {
              for (let i = 0; i < newItems.length; i++) {
                if (parseInt(item) === newItems[i].category) {
                  newItems[i].cateName = true
                  newItems[i].cateName = this.catlist[item]
                }
              }
            }
            this.subList = newItems
          }
        })
      },
      CatSwitch () {
        this.catVisible = !this.catVisible
      }
    }
  }
</script>
