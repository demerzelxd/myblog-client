import axios from 'axios'
import Vue from 'vue'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:8081'

// 前置拦截，拦截request请求
axios.interceptors.request.use(req => {
	return req
})

const duration = 1000
// 后置拦截，拦截response响应
axios.interceptors.response.use(resp => {
	if (resp.data.code === 200) {
		// 不能使用this，因为axios.js是挂靠在main.js的，没有this
		// 因为之前Vue.use(ElementUI)，所以可以使用Vue的原型来调用
		Vue.prototype.$message.success({
			message: resp.data.msg,
			duration: duration
		})
		return resp
	} else {
		// 不能使用this，因为axios.js是挂靠在main.js的，没有this
		// this.$message.error(resp.data.msg)

		// 使用Vue的原型来调用
		Vue.prototype.$message.error({
			message: resp.data.msg,
			duration: duration
		})
		// 认证失败
		if (resp.data.code === 401) {
			// 清除本地信息
			store.commit('REMOVE_INFO')
			// 路由至登录页面，如果当前页就是登录页面，则不需要重复跳转
			if (router.currentRoute.path !== '/login') {
				router.push('/login').then()
			}
		}
		// 不执行后续操作
		return Promise.reject(resp.data.msg)
	}
})
