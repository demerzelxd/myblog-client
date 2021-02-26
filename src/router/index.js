import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/user/Login'
import BlogDetail from '../views/blog/BlogDetail'
import BlogEdit from '../views/blog/BlogEdit'
import Blogs from '../views/blog/Blogs'

Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', redirect: '/index'},
        {path: '/index', component: Blogs},
        {path: '/login', component: Login},
        {path: '/add', component: BlogEdit, meta: {requireAuth: true}},
        // 详情页面url类似于/blog/1
        {path: '/blog/:blogId', name: 'BlogDetail', component: BlogDetail},
        // 编辑页面url类似于/edit/1
        {path: '/edit/:blogId', component: BlogEdit, meta: {requireAuth: true}}
    ],
    // 去除#，把Router的mode修改为history模式，VueRouter默认的模式为hash模式
    // 加上#后访问别的路由不会刷新页面，换成history后切换路由需要刷新
    mode: 'history'
})
