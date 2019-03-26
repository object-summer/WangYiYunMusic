<template>
  <div class="base-grid-table-cell">
    <el-tooltip :openDelay="500" effect="dark" :content="textValue" placement="bottom" v-tooltip-overflow>
      <p slot="content" v-if="hasDbDollar || isHtml" v-html="htmlValue">
      </p>
      <div ref="cell" class="max-5lines">
        <template v-if="!column.template && !column.cellComponent">
          <p v-if="hasDbDollar || isHtml" ref="htmlContainer" v-html="htmlValue">
          </p>
          <template v-else>
            {{textValue}}
          </template>
        </template>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>

</style>
