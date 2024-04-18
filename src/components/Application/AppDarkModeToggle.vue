<template>
  <div class="text-center">
    <el-switch
      @change="toggleDarkMode()"
      :active-value="THEME_ENUM.DARK"
      :inactive-value="THEME_ENUM.LIGHT"
      :active-icon="darkIcon"
      :inactive-icon="lightIcon"
      inline-prompt
      :model-value="getTheme"
      :style="{
        '--el-switch-on-color': '#141414',
        '--el-switch-off-color': '#141414',
      }"
    />
  </div>
</template>

<script setup>
import { useRootSetting, THEME_ENUM } from "core/settings"
import { updateDarkMode, updateHeaderBgColor, updateSidebarBgColor } from "core/utils"
/**
 * Variables area
 */
const { getTheme, setDarkMode } = useRootSetting()

const lightIcon = h('span', { class: 'i-ic:baseline-wb-sunny text-yellow-300' })
const darkIcon = h('span', { class: 'i-ic:outline-dark-mode text-purple-300' })
/**
 * Method Area
 */
const toggleDarkMode = () => {
  const darkMode = unref(getTheme) === THEME_ENUM.LIGHT ? THEME_ENUM.DARK : THEME_ENUM.LIGHT
  // setDarkMode(darkMode)
  setDarkMode({theme:darkMode})

  updateDarkMode(darkMode)
  updateHeaderBgColor()
  updateSidebarBgColor()
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>