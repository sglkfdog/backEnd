
// 如果使用js格式的语言文件，要想在vscode中解析中文必须得有对应的 ts格式的语言文件
export default {
    test: "测试",
    common: {
      appName: "后台系统",
      http: {
        errorTip: "错误提示",
        requestFailed: "请求出错,请稍候重试!",
        requestTimeout: "接口请求超时,请刷新页面重试!",
        networkException: "网络异常，请检查您的网络连接是否正常!",
        errMsg401: "授权已失效!",
        errMsg403: "权限不足!",
        errMsg404: "网络请求错误,未找到该资源!",
        errMsg405: "网络请求错误,请求方法未允许!",
        errMsg408: "网络请求超时!",
        errMsg500: "服务器错误,请联系管理员!",
        errMsg503: "服务不可用，服务器暂时过载或维护!",
      },
      exception: {
        backHome: "返回首页",
        noDataTitle: "无数据",
        subTitle403: "抱歉，您无权访问此页面。",
        subTitle404: "抱歉，您访问的页面不存在。",
        subTitle500: "抱歉，服务器报告错误。",
        networkErrorTitle: "网络错误",
        networkErrorSubTitle: "抱歉，您的网络连接已断开，请检查您的网络！",
      },
      login: {
        oslink: "开源地址",
        signin: "登录",
        account: "用户名",
        passwd: "密码",
        captcha: "验证码",
      },
      basic: {
        warning: "警告",
        add: "新增",
        update: "更新",
        delete: "删除",
        query: "查询",
        save: "保存",
        reset: "重置",
        search: "搜索",
        operation: "操作",
        edit: "编辑",
        confirm: "确定",
        submit: "提交",
        sort: "排序",
        show: "显示",
        hidden: "隐藏",
        disabled: "禁用",
        enable: "启用",
        status: "状态",
        remark: "备注",
        ok: "好",
        cancel: "取消",
        close: "关闭",
        redo: "刷新",
        back: "返回",
        loading: "加载中...",
        male: "男",
        female: "女",
        secrecy: "保密",
      },
    },
    routes: {
      login: "登录",
      dashboard: "工作台",
      notfound: "无法找到此页面",
      redirect: "跳转中...",
      account: "个人中心",
    },
    layout: {
      setting: {
        clearCache: "清空缓存并返回登录",
        resetSuccess: "重置成功,需刷新生效",
        on: "开",
        off: "关",
        title: "项目配置",
        darkMode: "夜间模式",
        navMode: "导航模式",
        sysTheme: "系统主题",
        headerTheme: "顶栏主题",
        sidebarTheme: "菜单主题",
        interfaceFunction: "界面功能",
        interfaceDisplay: "界面显示",
        animation: "动画",
        menuTypeSidebar: "左侧菜单模式",
        menuTypeTop: "顶部菜单模式",
        topMenuTypeCenter: "居中",
        topMenuTypeLeft: "居左",
        topMenuTypeRight: "居右",
        contentModeFull: "流式",
        contentModeFixed: "定宽",
        menuTriggerNone: "不显示",
        menuTriggerBottom: "底部",
        menuTriggerTop: "顶部",
        menuCollapse: "折叠菜单",
        menuAccordion: "侧边菜单手风琴模式",
        fixedHeader: "固定顶栏",
        menuCollapseButton: "菜单折叠按钮",
        topMenuLayout: "顶部菜单布局",
        contentAreaWidth: "内容区域宽度",
        logo: "Logo",
        footer: "页脚",
        fullContent: "全屏内容",
        grayMode: "灰色模式",
        colorWeakMode: "色弱模式",
        progress: "顶栏进度条",
        switchAnimation: "切换动画",
        switchAnimationType: "切换动画类型",
      },
      header: {
        userDropdown: {
          accountSetting: "账号设置",
          logout: "退出系统",
        },
      },
    },
    icon: {
      placeholder: '点击选择图标',
      searchPlaceholder: '搜索图标',
    },
    doc: {
      "document": "使用文档",
      "depository": "前端仓库",
      "depository_01": "Go-Zero后端仓库",
      "depository_02": "Nestjs后端仓库",
    },
  };
  