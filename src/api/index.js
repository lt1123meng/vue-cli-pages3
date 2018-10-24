import axios from './axios'
// 首页banner
// let window = window
console.log(window)
export const IndexBanner = () => {
  console.log(window)
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
