import axios from './axios'
// 首页banner
export const IndexBanner = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'system/config/banner',
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
    window.setting.HTTPAPIMobile + 'quan/notice/main',
    {
      type: 'center'
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 首页热门消息
export const IndexNotice = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/cms/index',
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
    window.setting.HTTPAPIMobile + 'quan/post/first-post'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 未读数
export const IndexDurianList = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/post/first-post',
    {
      type: h5_user
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}

