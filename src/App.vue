<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: 'App'
}
</script>

<style>
/*全局样式*/
#app {
	max-width: 960px;
	/*外部容器居中*/
	margin: 0 auto;
	/*内部元素居中*/
}
</style>
