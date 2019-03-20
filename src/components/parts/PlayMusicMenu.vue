<template>
  <div class="cate-menu-wrap">
    <div class="title">
      <span @click="routeTo({path: '/playlist'}), selectTagProp()">{{allList.name}}</span>
    </div>
    <div class="cate-container">
      <div class="cate-menu" v-for="item in items" :key="item.category">
        <div class="group-name">
          <span>{{item.cateName}}</span>
        </div>
        <div class="group-container">
          <ul>
            <li v-for="list in item.items"  @click="routeTo({path: '/playlist', query: {cat: list.name}}), selectTagProp(list.name)" :key="list.name">{{list.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      items: {
        default () {
          return []
        }
      },
      allList: {
        default () {
          return {}
        }
      }
    },
    methods: {
      selectTagProp (cat) {
        console.log(cat)
        this.$emit('selectCat', !cat ? '全部' : cat)
        console.log(cat)
      }
    }
  }
</script>
