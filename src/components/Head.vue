<template>
  <header id="Head">
    <button
      class="btns"
      @click="bShowChat = true"
    >測試聊天室</button>
    <button class="btns">所有活動</button>
    <router-link :to="`/activityCreate`">
      <button class="btns">創建活動</button>
    </router-link>
    <button
      class="btns"
      @click="openLoginDialog"
    >登入</button>
  </header>
  <TestChat
    :openModal="bShowChat"
    @close-modal="bShowChat = false"
  />
</template>
<script>
import LoginDialog from "./LoginDialog.vue";
import TestChat from "./TestChat.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
  setup() {
    const $q = useQuasar();
    function openLoginDialog() {
      $q.dialog({
        component: LoginDialog,
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
    const bShowChat = ref(false);

    return {
      bShowChat,
      openLoginDialog,
    };
  },
  components: {
    TestChat,
  },
};
</script>
