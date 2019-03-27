<template>
  <div class="base-grid-table-cell">
    <p slot="content" v-if="hasDbDollar || isHtml" v-html="htmlValue">
    </p>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'MusicListTableCell',
    props: {
      column: {
        required: true
      },
      row: {
        required: true
      }
    },
    computed: {
      fieldValue () {
        return this.column.field ? _.get(this.row, this.column.field) : null
      },
      textValue () {
        if (this.column.cellRenderer) {
          return this.column.cellRenderer(this.fieldValue, this.row, this.column)
        } else {
          return (this.fieldValue || '') + ''
        }
      },
      hasDbDollar () {
        return this.textValue && this.textValue.indexOf('$$') > -1 || false
      },
      // 判断是否有链接，如果有则渲染成html
      isHtml () {
        return this.textValue && this.textValue.indexOf('</a>') > -1 || false
      },
      htmlValue () {
        let val = this.textValue && this.textValue.replace(/\$\$/g, '<br>')
        this.$nextTick(() => {
          if (this.$refs.htmlContainer && this.$refs.htmlContainer.children.length > 0) {
            for (let child of this.$refs.htmlContainer.children) {
              if (child.tagName === 'A') {
                child.className = 'action-link'
                child.addEventListener('click', e => {
                  let query = {}
                  let data = child.getAttribute('data')
                  if (data) {
                    let params = data.split(',') || []
                    for (let param of params) {
                      let vals = param.split('=')
                      if (vals && vals.length === 2) {
                        query[vals[0]] = vals[1]
                      }
                    }
                  }
                  this.$emit('cellLink', query, this.column, this.row)
                  e.stopPropagation()
                })
              }
            }
          }
        })
        return val
      }
    }
  }
</script>
