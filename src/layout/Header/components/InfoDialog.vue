<script setup lang="ts">
import { ref } from "vue";
const dialogVisible = ref(false);

// openDialog
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({
	openDialog
});
</script>

<template>
	<el-dialog v-model="dialogVisible" :title="$t('header.personalData')" width="500px" draggable>
		<p><span>姓名：</span><span>李杰一</span></p>
		<p><span>性别：</span><span>男</span></p>
		<p><span>年龄：</span><span>25岁</span></p>
	</el-dialog>
</template>
