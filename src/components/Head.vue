<template>
  <header
    id="Head"
    :class="isHomepage ? 'home_bg' : 'normalbg'"
  >
    <router-link :to="`/`">
      <img
        class="homelogo"
        src="../assets/PatyIcon.png"
        v-if="isHomepage === false"
      />
      <img
        class="homelogo"
        style="width:55px"
        src="../assets/PatyIcon-white.png"
        v-if="isHomepage"
      />
    </router-link>
    <div style="margin-right: 30px;">
      <button
        :class="isHomepage ? 'btns-home' : 'btns'"
        @click="testToken()"
      >測試token</button>
      <button
        :class="isHomepage ? 'btns-home' : 'btns'"
        @click="bShowChat = true"
      >測試聊天室</button>
      <router-link :to="`/activityView/0`">
        <button :class="isHomepage ? 'btns-home' : 'btns'">所有活動</button>
      </router-link>
      <!-- <router-link :to="`/activityCreate`"> -->
      <button
        :class="isHomepage ? 'btns-home' : 'btns'"
        @click="loginChick"
      >創建活動</button>
      <!-- </router-link> -->
      <button
        v-if="!personalInfo"
        :class="isHomepage ? 'btns-home' : 'btns'"
        @click="openLoginDialog"
      >
        登入
      </button>
      <q-btn
        v-if="personalInfo"
        :icon-right="personalInfo.headStickerPath"
        no-caps
        flat
        :class="isHomepage ? 'afterLoginBtn-home' : 'afterLoginBtn'"
        :label="'Hi, ' + personalInfo.name"
      >
        <q-menu
          id="UserOption"
          transition-show="flip-right"
          transition-hide="flip-left"
          anchor="bottom middle"
          self="top middle"
          style="background:none;box-shadow:none"
        >
          <div class="main">
            <div class="triangle" />
            <q-list class="list">
              <router-link :to="`/UserProfile/personalInfo`">
                <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section avatar>
                    <q-icon :name="getImg('set')" />
                  </q-item-section>
                  <q-item-section caption>
                    <q-item-label>設定</q-item-label>
                  </q-item-section>
                </q-item>
              </router-link>
              <router-link :to="`/UserProfile/activities`">
                <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section avatar>
                    <q-icon :name="getImg('activities')" />
                  </q-item-section>
                  <q-item-section caption>
                    <q-item-label>我的活動</q-item-label>
                  </q-item-section>
                </q-item>
              </router-link>
              <router-link :to="`/UserProfile/achievement`">
                <q-item
                  clickable
                  v-close-popup
                >
                  <q-item-section avatar>
                    <q-icon :name="getImg('achievement')" />
                  </q-item-section>
                  <q-item-section caption>
                    <q-item-label>成就系統</q-item-label>
                  </q-item-section>
                </q-item>
              </router-link>
              <router-link :to="`/`">
                <q-item
                  clickable
                  v-close-popup
                  @click="logOut()"
                >
                  <q-item-section avatar>
                    <q-icon :name="getImg('logOut')" />
                  </q-item-section>
                  <q-item-section caption>
                    <q-item-label>登出</q-item-label>
                  </q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </div>
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
          v-model="sendText"
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
import { ref, onMounted, watch } from "vue";
import * as signalR from "@aspnet/signalr";
import jwt_decode from "jwt-decode";
import { apiGetUserProfile } from "@/apis/api/userRequest.ts";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
export default {
  setup() {
    const $q = useQuasar();
    const personalInfo = ref(null);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const isHomepage = ref(true);

    onMounted(() => {
      checkIsLogin();
    });

    watch(route, (curVal) => {
      isHomepage.value = curVal.path === "/";
    });

    function openLoginDialog() {
      $q.dialog({
        component: LoginDialog,
      }).onOk((response) => {
        let decoded = jwt_decode(response.token);
        console.log("token :" + response.token);
        console.log("token decode:" + JSON.stringify(decoded, null, 2));
        // 儲存token
        store.dispatch("setAuth", {
          sToken: response.token,
          bIsLogin: true,
        });
        // 取得使用者資訊
        apiGetUserProfile({ userAccount: decoded.account }).then(
          (profileResponse) => {
            console.log(
              "profile:" + JSON.stringify(profileResponse.data, null, 2)
            );
            personalInfo.value = profileResponse.data;
            if (personalInfo.value.headStickerPath == "") {
              personalInfo.value.headStickerPath =
                "img:" + require(`@/assets/icon/numberOfPeople.svg`);
            } else {
              personalInfo.value.headStickerPath =
                "img:https://localhost:5001" +
                personalInfo.value.headStickerPath;
            }
          }
        );
      });
    }

    function loginChick() {
      let token = store.getters.getUserStore.sToken; // 取得token
      if (token != "") {
        router.push({ path: "/activityCreate" });
      } else {
        $q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "請先登入!",
        });
      }
    }

    const bShowChat = ref(false);
    const hubConnection = ref(
      new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:5001/hub/test")
        .build()
    );
    const sendText = ref("");
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
        .send("SendMessage", sendFrom.value, sendText.value)
        .then(() => {
          console.log("send msg");
          console.log(sendFrom.value + " // " + sendText.value);
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

    function checkIsLogin() {
      let userStore = store.getters.getUserStore;
      if (userStore.bIsLogin) {
        // 取得使用者資訊
        apiGetUserProfile({
          userAccount: store.getters.getUserInfo.account,
        }).then((profileResponse) => {
          personalInfo.value = profileResponse.data;
          if (personalInfo.value.headStickerPath == "") {
            personalInfo.value.headStickerPath =
              "img:" + require(`@/assets/icon/numberOfPeople.svg`);
          } else {
            personalInfo.value.headStickerPath =
              "img:https://localhost:5001" + personalInfo.value.headStickerPath;
          }
        });
      } else {
        personalInfo.value = null;
      }
    }

    function logOut() {
      store
        .dispatch("setAuth", {
          sToken: "",
          bIsLogin: false,
        })
        .then(() => {
          checkIsLogin();
        });
    }
    function testToken() {
      store.dispatch("refreshAndSetAuth");
    }

    function getImg(name) {
      return "img:" + require(`@/assets/icon/${name}.svg`);
    }

    connectHub();
    listenHub();

    return {
      personalInfo,
      sendFrom,
      sendText,
      receiveMsg,
      bShowChat,
      openLoginDialog,
      connectHub,
      clickSubmit,
      listenHub,
      checkIsLogin,
      logOut,
      testToken,
      getImg,
      loginChick,
      isHomepage,
    };
  },
  components: {},
};
</script>
