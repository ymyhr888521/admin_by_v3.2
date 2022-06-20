<script setup lang="ts">
import { ref } from "vue";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { GlobalStore } from "@/store";

const router = useRouter();
const globalStore = GlobalStore();

// logout
const logout = () => {
	ElMessageBox.confirm("确定要退出登录吗?", "提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		router.push({ name: "login" });
		globalStore.setToken("");
		setTimeout(() => {
			ElMessage({
				type: "success",
				message: "退出成功！"
			});
		}, 200);
	});
};

interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// openDialog
const openDialog = (refName: string) => {
	if (refName == "infoRef") return infoRef.value?.openDialog();
	passwordRef.value?.openDialog();
};
</script>

<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/avatar.jpg" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click="openDialog('infoRef')">{{ $t("header.personalData") }}</el-dropdown-item>
				<el-dropdown-item @click="openDialog('passwordRef')" divided>{{ $t("header.changePassword") }}</el-dropdown-item>
				<el-dropdown-item @click="logout" divided>{{ $t("header.logout") }}</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<style scoped lang="scss">
@import "../index.scss";
</style>
