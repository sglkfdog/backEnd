import { DEFAULT_CONFIG, prefixCls } from "core/settings"
import { set } from 'lodash-es'
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isLocalImgIcon(path) {
  let r = /^(img-icon-)/.test(path)
  return r
}
export const checkEnvironment = (type=1) => {
  let environment = import.meta.env.MODE
  let host = environment === 'dev-test' ? (
    import.meta.env.VITE_API_PREFIX
    ) : (import.meta.env.VITE_API_URL + import.meta.env.VITE_API_PREFIX)
  if (type == 2) {
    host = import.meta.env.VITE_CHAIN_URL
  }
  console.log("host==", host)
  return host
}
export const addRouterPrefixFun = (path='') => {
  let prefix = import.meta.env.VITE_ROUTER_PREFIX
  let r_path = prefix ? prefix + path : path
  let res = r_path ? r_path : '/'
  return res
}

// -------------分隔--------------------------------------------

export const getEnv = (key='') => {
  return import.meta.env?.[key] ?? import.meta.env
}
export const getCustomConfig = (ignoreToken=false, ignoreCancel=false) => {
  let customConfig = {
    // 忽略token: false(需要token), true(不需要token)
    ignoreToken: ignoreToken,
    // 忽略中断: false(需要中断), true(不需要中断)
    ignoreCancel: ignoreCancel,
  }
  return customConfig
}
export const withInstall = (component, alias='') => {
  const comp = component
  comp.install = (app) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component
}
/**
* / _ - 符号转换成驼峰
*/
export function toHump(name) {
  return name.replace(/[\-\/\_](\w)/g, function (_all, letter) {
    return letter.toUpperCase()
  })
}
export function info(message) {
  console.info(`[info]: ${message}`)
}
export function warn(message) {
  console.warn(`[warn]: ${message}`)
}
export function error(message) {
  throw new Error(`[error]: ${message}`)
}
export function getConfig(config) {
  return Object.assign({}, DEFAULT_CONFIG, config)
}
export function listToTree(list, config) {
  let conf = getConfig(config)
  let nodeMap = new Map()
  let result = []
  let { id, children, pid } = conf
  for (let node of list) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  for (let node of list) {
    let parent = nodeMap.get(node[pid])
    ;(parent ? parent.children : result).push(node)
  }
  return result
}
export function filter(tree, func, config) {
  config = getConfig(config)
  let children = config.children
  function listFilter(_list) {
    let tmp_1 = _list.map((node) => {
      return {...node}
    })
    let tmp_2 = tmp_1.filter((node) => {
      node[children] = node[children] && listFilter(node[children])
      let check_1 = func(node)
      let check_2 = (node[children] && node[children].length)
      let res = check_1 || check_2
      return res
    })
    return tmp_2
  }
  let result = listFilter(tree)
  return result
}
export function isUrl(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function useDesignClass(scope) {
  return {
    prefixCls: `${prefixCls}-${scope}`,
    prefixVar: prefixCls
  }
}
export function setHtmlPageLang(lang) {
  console.log("setHtmlPageLang-lang=", lang)
  document.querySelector('html')?.setAttribute('lang', lang)
}
export function genMessage(modules, lang) {
  let message = {}

  Object.keys(modules).forEach((key) => {
    const langModule = modules[key].default

    // use file name to namespace
    let filename = key.replace(`./${lang}/`, '')
    const lastIndex = filename.lastIndexOf('.')
    // remove file suffix
    filename = filename.substring(0, lastIndex)
    const keyList = filename.split('/') // '/' is not exist will empty array
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    // module name is not undef
    if (moduleName) {
      if (objKey) {
        // set namespace
        set(message, moduleName, message[moduleName] || {})
        // set ns module
        set(message[moduleName], objKey, langModule)
      } else {
        set(message, moduleName, langModule)
      }
    }
  })

  return message
}
export function setObjToUrlParams(baseUrl, obj) {
  let parameters = ''
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&'
  }
  parameters = parameters.replace(/&$/, '')
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters
}
export function openWindow(
  url,
  opt
) {
  let { target = '__blank', noopener = true, noreferrer = true } = opt || {}
  let feature = []

  noopener && feature.push('noopener=yes')
  noreferrer && feature.push('noreferrer=yes')

  window.open(url, target, feature.join(','))
}
/**
 * 1px -> 1
 * @param unit px rem
 * @returns
 */
export function numberUnit(unit) {
  return Number(unit.replace(/[^\d]/g, ''))
}
// 过滤掉值为空的参数项
export function filterParams(params) {
  let _params = Object.keys(params).reduce((result, key) => {
    if (params[key]) {  // 过滤掉值为空的项
      result[key] = params[key]
    }
    return result
  }, {})
  return _params
}

