import request from "../request/request"
// 获取订单列表的接口函数
export const getOrderList = (params) => {
  return request ({
    method: 'get',
    url: '/orders',
    params
  })
}
// 获取物流信息的接口函数
export const showInfo = () => {
  return request ({
    method: 'get',
    url: '/kuaidi/804909574412544580'
  })
}