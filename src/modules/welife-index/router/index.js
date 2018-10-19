import Vue from 'vue'
import Router from 'vue-router'

const Index = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/index/index.vue'], () => {
    resolve(require('../pages/index/index.vue'))
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        active: 'index'
      },
      component: Index
    }
  ]
})
