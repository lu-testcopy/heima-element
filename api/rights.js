import request from '../request/request'
export const getgetRightsList = (list) => {
    return request({
        method: 'get',
        url: `rights/${list}`
    })
}
export const getRolesList = () => {
    return request ({
        method: 'get',
        url: '/roles'
    })
}
// 添加角色的接口函数
export const addRoles = (data) => {
    return request ({
        method: 'post',
        url: '/roles',
        data
    })
}
// 根据角色的id查询角色的资料
export const editRolesInfo = (roleId) => {
    return request ({
        method: 'get',
        url: `/roles/${roleId}`
    })
}
// 提交更改角色的接口函数
export const submitEditRole = (roleId,data) => {
    return request ({
       method: 'put',
       url: `roles/${roleId}`,
       data
    })
}
// 删除角色的接口函数
export const removeRole = (roleId) => {
    return request ({
      method: 'delete',
      url: `roles/${roleId}`
    })
}
// 删除指定权限的接口函数
export const removeRights = (roleId,rightId) => {
    return request ({
        method: 'delete',
        url: `roles/${roleId}/rights/${rightId}`
    })
}
// 为角色分配权限的接口函数
export const allotRights = (roleId, data) => {
    return request ({
        method: 'post',
        url: `roles/${roleId}/rights`,
        data
    })
}