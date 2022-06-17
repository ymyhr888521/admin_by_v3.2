<script setup lang="ts" name="debounceDirect">
import { ElMessage } from "element-plus";
const debounceClick = () => {
	ElMessage.success("我是防抖按钮触发的事件====>lpf_test_demo????");
};
</script>
<template>
	<div class="content-box">
		<span class="text">防抖指令</span>
		<h1>lpf_test_demo</h1>
		<el-button type="primary" v-debounce="debounceClick">防抖按钮 (0.5秒后执行)</el-button>
	</div>
</template>
