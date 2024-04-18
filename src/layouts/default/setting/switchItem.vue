<template>
  <div class="w-full flex flex-row flex-wrap items-center text-sm">
    <span class="inline-block flex-1 text-left text-black dark:text-white">{{ title }}</span>
    <el-switch
      :disabled="disabled"
      :model-value="def"
      inline-prompt
      :active-text="$t('all.layout.setting.on')"
      :inactive-text="$t('all.layout.setting.off')"
      @change="handleChange"
      size="default"
    />
  </div>
</template>

<script setup>

/**
 * Variables area
 */
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  def: {
    type: Boolean,
    required: true,
  },
})
const emit = defineEmits(['change'])
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