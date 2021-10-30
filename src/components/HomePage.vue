<template>
  <main id="Home">
    <div class="main-bar">
      <button class="btns" @click="bShowChat = true">測試聊天室</button>
      <button class="btns">所有活動</button>
      <router-link :to="`/activityCreate`">
        <button class="btns">創建活動</button>
      </router-link>
      <button class="btns" @click="openLoginDialog">登入</button>
    </div>
    <div class="container">
      <transition name="first-step" mode="out-in">
        <div class="first-step" @click="showInfo" v-if="showFirstStep">
          <img src="../assets/PatyLogo.png" />
        </div>
        <div class="second-step" @click="showInfo" v-else-if="showSeconfStep">
          <div class="billboard">公佈欄｜BillBoard</div>
          <div class="hotActivity">活動精選｜Hot Activities</div>
        </div>
      </transition>
    </div>
    <div class="bg-image opacity-set" :style="backgroundimg"></div>

    <TestChat :openModal="bShowChat" @close-modal="bShowChat = false" />
  </main>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import TestChat from "./TestChat.vue";
import { useQuasar } from "quasar";
export default {
  setup() {
    const $q = useQuasar();
    function openLoginDialog() {
      $q.dialog({
        component: LoginModal,
        // componentProps: {
        //   message: "something",
        // },
      })
        .onOk(() => {
          console.log("OK");
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    }

    return { openLoginDialog };
  },
  components: {
    TestChat,
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
      bShowChat: false,
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
