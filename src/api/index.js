import axios from './axios'
import AXIOS from 'axios'
// 分享
export const Share = () => {
  return AXIOS({
      url: window.setting.HTTPAPI + 'quan/user/share-post-num',
      method: 'get',
      params: {
        token: sessionStorage.token
      },
      responseType: 'json'
    }
  )
}
// 获取城市列表
export const City = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'center/city/list',
    {
      by_letter: 1,
      for_quan_shop: 1
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 首页banner
export const IndexBanner = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'system/config/banner',
    {
      type: 'center'
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 首页广播消息
export const IndexNotice = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/notice/main',
    {
      type: 'center'
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 首页热门消息
export const IndexHot = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/cms/index',
    {
      page: 1,
      'per-page': 6
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 首页榴莲圈
export const IndexDurianList = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/post/first-post'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 未读数
export const IndexUnreadNumber = () => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'system/push/unread-number',
    {
      type: 'h5_user'
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
