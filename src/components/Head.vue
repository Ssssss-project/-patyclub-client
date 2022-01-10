<template>
  <header id="Head">
    <router-link :to="`/`">
      <img
        class="homelogo"
        src="../assets/PatyIcon.png"
      >
    </router-link>
    <div>
      <button
        class="btns"
        @click="bShowChat = true"
      >測試聊天室</button>
      <router-link :to="`/activityView`">
        <button class="btns">所有活動</button>
      </router-link>
      <router-link :to="`/activityCreate`">
        <button class="btns">創建活動</button>
      </router-link>
      <button
        v-if="!personalInfo"
        class="btns"
        @click="openLoginDialog"
      >
        登入
      </button>
      <q-btn
        v-if="personalInfo"
        icon-right="img:heartSolid.svg"
        no-caps
        flat
        class="afterLoginBtn"
      >
        Hi, {{ personalInfo.name }}
        <q-menu
          transition-show="flip-right"
          transition-hide="flip-left"
          style="backgroundColor:#deb06b"
        >
          <q-list>
            <q-item
              clickable
              v-close-popup
            >
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section caption>
                <q-item-label>設定</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
            >
              <q-item-section avatar>
                <q-icon name="list_alt" />
              </q-item-section>
              <q-item-section caption>
                <q-item-label>我的活動</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
            >
              <q-item-section avatar>
                <q-icon name="military_tech" />
              </q-item-section>
              <q-item-section caption>
                <q-item-label>成就系統</q-item-label>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
            >
              <q-item-section avatar>
                <q-icon name="exit_to_app" />
              </q-item-section>
              <q-item-section caption>
                <q-item-label>登出</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>
  </header>
  <q-dialog
    v-model="bShowChat"
    :position="position"
  >
    <q-card style="width: 350 px">
      <q-card-section class="column items-center no-wrap">
        <div style="width: 100%">
          <q-chat-message
            v-for="(item, id) in receiveMsg"
            :key="id"
            :name="item.sendFrom"
            :text="item.msg"
            :sent="sendFrom == item.sendFrom"
          />
          <!-- <li>{{item.sendFrom}}  說  {{item.msg}}</li> -->
        </div>

        <q-input
          v-model="sendFrom"
          label="姓名"
        />
        <q-input
          v-model="text"
          label="訊息"
        />
        <q-btn
          flat
          round
          @click="clickSubmit()"
        >發送</q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import LoginDialog from "./LoginDialog.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
import * as signalR from "@aspnet/signalr";
export default {
  setup() {
    const $q = useQuasar();
    const personalInfo = ref(null);
    function openLoginDialog() {
      $q.dialog({
        component: LoginDialog,
      })
        .onOk((response) => {
          personalInfo.value = response;
        })
        .onCancel(() => {
          console.log("Cancel");
        });
    }
    const bShowChat = ref(false);
    const hubConnection = ref(
      new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/hub/test")
        .build()
    );
    const text = ref("");
    const sendFrom = ref("");
    const receiveMsg = ref([
      { sendFrom: "A", msg: ["T1"] },
      { sendFrom: "B", msg: ["T2"] },
      { sendFrom: "A", msg: ["T3"] },
    ]);
    function connectHub() {
      hubConnection.value
        .start()
        .then(() => {
          console.log("hub connection success.");
          listenHub();
        })
        .catch(() => {
          console.log("hub connection failed.");
        });
    }

    function clickSubmit() {
      hubConnection.value
        .send("SendMessage", sendFrom.value, text.value)
        .then(() => {
          console.log("send msg");
        })
        .catch((error) => {
          console.log("msg send error ", error);
        });
    }

    // function closeModal() {
    // this.$emit("close-modal");
    // }

    function listenHub() {
      console.log("listenHub start");
      hubConnection.value.on("SendMessageToClient", (res1, res2) => {
        console.log(res1, res2);
        receiveMsg.value.push({ sendFrom: res1, msg: [res2] });
      });
    }
    connectHub();
    listenHub();

    return {
      personalInfo,
      sendFrom,
      receiveMsg,
      bShowChat,
      openLoginDialog,
      connectHub,
      clickSubmit,
      listenHub,
    };
  },
  components: {},
};
</script>
