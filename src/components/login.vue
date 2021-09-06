<template>
  <div class="note" :style="note">
    <div class="flexbox">
      <div class="calculator">
        <img src="../assets/logo1.png" />
        <img src="../assets/PatyClub.png" />
        <input
          clase="input"
          type="text"
          v-model="account"
          placeholder="Email/帳號"
        />
        <input
          clase="input"
          type="password"
          v-model="password"
          placeholder="密碼"
        />
        <button class="btn">登入</button>
        <button class="btn">註冊</button>
        <button class="btn">已Google繼續</button>
        <button class="btn">已Facebook繼續</button>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/backImg.png") + ")",
      },
      account: "",
      password: "",
    };
  },
  methods: {
   
  },
};
</script>

<style>
.flexbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.calculator {
  display: grid;
  justify-content: center;
  align-items: center;

  border: 0.3px solid #868383;
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;

  width: 300px;
  height: 450px;
}

.btn {
  width: 240px;
  height: 30px;
}

.input {
  width: 240px;
  height: 30px;
}
</style>