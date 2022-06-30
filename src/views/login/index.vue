<script setup lang="ts" name="login">
import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
import { LoginFormExpose } from "./interface/index";
import { Login } from "@/api/interface/index";
import { ref, reactive, provide } from "vue";

// * 以下数据都为自己测试使用，不参与功能开发
// 使用provide传方法
let phone = ref<string>("iphone");
// provide
provide("provideState", {
	name: "liutao",
	age: "20",
	changeName: () => {
		// console.log(phone.value);
		setTimeout(() => {
			phone.value = "huawei";
			// console.log(phone.value);
		}, 1000);
	}
});

// 传给子组件方法（submitParent）
// const submitParent = (LoginFrom: Login.ReqLoginForm) => {
// 	console.log(LoginFrom);
// };

// 使用子组件数据
const loginRef = ref<LoginFormExpose | null>(null);
// const consoleRef = () => {
// 	console.log(loginRef.value?.count);
// 	loginRef.value?.consoleNumber("liutao");
// };

// 定义数据类型两种方法
// const item: Ref<string> = ref("111");
// const item1 = ref<number>(111);

const obj = reactive<Login.ReqLoginForm>({
	username: "admin",
	password: "123456"
});
// 使用toRefs解构数据（在template中直接用）
// const { username, password } = toRefs(obj);
</script>

<template>
	<!-- infront demo1 -->
	<!-- <div class="login-container flx-center">
		<SwitchDark class="dark"></SwitchDark>
		<div class="logo">
			<img data-v-a16c4222="" src="https://file.beituyun.com/bty/logo/%E5%8F%8D%E7%99%BD-%E6%A8%AA%E7%89%88logo.png" />
		</div>
		<div class="login-box">
			<div class="login-left">
				<img src="https://file.beituyun.com/bty/admin/wallpaper/login.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/avatar.jpg" alt="avatar" />
					<p class="logo-text">lpf_test_admin</p>
				</div>
				<LoginForm ref="loginRef" :age="'20'" :address="['天谷七路', '云水一路']" :obj="obj"></LoginForm>
			</div>
		</div>
	</div> -->

	<!-- infront demo2 -->
	<div class="login-container flx-center">
		<SwitchDark class="dark"></SwitchDark>
		<div class="login-box">
			<div class="login-left">
				<h1>欢迎访问 | 飞我工作室</h1>
				<img src="./../../assets/images/welcome.png" alt="login" />
			</div>
			<div class="login-form">
				<div class="login-logo">
					<img class="login-icon" src="@/assets/images/avatar.jpg" alt="avatar" />
					<p class="logo-text">飞我人员管理系统</p>
				</div>
				<LoginForm ref="loginRef" :age="'20'" :address="['天谷七路', '云水一路']" :obj="obj"></LoginForm>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
@import "./index.scss";
</style>
