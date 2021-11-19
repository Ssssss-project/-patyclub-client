import axios from "axios";
import request from "../https";

const URL = "https://localhost:5001/api";

// 註冊
export const apiPostRegister = (params: any) => request("post", "/Register", params);

// 取得登入結果
export const apiGetLoginResult = (params: any) => request("get", "/Login", params);

// 取得所有使用者
export const apiGetAllUser = () => request("get", "/GetEntityList/getAllUser");

// 取得活躍使用者
export const apiGetActiveUser = () => request("get", "/GetEntityList/getActiveUser");

//取得活動資訊
// export const apiGetActivity = () => request("get", "/Event/getSpecialEvent");

//api get function writing
export async function apiGetActivity() {
    const res = await axios({
        headers: {
            "Content-Type": "application/json;",
        },
        method: "GET",
        url: `${URL}/Event/getSpecialEvent`,
    });
    return res.data;
}
