// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入axios
import axios from 'axios'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入vuex的store实例
import store from './store'
// 引入全局axios拦截
import './axios-interceptor'
// 全局注册markdown插件mavonEditor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入路由权限拦截
import './permission'

Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(mavonEditor)
axios.defaults.withCredentials = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>',
    // 注册vuex状态管理
    store
})
