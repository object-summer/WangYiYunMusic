<template>
  <keep-alive>
    <div class="user-center wrap">
      <div class="user-base-info">
        <div class="left">
          <img :src="userInfo.avatarUrl" alt="">
        </div>
        <div class="right">
          <div class="title">
            <span>{{userInfo.nickname}}</span>
            <!--没有找到接口-->
            <i>级别</i>
            <i :class="[userInfo.gender === 1 ? 'iconnan' : 'iconnv']"></i>
          </div>
          <div class="content">
            <div class="content-top">
              <ul>
                <li>
                  <i>{{userInfo.eventCount || 0}}</i>
                  <span>动态</span>
                </li>
                <li>
                  <i>{{userInfo.follows || 0}}</i>
                  <span>关注</span>
                </li>
                <li>
                  <i>{{userInfo.followeds || 0}}</i>
                  <span>粉丝</span>
                </li>
              </ul>
              <div class="desc">
                <ul>
                  <li>
                    <!--目前只有城市编码，怎么才能根据编码找到城市中文名-->
                    <span>社交网络：</span>
                    <span>。|| 。</span>
                  </li>
                  <li>
                    <!--目前只有城市编码，怎么才能根据编码找到城市中文名-->
                    <span>所在地区：</span>
                    <span>安徽-宿州</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--少了一个自己听过的歌
      https://music.163.com/weapi/v1/play/record?csrf_token=ca8bd98052af1584916d23a1a42c9c81
      这是接口
      -->
      <div class="user-music-wrap">
        <div class="create-list-wrap">
          <div class="--title">
            <span>我创建的歌单</span>
            <i>({{createListTotal}})</i>
          </div>
          <div>
            <part-base-table :items="createList"></part-base-table>
          </div>
        </div>
        <div class="create-list-wrap">
          <div class="--title">
            <span>我收藏的歌单</span>
            <i>({{collectListTotal}})</i>
          </div>
          <div>
            <part-base-table :items="collectList"></part-base-table>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
  import _ from 'lodash'
  import PartBaseTable from '../components/PartBaseTable'
  export default {
    // http://localhost:3000/user/playlist?uid=441896217
    // 这是袭击创建的歌单和收藏的歌单
    // 这个要仿照vue-music中来做，state中
    // let res = await this.$store.dispatch('MINE_AUTO_INFO', this.$store.getters.USER_PROFILE_GETTER.userId)
    components: {PartBaseTable},
    data () {
      return {
        createList: '',
        userInfo: ''
      }
    },
    computed: {
      uid () {
        return this.$store.getters.userInfo.userId
      },
      createListTotal () {
        return this.createList.length
      },
      collectListTotal () {
        return this.collectList.length
      }
    },
    created () {
      this.loadMyMusicList()
      this.loadUserInfo()
    },
    methods: {
      loadUserInfo () {
        this.userInfo = this.$store.getters.userInfo
      },
      loadMyMusicList () {
        this.$store.dispatch('refreshUserInfo', this.uid).then((resp) => {
          let playList = resp.data.playlist
          this.createList = _.filter(playList, e => e.tags.length === 0)
          this.collectList = _.filter(playList, e => e.tags.length > 0)
        })
      }
    }
  }
</script>
