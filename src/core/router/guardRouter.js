// import { projectSetting } from 'core/settings'
import {store} from 'core/store'
import NProgress from 'nprogress'
import { AxiosCanceler } from "core/api/axiosCanceler"
import { useMessage, warn } from "core/utils"
import { useTransitionSetting, PageEnum } from "core/settings"
import { NotFoundRoute } from "./baseRouter"
// 白名单路由
// export let whitePathList = [PageEnum.Login, PageEnum.Dashboard]
export let whitePathList = [PageEnum.Login]

export const createHttpGuard = (router) => {
    const { removeAllHttpPending } = store.getters["baseStore/get_projectConfig"]
  
    let axiosCanceler
  
    if (removeAllHttpPending) {
      axiosCanceler = new AxiosCanceler()
    }
  
    router.beforeEach(() => {
      // 切换路由将删除所有的请求
      axiosCanceler?.removeAllPending()
      return true
    })
}
export const createMessageGuard = (router) => {
  let { closeMessageOnSwitch } = store.getters["baseStore/get_projectConfig"]
  let { createMessage, createNotification } = useMessage()

  router.beforeEach(() => {
    try {
      if (closeMessageOnSwitch) {
        createMessage.closeAll()
        createNotification.closeAll()
      }
    } catch (err) {
      warn('MessageGuard Error:' + err)
    }
    return true
  })
}
export const createProgressGuard = (router) => {
  let { getEnableNProgress } = useTransitionSetting()
  // showSpinner:是否显示环形进度动画，默认true
  NProgress.configure({ showSpinner: false })

  router.beforeEach(() => {
    unref(getEnableNProgress) && NProgress.start()
    return true
  })

  router.afterEach(() => {
    unref(getEnableNProgress) && NProgress.done()
    return true
  })
}
export const createPermissionGuard = (router) => {
  router.beforeEach(async (to, from) => {
    // vue-router4.0中取消了next,可以不写;return true或Undefined通过导航验证,return false取消导航。

    let token = store.state.userStore.token
    console.log("from=", from)
    console.log("to=", to)
    // 白名单
    if (whitePathList.includes(to.path)) {
      if (to.path === (PageEnum.Login) && token) {
        console.log("guardRouter-白名单1")
        return (to.query?.redirect) || PageEnum.Root
      }
      console.log("guardRouter-白名单2")
      return true
    }

    // token不存在
    if (!token) {
      console.log("guardRouter-!token")
      // 将重定向到登录页面
      return {
        path: PageEnum.Login,
        replace: true,
        query: {
          redirect: to.path,
        },
      }
    }

    try {
      console.log("guardRouter-try")
      // 判断是否需要初始化用户信息
      if (!store.state.userStore.userInfo) {
        await store.dispatch("userStore/action_getUserInfo")
      }
      console.log("store.state.permissionStore.isDynamicAddedRoute=", store.state.permissionStore.isDynamicAddedRoute)
      // 如果权限路由已初始化
      if (store.state.permissionStore.isDynamicAddedRoute) {
        return true
      }
      console.log("guardRouter-try2")

      // 初始化权限路由
      let routes = await store.dispatch("permissionStore/action_buildRoutes")
      console.log("guardRouter-try3")

      routes.forEach((route) => {
        router.addRoute(route)
      })
      console.log("guardRouter-try4")

      // dynamic route is added
      store.commit("permissionStore/set_isDynamicAddedRoute", true)
      console.log("guardRouter-try5")

      if (to.name === NotFoundRoute.name) {
        console.log("NotFoundRoute-to.fullPath=", to.fullPath)
        // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
        return { path: to.fullPath, replace: true, query: to.query }
      } else {
        let redirectPath = (from.query.redirect || to.path)
        let redirect = decodeURIComponent(redirectPath)
        let nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        console.log("nextData=", nextData)
        return nextData
      }
    } catch (e) {
      console.log("guardRouter-catch")
      // clear userinfo, need relogin
      await store.dispatch("userStore/action_resetState")

      return {
        path: PageEnum.Login,
        query: {
          redirect: encodeURIComponent(to.fullPath),
        },
        replace: true,
      }
    }
  })
}
export const createStateGuard = (router) => {
  router.afterEach((to) => {
    // 进入登录页面后确保清除所有信息
    if (to.path === PageEnum.Login) {

      store.dispatch('userStore/action_resetState')
      store.dispatch('permissionStore/action_resetState')
    }
  })
}
export const setupRouterGuard = (router) => {
    createHttpGuard(router)
    createMessageGuard(router)
    createProgressGuard(router)
    createPermissionGuard(router)
    createStateGuard(router)
}