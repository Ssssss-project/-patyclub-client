<template>
  <div>
    <div class="top-edge">
      <p>活動基本資料</p>
      <br/>
      <button @click="nextStep()">下一步</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    nextStep() {
      this.$parent.goToNextStep("toFormDesign");
    },
  },
};
</script>

