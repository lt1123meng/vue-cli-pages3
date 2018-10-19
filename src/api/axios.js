import axios from 'axios'

export default (method, url, params = {}, config = {}) => {
  method = method.toLowerCase()
  let check = {}
  let param = {
    ...config
  }
  if (window.setting.HTTPURL === 'https://test1.ukwelife.com/') {
    check._skip_origin_check = 1
  }
  if (sessionStorage.token) {
    check.token = sessionStorage.token
  }
  if (method === 'get') {
    param.params = {
      ...params,
      ...check
    }
  } else {
    param.data = {
      ...params,
      ...check
    }
  }
  return axios({
    method: method,
    url: url,
    ...param
  })
}
