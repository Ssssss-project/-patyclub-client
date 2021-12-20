import jwt_decode from "jwt-decode";

const initUserStore = () => {
  return {
    sToken: "",
    bIsLogin: false,
  };
};

export const auth = {
  state: initUserStore(),

  mutations: {
    SET_AUTH(state: any, options: any) {
      state.sToken = options.sToken;
      state.bIsLogin = options.bIsLogin;
    },
  },

  actions: {
    setAuth(context: any, options: any) {
      context.commit("SET_AUTH", {
        sToken: options.sToken,
        bIsLogin: options.bIsLogin,
      });
    },
  },

  getters: {
    getUserStore: (state: object) => {
      return state
    },

    getUserInfo: (state: any) => {
      return jwt_decode(state.sToken)
    },
  }
};
