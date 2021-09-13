<template>
  <div id="Login" class="note" :style="note">
    <div class="flexbox">
      <div class="calculator">
        <img src="../assets/PatyRabbit.png" />
        <img src="../assets/PatyClub.png" />
        <input
          class="input"
          type="text"
          v-model="account"
          placeholder="Email/帳號"
        />
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="密碼"
        />
        <div class="login-btn">
          <button class="btn">登入</button>
          <button class="btn">註冊</button>
          <button class="btn">已Google繼續</button>
          <button class="btn">已Facebook繼續</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/backgroundImage.png") + ")",
      },
      account: "",
      password: "",
    };
  },
  methods: {
   
  },
};
</script>