import {store} from "core/store"
import { merge } from 'lodash-es'
import { THEME_ENUM, projectSetting as defaultSetting } from "core/settings"
import { updateTheme, updateDarkMode, updateSidebarBgColor, updateHeaderBgColor, updateGrayMode, updateColorWeak } from "core/utils"

export const initBaseConfig = () => {
    // setup global config
    // store.commit('baseStore/set_projectConfig', defaultSetting)

    // setup global config
    try {
        let config = store.state.baseStore.projectConfig
        store.commit('baseStore/set_projectConfig', merge({}, defaultSetting, config))
        // console.log("initBaseConfig=", config, defaultSetting, store.getters['baseStore/get_themeMode'])
    } catch (err) {
        store.commit('baseStore/set_projectConfig', defaultSetting)
    }

    let darkMode = store.getters['baseStore/get_themeMode']
    let {
        grayMode,
        colorWeak,
        themeColor,
        menuSetting: { bgColor },
        headerSetting: { bgColor: headerbgColor },
    } = store.getters['baseStore/get_projectConfig']

    // update primary theme color
    updateTheme(themeColor)

    if (darkMode === THEME_ENUM.DARK) {
        // 夜间模式
        updateDarkMode(darkMode)
    
        // 更新夜间模式下的配置，以防被手动修改了非夜间模式不支持的背景设置
        updateSidebarBgColor()
        updateHeaderBgColor()
      } else {
        // update background
        bgColor && updateSidebarBgColor(bgColor)
        headerbgColor && updateHeaderBgColor(headerbgColor)
    }

    // root class
    grayMode && updateGrayMode(grayMode)
    colorWeak && updateColorWeak(colorWeak)

    // init locale
    // localeStore.initLocale()

    // setup user config
    store.commit('userStore/set_token', store.state.userStore.token)
}