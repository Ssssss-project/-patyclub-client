<template>
  <main id="ActivityCreate">
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

        <!-- <q-step
          :name="2"
          class="childComponent"
          title="報名表設計"
          icon="assignment"
          :done="step > 2"
        >
          <formDesign />
        </q-step> -->

        <q-step
          :name="2"
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
              v-if="step > 1"
              flat
              @click="$refs.stepper.previous()"
              label="Back"
              class="btn-step"
              style="margin-left: 5px"
            ></q-btn>
            <q-btn
              class="btn-step"
              @click="$refs.stepper.next()"
              :label="step === 8 ? 'Finish' : 'Continue'"
              flat
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
import { ref } from "vue";
import { apiSaveEventData } from "@/apis/api/userRequest.ts";
import { apiUpdateEventData } from "@/apis/api/userRequest.ts";
import basicInfo from "@/components/ActivityCreatePage/basicInfo.vue";
// import formDesign from "@/components/ActivityCreatePage/formDesign.vue";
import ActivityDetailsView from "@/components/ActivityDetailsView";

const step = ref(1);

let allChildPara = {};
let eventId = 0;

createdSave(); // 進入畫面後自動新建一筆活動




/********************methods********************/

// 進入畫面時自動儲存
function createdSave() {
  apiSaveEventData().then((response) => {
    eventId = response.data.id;
    console.log("created ok");
  });
}

// 儲存按鈕
function save() {
  allChildPara.basicInfo.id = eventId;  // EventMst id

  // 處理後端接收用的eventAppendixList資料
  let eventAppendixTemp = {};
  let eventAppendixArray = [];
  allChildPara.eventAppendixList.appendixPath.forEach(function (value, index) {
    // 根據appendixPath的數量建立同等數量的array, 並在每筆array加入eventMstId
    eventAppendixTemp.eventMstId = eventId;
    eventAppendixTemp.appendixPath = value;
    eventAppendixArray[index] = eventAppendixTemp;
  });

  let Event = {};
  Event.eventMst = allChildPara.basicInfo;
  Event.eventAppendixList = eventAppendixArray;

  apiUpdateEventData(Event).then(() => {
    alert("儲存成功");
  });

  // console.log(allChildPara);
  // factoryFn(allChildPara.basicInfo.preview);
}

// function factoryFn(file) {
//   console.log(file);
//   return new Promise((resolve, reject) => {
//     resolve({
//       url: "https://localhost:5001/api/Event/dataUpload",
//       method: "POST",
//     });
//   });
// }

// 取得子元件emit
function getPara({ event, file }) {
  allChildPara.basicInfo = event;
  allChildPara.eventAppendixList = file;
}

/********************methods end********************/
</script>