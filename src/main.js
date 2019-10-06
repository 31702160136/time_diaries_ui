// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入自定义cookie
import {cookie} from '@/utils/Cookie.js'
Vue.prototype.$cookie=cookie;
//引入自定义tools工具
import {tools} from '@/utils/tools.js'
Vue.prototype.$tools=tools;
//引入api
import {http} from '@/api/shop.js'
Vue.prototype.$http=http;
import "@/css/main.css"

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
