import axios from './axios'
// 帖子列表
export const PostList = (topic, page) => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/post/post-list',
    {
      page_index: page,
      page_size: 10,
      topic_id: topic
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
