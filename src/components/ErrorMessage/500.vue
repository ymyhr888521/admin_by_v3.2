<template>
	<div class="not-container">
		<div class="not-detail">
			<h2>500 网络错误</h2>
			<h4>抱歉，您的网络不见了~🤦‍♂️🤦‍♀️</h4>
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
