import request from '../request/request'
export const getUser = (params) => {
    return request({
        method: 'get',
        url:'/users',
        params
    })
}
export const addUserInfo = (data) => {
    return request ({
        method: 'post',
        url: '/users',
        data
    })
}
export const getEditUserInfo = (id) => {
    return request ({
        method: 'get',
        url: `/users/${id}`
    })
}
// 提交用户的编辑信息
export const submitEditInfo = (userId,data) => {
    return request ({
        method: 'put',
        url: `/users/${userId}`,
        data
    })
}
// 删除用户的接口函数
export const removeUser = (id) => {
    return request ({
      method: 'delete',
      url: `/users/${id}`
    })
}
// 分配用户角色执行的接口函数
export const allotNewRights = (id,data) => {
    return request ({
        method: 'put',
        url: `users/${id}/role`,
        data
    })
}