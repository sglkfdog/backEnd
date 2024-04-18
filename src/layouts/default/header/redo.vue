<template>
  <div @click="handleClick">
    <span class="i-ooui:reload"></span>
  </div>
</template>

<script setup>
import { useRedoRouter } from "core/router"
/**
 * Variables area
 */
const router = useRouter()
/**
 * Method Area
 */
const handleClick = () => {
  const redo = useRedoRouter(router)
  redo()
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>