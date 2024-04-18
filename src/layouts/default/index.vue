<template>
  <div class="w-full h-full relative flex flex-row overflow-hidden" :class="prefixCls">
    <AppFeature/>
    <AppSidebar v-if="getShowSideBar || getIsMobile"/>
    <div class="flex-1 overflow-hidden overflow-y-auto" :class="`${prefixCls}-main`">
      <AppHeader v-if="getShowHeader" />
      <AppMain />
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import AppFeature from './feature.vue'
import AppSidebar from './sidebar/index.vue'
import AppHeader from './header/index.vue'
import AppMain from './content/index.vue'
import AppFooter from './footer/index.vue'
import { useDesignClass } from "core/utils"
import { useMenuSetting, useHeaderSetting, useAppSetting } from "core/settings"
/**
 * Variables area
 */
// 用于el-backtop查找元素
const { prefixCls } = useDesignClass('layout-default')
const { getShowSideBar } = useMenuSetting()
const { getShowHeader } = useHeaderSetting()
const { getIsMobile } = useAppSetting()
console.log("index-getShowHeader=", getShowHeader)
console.log("index-getIsMobile=", getIsMobile)
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
@use '@/styles/var.scss';

$prefixCls: #{var.$namespace}-layout-default;

.#{$prefixCls} {
  background-color: var.$app-bg-color;

  &-main {
    min-height: 100%;
  }
}

html.dark {
  .#{$prefixCls} {
    background-color: var.$app-dark-bg-color;
  }
}
</style>