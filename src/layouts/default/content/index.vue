<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <RouterView>
      <template #default="{ Component, route }">
        <transition
          :name="
            getTransitionName({
              def: getRouterTransition,
              enableTransition: getEnableTransition,
              route,
            })
          "
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.fullPath" />
        </transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup>
import { useDesignClass } from "core/utils"
import { useRootSetting, useTransitionSetting, ContentEnum, APP_CONTENT_FIXED_WIDTH } from "core/settings"
const { getRouterTransition, getEnableTransition } = useTransitionSetting()
/**
 * Variables area
 */
const { prefixCls } = useDesignClass('app-content')
const { getContentMode } = useRootSetting()
// fixed width style
const getWrapStyle = computed(() => {
  let style = {}
  if (unref(getContentMode) === ContentEnum.FIXED) {
    style.width = `${APP_CONTENT_FIXED_WIDTH}px`
    style.margin = '0 auto'
  } else {
    style.margin = '16px'
  }
  return style
})
/**
 * Method Area
 */
const getTransitionName = ({
  enableTransition,
  def,
  route,
}) => {
  if (!enableTransition) {
    return undefined
  }
  return route.meta?.transitionName || def
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
@use '@/styles/var.scss';

$prefixCls: #{var.$namespace}-app-content;

.#{$prefixCls} {
  position: relative;
  min-height: 0;
}
</style>