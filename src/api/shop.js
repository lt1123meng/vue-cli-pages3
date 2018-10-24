import axios from './axios'
// 商铺筛选类型条件
export const ShopChooseType = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/shop/type-list'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// ad  最近入住
export const ShopAD = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/notice/shop'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 商铺列表
export const ShopList = (params) => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/shop/list', params
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
