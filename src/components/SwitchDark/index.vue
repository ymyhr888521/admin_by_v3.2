<script setup lang="ts" name="switchDark">
// import { computed } from "vue";
// import { GlobalStore } from "@/store";
// import { Sunny, Moon } from "@element-plus/icons-vue";
// import { useDark } from "@/hooks/useDark";
// const globalStore = GlobalStore();

// const { switchTheme } = useDark();

// const themeConfig = computed(() => globalStore.themeConfig);

// const onAddDarkChange = (value: boolean) => {
// 	globalStore.setThemeConfig({
// 		...themeConfig.value,
// 		isDark: value
// 	});
// 	switchTheme();
// };

import { Sunny, Moon } from "@element-plus/icons-vue";
import { computed } from "vue";
import { GlobalStore } from "@/store";
import { useTheme } from "@/hooks/useTheme";
const globalStore = GlobalStore();

const { switchDark } = useTheme();

const themeConfig = computed(() => globalStore.themeConfig);

const onAddDarkChange = () => {
	switchDark();
};
</script>

<template>
	<el-switch
		v-model="themeConfig.isDark"
		@change="onAddDarkChange"
		inline-prompt
		active-color="#0a0a0a"
		inactive-color="#dcdfe6"
		:active-icon="Sunny"
		:inactive-icon="Moon"
		size="small"
	/>
</template>
