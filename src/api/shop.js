import axios from './axios'
// 商铺筛选类型条件
export const ShopChooseType = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/shop/type-list'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// ad  最近入住
export const ShopAD = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/notice/shop'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 商铺列表
export const ShopList = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/shop/list', {
      page: 1,
      page_size: 10,
      city_id: 0,
      type_id: '',
      sort: 'last',
      keywords: ''
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
