<template>
  <ElConfigProvider v-bind="getElConfig">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script setup>
import { AppProvider } from '@/components/Application'
import { projectSetting, useTitleSetting } from 'core/settings'
import { useLocale } from 'core/locales/comLocale'
import { dateUtil } from 'core/utils'
/**
 * Variables area
 */
console.log("APP")
const { getEleLocale, getDayjsLocale } = useLocale()
const getElConfig = computed(() => {
  // dayjs locale
  dateUtil.locale(unref(getDayjsLocale))
  console.log("unref(getEleLocale)=", unref(getEleLocale))
  return {
    ...projectSetting.elementUISetting,
    locale: unref(getEleLocale),
  }
})
/**
 * Method Area
 */
// page title
useTitleSetting()
/**
 * Life cycle Area
 */
</script>