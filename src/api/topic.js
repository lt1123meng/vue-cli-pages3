import axios from './axios'
// 话题列表
export const TopicList = () => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/topic/index',
    {
      type: 2,
      status: 0
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
