// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建store对象
const store = new Vuex.Store({
    // state属性用来全局管理共享数据
    state: {},
    // mutations用来书写对共享数据的修改方法
    mutations: {},
    // getters用来对共享数据计算属性，相当于computed
    getters: {
    }
})
// 暴露store对象
export default store
