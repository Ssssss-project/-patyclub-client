<template>
  <main id="ActivityCreate">
    <Head />
    <div class="mainContainer">
      <q-stepper
        class="no-shadow"
        v-model="step"
        ref="stepper"
        alternative-labels
        animated
        active-color="themeColor"
        done-color="completed"
      >
        <q-step
          :name="1"
          class="childComponent"
          title="活動基本資料"
          icon="settings"
          :done="step > 1"
        >
          <basicInfo :allChildPara="allChildPara" @get-para="getPara" />
        </q-step>

        <q-step
          :name="2"
          class="childComponent"
          title="報名表設計"
          icon="assignment"
          :done="step > 2"
        >
          <formDesign />
        </q-step>

        <q-step
          :name="3"
          class="childComponent"
          title="預覽"
          icon="visibility"
          :done="step > 4"
        >
          <ActivityDetailsView :preview="allChildPara.basicInfo.preview" />
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn
              class="btn-step"
              @click="$refs.stepper.next()"
              :label="step === 8 ? 'Finish' : 'Continue'"
              flat
            ></q-btn>
            <q-btn
              v-if="step > 1"
              flat
              @click="$refs.stepper.previous()"
              label="Back"
              class="btn-step"
              style="margin-left: 5px"
            ></q-btn>
            <br />
            <q-btn class="btn-step" style="margin-top: 5px" @click="save"
              >儲存</q-btn
            >
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </main>
</template>

<script setup>
import Head from "../components/Head.vue";
import { ref } from "vue";
import { apiSaveEventData } from "@/apis/api/userRequest.ts";
import basicInfo from "@/components/ActivityCreatePage/basicInfo.vue";
import formDesign from "@/components/ActivityCreatePage/formDesign.vue";
import ActivityDetailsView from "@/components/ActivityDetailsView";

const step = ref(1);

let allChildPara = {};

function save() {
  apiSaveEventData(allChildPara.basicInfo).then((response) => {
    if (response.status == 200) {
      alert("儲存成功");
    }
  });
  // console.log(allChildPara);
  // factoryFn(allChildPara.basicInfo.preview);
}

function factoryFn(file) {
  console.log(file);
  return new Promise((resolve, reject) => {
    resolve({
      url: "https://localhost:5001/api/Event/dataUpload",
      method: "POST",
    });
  });
}

// 取得子元件emit
function getPara({ event }) {
  allChildPara.basicInfo = event;
}
</script>