import Vue from 'vue'
import Router from 'vue-router'

const hello = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/hello.vue'], () => {
    resolve(require('../pages/hello.vue'))
  })
}
const error = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/error.vue'], () => {
    resolve(require('../pages/error.vue'))
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: hello
    },
    {
      path: '/error',
      name: 'error',
      component: error
    }
  ]
})
