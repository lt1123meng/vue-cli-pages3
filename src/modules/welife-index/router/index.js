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

var router = new Router({
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

// eslint-disable-next-line
var _hmt = _hmt || [];
window._hmt = _hmt;
(function () {
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?d5d880030e9f2372e858ac553e4dd015'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
router.afterEach((to, from) => {
  router.app.$children[0].follow = false
  // 统计代码
  // _hmt.push(['_trackPageview', pageURL]) 必须是以"/"（斜杠）开头的相对路径
  if (to.path) window._hmt.push(['_trackPageview', '/#' + to.fullPath])
  var bp = document.createElement('script')
  var curProtocol = window.location.protocol.split(':')[0]
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js'
  } else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js'
  }
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(bp, s)
})
export default router
