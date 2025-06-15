import '@/style/index.scss'
import { VueQueryPlugin } from '@tanstack/vue-query'
import 'uno.css'
import { createSSRApp } from 'vue'

import App from './App.vue'
import { prototypeInterceptor, requestInterceptor, routeInterceptor } from './interceptors'
import store from './store'

import devTools from './devTools/index.js'
import devToolsConfig from './devTools/config.js'
import mpDevBubble from './devTools/core/components/mpDevBubble.vue'
import devToolsVueMixin from './devTools/core/proxy/vueMixin.js'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(routeInterceptor)
  app.use(requestInterceptor)
  app.use(prototypeInterceptor)
  app.use(VueQueryPlugin)
  //混入DevTools生命周期监听
  app.mixin(devToolsVueMixin)

  //挂载Devtools
  app.use(devTools, devToolsConfig)

  //注册小程序端专用的拖动浮标组件
  app.component('mpDevBubble', mpDevBubble)

  return {
    app,
  }
}
