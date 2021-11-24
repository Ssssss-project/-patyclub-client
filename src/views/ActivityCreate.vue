<template>
  <main id="ActivityCreate">
    <div class="main-bar">
      <button class="btns" @click="bShowChat = true">測試聊天室</button>
      <button class="btns">所有活動</button>
      <router-link :to="`/activityCreate`">
          <button class="btns">創建活動</button>
      </router-link>
      <button class="btns" @click="openLoginDialog">登入</button>
    </div>
    <div class="mainContainer">
      <q-stepper class="no-shadow" v-model="step" ref="stepper" alternative-labels animated active-color="themeColor" done-color="completed">

        <q-step :name="1" class="childComponent" title="活動基本資料" icon="settings" :done="step > 1">
          <basicInfo @get-para="getPara"></basicInfo>
        </q-step>

        <q-step :name="2" class="childComponent" title="報名表設計" icon="assignment" :done="step > 2">
          <formDesign></formDesign>
        </q-step>

        <q-step :name="3" class="childComponent" title="預覽" icon="visibility" :done="step > 4">
          <preview></preview>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn class="btn-step" @click="$refs.stepper.next()" :label="step === 8 ? 'Finish' : 'Continue'" flat></q-btn>
            <q-btn v-if="step > 1" flat @click="$refs.stepper.previous()" label="Back" class="btn-step" style="margin-left:5px;"></q-btn>
            <br/>
            <q-btn class="btn-step" style="margin-top:5px;" @click="save">儲存</q-btn>
          </q-stepper-navigation>
        </template>

      </q-stepper>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
// import { apiSaveEventData } from "@/apis/api/eventRequest.ts";
import basicInfo from "@/components/ActivityCreatePage/basicInfo.vue";
import formDesign from "@/components/ActivityCreatePage/formDesign.vue";
import preview from "@/components/ActivityCreatePage/preview";

const step = ref(1);

let allChildPara = {};


function save() {
  // apiSaveEventData(allChildPara.basicInfo).then((response) => {
  //   if (response.status == 200) {
  //     alert("儲存成功");
  //   }
  // });
}

// 取得子元件emit
function getPara({event}) {
  allChildPara.basicInfo = event;
}

</script>