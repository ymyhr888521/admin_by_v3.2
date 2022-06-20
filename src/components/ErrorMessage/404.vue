<template>
	<div class="not-container">
		<div class="not-detail">
			<h2>404页面</h2>
			<h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
			<el-button type="primary" @click="tabStore.goHome()">返回首页</el-button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TabsStore } from "@/store/modules/tabs";
const tabStore = TabsStore();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
