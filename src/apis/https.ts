import axios, { Method } from "axios";
import { alertMsg } from "./utils";
import store from "@/store";
/**
 * 請求失敗的統一處理
 * @param {number} status 失敗的狀態碼
 * @param {string} msg 錯誤訊息
 */
const errorHandler = (status: number, msg: string) => {
    switch (status) {
        // 401: 登入失敗，帳號密碼錯誤
        case 401:
            alertMsg("401:登入失敗，帳號密碼錯誤" + msg);
            break;

        // 403: 權限不足
        case 403:
            alertMsg("403:權限不足" + msg);
            break;

        // 409: 帳號重複
        case 409:
            alertMsg("409:帳號重複" + msg);
            break;

        // 500: 認證未過
        case 500:
            alertMsg("500:認證未過" + msg);
            break;

        // 其他錯誤訊息，直接拋出提示
        default:
            alertMsg("status：" + status + "\nmessage：" + msg);
    }
};

// 創造axios的實體
const instance = axios.create({
    baseURL: "https://localhost:5001/api/",
});

// request攔截器
instance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response攔截器
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const { response } = error;
        if (response) {
            console.log(response);
            errorHandler(response.status, response.data.title);
            return Promise.reject(error);
        } else {
            if (!window.navigator.onLine) {
                alertMsg("Internet error");
            } else {
                return Promise.reject(error);
            }
        }
    }
);

// const URL = "https://localhost:5001/api";

// export default async function(method: Method, url: string, data: any = null,token:string="") {
//   const sMethod = method.toLowerCase();
//   const requestOption = sMethod=="get"||sMethod=="delete"?{params:{data}}:{data}
//   const res =await axios({
//     headers: {
//         "Content-Type": "application/json;",
//         "Authoriztion":token,
//     },
//     method,
//     url: `${URL}${url}`,
//     ...requestOption
//   });
//   return res.data;
// }

export default async function(method: Method, url: string, data: any = null) {
    const sMethod = method.toLowerCase();
    const requestOption = sMethod == "get" || sMethod == "delete" || sMethod == "put" ? { params: data } : { data };
    // 有token則自動帶
    const token = store.getters.getUserStore.sToken;
    return await instance({
        headers: {
            "Content-Type": "application/json;",
            Authorization: "Bearer " + token,
        },
        method,
        url: `${url}`,
        ...requestOption,
    });
}
