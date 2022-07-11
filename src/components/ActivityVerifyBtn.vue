
<template>
  <div class='out-side-directive'>
    <div
      class="hint-directive"
      v-if="bShowImg"
    >
      <img
        src='@/assets/review/warn.png'
        alt=""
      />
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { toRef } from "vue";
export default {
  props: ["ShowImg"],
  setup(props: any) {
    const bShowImg = toRef(props, "ShowImg");
    console.log(bShowImg.value);
    return {
      bShowImg,
    };
  },
  components: {},
};
</script>
