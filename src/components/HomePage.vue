<template>
  <main id="Home">
    <div class="main-bar">
      <button class="btns">所有活動</button>
      <button class="btns">創建活動</button>
      <button
        class="btns"
        @click="bShowModal = true"
      >登入</button>
    </div>
    <div
      class="container"
      :style="note"
    ></div>
    <LoginModal
      :openModal="bShowModal"
      @close-modal="bShowModal = false"
    />
  </main>

</template>

<script>
import LoginModal from "./LoginModal.vue";
export default {
  components: {
    LoginModal,
  },
  data() {
    return {
      note: {
        backgroundImage:
          "url(" + require("../assets/backgroundImage.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        opacity: 0.5,
      },
      bShowModal: false,
    };
  },
  methods: {
    routeLoginPage() {},
  },
};
</script>
