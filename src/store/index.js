// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
    // state属性用来全局管理共享数据
    state: {
        // 存储token信息
        // 初始化的时候直接存localStorage获取
        token: localStorage.getItem('token'),
        // 初始化的时候直接存sessionStorage获取
        userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
    },
    // mutations用来书写对共享数据的修改方法
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            // 放入localStorage里面，这样浏览器关闭后也能获取到，保存的久
            localStorage.setItem('token', token)
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo
            // 放入sessionStorage里面，浏览器关闭后不能获取，需要重发token获取userInfo
            // 里面不能存对象，只能存字符串，需要序列化
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem('token', '')
            sessionStorage.setItem('userInfo', '')
        }
    },
    // getters用来对共享数据计算属性，相当于computed
    getters: {}
})
// 暴露store对象
export default store
