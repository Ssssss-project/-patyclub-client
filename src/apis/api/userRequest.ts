import request from "../https";

// 註冊
export const apiPostRegister = (params :any) => request("post", "/Register", params);

// 取得登入結果
export const apiGetLoginResult = (params: any) => request("get", "/Login", params);

// 取得所有使用者
export const apiGetAllUser = () => request("get", "/GetEntityList/getAllUser");

// 取得活躍使用者
export const apiGetActiveUser = () => request("get", "/GetEntityList/getActiveUser");

// 儲存活動
export const apiSaveActivityData = (params :any) => request("post", "/Activity", params);