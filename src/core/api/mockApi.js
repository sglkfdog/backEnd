export const mock_permissionMenus = {
    "menus": [
        {
            "id": 1,
            "parentId": 0,
            "name": "系统管理",
            "type": 0,
            "isShow": 1,
            "router": "/sys",
            "viewPath": "",
            "sort": 0,
            "icon": "carbon:settings",
            "activeRouter": ""
        },
        {
            "id": 2,
            "parentId": 1,
            "name": "用户管理",
            "type": 1,
            "isShow": 1,
            "router": "/sys/user",
            "viewPath": "views/system/user",
            "icon": "",
            "sort": 0,
            "activeRouter": ""
        },
        {
            "id": 3,
            "parentId": 1,
            "name": "菜单管理",
            "type": 1,
            "isShow": 1,
            "router": "/sys/menu",
            "viewPath": "views/system/menu",
            "icon": "",
            "sort": 0,
            "activeRouter": ""
        },
        {
            "id": 4,
            "parentId": 1,
            "name": "角色管理",
            "type": 1,
            "isShow": 1,
            "router": "/sys/role",
            "viewPath": "views/system/role",
            "icon": "",
            "sort": 0,
            "activeRouter": ""
        },
        {
            "id": 5,
            "parentId": 1,
            "name": "日志管理",
            "type": 1,
            "isShow": 1,
            "router": "/sys/log",
            "viewPath": "views/system/log",
            "icon": "",
            "sort": 0,
            "activeRouter": ""
        },
    ],
    "perms": [
        // "/sys/perm/menu/list",
        // "/sys/role/list",
        // "/sys/dept/list",
        // "/sys/dept/add",
        // "/sys/dept/delete",
        // "/sys/dept/update",
        // "/sys/job/page",
        // "/sys/job/add",
        // "/sys/job/delete",
        // "/sys/job/update",
        // "/sys/profession/page",
        // "/sys/profession/add",
        // "/sys/profession/delete",
        // "/sys/profession/update",
        // "/sys/user/page",
        // "/config/dict/list",
        // "/config/dict/data/page",
        // "/log/login/page"
    ]
}
export const mock_userInfo = {
    "username": "demo",
    "avatar": "https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Sunglasses&facialHairType=Blank&clotheType=Hoodie&clotheColor=Heather&eyeType=Hearts&eyebrowType=UpDown&mouthType=Tongue&skinColor=DarkBrown"
}