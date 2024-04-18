// token
export const KEY_TOKEN = '__TOKEN'

// locale
export const KEY_LOCALE = '__LOCALE'

export const KEY_SETTING = '__APP_SETTING'

export const KEY_APP_DARK_MODE = '__APP_DARK_MODE__'

export const APP_THEME_STYLE_ID = '__APP_THEME_STYLE_VAR__'
export const Element_CssVar_Prefix = '--el-color-primary'

// sidebar 菜单折叠模式时宽度值
export const SIDE_BAR_COLLAPSED_WIDTH = 64
// 定宽模式下时的宽度设定值
export const APP_CONTENT_FIXED_WIDTH = 1200

export const LOCALE = {
    EN: 'en',
    ZH_CN: 'zh_CN',
}
export const LocaleList = [
    {
      label: '简体中文',
      value: LOCALE.ZH_CN,
    },
    {
      label: 'English',
      value: LOCALE.EN,
    },
]

export const THEME_ENUM = {
    DARK : 'dark',
    LIGHT : 'light',
}
export const ContentEnum = {
    FULL: 'full',
    FIXED: 'fixed',
}
export const RouterTransitionEnum = {
    FADE: 'fade',
    ZOOM_FADE: 'zoom-fade',
    ZOOM_OUT: 'zoom-out',
    FADE_SIDE: 'fade-slide',
    FADE_BOTTOM: 'fade-bottom',
    FADE_SCALE: 'fade-scale',
}
export const PermissionModeEnum = {
    /**
     * 角色模式
     * 在前端固定写死路由的权限，指定路由有哪些权限可以查看。
     * 只初始化通用的路由，需要权限才能访问的路由没有被加入路由表内。
     * 在登陆后或者其他方式获取用户角色后，通过角色去遍历路由表，获取该角色可以访问的路由表，生成路由表，
     * 再通过 router.addRoutes 添加到路由实例，实现权限的过滤。
     */
    ROLE: 'ROLE',
  
    /**
     * 后台动态模式，配合后端
     * 是通过接口动态生成路由表，且遵循一定的数据结构返回。前端根据需要处理该数据为可识别的结构，
     * 再通过 router.addRoutes 添加到路由实例，实现权限的动态生成。
     */
    BACK: 'BACK',
}

export const prefixCls = 'bks'
export const themeMode = THEME_ENUM.LIGHT

export const Color_White = '#fff'
export const Color_Black = '#000'
// 夜间模式下的mix color，如果覆写了element-plus中的值也需要一并修改这个值
/**
 * // Background
 * $bg-color: () !default;
 * $bg-color: map.merge(
 *  (
 *    'page': #0a0a0a,
 *    '': #141414, // 与该值关联
 *    'overlay': #1d1e1f,
 *  ),
 *  $bg-color
 * );
 */
export const DARK_MODE_MIX_COLOR = '#141414'

// sider background
export const SIDEBAR_BG_COLOR = '--sidebar-bg-color'
export const SIDEBAR_DARKEN_BG_COLOR = '--sidebar-darken-bg-color'
// header background
export const HEADER_BG_COLOR = '--header-bg-color'
export const HEADER_HOVER_BG_COLOR = '--header-hover-bg-color'

// app theme preset color
export const THEME_PRESET_COLOR_LIST = [
    '#467b96',
    '#316C72',
    '#1c8efe',
    '#0960bd',
    '#0084f4',
    '#009688',
    '#536dfe',
    '#ff5c93',
    '#ee4f12',
    '#0096c7',
    '#9c27b0',
    '#ff9800',
]
// sider preset color
export const SIDE_BAR_BG_COLOR_LIST = [
    '#212121',
    '#001529',
    '#273352',
    '#ffffff',
    '#191b24',
    '#191a23',
    '#304156',
    '#001628',
    '#28333E',
    '#344058',
    '#383f45',
]
// header preset color
export const HEADER_PRESET_BG_COLOR_LIST = [
    '#ffffff',
    '#151515',
    '#009688',
    '#5172DC',
    '#018ffb',
    '#409eff',
    '#e74c3c',
    '#24292e',
    '#394664',
    '#001529',
    '#383f45',
]
/**
 * 菜单类型
 */
export const MenuTypeEnum = {
    // 目录
    Catalogue: 0,
    // 菜单
    Menu: 1,
    // 权限
    Permission: 2,
}
/**
 * 菜单模式
 */
export const MenuModeEnum = {
    /**
     * 侧边栏模式
     */
    SIDEBAR: 'sidebar',
  
    /**
     * 顶部菜单模式
     */
    TOP_MENU: 'top_menu',
}
/**
 * 折叠菜单触发器位置
 */
export const MenuTriggerEnum = {
    /**
     * 不显示
     */
    NONE: 'none',
  
    /**
     * 底部
     */
    BOTTOM: 'bottom',
  
    /**
     * 顶部
     */
    TOP: 'top',
}

export const PageEnum = {
    Root: '/',
    Login: '/login',
    Dashboard: '/dashboard',
    NotFound: '/404',
    Forbidden: '/403',
    Account: '/account',
    Logout: '/logout',
    Error: '/error',
}

export const RoleEnum = {
    // 超级管理员
    ROOT: 0,
    // 运营
    OPERATE: 1,
}

export const DEFAULT_CONFIG = {
    id: 'id',
    children: 'children',
    pid: 'parentId',
}

export const SizeEnum = {
    XS : 'XS',
    SM : 'SM',
    MD : 'MD',
    LG : 'LG',
    XL : 'XL',
}
export const ScreenEnum = {
    XS : 480,
    SM : 768,
    MD : 992,
    LG : 1200,
    XL : 1920,
}
export const GetScreenMap = () => {
    let screenMap = new Map()
    screenMap.set(SizeEnum.XS, ScreenEnum.XS)
    screenMap.set(SizeEnum.SM, ScreenEnum.SM)
    screenMap.set(SizeEnum.MD, ScreenEnum.MD)
    screenMap.set(SizeEnum.LG, ScreenEnum.LG)
    screenMap.set(SizeEnum.XL, ScreenEnum.XL)
    return screenMap
}
export const LoadLocalePool = []
