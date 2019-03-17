<template>
  <div class="user-center wrap">
    <div class="user-base-info">
      <div class="left">
        <img src="" alt="">
      </div>
      <div class="right">
        <div class="title">
          <span>name</span>
          <i>级别</i>
          <i>性别</i>
        </div>
        <div class="content">
          <div class="content-top">
            <ul>
              <li>
                <i>数字</i>
                <span>动态</span>
              </li>
              <li>
                <i>数字</i>
                <span>动态</span>
              </li>
              <li>
                <i>数字</i>
                <span>动态</span>
              </li>
            </ul>
          </div>
          <div class="desc">
            <ul>
              <li>
                <span>所在地区：</span>
                <span>安徽-宿州</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="user-music-list">
      <div class="--title">
        <span>我创建的歌单</span>
        <i>(20)</i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    // http://localhost:3000/user/playlist?uid=441896217
    // 这是袭击创建的歌单和收藏的歌单
    // 这个要仿照vue-music中来做，state中
    // let res = await this.$store.dispatch('MINE_AUTO_INFO', this.$store.getters.USER_PROFILE_GETTER.userId)
  }
</script>
