<template>
	<div class="gis-header">
		<h3>Welcome to my Blog</h3>
		<el-image
			style="width: 60px; height: 60px;"
			:src="user.avatar"
			fit="fit">
		</el-image>
		<div v-text="user.username"></div>
		<!--分割线-->
		<div class="gis-divider">
			<span><el-link :underline="false" href="/index">主页</el-link></span>
			<el-divider direction="vertical"></el-divider>
			<span><el-link :underline="false" type="success" href="/add">发表博客</el-link></span>
			<el-divider direction="vertical"></el-divider>
			<span v-show="!isLogin"><el-link :underline="false" type="primary" href="/login">登录</el-link></span>
			<span v-show="isLogin"><el-link :underline="false" type="danger" @click="onLogout()">退出</el-link></span>
		</div>
	</div>
</template>

<script>
import icon from '../assets/img/icon.svg'
import store from '../store'

export default {
	name: 'Header',
	data () {
		return {
			icon: icon,
			isLogin: false,
			user: {
				username: '请先登录',
				avatar: icon
			}
		}
	},
	methods: {
		onLogout () {
			// logout接口需要认证通过后才能访问，所以需要设置好header
			this.$http.get('/user/logout', {
				headers: {
					'Auth': localStorage.getItem('token')
				}
			}).then((resp) => {
				// console.log(resp.data)
				// 清除本地信息
				store.commit('REMOVE_INFO')
				// 清空表单
				this.loginForm = {}
				// 跳转路由至登录页面
				this.$router.push('/login')
			})
		}
	},
	created () {
		// 回显姓名
		// 查看保存数据更短的sessionStorage是否有值
		// 如果sessionStorage中值不存在，则显示登录按钮
		if (this.$store.state.userInfo) {
			this.user.username = this.$store.state.userInfo.username
			this.user.avatar = this.$store.state.userInfo.avatar
			// 有数据，说明已经登录
			this.isLogin = true
		}
	}
}
</script>

<style scoped>
	.gis-header {
		text-align: center;
	}

	.gis-divider {
		margin-top: 10px;
	}
</style>
