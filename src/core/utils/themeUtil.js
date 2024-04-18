import {store} from "../store"
import { 
    THEME_ENUM, 
    Element_CssVar_Prefix, 
    APP_THEME_STYLE_ID, 
    DARK_MODE_MIX_COLOR,
    SIDE_BAR_BG_COLOR_LIST, 
    SIDEBAR_BG_COLOR,
    SIDEBAR_DARKEN_BG_COLOR,
    HEADER_BG_COLOR,
    HEADER_HOVER_BG_COLOR,
    HEADER_PRESET_BG_COLOR_LIST,
} from "core/settings"
import { mix, mixLighten, mixDarken, colorIsLight } from "./colorUtil"
import { toggleClass, setCssVar } from "./domUtil"

// export const APP_THEME_STYLE_ID = '__APP_THEME_STYLE_VAR__'
// export const Element_CssVar_Prefix = '--el-color-primary'
// export const Color_White = '#fff'
// export const Color_Black = '#000'

/**
 * 设置暗色主题模式
 */
export function updateDarkMode(theme) {
    toggleClass(theme === THEME_ENUM.DARK, 'dark', document.documentElement)
}
/**
 * 设置灰色模式
 */
export function updateGrayMode(gray) {
    toggleClass(gray, 'gray-mode', document.documentElement)
}
/**
 * 设置色弱模式
 */
export function updateColorWeak(weak) {
    toggleClass(weak, 'color-weak', document.documentElement)
}

/**
 * 需要覆写的css变量并改变生成的light-${num}值
 * --el-color-primary: #409eff;
 * --el-color-primary-light-1: #53a8ff;
 * --el-color-primary-light-2: #66b1ff;
 * --el-color-primary-light-3: #79bbff;
 * --el-color-primary-light-4: #8cc5ff;
 * --el-color-primary-light-5: #a0cfff;
 * --el-color-primary-light-6: #b3d8ff;
 * --el-color-primary-light-7: #c6e2ff;
 * --el-color-primary-light-8: #d9ecff;
 * --el-color-primary-light-9: #ecf5ff;
 * --el-color-primary-dark-2: #337ecc;
 *
 * light mode：
 * https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss
 *
 * dark mode：
 * https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/dark/var.scss
 * @param {*} themeColor 
 */
export const updateTheme = (themeColor) => {
    // 异步操作，避免生成样式时阻塞渲染
    setTimeout(() => {
        // 动态创建style标签 
        let styleEle = document.getElementById(APP_THEME_STYLE_ID)
        if (!styleEle) {
            // 如果当前标签不存在则创建并插入body中
            styleEle = document.createElement('style')
            styleEle.id = APP_THEME_STYLE_ID
            styleEle.type = 'text/css'
        
            document.body.appendChild(styleEle)
        }
      
        const themeCss = []

        // 正常模式
        themeCss.push(':root {')
        themeCss.push(`  --el-color-primary: ${themeColor};`)
        for (let i = 1; i < 10; i++) {
            themeCss.push(`  ${Element_CssVar_Prefix}-light-${i}: ${mixLighten(themeColor, i * 0.1)};`)
        }
        themeCss.push(`  ${Element_CssVar_Prefix}-dark-2: ${mixDarken(themeColor, 2 * 0.1)};`)
        themeCss.push('}')

        // 夜间模式
        themeCss.push('html.dark {')
        themeCss.push('  color-scheme:dark;')
        themeCss.push(`  --el-color-primary: ${themeColor};`)
        for (let i = 1; i < 10; i++) {
            themeCss.push(
                `  ${Element_CssVar_Prefix}-light-${i}: ${mix(DARK_MODE_MIX_COLOR, themeColor, i * 0.1)};`
            )
        }
        themeCss.push(`  ${Element_CssVar_Prefix}-dark-2: ${mixLighten(themeColor, 2 * 0.1)};`)
        themeCss.push('}')

        // 设置style内容
        styleEle.innerHTML = themeCss.join('\n')
    }, 0)
}
export const updateSidebarBgColor = (color) => {
    let darkMode = store.getters["baseStore/get_themeMode"] === THEME_ENUM.DARK

    if (!color) {
        if (darkMode) {
            let darkColorIndex = SIDE_BAR_BG_COLOR_LIST.findIndex((color) => !colorIsLight(color))
            // 当前背景色一定是暗色
            color = darkColorIndex === -1 ? DARK_MODE_MIX_COLOR : SIDE_BAR_BG_COLOR_LIST[darkColorIndex]
        } else {
            color = store.getters["baseStore/get_menuSetting"].bgColor
        }
    }

    let isLightColor = colorIsLight(color)

    // 更新背景色
    setCssVar(SIDEBAR_BG_COLOR, color)
    if (!isLightColor) {
        let darkenBgColor = mixDarken(color, 0.2)
        // 次级菜单颜色
        setCssVar(SIDEBAR_DARKEN_BG_COLOR, darkenBgColor)
    }
    store.commit('baseStore/set_projectConfig', {
        menuSetting: {
            theme: isLightColor ? THEME_ENUM.LIGHT : THEME_ENUM.DARK,
        },
    })
}
export const updateHeaderBgColor = (color) => {
    let darkMode = store.getters["baseStore/get_themeMode"] === THEME_ENUM.DARK

    if (!color) {
        if (darkMode) {
            let darkColorIndex = HEADER_PRESET_BG_COLOR_LIST.findIndex((color) => !colorIsLight(color))
            color = darkColorIndex === -1 ? DARK_MODE_MIX_COLOR : HEADER_PRESET_BG_COLOR_LIST[darkColorIndex]
        } else {
            color = store.getters["baseStore/get_headerSetting"].bgColor
        }
    }

    let isLightColor = colorIsLight(color)

    setCssVar(HEADER_BG_COLOR, color)

    if (!isLightColor) {
        let lightenBgColor = mixLighten(color, 0.05)
        setCssVar(HEADER_HOVER_BG_COLOR, lightenBgColor)
    } else {
        let darkenBgColor = mixDarken(color, 0.05)
        setCssVar(HEADER_HOVER_BG_COLOR, darkenBgColor)
    }

    store.commit('baseStore/set_projectConfig', {
        headerSetting: {
            theme: isLightColor ? THEME_ENUM.LIGHT : THEME_ENUM.DARK,
        },
    })
}