<template>
  <div>
    <p>報名表設計</p>
    <br />
    <button @click="nextStep()">下一步</button>
  </div>
</template>

<script>
export default {
  methods: {
    nextStep() {
      this.$parent.goToNextStep("toDesignCompleted");
    },
  },
};
</script>
