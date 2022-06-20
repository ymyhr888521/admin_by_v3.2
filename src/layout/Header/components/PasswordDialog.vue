<script setup lang="ts" name="PasswordDialog">
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
	<el-dialog v-model="dialogVisible" :title="$t('header.changePassword')" width="500px" draggable>
		<h1>密码修改test</h1>
		<span>暂不支持修改密码</span>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>
