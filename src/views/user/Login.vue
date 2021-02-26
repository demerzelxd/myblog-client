<template>
	<div>
		<el-container>
			<el-header>
				<el-image
					style="width: 60px; height: 60px;"
					:src="icon"
					fit="fit">
				</el-image>
				<el-button type="primary" icon="el-icon-s-operation" circle style="float: right;margin-top: 10px" @click="switchForm()"></el-button>
			</el-header>
			<el-main>
				<!--zoom-in动画-->
				<transition-group name="el-zoom-in-center">
					<!--登录表单-->
					<div key="login" v-show="isLoginFormShow" class="transition-box">
						<el-form :rules="rules" status-icon ref="loginForm" :model="loginForm" label-width="80px" label-suffix=":" class="gis-form">
							<el-form-item label="用户名" prop="username">
								<el-col>
									<el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
								</el-col>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-col>
									<!--type=password可以隐藏密码-->
									<el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onLogin('loginForm')">登录</el-button>
								<el-button @click="onReset('loginForm')">重置</el-button>
							</el-form-item>
						</el-form>
					</div>
					<!--注册表单-->
					<div key="logon" v-show="isLogonFormShow" class="transition-box">
						<el-form :rules="rules" status-icon ref="logonForm" :model="logonForm" label-width="80px" label-suffix=":" class="gis-form">
							<el-form-item label="用户名" prop="username">
								<el-col>
									<el-input v-model="logonForm.username" placeholder="请输入用户名"></el-input>
								</el-col>
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-col>
									<!--type=password可以隐藏密码-->
									<el-input type="password" v-model="logonForm.password" placeholder="请输入密码"></el-input>
								</el-col>
							</el-form-item>
							<el-form-item label="邮箱" prop="email">
								<el-col>
									<!--type=password可以隐藏密码-->
									<el-input v-model="logonForm.email" placeholder="请输入邮箱"></el-input>
								</el-col>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="onLogon('logonForm')">注册</el-button>
								<el-button @click="onReset('logonForm')">重置</el-button>
							</el-form-item>
						</el-form>
					</div>
				</transition-group>
			</el-main>
		</el-container>
	</div>
</template>
<script>
// 引入icon
import icon from '../../assets/img/icon.svg'

export default {
	name: 'Login',
	data () {
		// 自定义邮箱校验
		const emailValidator = (rule, value, callback) => {
			if (!value || value === '') {
				callback(new Error('请输入邮箱'))
			} else {
				// 符合邮箱的正则表达式，来自AnyRule插件
				const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				if (!emailReg.test(value)) {
					callback(new Error('邮箱格式错误'))
				}
				callback()
			}
		}
		return {
			icon: icon,
			isLoginFormShow: true,
			isLogonFormShow: false,
			timer: null,
			loginForm: {
				username: '',
				password: ''
			},
			logonForm: {
				username: '',
				password: '',
				email: ''
			},
			rules: {
				username: [
					{required: true, message: '请输入用户名', trigger: 'blur'},
					{min: 4, max: 64, message: '长度应在 4 到 64 个字符', trigger: 'blur'}
				],
				password: [
					{required: true, message: '请输入密码', trigger: 'blur'},
					{min: 4, max: 64, message: '长度应在 4 到 64 个字符', trigger: 'blur'}
				],
				email: [
					// 自定义邮箱格式校验
					{required: true, message: '请输入邮箱', trigger: 'blur'},
					{validator: emailValidator, trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		// 在登录与注册表单间切换
		switchForm () {
			// 清除延迟执行
			clearTimeout(this.timer)
			// 若当前为登录框
			if (this.isLoginFormShow === true && this.isLogonFormShow === false) {
				this.isLoginFormShow = false
				// 设置延迟执行
				this.timer = setTimeout(() => {
					this.isLogonFormShow = true
				}, 350)
			}
			// 若当前为注册框
			if (this.isLoginFormShow === false && this.isLogonFormShow === true) {
				this.isLogonFormShow = false
				// 设置延迟执行
				this.timer = setTimeout(() => {
					this.isLoginFormShow = true
				}, 350)
			}
		},
		// 发送登录请求
		onLogin (formName) {
			// 判定表单内容是否符合规范
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 验证通过才发送请求提交
					this.$http.post('/user/login', this.loginForm).then((resp) => {
						// console.log(resp.headers)
						// console.log(resp.data)
						// 获取返回的header头信息
						const token = resp.headers['auth']
						const userInfo = resp.data.data
						// 存入vuex
						this.$store.commit('SET_TOKEN', token)
						this.$store.commit('SET_USER_INFO', userInfo)
						// 清空表单
						this.loginForm = {}
						// 跳转路由
						this.$router.push('/index')
					})
				} else {
					this.$message.error('当前输入的用户名或密码不合法')
					return false
				}
			})
		},
		// 发送注册请求
		onLogon (formName) {
			// 判定表单内容是否符合规范
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 验证通过才发送请求提交
					this.$http.post('/user/logon', this.logonForm).then((resp) => {
						// console.log(resp.data)
						// 清空表单
						this.logonForm = {}
						// 注册成功则切换至登录
						this.switchForm()
						// 回显信息
						this.loginForm.username = resp.data.data.username
					})
				} else {
					this.$message.error('当前输入的用户名、密码或邮箱不合法')
					return false
				}
			})
		},
		// 重置表单
		onReset (formName) {
			this.$refs[formName].resetFields()
		}
	}
}
</script>

<style scoped>
.el-header {
	background-color: #B3C0D1;
	color: #333;
	text-align: center;
	line-height: 60px;
}

.el-main {
	/*background-color: #E9EEF3;*/
	color: #333;
	text-align: center;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: 40px;
}

/*动画样式*/
.transition-box {
	border-radius: 4px;
	text-align: center;
	color: #fff;
	padding: 40px 20px;
	box-sizing: border-box;
}

/*表单样式*/
.gis-form {
	max-width: 500px;
	/*居中*/
	margin: 0 auto;
}
</style>
