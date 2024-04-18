import { themeMode, THEME_ENUM  } from "core/settings"
import { merge } from "lodash-es"

const state = () => ({
    // locale: 'zh_CN',
    // darkMode: null,
    projectConfig: null,
    routes: [],
})
const getters = {
    // 计算属性
    get_locale(state, getters) {
        return getters.get_projectConfig.localeSetting.locale ?? 'zh_CN'
    },
    get_showPicker(state, getters) {
        let val = getters.get_projectConfig.localeSetting?.showPicker ?? false
        return val
    },
    get_themeMode(state, getters) {
        // return state.darkMode || themeMode
        return getters.get_projectConfig.headerSetting.theme ?? themeMode
    },
    get_projectConfig(state, getters) {
        return state.projectConfig || {}
    },
    get_menuSetting(state, getters) {
        return getters.get_projectConfig.menuSetting
    },
    get_headerSetting(state, getters) {
        return getters.get_projectConfig.headerSetting
    },
    get_localeSetting(state, getters) {
        return getters.get_projectConfig.localeSetting
    },
    get_transitionSetting(state, getters) {
        return getters.get_projectConfig.transitionSetting
    },
}
const mutations = {
    set_locale (state, data) {
        let tmp = merge(state.projectConfig||{}, {locale: data})
        state.projectConfig = tmp
    },
    // set_darkMode (state, data) {
    //     state.darkMode = data
    //     // index.html中需要获取该值，只允许使用localStorage设置
    //     // localStorage.setItem(KEY_APP_DARK_MODE, mode)
    // },
    set_projectConfig_clear (state, data) {
        state.projectConfig = null
        // WebStorage.set(KEY_SETTING, this.getProjectConfig)
    },
    set_projectConfig (state, data) {
        let tmp = merge(state.projectConfig||{}, data)
        state.projectConfig = tmp
        // WebStorage.set(KEY_SETTING, this.getProjectConfig)
    },
    set_routes (state, data) {
        state.routes = data
    },
}
const actions = {
};
// export const base = {
//     namespaced: true,
//     state,
//     getters,
//     mutations,
//     actions,
// }
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};