<template>
  <div class="play-list-wrap wrap">
    <div class="play-list">
      <div class="comment-title">
        <span class="--title">{{cat}}</span>
        <span class="select-item" @click="CatSwitch">
          全部选择
          <i> > </i>
        </span>
        <div class="new-hot">
          <span :class="{active : hot}" @click="selectList">最新</span><span :class="{active : !hot}" @click="selectList">最热</span>
        </div>
        <play-music-list v-loading="loading" v-if="catVisible" :items="subList" @selectCat="selectCat" :allList="allList"></play-music-list>
      </div>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import PlayMusicList from '../components/parts/PlayMusicMenu'
  export default {
    components: {PlayMusicList},
    data () {
      return {
        loading: false,
        catlist: [],
        subList: [],
        sub: [],
        catVisible: false,
        hot: true,
        cat: '全部'
      }
    },
    created () {
      this.loadMusicList()
    },
    methods: {
      selectList () {
        this.$store.commit('changeHot', !this.hot)
        this.routeTo({path: 'PlayList', query: {order: this.hot ? 'hot' : 'new', cat: this.cat}})
        this.hot = this.$store.state.hot
      },
      selectCat (cat) {
        this.cat = cat
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
