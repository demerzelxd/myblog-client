<template>
	<div>
		<el-container>
			<el-header>
				<el-image
					style="width: 100px; height: 100px"
					:src="icon"
					fit="fit">
				</el-image>
			</el-header>
			<el-main>Main</el-main>
		</el-container>
	</div>
</template>
<script>
// 引入icon
import icon from '../assets/img/icon.svg'
export default {
	name: 'Login',
	data () {
		return {
			icon: icon
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
</style>
