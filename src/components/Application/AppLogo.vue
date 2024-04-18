<template>
  <div
    class="flex flex-row items-center box-border cursor-pointer"
    :class="getWrapClass"
    @click="go('/')"
  >
    <img :class="`${prefixCls}__logo`" src="../../assets/img/logo.png" />
    <div v-show="showTitle" :class="`${prefixCls}__title`" class="truncate">
      {{ $t('all.common.appName') }}
    </div>
  </div>
</template>

<script setup>
import { useDesignClass } from "core/utils"
import { useGoRouter } from "core/router"
/**
 * Variables area
 */
const props = defineProps({
  showTitle: {
    type: Boolean,
    default: true,
  },
  theme: {
    type: String,
    validator: (v) => ['light', 'dark'].includes(v),
    default: 'light',
  },
})
const { prefixCls } = useDesignClass('app-logo')

const getWrapClass = computed(() => [prefixCls, props.theme])

/**
 * Method Area
 */

const go = useGoRouter()

/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/var.scss';
$prefixCls: #{var.$namespace}-app-logo;
.#{$prefixCls} {
  transition: all var.$transition-duration ease;
  display: flex;
  align-items: center;
  cursor: pointer;

  @include when(light) {
    color: var(--el-color-primary) !important;
    // border-bottom: 1px solid var(--el-fill-color);
  }

  @include when(dark) {
    color: var.$color-white !important;
  }

  &__title {
    transition: all 0.5s;
    letter-spacing: 2px;
    font-weight: 600;
    font-size: 18px;
    margin-left: 8px;
  }

  &__logo {
    height: 32px;
    width: 32px;
  }
}
</style>