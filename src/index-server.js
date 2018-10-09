import {createApp} from './index-server-app'

export default context => {
  console.log('------context---------')
  console.log(context)
  return new Promise((resolve, reject) => {
    const app = createApp()
    console.log(app)
    console.log(app.$router)
    console.log(app.router)
    // 更改路由
    app.$router.push('/')

    // 获取相应路由下的组件
    const matchedComponents = app.$router.getMatchedComponents()

    // 如果没有组件，说明该路由不存在，报错404
    if (!matchedComponents.length) {
      // eslint-disable-next-line
      return reject({code: 404})
    }
    resolve(app)
  })
}
