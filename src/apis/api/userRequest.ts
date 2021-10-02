import request from "../https";

export const apiGetLoginResult = (params: any) => request("get", "/Login", params);
