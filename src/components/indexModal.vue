<template>
    <div class="index-wrap">
      <div class="banner">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <img :src="item.imageUrl" >
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="recommend">
        <div class="recommend-title">
          <span>热门推荐</span>
          <ul class="category-title">
            <li></li>
          </ul>
        </div>
        <div class="recommend-wrap">
          <ul class="recommend-list">
            <li>
              <div class="cover">
                <img src="" alt="">
                <a href=""></a>
                <div class="bottom">
                  <!--耳机图片-->
                  <span>
                    <!--听歌人数-->
                    <i>56</i>
                  </span>
                </div>
              </div>
              <div class="desc">一周日语新歌推荐（02/23~03/01)</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        imgList: [],
        remommendList: []
      }
    },
    created () {
      this.loadBanner()
      this.loadRecommendList()
    },
    methods: {
      loadBanner () {
        this.$ajax({
          method: 'get',
          url: 'http://localhost:8081/banner'
        }).then((resp) => {
          this.imgList = resp.data.banners
        })
      },
      loadRecommendList () {
        this.$ajax.get('http://localhost:8081/recommend/resource').then((resp) => {
          this.remommendList = resp.data
        })
      }
    }
  }
</script>
