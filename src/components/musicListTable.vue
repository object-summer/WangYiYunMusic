<template>
  <div>
    <div class="base-music-list-table">
      <div class="base-music-list-header">
        <div v-for="item in columns" :key="item.id" :style="[getColumnWidthObject(item), item.headerStyle]" :class="[{'has-width': item.width}]">
          {{item.headerName}}
        </div>
      </div>
      <div class="base-music-list-content">
        <div class="base-music-list-table-row" v-for="item in items" :key="item.key">
          <div class="">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    props: {
      columns: [],
      items: {
        default () {
          return []
        }
      },
      noDataTip: {
        default () {
          return '暂无数据'
        }
      }
    },
    methods: {
      getColumnWidthObject (item) {
        let width = _.isNumber(item.width) ? `${item.width}px` : item.width
        return {width: width}
      }
    }
  }
</script>
