// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.common'
import {createRouter} from './router'
import '../../stylus/reset.styl'

Vue.config.productionTip = false
console.log('createApp--outer')

// eslint-disable-next-line
export function createApp(context) {
  const router = createRouter()
  const app = new Vue({
    router,
    template: '<div>1111111111</div>'
  })
  return app
}
