<template>
	<div>
		<Header></Header>
		<div class="gis-content">
			<el-row>
				<h2> {{ blogDetail.title }} </h2>
				<!--只有自己的文章才能显示编辑按钮-->
				<el-button v-show="isAuthor" type="primary" icon="el-icon-edit" circle style="float: right" @click="onEdit()">
				</el-button>
			</el-row>
			<el-divider></el-divider>
			<!--markdown-body能更好地渲染-->
			<div class="markdown-body" v-html="blogDetail.content"></div>
		</div>
	</div>
</template>

<script>
import Header from '../../components/Header'
import 'github-markdown-css/github-markdown.css'
export default {
	name: 'BlogDetail',
	components: {Header},
	data () {
		return {
			blogDetail: {
				id: '',
				title: '',
				content: ''
			},
			isAuthor: false
		}
	},
	methods: {
		onEdit () {
			this.$router.push('/edit/' + this.blogDetail.id)
		}
	},
	created () {
		// 从地址栏得到博客id
		const blogId = this.$route.params.blogId
		if (blogId) {
			this.$http.get('/blog/' + blogId).then(resp => {
				// 单个赋值而不是整体赋值
				this.blogDetail.id = resp.data.data.id
				this.blogDetail.title = resp.data.data.title
				this.isAuthor = this.$store.state.userInfo.id === resp.data.data.userId
				// 对content内容渲染
				const MarkdownIt = require('markdown-it')
				const md = new MarkdownIt()
				this.blogDetail.content = md.render(resp.data.data.content)
			})
		}
	}
}
</script>

<style scoped>
.gis-content {
	box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
	width: 100%;
	min-height: 700px;
	margin: 20px 0;
	padding: 20px;
}
</style>
