import { RoleEnum } from "core/settings"
import { getUserInfoHttp, userLogoutHttp } from "core/api"
import { resetRouter } from 'core/router'

const state = () => ({
    token: '',
    userInfo: null,
    roleList: []
})
const getters = {}
const mutations = {
    set_token (state, data) {
        state.token = data
        console.log("state.token=", state.token, data)
    },
    set_userInfo(state, data) {
        state.userInfo = data
    },
    set_roleList(state, data) {
        state.roleList = data
    },
}
const actions = {
    action_resetState({state, dispatch, commit}, params) {
        commit('set_token', '')
        commit('set_userInfo', null)
        commit('set_roleList', [])
    },
    async action_getUserInfo({state, dispatch, commit}, params) {
        let val = await getUserInfoHttp()
        let userInfo = {
            username: val?.name ?? '',
            avatar: val?.avatar ?? '',
        }
        commit("set_userInfo", userInfo)
        // 角色列表（远程获取，这里Mock了假数据）
        commit("set_roleList", [RoleEnum.ROOT])
    },
    async action_logout(context, params) {
        let {state, dispatch, commit} = context
        console.log("action_logout-context=", context)
        // can fail
        await userLogoutHttp()

        dispatch("action_resetState")
        /**
         * 第一个参数：调用方法的路径
         * 第二个参数：传值，注意：即时不需要传值，也需要预留位置
         * 第三个参数：配置选项，申明改actions不是当前模块的
         */
        dispatch("permissionStore/action_resetState", '', {root:true})
        // 这个其实可加可不加，有路由拦截可实现
        // resetRouter()
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}