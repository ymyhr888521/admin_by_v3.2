<template>
	<el-dropdown trigger="click">
		<span>
			<el-tooltip effect="dark" content="换肤" placement="bottom">
				<i :class="'iconfont icon-zhuti'" class="icon-style"></i>
			</el-tooltip>
		</span>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item divided>
					<div class="theme-item">
						<el-space :size="10" alignment>
							<span>自定义颜色</span>
							<el-color-picker v-model="themeConfig.primary" @change="changePrimary"></el-color-picker>
						</el-space>
					</div>
				</el-dropdown-item>

				<el-dropdown-item divided>
					<div class="theme-item">
						<el-space :size="10" alignment>
							<span>暗黑模式</span>
							<SwitchDark></SwitchDark>
						</el-space>
					</div>
				</el-dropdown-item>

				<el-dropdown-item divided>
					<div class="theme-item">
						<el-space :size="10" alignment>
							<span>灰色模式</span>
							<el-switch size="small" v-model="themeConfig.isGrey" @change="changeGreyOrWeak($event, 'grey')" />
						</el-space>
					</div>
				</el-dropdown-item>
				<el-dropdown-item divided>
					<div class="theme-item">
						<el-space :size="10" alignment>
							<span>色弱模式</span>
							<el-switch size="small" v-model="themeConfig.isWeak" @change="changeGreyOrWeak($event, 'weak')" />
						</el-space>
					</div>
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>
<script setup lang="ts">
import { /*ref,*/ computed } from "vue";
import { useTheme } from "@/hooks/useTheme";
import SwitchDark from "@/components/SwitchDark/index.vue";
import { GlobalStore } from "@/store";

// 主题初始化
const globalStore = GlobalStore();
const themeConfig = computed(() => globalStore.themeConfig);
const { changePrimary, changeGreyOrWeak } = useTheme();

// 打开主题设置
// const drawerVisible = ref(false);
// const openDrawer = () => {
// 	drawerVisible.value = true;
// };
</script>

<style scoped lang="scss">
@import "../index.scss";
.el-space {
	align-items: center;
}
</style>
