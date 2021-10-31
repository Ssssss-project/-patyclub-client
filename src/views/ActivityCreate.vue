<template>
  <div id="ActivityCreate">
    <div class="mainContainer">
      <q-stepper class="no-shadow" v-model="step" ref="stepper" alternative-labels animated active-color="themeColor" done-color="completed">
        <q-step :name="1" title="活動基本資料" icon="settings" :done="step > 1">
          <basicInfo @get-title="getTitle"></basicInfo>
        </q-step>

        <q-step :name="2" title="報名表設計" icon="assignment" :done="step > 2">
          <formDesign></formDesign>
        </q-step>

        <q-step :name="3" title="完成" icon="thumb_up_off_alt" :done="step > 3">
          <designCompleted></designCompleted>
        </q-step>

        <q-step :name="4" title="預覽" icon="visibility" :done="step > 4">
          <preview></preview>
        </q-step>

        <q-step :name="5" title="送出申請" icon="add_comment" :done="step > 5" disable>
        </q-step>

        <q-step :name="6" title="審核中" icon="preview" :done="step > 6">
          <review></review>
        </q-step>

        <q-step :name="7" title="審核通過" icon="fact_check" :done="step > 7">
          <reviewPass></reviewPass>
        </q-step>

        <q-step :name="8" title="發布" icon="send" :done="step > 8">
          <release></release>
        </q-step>

        <template v-slot:navigation>
          <q-stepper-navigation>
            <q-btn class="btn-next-step" @click="$refs.stepper.next()" :label="step === 8 ? 'Finish' : 'Continue'" flat></q-btn>
            <q-btn v-if="step > 1" flat @click="$refs.stepper.previous()" label="Back" class="q-ml-sm"></q-btn>
            <br /><br />
            <q-btn class="btn-next-step" @click="save()">儲存</q-btn>
          </q-stepper-navigation>
        </template>

      </q-stepper>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { apiSaveActivityData} from "@/apis/api/userRequest.ts";
import basicInfo from "@/components/ActivityCreatePage/basicInfo.vue";
import formDesign from "@/components/ActivityCreatePage/formDesign.vue";
import designCompleted from "@/components/ActivityCreatePage/designCompleted";
import preview from "@/components/ActivityCreatePage/preview";
import review from "@/components/ActivityCreatePage/review";
import reviewPass from "@/components/ActivityCreatePage/reviewPass";
import release from "@/components/ActivityCreatePage/release";

export default {
  components: {
    basicInfo,
    formDesign,
    designCompleted,
    preview,
    review,
    reviewPass,
    release,
  },
  setup() {
    return {
      step: ref(1),
      sActivityTitle: ref("")
    };
  },
  methods: {
    save() {
      apiSaveActivityData({
        id: 1,
        eventIntroduction: this.sActivityTitle,
      }).then((response) => {
        if (response.status == 200) {
          alert("儲存成功");
        }
      });
    },
    getTitle({event}) {
      this.sActivityTitle = event;
      console.log(this.sActivityTitle);
    },
  }
};
</script>