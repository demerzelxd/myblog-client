<template>
	<div>
		<Header></Header>
		<el-form :model="blogForm" :rules="rules" ref="blogForm" label-width="100px" class="gis-editFrom">
			<el-form-item label="标题" prop="title">
				<el-input v-model="blogForm.title"></el-input>
			</el-form-item>
			<el-form-item label="摘要" prop="description">
				<el-input type="textarea" v-model="blogForm.description"></el-input>
			</el-form-item>
			<el-form-item label="内容" prop="content">
				<mavon-editor v-model="blogForm.content"></mavon-editor>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('blogForm')">提交</el-button>
				<el-button @click="onReset('blogForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'BlogEdit',
	components: { Header },
	data () {
		return {
			blogForm: {
				id: '',
				userId: '',
				title: '',
				description: '',
				content: ''
			},
			rules: {
				title: [
					{ required: true, message: '请输入标题', trigger: 'blur' }
				],
				description: [
					{ required: true, message: '请输入摘要', trigger: 'blur' }
				],
				content: [
					{ required: true, message: '请输入内容', trigger: 'submit' }
				]
			}
		}
	},
	methods: {
		// 重置表单
		onReset (formName) {
			this.$refs[formName].resetFields()
		},
		// 提交表单
		onSubmit (formName) {
			// 判定表单内容是否符合规范
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// 验证通过才发送请求提交
					this.$http.post('/blog/addOrUpdate', this.blogForm, {
						headers: {
							'Auth': localStorage.getItem('token')
						}
					}).then((resp) => {
						this.$router.push('/index')
					})
				} else {
					this.$message.error('当前输入的标题、摘要或内容不合法')
					return false
				}
			})
		}
	},
	created () {
		// 新增或编辑时的userId
		this.blogForm.userId = this.$store.state.userInfo.id
		// 如果是编辑页面，一进来要回显信息
		// 从地址栏得到博客id
		const blogId = this.$route.params.blogId
		if (blogId) {
			this.$http.get('/blog/' + blogId).then(resp => {
				// 单个赋值而不是整体赋值
				this.blogForm.id = resp.data.data.id
				this.blogForm.userId = resp.data.data.userId
				this.blogForm.title = resp.data.data.title
				this.blogForm.description = resp.data.data.description
				this.blogForm.content = resp.data.data.content
			})
		}
	}
}
</script>

<style scoped>
	.gis-editFrom {
		text-align: center
	}
</style>
