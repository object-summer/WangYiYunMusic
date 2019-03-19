<template>
  <div class="index-wrap">
    <s-banner :items="imgList"></s-banner>
    <div class="index-bottom-wrap">
        <div class="inde-left">
          <div class="recommend">
            <div class="comment-title">
              <span class="--title">热门推荐</span>
              <ul class="category-title">
                <li v-for="item in hotPlayList" :key="item.id">{{item.name}}</li>
              </ul>
            </div>
            <div class="recommend-wrap">
              <part-base-table :items="recommendList"></part-base-table>
            </div>
          </div>
          <div class="personalized">
            <div class="comment-title">
              <span class="--title">个性化推荐</span>
            </div>
            <div class="recommend-wrap">
              <part-base-table :items="presonList"></part-base-table>
            </div>
          </div>
          <div class="Programs">
            <div class="comment-title">
              <span class="--title">精彩节目推荐</span>
            </div>
            <div class="recommend-wrap">
              <div class="recommend-wrap">
                <part-base-table :items="ProgramsList"></part-base-table>
              </div>
            </div>
          </div>
        </div>
        <div class="index-right">
          <!--<div class="user-info">-->
            <!--<div v-if="!userInfo" class="base-info">-->
              <!--<div>-->
                <!--<img src="" alt="">-->
              <!--</div>-->
              <!--<div>-->
                <!--<span>{{userInfo.nickname}}</span>-->
                <!--<el-button @click="checkIn">签到</el-button>-->
              <!--</div>-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<i>11</i>-->
                  <!--<span>动态</span>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<i>11</i>-->
                  <!--<span>动态</span>-->
                <!--</li>-->
                <!--<li>-->
                  <!--<i>11</i>-->
                  <!--<span>动态</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
            <!--<template v-else>-->
              <!--<p>aa</p>-->
            <!--</template>-->
          <!--</div>-->
        </div>
      </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import store from '../store'
  import Banner from './Banner.vue'
  import PartBaseTable from '../components/PartBaseTable'
  export default {
    components: {SBanner: Banner, PartBaseTable},
    data () {
      return {
        imgList: [],
        hotPlayList: [],
        recommendList: [],
        presonList: [],
        ProgramsList: [],
        userInfo: {},
        selected: ''
      }
    },
    created () {
      this.loadBanner()
      this.loadRecommendTitle()
      this.loadRecommendList()
      this.loadPersenList()
      this.loadRankList()
      this.loadUserInfo()
    },
    methods: {
      // banner
      loadBanner () {
        console.log(store.getters.userInfo)
        this.$ajax({
          method: 'get',
          url: 'http://localhost:3000/banner'
        }).then((resp) => {
          this.imgList = resp.data.banners
        })
      },
      // 推荐歌单的title
      loadRecommendTitle () {
        this.$ajax.get('http://localhost:3000/playlist/hot').then((resp) => {
          this.hotPlayList = resp.data.tags
        })
      },
      // 这是全部歌单的目录
      loadRecommendList () {
        this.$ajax.get('http://localhost:3000/top/playlist?limit=8&order=new').then((resp) => {
          this.recommendList = resp.data.playlists
        })
      },
      // /recommend/resource
      loadPersenList () {
        this.$ajax.get('http://localhost:3000/recommend/resource').then((resp) => {
          let arr = resp.data.recommend
          this.presonList = _.take(arr, 4)
        })
      },
      // 精彩节目推荐
      loadRankList () {
        this.$ajax.get('http://localhost:3000/program/recommend').then((resp) => {
          let arr = resp.data.programs
          this.ProgramsList = _.take(arr, 8)
        })
      },
      // /user/subcount
      loadUserInfo () {
        this.userInfo = store.state
        console.log(this.userInfo)
      },
      checkIn () {
        this.$ajax.get('http://localhost:3000/daily_signin')
      }
    },
    watch: {
      'store.state.userInfo' () {
        console.log(11)
        this.loadUserInfo()
      }
    }
  }
</script>
