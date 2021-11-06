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
          <basicInfo @get-title="getTitle"></basicInfo>
        </q-step>

        <q-step :name="2" class="childComponent" title="報名表設計" icon="assignment" :done="step > 2">
          <formDesign></formDesign>
        </q-step>

        <q-step :name="3" class="childComponent" title="完成" icon="thumb_up_off_alt" :done="step > 3">
          <designCompleted></designCompleted>
        </q-step>

        <q-step :name="4" class="childComponent" title="預覽" icon="visibility" :done="step > 4">
          <preview></preview>
        </q-step>

        <q-step :name="5" class="childComponent" title="送出申請" icon="add_comment" :done="step > 5" disable>
        </q-step>

        <q-step :name="6" class="childComponent" title="審核中" icon="preview" :done="step > 6">
          <review></review>
        </q-step>

        <q-step :name="7" class="childComponent" title="審核通過" icon="fact_check" :done="step > 7">
          <reviewPass></reviewPass>
        </q-step>

        <q-step :name="8" class="childComponent" title="發布" icon="send" :done="step > 8">
          <release></release>
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
import { apiSaveActivityData} from "@/apis/api/userRequest.ts";
import basicInfo from "@/components/ActivityCreatePage/basicInfo.vue";
import formDesign from "@/components/ActivityCreatePage/formDesign.vue";
import designCompleted from "@/components/ActivityCreatePage/designCompleted";
import preview from "@/components/ActivityCreatePage/preview";
import review from "@/components/ActivityCreatePage/review";
import reviewPass from "@/components/ActivityCreatePage/reviewPass";
import release from "@/components/ActivityCreatePage/release";

const step = ref(1);
const sActivityTitle = ref("");

function save() {
  apiSaveActivityData({
    id: 1,
    eventIntroduction: sActivityTitle.value,
  }).then((response) => {
    if (response.status == 200) {
      alert("儲存成功");
    }
  });
}

function getTitle({event}) {
  sActivityTitle.value = event;
  console.log(sActivityTitle.value);
}

</script>