<template>
  <span>
    <span class="i-icon-park-outline:indent-right" :class="getWrapClass"></span>
  </span>
</template>

<script setup>
import { useDesignClass } from "core/utils"
/**
 * Variables area
 */
const props = defineProps({
  collapsed: {
    type: Boolean,
    required: true,
  },
})
const { prefixCls } = useDesignClass('app-menu-trigger')
const getWrapClass = computed(() => {
  return [
    prefixCls,
    {
      'is-collapsed': props.collapsed,
    },
  ]
})
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
</script>
<style lang="scss">
@use '@/styles/mixins.scss' as *;
@use '@/styles/var.scss';

$prefixCls: #{var.$namespace}-app-menu-trigger;

.#{$prefixCls} {
  transition: transform var.$transition-duration;

  @include when(is-collapsed) {
    transform: rotate(180deg);
  }
}
</style>