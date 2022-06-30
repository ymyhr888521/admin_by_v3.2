/** * Created By Joker_li * Date: 2022-06-30 * Feat: 重写换肤功能 */

<script setup lang="ts">
import { computed } from "vue";
import { useDark } from "@/hooks/useDark";
import { GlobalStore } from "@/store";
const globalStore = GlobalStore();

const { switchTheme } = useDark();

const themeConfig = computed(
	(): {
		primary: string;
		isDark: boolean;
	} => globalStore.themeConfig
);

const onAddDarkChange = (value: boolean): void => {
	globalStore.setThemeConfig({
		...themeConfig.value,
		isDark: value
	});
	setTimeout(() => {
		switchTheme();
	}, 20);
};
</script>

<template>
	<el-dropdown trigger="click" @command="onAddDarkChange">
		<span>
			<el-tooltip effect="dark" content="换肤" placement="bottom">
				<i :class="'iconfont icon-zhuti'" class="icon-style"></i>
			</el-tooltip>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item :disabled="!themeConfig.isDark" :command="false">浅色模式</el-dropdown-item>
				<el-dropdown-item :disabled="themeConfig.isDark" :command="true">深色模式</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<style scoped lang="scss">
@import "../index.scss";
</style>
