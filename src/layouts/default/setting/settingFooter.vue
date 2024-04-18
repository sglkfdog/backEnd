<template>
  <div class="">
    <el-divider />
    <el-button type="danger" class="w-full" @click="handleResetSetting">
        {{ $t('all.layout.setting.clearCache') }}
    </el-button>
  </div>
</template>

<script setup>
import { clearStorageStore } from 'core/store'
/**
 * Variables area
 */

/**
 * Method Area
 */
const handleResetSetting = () => {
  try {
    clearStorageStore()
    window.location.reload()
  } catch (e) {
    console.error(e)
  }
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>