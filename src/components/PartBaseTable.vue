<template>
  <div class="part-base-table">
    <ul class="recommend-list">
      <li v-for="(item, idx) in items" :key="`${idx}`">
        <div class="cover" @click="routeTo({ path: '/musiclistdetail', query: { id: item.id} })">
          <img :src="item.coverImgUrl || item.picUrl" alt="">
          <a href=""></a>
          <div class="listen-total">
            <span>
              <i>{{item.playcount}}</i>
            </span>
          </div>
        </div>
        <div class="desc">
          <span v-if="item.name">{{item.name}}</span>
          <span v-if="item.copywriter" :style="{color :item.copywriter ? '#999' : '#000'}">{{item.copywriter}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      items: ''
    }
  }
</script>
