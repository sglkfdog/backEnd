import { createRouter, createWebHistory } from 'vue-router'
import store from 'core/store'
import { base } from './baseRouter'
// import { page } from './page'
// import { login_path, lian_path } from "@/utils/routerPath"

import clientRouter from './clientRouter'
import manageRouter from './manageRouter'
/**
 * 1. 因为我们分了客户端和管理端两部分，只有管理端需要有Layout导航 所以如下router管理分开了。
 */

// const routes = [...base, ...page]
const routes = [
  // 管理端
  // manageRouter, 
  // 客户端
  // clientRouter,
  // 基础
  ...base
]
// const router = createRouter({
//   history: createWebHistory(import.meta.env.BASE_URL),
//   routes,
//   scrollBehavior () {
//     return {
//       el: '#app',
//       top: 0,
//       behavior: 'smooth'
//     }
//   }
// })
const router = createRouter({
  // 路由模式
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory(),
  routes,
})
console.log("routes=", routes)
// 
router.beforeEach((to, from, next) => {
  // console.log("store.state.base.token", store.state.base.token)
  // console.log("to, from", to, from)
  // if (!store.state.base.token && (to.fullPath != '/login' && to.fullPath != '/lian')) {
  // if (!store.state.base.token && (to.fullPath != login_path && to.fullPath != lian_path)) {
  //   // next('/login')
  //   next(login_path)
  // } else {
  //   next()
  // }
  next()
})
export const setupRouter = () => {
  app.use(router)
}
export default router
