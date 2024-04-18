// 样式重置:https://alfred-skyblue.github.io/unocss-docs-cn/guide/style-reset
// 重置浏览器默认样式
import '@unocss/reset/tailwind.css'

import 'element-plus/dist/index.css'
// 暗黑模式:https://element-plus.org/zh-CN/guide/dark-mode.html#%E5%A6%82%E4%BD%95%E5%90%AF%E7%94%A8%EF%BC%9F
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入unocss编译的样式
import "uno.css"
import "@/styles/index.scss"


import { createApp } from 'vue'
import { router, setupRouter, setupRouterGuard } from 'core/router'
import { setupStore } from "core/store";
// import {store} from "core/store";
import { setupI18n } from "core/locales";
import { initBaseConfig } from "core/utils"
import { registerGlobalComp } from "core/ui"
import { setupGlobalDirectives } from "core/directive"
import App from './App.vue'
const startupApp = async () => {
    const app = createApp(App)
    console.log("main.js")

    let store = setupStore(app)
    // setupStore(app)

    // init config
    initBaseConfig()

    registerGlobalComp(app)

    let i18n = await setupI18n(app, store)
    // await setupI18n(app)

    setupRouter(app)

    setupRouterGuard(router)

    setupGlobalDirectives(app)

    app.mount('#app')
}

startupApp()
