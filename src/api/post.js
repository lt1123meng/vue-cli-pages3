import axios from './axios'
// 帖子列表
export const PostList = (topic, page, size = 10) => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'quan/post/post-list',
    {
      page_index: page,
      page_size: size,
      topic_id: topic
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
