import Vue from 'vue'
import Router from 'vue-router'

const City = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/city/city.vue'], () => {
    resolve(require('../pages/city/city.vue'))
  })
}
const Index = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/index/index.vue'], () => {
    resolve(require('../pages/index/index.vue'))
  })
}
const Durian = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/durian/index.vue'], () => {
    resolve(require('../pages/durian/index.vue'))
  })
}
const Shop = resolve => {
  // require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
  // （代码分块）
  require.ensure(['../pages/shop/index.vue'], () => {
    resolve(require('../pages/shop/index.vue'))
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
      component: Index,
      children: [{
        path: 'city',
        name: 'city',
        component: City
      }]
    },
    {
      path: '/durian',
      name: 'durian',
      meta: {
        active: 'durian'
      },
      component: Durian
    },
    {
      path: '/shop',
      name: 'shop',
      meta: {
        active: 'shop'
      },
      component: Shop,
      children: [{
        path: 'city',
        name: 'city',
        component: City
      }]
    }
  ]
})
