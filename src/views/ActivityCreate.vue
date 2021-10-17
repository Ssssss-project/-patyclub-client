<template>
  <div id="ActivityCreate">
    <div id="createMainBar">
      <div class="create-bar">
        <div class="progress-bar">
          <step-progress ref="progress"></step-progress>
        </div>
      </div>
    </div>
    <component :is="currentCom"></component>
  </div>
</template>

<script>
import basicInfo from "@/components/ActivityCreatePage/basicInfo.vue";
import formDesign from "@/components/ActivityCreatePage/formDesign.vue";
import stepProgress from "@/components/ActivityCreatePage/stepProgessSlider";
import designCompleted from "@/components/ActivityCreatePage/designCompleted";
import preview from "@/components/ActivityCreatePage/preview";
import review from "@/components/ActivityCreatePage/review";
import reviewPass from "@/components/ActivityCreatePage/reviewPass";
import release from "@/components/ActivityCreatePage/release";
export default {
  name: "App",
  components: {
    basicInfo,
    formDesign,
    designCompleted,
    preview,
    review,
    reviewPass,
    release,
    stepProgress,
  },
  data() {
    return {
      currentCom: "basicInfo",
    };
  },
  methods: {
    // 進度修改至下一步
    goToNextStep(stepFlag) {
      // 切換components
      switch (stepFlag) {
        case "toFormDesign":
          this.currentCom = "formDesign";
          break;

        case "toDesignCompleted":
          this.currentCom = "designCompleted";
          break;

        case "toPreview":
          this.currentCom = "preview";
          break;

        case "toReview":
          this.currentCom = "review";
          break;

        case "toReviewPass":
          this.currentCom = "reviewPass";
          break;

        case "toRelease":
          this.currentCom = "release";
          break;

        default:
          break;
      }
      this.$refs.progress.pageChange(stepFlag); // 呼叫子元件方法進行修改進度至下一步
    },
  },
};
</script>

