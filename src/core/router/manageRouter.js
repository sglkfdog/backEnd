// import AppLayout from '@/layout/AppLayout.vue'
// import { RouterView } from 'vue-router'
// import { lang as t } from "@/lang/index"
// import { 
//   home_path,
//   nft_path,
//   nft_addSeries_path,
//   nft_add_path,
//   nft_list_path,
//   nft_detail_path,
//   nft_coins_path,
//   user_path,
//   user_wallet_path,
//   pool_path,
//   log_path,
//   integral_path,
// } from "@/utils/routerPath"
// console.log("home_path=", home_path)
// // 管理端
// const manageRouter = {
//   path: '/manage',
//   component: AppLayout,
//   children: [
//     // {
//     //   path: '/',
//     //   name: 'home',
//     //   component: () => import('@/views/index/index.vue'),
//     //   meta: { title: t('t_000075'), icon: 'img-icon-overview' }
//     // },
//     // {
//     //   path: '/poc-admin/',
//     //   name: 'home',
//     //   component: () => import('@/views/index/index.vue'),
//     //   meta: { title: t('t_000075'), icon: 'img-icon-overview' }
//     // },
//     {
//       // path: '/poc-admin',
//       path: home_path,
//       name: 'home',
//       // hidden: true,
//       component: () => import('@/views/index/index.vue'),
//       meta: { title: t('t_000075'), icon: 'img-icon-overview', hidden: true }
//     },
//     {
//       // path: '/nft',
//       path: nft_path,
//       name: 'nft',
//       component: RouterView,
//       meta: { title: t('t_000076'), icon: 'img-icon-nft' },
//       children: [
//         // {
//         //   path:'/nft/series',
//         //   name:'创建作品系列',
//         //   component:()=>import('@/views/NFT/WorksSeries.vue'),
//         // },
//         {
//           // path: '/nft/addSeries',
//           path: nft_addSeries_path,
//           name: 'nftAddSeries',
//           meta: { title: t('t_000077'), icon: '' },
//           component: () => import('@/views/NFT/addSeries.vue'),
//         },
//         {
//           // path: '/nft/add',
//           path: nft_add_path,
//           name: 'nftAdd',
//           meta: { title: t('t_000078'), icon: '' },
//           component: () => import('@/views/NFT/add.vue'),
//         },
//         {
//           // path: '/nft/list',
//           path: nft_list_path,
//           name: 'nftList',
//           meta: { title: t('t_000079'), icon: '' },
//           component: () => import('@/views/NFT/list.vue'),
//         },
//         {
//           // path: '/nft/detail',
//           path: nft_detail_path,
//           name: 'nftDetail',
//           meta: { title: '', icon: '' },
//           component: () => import('@/views/NFT/detail.vue'),
//           hidden: true
//         },
//         {
//           // path: '/nft/coins',
//           path: nft_coins_path,
//           name: 'nftCoins',
//           meta: { title: '', icon: '' },
//           component: () => import('@/views/NFT/coins.vue'),
//           hidden: true
//         },
//       ]
//     },
//     {
//       // path: '/user',
//       path: user_path,
//       name: 'user',
//       component: RouterView,
//       meta: { title: t('t_000080'), icon: 'img-icon-users' },
//       children: [
//         {
//           // path: '/user/wallet',
//           path: user_wallet_path,
//           name: 'userWallet',
//           meta: { title: t('t_000081'), icon: '' },
//           component: () => import('@/views/UserManagement/wallet.vue'),
//         }
//       ]
//     },
//     {
//       // path: '/pool',
//       path: pool_path,
//       name: 'pool',
//       meta: { title: t('t_000082'), icon: 'img-icon-gas-pool' },
//       component: () => import('@/views/GasPool/GasPool.vue'),
//     },
//     {
//       // path: '/log',
//       path: log_path,
//       name: 'log',
//       meta: { title: t('t_000083'), icon: 'img-icon-admin' },
//       component: () => import('@/views/Journal/Journal.vue'),
//     },
//     {
//       // path: '/integral',
//       path: integral_path,
//       name: 'integral',
//       meta: { title: t('t_000084'), icon: 'img-icon-switch' },
//       component: () => import('@/views/Integral/Integral.vue'),
//     },
//     // {
//     //   path: '/lian',
//     //   name: 'lian',
//     //   meta: { title: t('t_0000123'), icon: 'Connection' },
//     //   component: () => import('@/views/Lian/index.vue'),
//     // },
//   ]
// }

// export default manageRouter