// import http from "core/api/http";
// let custom = {
//   noNeedToken: true
// }
const state = () => ({
    routes: [],
})
const getters = {}
const mutations = {
    set_routes (state, data) {
        state.routes = data
    },
    
}
const actions = {
    action_getTest({state, dispatch, commit}, params) {
        // http.post(
        //     url, 
        //     body, 
        //     {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }
        // )
        // http.post('api/sysuser/sysLogin', params)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}