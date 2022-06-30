<script setup lang="ts" name="dataVisualize">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import Pie from "./components/pie.vue";
import Curve from "./components/curve.vue";
import { ECharts } from "echarts";
/* 声明echarts实例 */
interface ChartProps {
	[key: string]: ECharts | null;
}
/* 获取子组件的ref */
interface ChartExpose {
	initChart: (params: any) => ECharts;
}
const pie = ref<ChartExpose>();
const curve = ref<ChartExpose>();
const data = reactive({
	activeName: 1,
	bookSum: "84.2w"
});
const dataScreen: ChartProps = reactive({
	chart1: null,
	chart2: null
});
const handleClick = (): void => {};
let tab = [
	{ label: "未来7日", name: 1 },
	{ label: "近七日", name: 2 },
	{ label: "近半月", name: 3 },
	{ label: "近20日", name: 4 },
	{ label: "近30日", name: 5 },
	{ label: "近半年", name: 6 }
];
// 模拟数据
let pieData = [
	{ value: 1500, name: "JD" },
	{ value: 5000, name: "MI STORE" }
];
let curveData = [
	{ value: 30000, spotName: "小米商城" },
	{ value: 9000, spotName: "JD" },
	{ value: 10000, spotName: "天猫" },
	{ value: 70000, spotName: "苏宁易购" },
	{ value: 2000, spotName: "小米有品" },
	{ value: 600, spotName: "小米之家" }
];

/* 初始化 echarts */
const initCharts = (): void => {
	dataScreen.chart1 = pie.value?.initChart(pieData) as ECharts;
	dataScreen.chart2 = curve.value?.initChart(curveData) as ECharts;
};

onMounted(() => {
	/* 初始化echarts */
	initCharts();
	// 为浏览器绑定事件
	window.addEventListener("resize", resize);
});

/* 浏览器监听 resize 事件 */
const resize = () => {
	// 使用了 scale 的echarts其实不需要需要重新计算缩放比例
	Object.values(dataScreen).forEach(chart => {
		chart && chart.resize();
	});
};

/* 销毁时触发 */
onBeforeUnmount(() => {
	window.removeEventListener("resize", resize);
});
</script>

<template>
	<div class="dataVisualize-box">
		<div class="top-box">
			<div class="top-title">2022 - 618 小米手机售卖榜</div>
			<el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
				<el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
			</el-tabs>
			<div class="top-content">
				<div class="item-left sle">
					<span class="left-title">访问总数</span>
					<div class="img-box">
						<img src="@/assets/images/avatar.jpg" alt="" />
					</div>
					<span class="left-number">{{ data.bookSum }}</span>
				</div>
				<div class="item-center">
					<div class="gitee-traffic traffic-box">
						<div class="traffic-img">
							<img src="@/assets/images/avatar.jpg" alt="" />
						</div>
						<span class="item-value">2222</span>
						<span class="traffic-name sle">MI STORE</span>
					</div>
					<div class="gitHub-traffic traffic-box">
						<div class="traffic-img">
							<img src="@/assets/images/avatar.jpg" alt="" />
						</div>
						<span class="item-value">2222</span>
						<span class="traffic-name sle">JD</span>
					</div>
					<div class="today-traffic traffic-box">
						<div class="traffic-img">
							<img src="@/assets/images/avatar.jpg" alt="" />
						</div>
						<span class="item-value">4567</span>
						<span class="traffic-name sle">今日售出</span>
					</div>
					<div class="yesterday-traffic traffic-box">
						<div class="traffic-img">
							<img src="@/assets/images/avatar.jpg" alt="" />
						</div>
						<span class="item-value">1234</span>
						<span class="traffic-name sle">昨日售出</span>
					</div>
				</div>
				<div class="item-right">
					<div class="echarts-title">JD / MI STORE 销售占比</div>
					<div class="book-echarts">
						<Pie ref="pie" />
					</div>
				</div>
			</div>
		</div>
		<div class="bottom-box">
			<div class="bottom-title">数据来源</div>
			<div class="bottom-tabs">
				<el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
					<el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="curve-echarts">
				<Curve ref="curve" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
