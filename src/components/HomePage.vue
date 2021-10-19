<template>
  <main id="Home">
    <div class="main-bar">

      <button
        class="btns"
        @click="open('top')"
      >測試聊天室</button>
      <button class="btns">所有活動</button>
      <router-link :to="`/activityCreate`">
        <button class="btns">創建活動</button>
      </router-link>
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
          class="first-step"
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
    <!-- <TestChat
      :openModal="bShowChat"
      @close-modal="bShowChat = false"
    /> -->
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350 px">
        <q-card-section class="column items-center no-wrap">
          <div style="width: 100%">
            <q-chat-message
              v-for="(item, id) in receiveMsg" :key="id"
              :name="item.sendFrom"
              :text="item.msg"
              :sent="this.sendFrom==item.sendFrom"
            />
            <!-- <li>{{item.sendFrom}}  說  {{item.msg}}</li> -->
          </div>


          <q-input v-model="sendFrom" label="姓名"/>
          <q-input v-model="text" label="訊息"/>
          <q-btn flat round @click="clickSubmit()">發送</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

  </main>

</template>

<script>
import LoginModal from "./LoginModal.vue";
// import TestChat from "./TestChat.vue";
import { ref } from 'vue';
import * as signalR from '@aspnet/signalr';
export default {
  setup() {
        const dialog = ref(false)
        const position = ref('top')

        return {
        dialog,
        position,

        open (pos) {
            position.value = pos
            dialog.value = true
        }
        }
  },
  components: {
    LoginModal,
    // TestChat,
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
      bShowChat: false,
      hubConnection: new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/hub/test').build(),
      text:'',
      sendFrom:'',
      receiveMsg:[
        {sendFrom: 'A', msg: ['T1']},
        {sendFrom: 'B', msg: ['T2']},
        {sendFrom: 'A', msg: ['T3']},
      ]
    };
  },
  methods: {
    showInfo() {
      this.showFirstStep = false;
      this.showSeconfStep = true;
    },
    routeLoginPage() {},
    connectHub: function () {
            this.hubConnection.start().then(()=>{
                console.log('hub connection success.');
                this.listenHub();
            }).catch(()=>{
                console.log('hub connection failed.');
            })
        },

        clickSubmit: function() {
            this.hubConnection.send('SendMessage', this.sendFrom , this.text).then(()=>{
                console.log('send msg');
            }).catch((error)=>{
                console.log('msg send error ', error);
            })
        },

        closeModal() {
        this.$emit("close-modal");
        },

        listenHub() {
            console.log('listenHub start')
            this.hubConnection.on('SendMessageToClient', (res1, res2)=> {
              console.log(res1, res2);
              this.receiveMsg.push({sendFrom: res1, msg: [res2]})
            })
        }
  },
    created() {
        this.connectHub();
    }
};
</script>
