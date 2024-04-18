<template>
  <div class="w-full flex flex-row flex-wrap items-center text-sm my-1">
    <span class="inline-block flex-1 text-left text-black dark:text-white">{{ title }}</span>
    <el-select
      size="small"
      :disabled="disabled"
      :model-value="cursor"
      class="max-w-2/5"
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup>

/**
 * Variables area
 */
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  cursor: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(["change"])
/**
 * Method Area
 */
const handleChange = (val) => {
  emit('change', val)
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>