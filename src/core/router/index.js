import { createRouter, createWebHistory, useRouter } from 'vue-router'
export * from './mockRouter'
export * from './baseRouter'
export * from './guardRouter'
import { baseRoutes } from './baseRouter'
import { i18n } from 'core/locales'
import { RedirectRouteName } from "core/utils"

const WHITE_NAME_LIST = []
const getRouteNames = (array) => {
  array.forEach((item) => {
    if (item.name) {
      WHITE_NAME_LIST.push(item.name)
    }
    getRouteNames(item.children || [])
  })
}
getRouteNames([...baseRoutes])
console.log("baseRoutes=", baseRoutes)
console.log("WHITE_NAME_LIST=", WHITE_NAME_LIST)
console.log("router-i18n=", i18n)

export const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
export function resetRouter() {
  console.log("router.getRoutes()=", router.getRoutes())
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      if (router.hasRoute(name)) router.removeRoute(name)
    }
  })
}
export const setupRouter = (app) => {
  console.log("setupRouter-router.getRoutes()=", router.getRoutes())
  app.use(router)
}
function handleError(e) {
  console.error("handleError=", e)
}
export const useGoRouter = (_router = '') => {
  let routerVal
  if (!_router) {
    routerVal = useRouter()
  }
  let { replace, push } = _router || routerVal
  function go(_path, isReplace = false) {
    if (!_path) return
    isReplace ? replace(_path).catch(handleError) : push(_path).catch(handleError)
  }
  return go
}
export function useRedoRouter(_router) {
  let { replace, currentRoute } = _router || useRouter()
  let { query, fullPath, params = {}, name } = unref(currentRoute)

  function redo() {
    return new Promise((resolve) => {
      if (name === RedirectRouteName) {
        resolve(false)
        return
      }

      if (name && Object.keys(params).length > 0) {
        params['__redirect_type__'] = 'name'
        params['path'] = String(name)
      } else {
        params['__redirect_type__'] = 'path'
        params['path'] = fullPath
      }
      console.log("redo-params=", params, query)
      replace({ name: RedirectRouteName, params, query }).then(() => resolve(true))
    })
  }

  return redo
}
export default router
