import { 
    THEME_PRESET_COLOR_LIST,
    LOCALE, 
    THEME_ENUM, 
    ContentEnum,
    HEADER_PRESET_BG_COLOR_LIST, 
    SIDE_BAR_BG_COLOR_LIST, 
    MenuModeEnum,
    MenuTriggerEnum, 
    RouterTransitionEnum,
    PermissionModeEnum,
} from "./constantSetting"

export const projectSetting = {
    // 是否使用 MOCK api
    isMockApi: true,
    grayMode: false,
    // 是否开启灰度模式
    grayMode: false,
    // 是否开启色弱模式
    colorWeak: false,
    showBreadCrumb: true,
    showFooter: false,
    showLogo: true,
    showSettingButton: true,
    fullContent: false,
    useOpenBackTop: true,
    showDarkModeToggle: true,
    themeColor: THEME_PRESET_COLOR_LIST[0],
    contentMode: ContentEnum.FULL,
    openKeepAlive: true,

    // 权限路由配置：Back模式为后端动态生成，Role模式为纯前端
    permissionMode: PermissionModeEnum.BACK,
    // permissionMode: PermissionModeEnum.ROLE,
    removeAllHttpPending: false,

    // showPicker: false,
    // locale: LOCALE.ZH_CN,
    // fallback: LOCALE.ZH_CN,
    // availableLocales: [LOCALE.EN, LOCALE.ZH_CN],
    localeSetting: {
        showPicker: true, // 显示多语言设置
        locale: LOCALE.ZH_CN, // 设置当前语言
        fallback: LOCALE.ZH_CN,
        availableLocales: [LOCALE.EN, LOCALE.ZH_CN]
    },
    menuSetting: {
        collapsed: false,
        uniqueOpened: false,
        menuWidth: 256,
        bgColor: SIDE_BAR_BG_COLOR_LIST[0],
        theme: THEME_ENUM.DARK,
        menuMode: MenuModeEnum.SIDEBAR,
        topMenuAlign: 'flex-start',
        // 折叠菜单按钮的显示位置
        trigger: MenuTriggerEnum.TOP,
    },
    headerSetting: {
        fixed: true,
        bgColor: HEADER_PRESET_BG_COLOR_LIST[0],
        theme: THEME_ENUM.LIGHT,
        showFullScreen: true,
    },
    elementUISetting: {
        size: 'default',
        zIndex: 2000,
        button: {
            autoInsertSpace: true,
        },
        message: {
            max: 5,
        },
    },
    transitionSetting: {
        enable: true,
        enableNProgress: true,
        routerTransition: RouterTransitionEnum.FADE,
    },
}