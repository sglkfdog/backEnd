<template>
  <el-drawer
    v-if="getIsMobile"
    :model-value="!getCollapsed"
    :with-header="false"
    :size="getMenuWidth"
    direction="ltr"
    @close="handleClose"
    :class="prefixCls"
  >
    <SiderBar />
  </el-drawer>
  <SiderBar v-else />
</template>

<script setup>
import SiderBar from './layoutSidebar.vue'
import { useAppSetting, useMenuSetting } from "core/settings"
import { useDesignClass } from "core/utils"
/**
 * Variables area
 */
const { getIsMobile } = useAppSetting()

const { getCollapsed, getMenuWidth, setMenuSetting } = useMenuSetting()

const { prefixCls } = useDesignClass('layout-sidebar-wrapper')

/**
 * Method Area
 */
const handleClose = () => {
  setMenuSetting({
    collapsed: true,
  })
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss">
@use '@/styles/var.scss';
$prefixCls: #{var.$namespace}-layout-sidebar-wrapper;
.#{$prefixCls} {
  .el-drawer__body {
    height: 100vh !important;
    padding: 0;
  }
}
</style>
