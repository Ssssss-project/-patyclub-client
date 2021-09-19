<template>
  <main id="Home">
    <div class="main-bar">
      <button class="btns">所有活動</button>
      <button class="btns">創建活動</button>
      <button class="btns" @click="bShowModal = true">登入</button>
    </div>
    <LoginModal :openModal="bShowModal" @close-modal="bShowModal = false"/>
  </main>
</template>

<script>
import LoginModal from './LoginModal.vue'
export default {
  components:{
    LoginModal
  },
  data() {
    return {
      bShowModal: false
    };
  },
  methods: {
    routeLoginPage() {},
  },
};
</script>
