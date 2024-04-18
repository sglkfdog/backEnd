import http from "./http";
import { mock_permissionMenus, mock_userInfo } from "./mockApi"
import { getCustomConfig } from "core/utils"
import { mock_api_login, mock_api_authMenus } from "./mock"
import { projectSetting } from "core/settings"
// let customConfig = {
//   // 忽略token: false(需要token), true(不需要token)
//   ignoreToken: false,
//   // 忽略中断: false(需要中断), true(不需要中断)
//   ignoreCancel: false,
// }
let BaseApi = {
  login: '/admin/auth/login',
  captcha: '/admin/auth/captcha',
  info: '/admin/index/getInfo',
  permmenu: '/admin/index/getUserMenus',
  logout: '/admin/auth/logout',
  profile: '/user/profile/info',
  avatar: '/user/avatar/generate',
  update: '/user/profile/update',
  passwd: '/user/password/update',
}

export function userLoginApi(params) {
  let custom = getCustomConfig(true)
  // let custom = {
  //   ...customConfig,
  //   ignoreToken: true
  // }
  // return http.post(BaseApi.login, params, { custom })
  let res = mock_api_login.data
  if (!projectSetting.isMockApi) {
    res = http.post(BaseApi.login, params, { custom })
  }
  return res
}

export async function getPermAndMenu() {
  console.log("getPermAndMenu")
  try {
    let custom = getCustomConfig()
    let params={}
    // let res = await http.get(BaseApi.permmenu, {params, custom })
    let res = mock_api_authMenus.data
    if (!projectSetting.isMockApi) {
      res = await http.get(BaseApi.permmenu, {params, custom })
    }
    console.log("menus=", res.list)
    let menus = []
    let perms = []
    res.list.forEach(element => {
      element?.apiPath ? perms.push(element.apiPath) : ''
      if (element.type != 2) {
        menus.push(element)
      }
    });
    
    console.log("perms=", perms)
    return {
      // menus: res.list,
      menus: res.list,
      perms
    }
  } catch (error) {
    console.log("getPermAndMenu-catch-error=", error)
  }
  
  // return http.get(BaseApi.permmenu)
  // return mock_permissionMenus
}
export function getUserInfoHttp(params={}) {
  let custom = getCustomConfig()
  if (!projectSetting.isMockApi) {
    return http.post(BaseApi.info, params, { custom })
  }
  // return mock_userInfo
}
export function userLogoutHttp(params={}) {
  let custom = getCustomConfig()
  if (!projectSetting.isMockApi) {
    return http.post(BaseApi.logout, params, { custom })
  }
}