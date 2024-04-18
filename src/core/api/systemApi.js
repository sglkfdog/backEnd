import http from "./http";
import { getCustomConfig } from "core/utils"
import { mock_api_menus, mock_api_admins, mock_api_roles } from "./mock"
import { projectSetting } from "core/settings"

export const SystemApi = {
    menus: "/admin/system/menu/page",
    menuAdd: "/admin/system/menu/add",
    menuEdit: "/admin/system/menu/update",
    // menusOneLevel: '/admin/menu/one',
    user: "/admin/system/user/page",
    userAdd: "/admin/system/user/add",
    userEdit: "/admin/system/user/update",
    role: "/admin/system/role/page",
    roleOpera: "/admin/system/role/opera",
    roleAdd: "/admin/system/role/add",
    roleEdit: "/admin/system/role/update",
}
export function systemMenusApi(params={}) {
    let custom = getCustomConfig()
    // return http.post(SystemApi.menus, params, { custom })
    let res = mock_api_menus.data
    if (!projectSetting.isMockApi) {
      res = http.post(SystemApi.menus, params, { custom })
    }
    return res
}
export function systemMenuAddApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.menuAdd, params, { custom })
    }
}
export function systemMenuEditApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.menuEdit, params, { custom })
    }
}
// export function menusOneLevelApi(params={}) {
//     let custom = getCustomConfig()
//     return http.post(SystemApi.menusOneLevel, params, { custom })
// }
export function systemUserApi(params={}) {
    let custom = getCustomConfig()
    // return http.post(SystemApi.user, params, { custom })
    let res = mock_api_admins.data
    if (!projectSetting.isMockApi) {
      res = http.post(SystemApi.user, params, { custom })
    }
    return res
}
export function systemUserAddApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.userAdd, params, { custom })
    }
        
}
export function systemUserEditApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.userEdit, params, { custom })
    }
}
export function systemRoleApi(params={}) {
    let custom = getCustomConfig()
    // return http.post(SystemApi.role, params, { custom })
    let res = mock_api_roles.data
    if (!projectSetting.isMockApi) {
      res = http.post(SystemApi.role, params, { custom })
    }
    return res
}
// 角色的新增/更新 - [id有值则更新]
export function systemRoleOperaApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.roleOpera, params, { custom })
    }
}
// 角色权限菜单 - 新增
export function systemRoleAddApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.roleAdd, params, { custom })
    }
}
// 角色权限菜单 - 更新
export function systemRoleEditApi(params={}) {
    let custom = getCustomConfig()
    if (!projectSetting.isMockApi) {
        return http.post(SystemApi.roleEdit, params, { custom })
    }
}
