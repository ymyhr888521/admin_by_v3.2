<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { MenuStore } from "@/store/modules/menu";
import { AuthStore } from "@/store/modules/auth";
// import { getMenuList } from "@/api/modules/login";
import { handleRouter } from "@/utils/util";
import { loadingSvg } from "@/utils/svg";
import Logo from "./components/Logo.vue";
import SubItem from "./components/SubItem.vue";

const loading = ref(false);

const route = useRoute();
const menuStore = MenuStore();
const authStore = AuthStore();

onMounted(async () => {
	// 获取菜单列表
	loading.value = true;
	try {
		// const res = await getMenuList();
		// if (!res.data) return;
		// 暂时写死数据 后期用mockJs模拟
		const res = {
			data: [
				{ icon: "data-analysis", title: "h-home", path: "/home/index" },
				{ icon: "data-analysis", title: "大屏可视化", path: "/dataScreen" },
				{
					icon: "data-analysis",
					title: "工作台",
					path: "/dashboard",
					children: [
						{ path: "/dashboard/dataVisualize", title: "数据可视化", icon: "menu" },
						{ path: "/dashboard/embedded", title: "内嵌页面", icon: "menu" }
					]
				},
				{
					icon: "data-analysis",
					title: "ProTable Test",
					path: "/proTable",
					children: [
						{ path: "/proTable/useHooks", title: "useHooks", icon: "menu" },
						{ path: "/proTable/useComponent", title: "useComponent", icon: "menu" }
					]
				},
				{
					icon: "data-analysis",
					title: "ProForm Test",
					path: "/form",
					children: [
						{ path: "/form/basicForm", title: "baseForm", icon: "menu" },
						{ path: "/form/validateForm", title: "validForm", icon: "menu" },
						{ path: "/form/dynamicForm", title: "dynamicForm", icon: "menu" }
					]
				},
				{
					icon: "data-analysis",
					title: "Echarts Test",
					path: "/echarts",
					children: [
						{ path: "/echarts/waterChart", title: "水型图", icon: "menu" },
						{ path: "/echarts/columnChart", title: "柱状图", icon: "menu" },
						{ path: "/echarts/lineChart", title: "折线图", icon: "menu" },
						{ path: "/echarts/pieChart", title: "饼图", icon: "menu" },
						{ path: "/echarts/radarChart", title: "雷达图", icon: "menu" },
						{ path: "/echarts/nestedChart", title: "嵌套环形图", icon: "menu" }
					]
				},
				{
					icon: "data-analysis",
					title: /*"Custom Directives"*/ "自定义指令",
					path: "/directives",
					children: [
						{ path: "/directives/copyDirect", title: "复制指令", icon: "menu" },
						{ path: "/directives/watermarkDirect", title: "水印指令", icon: "menu" },
						{ path: "/directives/dragDirect", title: "拖拽指令", icon: "menu" },
						{ path: "/directives/debounceDirect", title: "防抖指令", icon: "menu" },
						{ path: "/directives/throttleDirect", title: "节流指令", icon: "menu" },
						{ path: "/directives/longpressDirect", title: "长按指令", icon: "menu" }
					]
				},
				{
					icon: "warning-filled",
					title: "错误页面跳转",
					path: "/error",
					children: [
						{ path: "/404", title: "404页面", icon: "menu" },
						{ path: "/403", title: "403页面", icon: "menu" },
						{ path: "/500", title: "500页面", icon: "menu" }
					]
				}
			]
		};

		// 把路由菜单处理成一维数组（存储到 pinia 中）
		const dynamicRouter = handleRouter(res.data);
		authStore.setAuthRouter(dynamicRouter);
		menuStore.setMenuList(res.data);
		loading.value = false;
	} finally {
		loading.value = false;
	}
});

const activeMenu = computed((): string => route.path);
const isCollapse = computed((): boolean => menuStore.isCollapse);
const menuList = computed((): Menu.MenuOptions[] => menuStore.menuList);

// aside 自适应
const screenWidth = ref<number>(0);
const screenHeight = ref<number>(0);
//监听窗口大小
const listeningWindow = () => {
	window.onresize = () => {
		return (() => {
			screenWidth.value = document.body.clientWidth;

			screenHeight.value = document.body.clientHeight;

			if (isCollapse.value === false && screenWidth.value < 1200) {
				menuStore.setCollapse();
			}

			if (isCollapse.value === true && screenWidth.value > 1200) {
				menuStore.setCollapse();
			}
		})();
	};
};
listeningWindow();
</script>

<template>
	<div
		class="menu"
		:style="{ width: isCollapse ? '65px' : '220px' }"
		v-loading="loading"
		element-loading-text="Loading..."
		:element-loading-spinner="loadingSvg"
		element-loading-svg-view-box="-10, -10, 50, 50"
		element-loading-background="rgba(122, 122, 122, 0.01)"
	>
		<Logo :isCollapse="isCollapse"></Logo>
		<el-scrollbar>
			<el-menu
				:default-active="activeMenu"
				:router="true"
				:collapse="isCollapse"
				:collapse-transition="false"
				:unique-opened="true"
				background-color="#191a20"
				text-color="#bdbdc0"
				active-text-color="#fff"
			>
				<SubItem :menuList="menuList"></SubItem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
