import request from '../request/request'
// 获取商品数据的接口函数 
export const getGoodsData = (params) => {
    return request ({
       method: 'get',
       url: '/goods',
       params
    })
}
// 获取商品分类的接口函数
export const getGoodsSorts = (params) =>{
    return request ({
       method: 'get',
       url: '/categories',
       params
    })
}
// 获取参数的接口函数
export const getCategories = (id, sel) => {
    return request ({
        method: 'get',
        url: `/categories/${id}/attributes`,
        params: {
            sel: sel
        }
    })
}
// 添加商品参数的接口函数
export const addGoodsParams = (data) => {
    return request ({
        method: 'post',
        url: `categories/${data.id}/attributes`,
        data
    })
}
// 查询参数的接口函数
export const inquireParams = (id, attrId, params) => {
    return request ({
        method: 'get',
        url: `categories/${id}/attributes/${attrId}`,
        params
    })
}
// 编辑提交参数的接口函数
export const editParamsInfo = (id, attrId, data) => {
    return request ({
        method: 'put',
        url: `categories/${id}/attributes/${attrId}`,
        data
    })
}
// 查询单个商品详情的接口函数
export const inquireGoodsInfo = (id) => {
    return request ({
        method: 'get',
        url: `goods/${id}`,
    })
}
// 添加商品分类的接口函数
export const addGoodsCategory = (data) => {
    return request ({
        method: 'post',
        url: '/categories',
        data
    })
}
// 查询单个商品分类的接口函数
export const inquireCategory = (catId) => {
  return request ({
    method: 'get',
    url: `categories/${catId}`
  })
}
// 提交编辑的分类
export const submitEditCategory = (catId, data) => {
  return request ({
    method: 'put',
    url: `categories/${catId}`,
    data
  })
}
// 删除分类的接口函数
export const removeCategory = (catId) => {
    return request ({
      method: 'delete',
      url: `categories/${catId}`  
    })
}
// 添加商品的接口函数
export const addGoods = (data) => {
    return request ({
      method: 'post',
      url: 'goods',
      data
    })
}