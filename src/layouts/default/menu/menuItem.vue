<template>
  <el-menu-item
    v-if="!menuHasChildren(getRoute) && getShowMenu"
    :index="getRoute.path"
    @click="handleMenuClick"
  >
    <!-- do not use el-icon wrap -->
    <i
      class="text-lg flex-shrink-0"
      v-if="getRoute.meta?.icon"
      :class="`i-${getRoute.meta.icon}`"
    ></i>
    <template #title>
      <!-- {{ getRoute }} -->
      <span class="ml-4">{{ t(getRoute.meta?.title) }}</span>
    </template>
  </el-menu-item>
  <el-sub-menu v-else-if="menuHasChildren(getRoute) && getShowMenu" :index="getRoute.path">
    <template #title>
      <!-- do not use el-icon wrap -->
      <i
        class="text-lg flex-shrink-0"
        v-if="getRoute.meta?.icon"
        :class="`i-${getRoute.meta.icon}`"
      ></i>
      <span class="ml-4">{{ t(getRoute.meta?.title) }}</span>
    </template>
    <menu-item v-for="child in getRoute.children" :key="child.path" :route="child" />
  </el-sub-menu>
</template>
<script>
export default {
  name: 'MenuItem',
}
</script>
<script setup>
import { useGoRouter } from "core/router"
import { isUrl, openWindow } from "core/utils"
import { useTransl } from 'core/locales/comLocale'
/**
 * Variables area
 */
const { t } = useTransl()
const props = defineProps({
  route: {
    type: Object,
    required: true,
  },
})
const getRoute = computed(() => (props.route.meta?.single ? props.route.children[0] : props.route))
console.log("getRoute=", unref(getRoute))
const getShowMenu = computed(() => !unref(getRoute).meta?.hidden)
const go = useGoRouter()
/**
 * Method Area
 */
const menuHasChildren = (route) => {
  // NOTE: 如果目录下没有子菜单或者子目录，则会被渲染成菜单
  return Reflect.has(route, 'children') && !!route.children && route.children.length > 0
}
const handleMenuClick = ({ index }) => {
  if (isUrl(index)) {
    openWindow(index)
  } else {
    go(index)
  }
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss">
</style>