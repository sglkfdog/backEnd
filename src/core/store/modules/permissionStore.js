import { MenuTypeEnum, PermissionModeEnum } from "core/settings"
import { listToTree, filter, transformMenuToRoute, isUrl } from "core/utils"
import { getPermAndMenu } from "core/api"
import { roleRoutes, NotFoundRoute } from "core/router"

const state = () => ({
    isDynamicAddedRoute: false,
    menuList: [],
    permissionList: [],
})
const getters = {}
const mutations = {
    set_isDynamicAddedRoute(state, data) {
        state.isDynamicAddedRoute = data
    },
    set_menuList (state, data) {
        state.menuList = data
    },
    set_permissionList(state, data) {
        state.permissionList = data
    },
}
const actions = {
    action_resetState({state, dispatch, commit}, params) {
        commit('set_menuList', [])
        commit('set_permissionList', [])
        commit('set_isDynamicAddedRoute', false)
    },
    // 获取登录管理员权限和菜单配置
    async action_buildRoutes({state, dispatch, commit, rootState, rootGetters}, params) {
        let routes = []
        let roleList = rootState.userStore.roleList
        let { permissionMode = projectSetting.permissionMode } = rootGetters["baseStore/get_projectConfig"]
        // 角色路由过滤
        let routeRoleFilter = (route) => {
            let { meta } = route
            let { roles } = meta || ({})

            if (!roles) {
                // console.log("routeRoleFilter=", roles)
                return true
            }

            return roleList.some((role) => roles.includes(role))
        }
        let routeRemoveIllegalFilter = (menu) => {
            if (menu.type === MenuTypeEnum.Permission) {
                console.log("不合法-1")
                return false
            }
    
            if (!menu.router?.startsWith('/') && !isUrl(menu.router)) {
                console.log("不合法-2")

                // warn(`此路由${menu.router}不合法，需以/或者合法的url开头。`)
                // return false
            }
    
            return true
        }
        let routeRemoveIgnoreFilter = (route) => {
            let { meta } = route
            let { ignoreRoute } = meta || {}

            return !ignoreRoute
        }
        // console.log("permissionMode=", permissionMode)
        switch (permissionMode) {
            // 后端路由模式
            case PermissionModeEnum.BACK:
                let { menus, perms } = await getPermAndMenu()
                // let { menus, perms } = getPermAndMenu()
                console.log("BACK-menus=", menus)
                console.log("BACK-perms=", perms)
                // 过滤不合法的路由，避免不合法路径导致vue-router进入死循环
                let menusTree = filter(menus, routeRemoveIllegalFilter)
                console.log("BACK-perms2=", perms)

                // list to tree
                menusTree = listToTree(menusTree)
                console.log("BACK-perms3=", perms)

                // 转换成真实的vue-router对象，动态引入组件
                let routeList = transformMenuToRoute(menusTree, true)
                console.log("BACK-routeList=", routeList)
                // 移除 meta.ignoreRoute 项
                routeList = filter(routeList, routeRemoveIgnoreFilter)
                // console.log("BACK-routeList=", routeList)
                // 增加 404 Not found 路由
                routes = [NotFoundRoute, ...routeList]
                console.log("BACK-routes=", routes)
                // 按钮级别权限数据
                commit('set_permissionList', perms || [])
                break
    
            // 角色路由模式
            case PermissionModeEnum.ROLE:
                // console.log("roleRoutes=", roleRoutes)
                routes = filter(roleRoutes, routeRoleFilter)
                // console.log("filter-routes=", routes)
                // 增加 404 Not found 路由
                routes = [NotFoundRoute, ...routes]
                break
        }
        // console.log("set_menuList-routes=", routes)
        // store
        commit('set_menuList', routes)
        return routes
    },
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}