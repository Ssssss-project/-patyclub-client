<template>
    <q-dialog v-model="dialog" :position="position">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">The Walker</div>
            <div class="text-grey">Fitz The Tantrums</div>
          </div>

          <q-space />

          <q-btn flat round icon="fast_rewind" />
          <q-btn flat round icon="pause" />
          <q-btn flat round icon="fast_forward" />
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- <div id="TestChat" v-if="openModal">
        <p>聊天室... 嗎?</p>
        
        <input type = 'text' v-model="inputText"/>
        <button
            @click="clickSubmit()"
        >submit</button>
        <button
            @click="closeModal()"
        >close</button>
    </div> -->
</template>



<script>
import * as signalR from '@aspnet/signalr'
import { ref } from 'vue'
export default {
    setup () {
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
  props: {
    openModal: {
      type: Boolean,
      required: true,
    },
  },

    data() {
        return {
            inputText: "123",
            hubConnection: new signalR.HubConnectionBuilder().withUrl('https://localhost:5001/hub/test').build()
        }
    },

    methods: {
        connectHub: function () {
            this.hubConnection.start().then(()=>{
                console.log('hub connection success.')
            }).catch(()=>{
                console.log('hub connection failed.')
            })
        },

        clickSubmit: function() {
            console.log(this.inputText)
            this.hubConnection.send('SendMessage', this.inputText).then(()=>{
                console.log('send msg');
            }).catch((error)=>{
                console.log('msg send error ', error);
            })
        },

        closeModal() {
        this.$emit("close-modal");
        },

        listenHub() {
            this.hubConnection.on('')
        }
    },

    created() {
        this.connectHub();
    }


}
</script>