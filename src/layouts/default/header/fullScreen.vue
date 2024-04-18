<template>
  <div @click="handleToggleFullScreen" v-if="isSupported">
    <span class="i-dashicons:fullscreen-exit-alt" v-if="isFullscreen"></span>
    <span class="i-dashicons:fullscreen-alt" v-else></span>
  </div>
</template>

<script setup>
import { useFullscreen } from '@vueuse/core'
/**
 * Variables area
 */
const { isFullscreen, toggle: handleToggleFullScreen, isSupported } = useFullscreen()
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>