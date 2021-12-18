
import { auth } from "./auth.module";
import createPersistedState from "vuex-persistedstate";
import { createStore } from 'vuex'

const store:any = createStore({
  modules: {
    auth,
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
