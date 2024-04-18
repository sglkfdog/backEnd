<template>
  <el-card class="px-4">
    {{ t('all.common.login.signin') }}
    {{ $t('all.test') }}
    <div class="font-semibold my-4 text-xl">您好, {{ userName }}, 欢迎使用管理后台系统!</div>
    <div class="text-gray-500 my-4 text-sm flex items-center">
      {{ $t('all.doc.document') }}: <ElLink class="ml-4" type="primary" :href="DOC_SITE">{{ DOC_SITE }}</ElLink>
    </div>
    <div class="text-gray-500 my-4 text-sm flex items-center">
      {{ $t('all.doc.depository') }}:
      <ElLink class="ml-4" type="primary" :href="VUE_REPO_GITHUB_URL">{{
        VUE_REPO_GITHUB_URL
      }}</ElLink>
    </div>
    <div class="text-gray-500 my-4 text-sm flex items-center">
      {{ $t('all.doc.depository_01') }}:
      <ElLink class="ml-4" type="primary" :href="ZERO_REPO_GITHUB_URL">{{
        ZERO_REPO_GITHUB_URL
      }}</ElLink>
    </div>
    <div class="text-gray-500 my-4 text-sm flex items-center">
      {{ $t('all.doc.depository_02') }}:
      <ElLink class="ml-4" type="primary" :href="ZERO_REPO_GITHUB_URL">{{
        NEST_REPO_GITHUB_URL
      }}</ElLink>
    </div>
  </el-card>
</template>

<script setup>
import { store } from "core/store"
import { DOC_SITE, VUE_REPO_GITHUB_URL, ZERO_REPO_GITHUB_URL, NEST_REPO_GITHUB_URL } from "core/settings"
import { useTransl } from 'core/locales/comLocale'
/**
 * Variables area
 */
const { t } = useTransl()
const userName = computed(() => store.state.userStore.userInfo?.username)
/**
 * Method Area
 */

/**
 * Life cycle Area
 */
</script>