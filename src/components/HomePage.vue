<template>
  <div id="Home">
    <div class="main-bar">
      <button class="btns">所有活動</button>
      <button class="btns">創建活動</button>
      <button class="btns" @click="bShowModal = true">登入</button>
    </div>
    <div id="body" class="note" :style="note" style="height:100vh;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      note: {
        backgroundImage:
          "url(" + require("../assets/backgroundImage.png") + ")",
      },
      bShowModal: false,
    };
  },
  methods: {
    routeLoginPage() {},
  },
};
</script>
