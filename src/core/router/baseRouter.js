import { t } from 'core/locales/comLocale'
import { PageEnum } from "core/settings"
import { 
    toHump,
    NotFoundRouteName, 
    RedirectRouteName,
    ParentLayout, 
    ExceptionComponent, 
    LoginComponent,
    DashboardComponent,
    RedirectComponent,
} from "core/utils"
console.log("baseRouter")
export const NotFoundRoute = {
    path: '/:path(.*)*',
    name: NotFoundRouteName,
    component: ParentLayout,
    meta: {
        hidden: true,
    },
    children: [
        {
            path: '/:path(.*)*',
            name: NotFoundRouteName,
            component: ExceptionComponent,
            meta: {
              title: '404',
            },
        },
    ],
}
// const ProfileRoute = {
//   path: PageEnum.Account,
//   name: toHump(PageEnum.Account),
//   redirect: `${PageEnum.Account}/center`,
//   component: ParentLayout,
//   meta: {
//     hidden: true,
//   },
//   children: [
//     {
//       path: 'center',
//       name: toHump(`${PageEnum.Account}/center`),
//       component: () => import('/@/views/basic/account/Account.vue'),
//       meta: {
//         title: t('routes.account'),
//       },
//     },
//   ],
// }
const ExceptionRoute = {
    path: PageEnum.Error,
    name: toHump(PageEnum.Error),
    component: ParentLayout,
    redirect: `${PageEnum.Error}/404`,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '403',
        name: 'error403',
        component: ExceptionComponent,
        meta: {
          title: '403',
        },
        props: {
          status: 403,
        },
      },
      {
        path: '404',
        name: 'error404',
        component: ExceptionComponent,
        meta: {
          title: '404',
        },
        props: {
          status: 404,
        },
      },
      {
        path: '500',
        name: 'error500',
        component: ExceptionComponent,
        meta: {
          title: '500',
        },
        props: {
          status: 500,
        },
      },
    ],
}
export const LoginRoute = {
    path: PageEnum.Login,
    name: toHump(PageEnum.Login),
    component: LoginComponent,
    meta: {
      title: t('all.routes.login'),
      hidden: true,
    },
}
export const DashboardRoute = {
    path: PageEnum.Root,
    name: toHump(PageEnum.Dashboard),
    component: ParentLayout,
    redirect: PageEnum.Dashboard,
    meta: {
      single: true,
    },
    children: [
      {
        path: PageEnum.Dashboard,
        component: DashboardComponent,
        meta: {
          title: t('all.routes.dashboard'),
          // title: t('test'),
          icon: 'carbon:dashboard',
        },
      },
    ],
}
const RedirectRoute = {
    path: '/redirect',
    name: 'RedirectTo',
    component: ParentLayout,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        name: RedirectRouteName,
        component: RedirectComponent,
        meta: {
          title: t('all.routes.redirect'),
        },
      },
    ],
}
export const baseRoutes = [
    LoginRoute,
    RedirectRoute,
    DashboardRoute,
    // ProfileRoute,
    // ExceptionRoute,
    NotFoundRoute,
]
