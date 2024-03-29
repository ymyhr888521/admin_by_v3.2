<script setup lang="ts">
import { ref, reactive, inject, onMounted /*,watch*/, getCurrentInstance, nextTick } from "vue";
import { useRouter } from "vue-router";
import { Login } from "@/api/interface";
import { InjectProps } from "../interface/index";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import { MenuStore } from "@/store/modules/menu";
import { TabsStore } from "@/store/modules/tabs";
import superplaceholder from "superplaceholder";
import md5 from "js-md5";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";

const globalStore = GlobalStore();
const menuStore = MenuStore();
const tabStore = TabsStore();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();

// 登录表单数据
const loginForm = reactive<Login.ReqLoginForm>({
	username: "",
	password: ""
});

const loading = ref<boolean>(false);
const router = useRouter();

const usernameRef = ref(null);
const passwordRef = ref(null);

// todo ??
const inputOpt = ref<Array<number>>([]);

// login
const login = (formEl: FormInstance | undefined): void => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			loading.value = true;
			showFullScreenLoading();
			try {
				const requestLoginForm: Login.ReqLoginForm = {
					username: loginForm.username,
					password: md5(loginForm.password)
				};
				const res = await loginApi(requestLoginForm);
				// * 存储 token
				globalStore.setToken(res.data!.access_token);
				// * 登录成功之后清除上个账号的 menulist 和 tabs 数据
				menuStore.setMenuList([]);
				tabStore.closeMultipleTab();
				ElMessage.success(`用户 ${loginForm.username} 登录成功`);
				loading.value = false;
				setTimeout(() => {
					router.push({ name: "home" });
					tryHideFullScreenLoading();
				}, 2000);

				if (inputOpt.value.find(v => v === 1)) {
					// 记住密码
					sessionStorage.setItem("remeberNS", `${loginForm.username}|${loginForm.password}|1`);
				} else {
					sessionStorage.setItem("remeberNS", `${loginForm.username}|${loginForm.password}|0`);
				}
				if (inputOpt.value.find(v => v === 2)) {
					// 自动登录
					sessionStorage.setItem("autoLogin", "1");
				} else {
					sessionStorage.setItem("autoLogin", "");
				}
			} finally {
				loading.value = false;
				setTimeout(() => {
					tryHideFullScreenLoading();
				}, 2000);
			}
		}
	});
	``;
};

const initNSByOption = (): void => {
	// 回填密码
	if (sessionStorage.getItem("remeberNS")) {
		if (parseInt((sessionStorage.getItem("remeberNS") as any).split("|")[2], 10)) {
			const str = sessionStorage.getItem("remeberNS") as string;
			!inputOpt.value.find(v => v === 1) && inputOpt.value.push(1);
			setTimeout(() => {
				loginForm.username = str.split("|")[0];
				loginForm.password = str.split("|")[1];
			}, 200);
		}
	}

	// 自动登录
	if (sessionStorage.getItem("autoLogin")) {
		!inputOpt.value.find(v => v === 2) && inputOpt.value.push(2);
		const str = sessionStorage.getItem("remeberNS") as string;
		setTimeout(() => {
			loginForm.username = str.split("|")[0];
			loginForm.password = str.split("|")[1];
			login(loginFormRef.value);
		}, 3000);
	}
};

// resetForm
const resetForm = (formEl: FormInstance | undefined): void | boolean => {
	if (!formEl) return false;
	formEl.resetFields();
};

const enterEvent = () => {
	document.onkeydown = (e: any = {}) => {
		e = window.event || e;
		if (e.code.toLocaleUpperCase() === "ENTER") {
			e.preventDefault();
			if (loading.value) return;
			login(loginFormRef.value);
		}
	};
};

onMounted(async () => {
	(window as any).__currentInstance = getCurrentInstance();

	// 监听enter事件（调用登录）
	enterEvent();

	// 回填密码 和 自动登录
	initNSByOption();

	await nextTick();

	// 输入框动画
	superplaceholder({
		el: (usernameRef.value as any)["input"],
		sentences: ["请输入用户名 / admin", "Please Enter Account / Phone / Email"],
		options: {
			letterDelay: 150,
			sentenceDelay: 1000,
			autoStart: true,
			loop: true,
			shuffle: false,
			showCursor: true,
			cursor: "|"
		} as Record<string, any>
	});
	superplaceholder({
		el: (passwordRef.value as any)["input"],
		sentences: ["请输入密码 / 123456", "Please Protect Your Password"],
		options: {
			letterDelay: 150,
			sentenceDelay: 1000,
			autoStart: true,
			loop: true,
			shuffle: false,
			showCursor: true,
			cursor: "|"
		} as Record<string, any>
	});
});

// watch(
// 	() => inputOpt.value,
// 	newVal => {
// 		if (newVal.includes(2)) {
// 			inputOpt.value = [1, 2];
// 		}
// 	}
// );

// * 以下数据都为自己测试使用，不参与功能开发
// inject
const provideState = inject("provideState") as InjectProps;
// console.log(provideState.age);
provideState.changeName();

// 接收父组件参数（采用ts专有声明，有默认值）
interface ParentProps {
	age?: string;
	address?: string[];
	obj?: {
		username: string;
		password: string;
	};
}
withDefaults(defineProps<ParentProps>(), {
	age: "18",
	address: () => ["天谷七路", "云水一路"],
	obj: () => {
		return {
			username: "admin",
			password: "123456"
		};
	}
});

// 接收父组件参数（采用ts专有声明，无默认值）
// const props1 = defineProps<{ item: string }>();

// 子组件向父组件传输数据（触发父组件的submitParent方法）
// const emit = defineEmits<{
// 	(e: "submitParent", LoginFrom: Login.ReqLoginForm): void;
// }>();

// const submitParent = () => {
// 	emit("submitParent", loginForm);
// };

// 子组件数据暴露给父组件
const count = ref<number>(1);
const consoleNumber = (name: string): void => {
	console.log("我是子组件打印的数据", name);
};
defineExpose({
	count,
	consoleNumber
});
</script>

<template>
	<el-form
		ref="loginFormRef"
		:model="loginForm"
		:rules="{
			username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
		}"
		size="large"
	>
		<el-form-item prop="username">
			<el-input ref="usernameRef" v-model="loginForm.username" placeholder="请输入账号 / admin" autocomplete="off">
				<template #prefix>
					<el-icon class="el-input__icon">
						<user />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				ref="passwordRef"
				type="password"
				v-model="loginForm.password"
				placeholder="请输入密码 / 123456"
				show-password
				autocomplete="new-password"
			>
				<template #prefix>
					<el-icon class="el-input__icon">
						<lock />
					</el-icon>
				</template>
			</el-input>
		</el-form-item>
		<div class="opt">
			<el-checkbox-group v-model="inputOpt">
				<el-checkbox :label="1">记住密码</el-checkbox>
				<el-checkbox :label="2">自动登录</el-checkbox>
			</el-checkbox-group>
			<span>忘记密码</span>
		</div>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" :loading="loading" round @click="resetForm(loginFormRef)" size="large">重置 </el-button>
		<el-button :icon="UserFilled" :loading="loading" round @click="login(loginFormRef)" size="large" type="primary">
			登录
		</el-button>
	</div>
</template>

<style scoped lang="scss">
@import "../index.scss";
</style>
