import axios from './axios'
// 是否领取红包
export const IsIndexPacket = (topic, page) => {
  return axios(
    'get',
    window.setting.HTTPAPI + 'pay/user/user-gold/is-gold-log'
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
// 领取红包
export const PacketAdd = (topic, page) => {
  return axios(
    'get',
    window.setting.HTTPAPI + '/pay/user/user-gold/add-gold', {
      type: '0'
    }
  ).then((res) => {
    res = res.data
    return Promise.resolve(res)
  })
}
