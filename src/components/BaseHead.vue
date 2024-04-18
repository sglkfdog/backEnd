<template>
  <div class="inline-flex flex-row items-center select-none">
    <template v-if="title">{{ title }}</template>
    <slot v-else></slot>
    <el-tooltip v-if="helpMessage" :content="helpMessage" :placement="helpPlacement">
      <span class="ml-2 cursor-pointer text-sm text-info i-charm:circle-warning"></span>
    </el-tooltip>
  </div>
</template>

<script setup>

/**
 * Variables area
 */
const props = defineProps({
  helpMessage: {
    type: String,
    default: '',
  },
  helpPlacement: {
    type: String,
    default: 'right',
  },
  title: {
    type: String,
    default: '',
  },
})
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>