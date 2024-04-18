
import { isEmpty } from 'lodash-es'
import { projectSetting, PermissionModeEnum } from 'core/settings'
import {store} from "core/store"
import {router, resetRouter} from "core/router"

export function usePermission() {
    async function resume() {
      resetRouter()
      let routes = await store.dispatch("permissionStore/action_buildRoutes")
      routes.forEach((route) => router.addRoute(route))
    }
    /**
   * 检查是否具有权限
   * @param values 权限值
   * @param nor and / or 且或非
   * @returns boolean值 true/false
   */
  function hasPermission(
    values,
    nor
  ) {
    // 空值跳过权限校验
    if (isEmpty(values)) return true

    let mode = projectSetting.permissionMode

    // 角色权限模式
    if (mode === PermissionModeEnum.ROLE) {
      let perms = values
      if (!Array.isArray(perms)) {
        return store.state.userStore.roleList.includes(perms)
      }

      if (nor === 'and') {
        return perms.every((item) => store.state.userStore.roleList.includes(item))
      } else {
        return perms.some((item) => store.state.userStore.roleList.includes(item))
      }
    }

    // 后端权限模式 - 动态获取接口
    if (mode === PermissionModeEnum.BACK) {
      let perms = values
      if (!Array.isArray(perms)) {
        // console.log("store.state.permissionStore.permissionList=", store.state.permissionStore.permissionList, perms, store.state.permissionStore.permissionList.includes(perms))
        return store.state.permissionStore.permissionList.includes(perms)
      }

      if (nor === 'and') {
        return perms.every((item) => store.state.permissionStore.permissionList.includes(item))
      } else {
        return perms.some((item) => store.state.permissionStore.permissionList.includes(item))
      }
    }

    return false
  }

  return {
    hasPermission,
    resume,
  }
}