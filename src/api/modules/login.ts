/**
 * Created By Joker_li
 * Date: 2022-06-17
 * Feat: login登录接口  用MockJs模拟api请求
 */

import { Login } from "@/api/interface/index";
import { BASE_URL } from "@/api/config/servicePort";
import http from "@/api";

// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(BASE_URL + `/login`, params);
};

// * 获取按钮权限
export const getAuthButtons = () => {
	return http.get<Login.ResAuthButtons>(BASE_URL + `/auth/buttons`);
};

// * 获取菜单列表
export const getMenuList = () => {
	return http.get<Menu.MenuOptions[]>(BASE_URL + `/menu/list`);
};
