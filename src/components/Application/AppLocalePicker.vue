<template>
  <el-dropdown trigger="click" @command="handleCommand">
    <span class="cursor-pointer flex items-center">
      <span class="i-bi:translate"></span>
      <span v-if="showText" class="ml-2">{{ getLocaleText }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="locale in LocaleList"
          :key="locale.value"
          :command="locale.value"
          :disabled="getLocale === locale.value"
        >
          {{ locale.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { useLocaleSetting, LocaleList } from "core/settings"
/**
 * Variables area
 */
const props = defineProps({
  reload: {
    type: Boolean,
    default: true,
  },
  showText: {
    type: Boolean,
    default: false,
  },
})

const { getLocale, changeLocale } = useLocaleSetting()

const getLocaleText = computed(() => {
  return LocaleList.find((i) => i.value === unref(getLocale))?.label
})
/**
 * Method Area
 */
const handleCommand = async (locale) => {
  await changeLocale(locale)
  // props.reload && location.reload()
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>