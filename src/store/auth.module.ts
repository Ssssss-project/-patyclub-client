import jwt_decode from "jwt-decode";
import { apiGetRefreshToken } from "@/apis/api/userRequest";
const initUserStore = () => {
  return {
    sToken: "",
    bIsLogin: false,
  };
};

export const auth = {
  state: initUserStore(),

  mutations: {
    // 儲存token狀態以及登入狀態
    SET_AUTH(state: any, options: any) {
      state.sToken = options.sToken;
      state.bIsLogin = options.bIsLogin;
    },
    // 更新token並更改token狀態
    REFRESH_AND_SET_AUTH(state: any) {
      console.log("old token:"+state.sToken);
      apiGetRefreshToken().then((response) => {
        state.sToken = response.data;
        state.bIsLogin = true;
        console.log("new token:"+state.sToken);
      });
    },
  },

  actions: {
    setAuth(context: any, options: any) {
      context.commit("SET_AUTH", {
        sToken: options.sToken,
        bIsLogin: options.bIsLogin,
      });
    },
    refreshAndSetAuth(context: any) {
      context.commit("REFRESH_AND_SET_AUTH");
    },
  },

  getters: {
    getUserStore: (state: object) => {
      return state;
    },

    getUserInfo: (state: any) => {
      return jwt_decode(state.sToken);
    },
  },
};
