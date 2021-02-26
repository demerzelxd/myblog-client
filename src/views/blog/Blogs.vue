<template>
	<div>
		<Header></Header>
		<!--博客主页时间线-->
		<div class="block">
			<el-timeline>
				<el-timeline-item :timestamp="blog.createTime" placement="top" v-for="blog in blogList" :key="blog.id">
					<el-card shadow="hover">
						<h4>
							<router-link :to="{name: 'BlogDetail', params: {blogId: blog.id}}">
								{{ blog.title }}
							</router-link>
						</h4>
						<p>{{ blog.description }}</p>
					</el-card>
				</el-timeline-item>
			</el-timeline>
			<!--分页-->
			<el-pagination
				layout="prev, pager, next, jumper, total, sizes"
				background
				:page-size="pageSize"
				:current-page="pageNow"
				:page-sizes="[2, 4, 6, 8, 10]"
				:total="total"
				@current-change="findPage"
				@size-change="findSize"
				style="text-align: center">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import Header from '../../components/Header'
export default {
	name: 'Blogs',
	data () {
		return {
			total: 0,
			pageNow: 1,
			pageSize: 4,
			blogList: []
		}
	},
	methods: {
		getBlogList (pageNow, pageSize) {
			// 如果没有传参，则默认是1和5
			pageNow = pageNow || this.pageNow
			pageSize = pageSize || this.pageSize
			this.$http.get('/blog/findByPage?pageNow=' + pageNow + '&pageSize=' + pageSize).then((resp) => {
				// console.log(resp.data);
				this.blogList = resp.data.data.records
				this.total = resp.data.data.total
			})
		},
		findPage (page) {
			// 处理分页，findPage方法默认回传当前页码，从1开始
			// console.log(page)
			this.pageNow = page
			this.getBlogList(page, this.pageSize)
		},
		findSize (size) {
			// 处理下拉菜单中每页显示多少条
			// console.log(size)
			this.pageSize = size
			this.getBlogList(this.pageNow, size)
		}
	},
	created () {
		this.getBlogList()
	},
	components: {Header}
}
</script>

<style scoped>

</style>
