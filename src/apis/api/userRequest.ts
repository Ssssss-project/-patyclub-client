import request from "../https";

// 註冊帳號
export const apiPostRegister = (params :any) => request("post", "/User/Register", params);

// 取得密碼驗證
export const apiPostLoginResult = (params: any) => request("post", "/User/login", params);

// 忘記密碼
export const apiPostForgetPwd = (params: any) => request("post", "/User/forgetPwd", params);

// 取得所有使用者
export const apiGetAllUser = () => request("get", "/User/getAllUser");

// 取得活動中使用者
export const apiGetActiveUser = () => request("get", "/User/getActiveUser");