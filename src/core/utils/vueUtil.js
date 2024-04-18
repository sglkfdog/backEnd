// import ElementPlus from 'element-plus'

// export const registerGlobalComponent = () => {
//     // element-plus
//     app.use(ElementPlus)

//     // global app context
//     globalAppContext = app._context
// }
import {
  getCurrentInstance,
  nextTick,
  onUnmounted,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue'
import { isEqual, isFunction, isNil } from 'lodash-es'
import { isUrl, warn, error, getEnv } from "core/utils"
import { MenuTypeEnum } from "core/settings"
import { ElNotification, ElMessage, ElMessageBox } from 'element-plus'

export const useMessage = () => {
  return {
    createNotification: ElNotification,
    createMessage: ElMessage,
    createMessageBox: ElMessageBox,
  }
}
export const NotFoundRouteName = Symbol('NotFound')
export const RedirectRouteName = Symbol('RedirectTo')

export const ParentLayout = () => import('@/layouts/default/index.vue')
export const IFrameLayout = () => import('@/layouts/iframe/index.vue')
export const EmptyLayout = () => import('@/layouts/empty/index.vue')
export const ExceptionComponent = () => import('@/views/base/exception.vue')
export const LoginComponent = () => import('@/views/base/login.vue')
export const DashboardComponent = () => import('@/views/base/dashboard.vue')
export const RedirectComponent = () => import('@/views/base/redirect.vue')
export const importComponentFun = (name) => {
  // let str = `views/${name}.vue`
  let str = `views/system/user.vue`
  return import(`@/${str}`)
}

let dynamicViewsModules
// store the parameters passed when opening the pop-up window
const storeParameters = reactive({})

const parseDynamicImportPath = (key) => {
  const k = key.replace('../../', '')
  const lastIndex = k.lastIndexOf('.')
  return k.substring(0, lastIndex)
}
export const dynamicImport = (component) => {
  // dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/index.{vue,tsx}')
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}')

  let keys = Object.keys(dynamicViewsModules)
  
  if (!component) {
    return ExceptionComponent
  }
  // console.log("dynamicImport-keys=", keys, dynamicViewsModules, component)
  let matchKeys = keys.filter((key) => {
    return parseDynamicImportPath(key) == "views"+component
  })
  if (matchKeys?.length === 1) {
    let matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    warn(
      '请不要在views文件夹下创建相同层次目录中具有相同文件名的文件index.vue和index.tsx,这将导致动态引入失败'
    )
    return
  } else {
    warn(`在src/${component}找不到指定的文件,请自行创建!`)
    return ExceptionComponent
  }
}
export const transformMenuToRoute = (menus, isRoot = false) => {
  let result = menus.map((menu) => {
    let meta = {
      title: menu.name,
      icon: menu.icon,
      hidden: !menu.isShow,
    }
    // 目录
    if (menu.type === MenuTypeEnum.Catalogue) {
      let route = {
        name: menu.router,
        path: menu.router,
        component: isRoot ? ParentLayout : EmptyLayout,
        meta,
        children: [],
      }

      if (menu.children && menu.children.length > 0) {
        route.children = transformMenuToRoute(menu.children)
        // 目录时则尝试重定向至默认首个子项路径
        route.redirect = route.children[0].path
      } else {
        // invalid catalogue, will ignore
        // route.meta['ignoreRoute'] = true
      }
      return route
    }
    // 外链
    if (isUrl(menu.router)) {
      return {
        path: `/external-link/${menu.id}`,
        name: menu.router,
        component: ParentLayout,
        meta: {
          single: true,
        },
        children: [
          {
            path: menu.router,
            component: ParentLayout,
            meta,
          },
        ],
      }
    }
    // 内嵌页面
    let component
    if (isUrl(menu.router || '')) {
      meta.iframeSrc = menu.router
      component = IFrameLayout
    } else {
      component = dynamicImport(menu.router)
    }
    if (isRoot) {
      // 需要ParentLayout包裹
      return {
        path: menu.router,
        name: menu.router,
        component: ParentLayout,
        redirect: `${menu.router}/index`,
        meta: {
          single: true,
        },
        children: [
          {
            path: `${menu.router}/index`,
            component,
            meta,
          },
        ],
      }
    } else {
      return {
        path: menu.router,
        name: menu.router,
        component,
        meta,
      }
    }
  })
  return result
}
export function useDrawer() {
  let drawerRef = ref(null)
  let loadedRef = ref(false)
  let uidRef = ref(-1)

  function register(action, uid) {
    // console.log("register=", action, uid)
    if (!getCurrentInstance()) {
      error('useDrawer() can only be used inside setup() or functional components!')
    }

    uidRef.value = uid
    let isProdMode = getEnv("PROD")
    if (isProdMode) {
      onUnmounted(() => {
        drawerRef.value = null
        loadedRef.value = false
        storeParameters[unref(uidRef.value)] = null
      })
    }

    if (unref(loadedRef) && isProdMode && action === unref(drawerRef)) return

    drawerRef.value = action
    loadedRef.value = true
  }

  let getInstance = () => {
    let instance = unref(drawerRef)
    if (!instance) {
      error('useDrawer instance is undefined!')
    }
    return instance
  }

  let methods = {
    setProps: (props) => {
      getInstance()?.setProps(props)
    },
    setLoading: (loading = true) => {
      getInstance()?.setProps({ loading })
    },
    setConfirmLoading: (loading = true) => {
      getInstance()?.setProps({ confirmBtnProps: { loading } })
    },
    openDrawer:(data, openOnSet = true) => {
      getInstance()?.setProps({ visible: true })
      if (!data) return
      let id = unref(uidRef)
      if (openOnSet) {
        storeParameters[id] = null
        storeParameters[id] = toRaw(data)
        return
      }

      let equal = isEqual(toRaw(storeParameters[id]), toRaw(data))
      if (!equal) {
        storeParameters[id] = toRaw(data)
      }
    },
    closeDrawer: () => {
      getInstance()?.setProps({ visible: false })
    },
  }

  return [register, methods]
}
export function useDrawerInner(callbackFn) {
  let drawerRef = ref(null)
  let loadedRef = ref(false)
  let uidRef = ref(-1)
  let currentInstance = getCurrentInstance()

  function register(action, uid) {
    if (!currentInstance) {
      error('useDrawerInner() can only be used inside setup() or functional components!')
    }

    uidRef.value = uid
    let isProdMode = getEnv("PROD")
    if (isProdMode) {
      onUnmounted(() => {
        drawerRef.value = null
        loadedRef.value = false
      })
    }

    if (unref(loadedRef) && isProdMode && action === unref(drawerRef)) return

    drawerRef.value = action
    loadedRef.value = true

    // emit current
    currentInstance?.emit('register', action, uid)
  }

  let getInstance = () => {
    let instance = unref(drawerRef)
    if (!instance) {
      error('useDrawerInner instance is undefined!')
    }
    return instance
  }

  watchEffect(() => {
    let data = store[unref(uidRef)]
    if (isNil(data)) return
    if (!callbackFn || !isFunction(callbackFn)) return

    nextTick(() => {
      callbackFn(data)
    })
  })

  return [
    register,
    {
      setProps: (props) => {
        getInstance()?.setProps(props)
      },
      setLoading: (loading = true) => {
        getInstance()?.setProps({ loading })
      },
      setConfirmLoading: (loading = true) => {
        getInstance()?.setProps({ confirmBtnProps: { loading } })
      },
      closeDrawer: () => {
        getInstance()?.setProps({ visible: false })
      },
    },
  ]
}