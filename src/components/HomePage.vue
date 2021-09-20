<template>
  <div id="Home">
    <div class="main-bar">
      <button class="btns">所有活動</button>
      <button class="btns">創建活動</button>
      <button class="btns" @click="bShowModal = true">登入</button>
    </div>
    <LoginModal :openModal="bShowModal" @close-modal="bShowModal = false"/>
  </div>
  <div class="note" :style="note" style="height:100%"></div>
</template>

<script>
import LoginModal from './LoginModal.vue'
export default {
  components:{
    LoginModal
  },
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("../assets/backgroundImage.png") + ")",
      },
      bShowModal: false
    };
  },
  methods: {
    routeLoginPage() {},
  },
};
</script>
