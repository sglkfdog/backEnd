export const mock_api_roles = {
    "req": {
        "limit": 10,
        "page": 1
    },
    "code": 200,
    "msg": "OK",
    "data": {
        "list": [
            {
                "id": 1,
                "name": "超级管理员",
                "remark": "超级管理员",
                "status": 1,
                "createTime": 1705993277,
                "updateTime": 1705993277,
                "permission_ids": "12,13,14,11,1,2,16,15,4,5,6,3,8,9,10,7",
                "permission_names": "删除菜单,更新菜单,日志管理,新增菜单,系统管理,用户管理,多语言,操作角色,删除用户,更新用户,角色管理,新增用户,删除角色,更新角色,菜单管理,新增角色"
            },
            {
                "id": 2,
                "name": "demo",
                "remark": "demo",
                "status": 1,
                "createTime": 1705993277,
                "updateTime": 1705993277,
                "permission_ids": "14,6,0,1,2",
                "permission_names": "日志管理,角色管理,系统管理,用户管理"
            },
            {
                "id": 3,
                "name": "test",
                "remark": "test",
                "status": 1,
                "createTime": 1708345655,
                "updateTime": 1708345655,
                "permission_ids": "2,1",
                "permission_names": "用户管理,系统管理"
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 10,
            "total": 3,
            "totalPage": 1
        }
    }
}

export const mock_api_role = {
    
}