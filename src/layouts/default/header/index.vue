<template>
  <div class="">
    <div v-if="getShowPlaceholderDom" :style="getPlaceholderDomStyle"></div>
    <header ref="appHeaderRef" :style="getWrapStyle" :class="getWrapClass">
      <!-- left -->
      <div :class="`${prefixCls}-left`" class="flex h-full text-lg">
        <AppLogo
          v-if="getShowHeaderLogo || getIsMobile"
          class="item !px-2"
          :theme="getHeaderTheme"
          :show-title="!getIsMobile"
        />
        <MenuTrigger
          class="item"
          v-if="getShowHeaderTrigger || getIsMobile"
          :collapsed="getCollapsed"
          @click="toggleCollapse"
        />
        <!-- <MenuTrigger
          class="item !px-3"
          v-if="getShowHeaderTrigger || getIsMobile"
          :collapsed="getCollapsed"
          @click="toggleCollapse"
        /> -->
      </div>
      <!-- top menu -->
      <div v-if="getShowTopMenu && !getIsMobile" :class="`${prefixCls}-menu`">
        <Menu is-horizontal />
      </div>
      <!-- action -->
      <div class="flex flex-row h-full" :class="`${prefixCls}-action`">
        <!-- <Redo class="item" /> -->
        <AppDarkModeToggle />
        <AppLocalePicker v-if="getShowPicker" class="item" />
        <FullScreen v-if="getShowFullScreen" class="item" />
        <ProjectConfig v-if="getShowSettingButton" class="item" />
        <UserDropdown class="item" />
      </div>
    </header>
  </div>
</template>

<script setup>
import { AppLogo, AppDarkModeToggle, AppLocalePicker } from '@/components/Application'
import Menu from '../menu/index.vue'
import MenuTrigger from '../menu/triggerItem.vue'
import ProjectConfig from '../setting/index.vue'
import Redo from './redo.vue'
import FullScreen from './fullScreen.vue'
import UserDropdown from './userDropdown.vue'
import {store} from "core/store"
import { useDesignClass } from "core/utils"
import { useLayoutHeightSetting, useHeaderSetting, useAppSetting, useRootSetting, useMenuSetting } from "core/settings"
/**
 * Variables area
 */
const { prefixCls } = useDesignClass('app-header')
const { setAppHeaderHeight, appHeaderHeightRef } = useLayoutHeightSetting()

const appHeaderRef = ref()
const { getFixed, getShowFullScreen, getHeaderTheme, getShowHeaderLogo, getShowHeader } = useHeaderSetting()
const { getCollapsed, toggleCollapse, getShowHeaderTrigger, getShowTopMenu, getCalcHeaderWidth } = useMenuSetting()
const { getIsMobile } = useAppSetting()
console.log("getShowTopMenu=", getShowTopMenu.value)
console.log("getShowHeaderTrigger=", getShowHeaderTrigger.value)
console.log("getIsMobile=", getIsMobile.value)
const getWrapStyle = computed(() => {
  return {
    width: unref(getIsMobile) ? '100%' : unref(getCalcHeaderWidth),
  }
})
const getWrapClass = computed(() => {
  return [
    prefixCls,
    unref(getHeaderTheme),
    {
      'is-fixed': unref(getFixed),
    },
  ]
})
const { getShowSettingButton } = useRootSetting()
// placeholder
const getShowPlaceholderDom = computed(() => unref(getFixed) && unref(getShowHeader))
const getPlaceholderDomStyle = computed(() => {
  return {
    height: `${unref(appHeaderHeightRef)}px`,
  }
})
const getShowPicker = computed(() => store.getters["baseStore/get_showPicker"])
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
onMounted(() => {
  setAppHeaderHeight(appHeaderRef.value.offsetHeight)
})
</script>
<style lang="scss" scoped>
@use '@/styles/mixins.scss' as *;
@use '@/styles/var.scss';

$prefixCls: #{var.$namespace}-app-header;

.#{$prefixCls} {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: var.$header-height;
  line-height: var.$header-height;
  transition: width var.$transition-duration;
  background-color: var(--header-bg-color);
  box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
  z-index: 9;

  @include when(is-fixed) {
    position: fixed;
    top: 0;
    right: 0;
  }

  @include when(light) {
    color: var.$color-black;

    .item {
      color: var.$color-black;
    }
  }

  @include when(dark) {
    color: var.$color-white;

    .item {
      color: var.$color-white;
    }
  }

  &-menu {
    position: relative;
    flex: 1;
    min-width: 0;
    height: 100%;
    padding: 0 14px;
  }

  .item {
    height: 100%;
    display: flex;
    padding: 0 15px;
    cursor: pointer;
    align-items: center;
    position: relative;
    font-size: 18px;

    // &:hover {
    //   border-color: var(--header-hover-bg-color);
    //   background-color: var(--header-hover-bg-color);
    // }
  }
}
</style>