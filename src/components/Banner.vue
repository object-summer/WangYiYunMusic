<template>
  <div class="banner">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in items" :key="item.id">
        <img :src="item.imageUrl" >
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    props: {
      items: {
        default () {
          return []
        },
        type: Array
      }
    }
  }
</script>
