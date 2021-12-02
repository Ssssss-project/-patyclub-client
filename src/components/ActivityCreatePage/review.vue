<template>
  <div>
    <p>審核中</p>
    <br />
    <button @click="nextStep()">下一步</button>
  </div>
</template>

<script>
export default {
  methods: {
    nextStep() {
      this.$parent.goToNextStep("toReviewPass");
    },
  },
};
</script>
