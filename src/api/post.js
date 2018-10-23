import axios from './axios'
// 帖子列表
export const PostList = (page) => {
  return axios(
    'get',
    window.setting.HTTPAPIMobile + 'quan/post/post-lis',
    {
      page_index: page,
      page_size: 10,
      topic_id: -1
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
