import { IFrameLayout, ParentLayout, importComponentFun } from 'core/utils'

// export const roleRoutes = [
//     {
//         path: '/docs',
//         name: 'docs',
//         component: ParentLayout,
//         meta: {
//           single: true,
//         },
//         children: [
//           {
//             path: '/docs/typeorm',
//             name: 'docstypeorm',
//             component: IFrameLayout,
//             meta: {
//               title: '官方文档(内嵌)',
//               icon: 'carbon:application-web',
//               iframeSrc: 'https://docs.arklnk.com/',
//             },
//           },
//         ],
//     },
// ]

export const roleRoutes = [
  {
    component: ParentLayout,
    "name": "/system",
    "path": "/system",
    "meta": {
        "title": "系统管理",
        "icon": "carbon:settings",
        "hidden": false
    },
    "children": [
        {
          // component: importComponentFun('/system/user'),
          component: import('@/views/system/user.vue'),
          "path": "/system/user",
          "name": "/system/user",
          "meta": {
              "title": "用户管理",
              "icon": "",
              "hidden": false
          }
        },
        {
          // component: importComponentFun('/system/role'),
          component: import('@/views/system/role.vue'),
          "path": "/system/role",
          "name": "/system/role",
          "meta": {
              "title": "角色管理",
              "icon": "",
              "hidden": false
          }
        },
        {
          // component: importComponentFun('/system/menu'),
          component: import('@/views/system/menu.vue'),
          "path": "/system/menu",
          "name": "/system/menu",
          "meta": {
              "title": "菜单管理",
              "icon": "",
              "hidden": false
          }
        },
        {
          // component: importComponentFun('/system/translate'),
          component: import('@/views/system/translate.vue'),
          "path": "/system/translate",
          "name": "/system/translate",
          "meta": {
              "title": "多语言",
              "icon": "carbon:settings",
              "hidden": true
          }
        }
    ],
    "redirect": "/system/user"
  },
  {
    component: ParentLayout,
    "name": "/logs",
    "path": "/logs",
    "meta": {
        "title": "日志管理",
        "icon": "",
        "hidden": false
    },
    "children": []
  }
]
