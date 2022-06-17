<template>
	<div class="content-box">
		<span class="text">拖拽指令</span>
		<h1>lpf_test_demo</h1>
		<div v-draggable class="drag-box flx-center text">我可以拖拽哦~</div>
	</div>
</template>

<script setup lang="ts" name="dragDirect"></script>

<style scoped lang="scss">
.content-box {
	position: relative;
	.drag-box {
		position: absolute;
		top: 110px;
		width: 300px;
		height: 300px;
		color: #b2bec3;
		background: #dfe6e9;
		border-radius: 50%;
	}
}
</style>
