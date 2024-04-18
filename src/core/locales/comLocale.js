import { computed, unref, toRaw } from 'vue'
// import { i18n, store } from './index'
import {store} from 'core/store'
import { i18n } from './index.js'

export const useLocale = () => {
    // const getLocale = computed(() => store.state.base.locale)
    const getLocale = computed(() => store.getters["baseStore/get_locale"])
    
    const getEleLocale = computed(() => {
      // console.log("useLocale-getLocale=", unref(getLocale))
      // console.log("useLocale-i18n=", i18n.global, toRaw(i18n.global.messages.value).en, i18n.global.getLocaleMessage(unref(getLocale)))
      // let tmp = toRaw(i18n.global.messages.value)
      // console.log("useLocale-i18n-2=", i18n)
      console.log("useLocale-getLocale==", unref(getLocale))
      return i18n.global.getLocaleMessage(unref(getLocale))?.eleLocale ?? {}
    })
    const getDayjsLocale = computed(() => {
      return i18n.global.getLocaleMessage(unref(getLocale))?.dayjsLocale ?? {}
    })
    return {
      getLocale,
      getEleLocale,
      getDayjsLocale,
      // getShowPicker,
      // changeLocale,
    }
}
function getKey(namespace, key) {
    if (!namespace) return key
    if (key.startsWith(namespace)) return key
  
    return `${namespace}.${key}`
}
export function lang(val){
    console.log("lang-val=", val)
    console.log("lang-i18n=", i18n)
    console.log("lang-global=", i18n?.global?.t(val))
    return i18n?.global?.t(val) ?? ''
}
export function useTransl(namespace) {
    let normalT = (key) => getKey(namespace, key)
  
    // i18n not init
    if (!i18n) {
      return {
        t: normalT,
      }
    }
  
    const { t } = i18n.global
  
    const tFn = (key, ...args) => {
      if (!key) return ''
      if (!key.includes('.') && !namespace) return key
  
      return (t)(getKey(namespace, key), ...(args))
    }
  
    return {
      t: tFn,
    }
}
// export const t = (key) => key
export const t = (key) => {
  console.log("ttt=", key)
  return key
}