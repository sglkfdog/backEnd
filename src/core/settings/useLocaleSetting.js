import {store} from 'core/store'
import { i18n } from 'core/locales'
import { unref, computed, toRaw } from "vue"
import { LoadLocalePool } from "./constantSetting"
import { setHtmlPageLang } from "core/utils"
export function useLocaleSetting() {
  
    const getLocale = computed(() => store.getters["baseStore/get_locale"])
  
    const getShowPicker = computed(() => store.getters["baseStore/get_localeSetting"].showPicker)
  
    const getEleLocale = computed(() => {
      console.log("useLocaleSetting-getLocale==", unref(getLocale))
      return i18n.global.getLocaleMessage(unref(getLocale))?.eleLocale ?? {}
    })
  
    const getDayjsLocale = computed(() => {
      return i18n.global.getLocaleMessage(unref(getLocale))?.dayjsLocale ?? {}
    })
  
    function setI18nLang(locale) {
      // check mode is legacy or composition
      if (typeof i18n.global.locale === 'string') {
        i18n.global.locale = locale
      } else {
        i18n.global.locale.value = locale
      }
      // console.log("i18n.global.getLocaleMessage===", i18n.global, i18n.global.messages.value, toRaw(i18n.global.messages.value), i18n.global.getLocaleMessage[locale], locale)
      // update store
    //   localeStore.setLocaleInfo({ locale })
        store.commit("baseStore/set_projectConfig", { localeSetting: {locale} })
  
      // update html lang
      setHtmlPageLang(locale)
    }
  
    // switch the lang will change the locale of useI18n
    async function changeLocale(locale) {
      let globalI18n = i18n.global
  
      let currentLocale = unref(globalI18n.locale)
  
      // nothing change
      if (currentLocale === locale) {
        return
      }
  
      // is loaded
      if (LoadLocalePool.includes(locale)) {
        setI18nLang(locale)
        return
      }
      // console.log("changeLocale-locale=", locale)
      // load module and set locale
      let langModule = (await import(`./../locales/lang/${locale}.js`))?.default || {}
      // console.log("changeLocale-langModule=", langModule)

      if (!langModule) return
  
      // let { message } = langModule
      // globalI18n.setLocaleMessage(locale, message)
      globalI18n.setLocaleMessage(locale, langModule)
      LoadLocalePool.push(locale)
  
      setI18nLang(locale)
    }
  
    return {
      getLocale,
      getShowPicker,
      getEleLocale,
      getDayjsLocale,
      changeLocale,
    }
}