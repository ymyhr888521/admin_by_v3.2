<template>
	<div class="content-box">
		<span class="text">节流指令</span>
		<h1>lpf_test_demo</h1>
		<el-button type="primary" v-throttle="throttleClick">节流按钮 (每隔1S秒后执行)</el-button>
	</div>
</template>

<script setup lang="ts" name="throttleDirect">
import { ElMessage } from "element-plus";
const throttleClick = () => {
	ElMessage.success("我是节流按钮触发的事件====>>>>lpf_test_demo???");
};
</script>
