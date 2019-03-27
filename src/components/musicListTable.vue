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
          <div v-for="column in columns" :key="column.field" :style="[getColumnWidthObject(column), getCellClassOrStyle(column.cellStyle, item)]" :class="[{'has-width': column.width}, getCellClassOrStyle(column.cellClass, item)]">
            <music-list-table-cell :column="column" :row="item" @cellLink="onCellLink"></music-list-table-cell>
          </div>
          <!--<div class="song-play-btn">-->
            <!--<span>播放</span>-->
          <!--</div>-->
          <!--<div class="song-name">-->
            <!--{{item.name}}-->
          <!--</div>-->
          <!--<div class="song-time">-->
            <!--{{item.publishTime}}-->
          <!--</div>-->
          <!--<div class="song-auth" v-if="item.ar && item.ar.length > 0">-->
            <!--<span v-if="item.ar.length > 1" v-for="list in item.ar" :key="list.id">{{list.name}}/</span>-->
            <!--<span v-else>{{item.ar[0].name}}</span>-->
          <!--</div>-->
          <!--<div class="song-al">-->
            <!--<span>{{item.al.name}}</span>-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import MusicListTableCell from './musicListTableCell.vue'
  export default {
    components: {MusicListTableCell},
    props: {
      columns: {
        default () {
          return []
        }
      },
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
      },
      getCellClassOrStyle (styleOrClassValue, row) {
        if (styleOrClassValue) {
          if (_.isFunction(styleOrClassValue)) {
            return styleOrClassValue(row)
          } else {
            return styleOrClassValue
          }
        }
        return null
      }
    }
  }
</script>
