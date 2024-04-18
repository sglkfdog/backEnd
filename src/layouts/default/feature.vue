<template>
  <div>
    <el-backtop v-if="getUseOpenBackTop" :target="getShowFixedSettingDrawer ? getTarget : ''" />
    <ProjectSetting v-if="getShowFixedSettingDrawer" :class="`${prefixCls}__setting-drawer`" />
  </div>
</template>

<script setup>
import { useDesignClass } from "core/utils"
import { useRootSetting } from "core/settings"
import ProjectSetting from "./setting/index.vue"
/**
 * Variables area
 */
const { prefixCls } = useDesignClass('app-feature')
const { prefixCls: layoutDefaultMainCls } = useDesignClass('layout-default-main')
const { getShowSettingButton, getUseOpenBackTop, getFullContentCurrent } = useRootSetting()
const getTarget = computed(() => `.${layoutDefaultMainCls}`)
console.log("layoutDefaultMainCls=", layoutDefaultMainCls, getTarget.value)
console.log("getShowSettingButton=", unref(getShowSettingButton))
const getShowFixedSettingDrawer = computed(() => {
  if (!unref(getShowSettingButton)) {
    console.log("aaaaaaaaaaa")
    return false
  }
  console.log("bbbbbbbb=", unref(getFullContentCurrent))

  return unref(getFullContentCurrent)
})
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
@use '@/styles/var.scss';
$prefixCls: #{var.$namespace}-app-feature;
.#{$prefixCls} {
  &__setting-drawer {
    position: absolute;
    cursor: pointer;
    z-index: 99;
    right: 0;
    top: 120px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: var.$color-white;
    background-color: var(--el-color-primary);
    border-radius: 6px 0 0 6px;
    pointer-events: auto;
  }
}
</style>
