<template>
    <div id="TestChat" v-if="openModal">
        <p>聊天室... 嗎?</p>
        
        <input type = 'text' v-model="inputText"/>
        <button
            @click="clickSubmit()"
        >submit</button>
        <button
            @click="closeModal()"
        >close</button>
    </div>
</template>



<script>
import * as signalR from '@aspnet/signalr'
export default {
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