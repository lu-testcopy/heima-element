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