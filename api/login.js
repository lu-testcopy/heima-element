import request from '../request/request'
export const getUserInfo = (data) =>{
  return request({
      method: 'post',
      url:'/login',
      data
  })
}