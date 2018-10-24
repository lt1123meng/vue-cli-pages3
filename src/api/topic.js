import axios from './axios'
// 话题列表
export const TopicList = (type) => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/topic/index',
    {
      type: type,
      status: 0
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
