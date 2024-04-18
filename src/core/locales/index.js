// import en from './en'
// import zhCN from './zh_CN'
// import zhCT from './zh-CT.json'
// import zhTW from './zh-TW.json'
import { createI18n } from 'vue-i18n'
import { LOCALE } from "core/settings"
import { setHtmlPageLang } from "core/utils"
// import {store} from "core/store"
// import { zhTw } from 'element-plus/es/locale'

// let index = {
//     en:en,
//     zh_CN:zhCN,
//     zh_TW:zhTW,
//  }

// export const store = storeVal

// console.log("storeVal=", store)
export let i18n

const createI18nFun = async (_store) => {
    let locale = _store.getters["baseStore/get_locale"]
    // let locale = localStorage.getItem("locale") || "zh_CN"
    let message = (await import(`./lang/${locale}.js`))?.default || {}
    // let locales = Object.values(LOCALE)
    // const messages = {}
    // await locales.forEach(async element => {
    //     messages[element] = (await import(`./lang/${element}.js`))?.default || {}
    // })
    // console.log("createI18nFun-messages=", messages)
    console.log("locale==", locale, message)
    setHtmlPageLang(locale)
    return {
        legacy: false,
        globalInjection: true, // 全局注册 $t方法
        warnHtmlMessage: false,//去除页面警告
        // locale: localStorage.getItem('lang') || 'zh_CN',
        // locale:'zhCN',
        // messages:{
        //     ...index
        // }
        locale,
        messages: {
            [locale]: message,
        },
        // messages,
    }
}
// let options_test = await createI18nFun(storeVal)
// console.log("options_test=", options_test)
export const setupI18n = async (app, _store) => {
    let options = await createI18nFun(_store)
    // let options = await createI18nFun(store)
    i18n = createI18n(options)
	app.use(i18n)
    return i18n
}