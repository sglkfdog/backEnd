import { store } from "core/store"
import { resetRouter, router } from "core/router"
import { projectSetting, PermissionModeEnum } from "core/settings"
import { isEmpty } from 'lodash-es'

export function usePermission() {
  async function resume() {
    resetRouter();
    const routes = await store.dispatch("permissionStore/action_buildRoutes");
    routes.forEach((route) => router.addRoute(route));
  }

  /**
   * 检查是否具有权限
   * @param values 权限值
   * @param nor and / or 且或非
   * @returns
   */
  function hasPermission(values, nor = "or") {
    // 空值跳过权限校验
    if (isEmpty(values)) return true;

    let mode = projectSetting.permissionMode;

    // 角色权限模式
    if (mode === PermissionModeEnum.ROLE) {
        let perms = values;
      if (!Array.isArray(perms)) {
        return store.state.userStore.roleList.includes(perms);
      }

      if (nor === "and") {
        return perms.every((item) => store.state.userStore.roleList.includes(item));
      } else {
        return perms.some((item) => store.state.userStore.roleList.includes(item));
      }
    }

    // 后端权限模式
    if (mode === PermissionModeEnum.BACK) {
        let perms = values;
      if (!Array.isArray(perms)) {
        return store.state.permissionStore.permissionList.includes(perms);
      }

      if (nor === "and") {
        return perms.every((item) =>
            store.state.permissionStore.permissionList.includes(item)
        );
      } else {
        return perms.some((item) =>
            store.state.permissionStore.permissionList.includes(item)
        );
      }
    }

    return false;
  }

  return {
    hasPermission,
    resume,
  };
}
