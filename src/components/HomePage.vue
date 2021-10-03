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
    <div class="container">
      <transition
        name="first-step"
        mode="out-in"
      >
        <div
          class="first-step disappearing"
          @click="showInfo"
          v-if="showFirstStep"
        >
          <img src="../assets/PatyLogo.png">
        </div>
        <div
          class="second-step"
          @click="showInfo"
          v-else-if="showSeconfStep"
        >
          <div class="billboard">公佈欄｜BillBoard</div>
          <div class="hotActivity">活動精選｜Hot Activities</div>
        </div>
      </transition>

    </div>
    <div
      class="bg-image opacity-set"
      :style="backgroundimg"
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
      showFirstStep: true,
      showSeconfStep: false,
      backgroundimg: {
        backgroundImage:
          "url(" + require("../assets/backgroundImage.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "bottom",
      },
      bShowModal: false,
    };
  },
  methods: {
    showInfo() {
      this.showFirstStep = false;
      this.showSeconfStep = true;
    },
    routeLoginPage() {},
  },
};
</script>
