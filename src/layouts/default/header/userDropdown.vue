<template>
  <el-dropdown class="text-current" placement="bottom-end" @command="handleItemClick">
    <span class="h-full inline-block flex items-center cursor-pointer">
      <el-avatar :src="userAvatar" :size="26" @error="isLoadAvatarError = true" />
      <span class="ml-2 text-xs font-medium">{{ userName }}</span>
      <span class="i-dashicons:arrow-down"></span>
    </span>
    <template #dropdown>
        <el-dropdown-menu>
            <!-- <el-dropdown-item :command="PageEnum.Account">
            {{ $t('routes.account') }}
            </el-dropdown-item> -->
            <!-- <el-dropdown-item divided :command="PageEnum.Logout"> -->
            <el-dropdown-item :command="PageEnum.Logout">
            {{ $t('all.layout.header.userDropdown.logout') }}
            </el-dropdown-item>
        </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import {store} from "core/store"
import { useGoRouter } from "core/router"
import { PageEnum } from "core/settings"
import DefaultAvatar from "@/assets/svg/user-default-avatar.svg"
import { ElLoading } from 'element-plus'
/**
 * Variables area
 */
const go = useGoRouter()
const isLoadAvatarError = ref(false)
const userAvatar = computed(() =>
  unref(isLoadAvatarError) ? DefaultAvatar : store.state.userStore.userInfo?.avatar || DefaultAvatar
)
const userName = computed(() => store.state.userStore.userInfo?.username)
/**
 * Method Area
 */
const handleItemClick = (command) => {
  if (command === '/logout') {
    let loadingIst = ElLoading.service({ fullscreen: true })

    store.dispatch("userStore/action_logout").finally(() => {
      loadingIst.close()

      // redirect to login
      go(PageEnum.Login, true)
    })
  } else {
    go(command)
  }
}
/**
 * Life cycle Area
 */
</script>
<style lang="scss" scoped>
</style>