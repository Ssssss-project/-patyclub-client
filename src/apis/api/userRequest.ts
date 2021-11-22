import axios from "axios";
import request from "../https";

// 註冊帳號
export const apiPostRegister = (params :any) => request("post", "/User/Register", params);

// 取得密碼驗證
export const apiPostLoginResult = (params: any) => request("post", "/User/login", params);

// 忘記密碼
export const apiPostForgetPwd = (params: any) => request("post", "/User/forgetPwd", params);

// 取得所有使用者
export const apiGetAllUser = () => request("get", "/User/getAllUser");

// 取得活躍使用者
export const apiGetActiveUser = () => request("get", "/User/getActiveUser");

//取得活動資訊
export const apiGetActivity = () => request("get", "/Event/getSpecialEvent");
