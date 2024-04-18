import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
// import { base, api } from "./modules"
// import modules from "./modules"
import baseStore from './modules/baseStore'
import userStore from './modules/userStore'
import permissionStore from './modules/permissionStore'
import apiStore from './modules/apiStore'

const store = createStore({
    modules: {
		baseStore,
		userStore,
		permissionStore,
		apiStore,
	},
	// modules,
	plugins: [
		createPersistedState({
			paths: [
				"baseStore.projectConfig",
				"userStore.token",
				"userStore.userInfo",
				// "permissionStore.isDynamicAddedRoute",
				// "permissionStore.menuList",
			],
            // storage: window.localStorage,
			// storage: window.sessionStorage,
            // uniapp的缓存设置
            // storage: {
            //     getItem: key => uni.getStorageSync(key),
            //     setItem: (key, value) => uni.setStorageSync(key, value),
            //     removeItem: key => uni.removeStorageSync(key)
            // },
			storage: window.localStorage,
		}),
	],
})
console.log("store==", store)
export const setupStore = (app) => {
	app.use(store)
	return store
}
export const clearStorageStore = (app) => {
	store.commit("baseStore/set_projectConfig_clear")
	store.commit("userStore/set_token", '')
}
// export default store
export { store }