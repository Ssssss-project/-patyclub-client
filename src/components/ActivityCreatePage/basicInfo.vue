<template>
  <div class="basicInfo">
    <p class="page-title">活動基本資料</p>
    <p class="activity-title">活動名稱</p>
    <q-input v-model="eventIntroduction" class="input-title" @update:modelValue="event => getitle(event)"   borderless placeholder="30字以內"/>
  </div>
</template>

<script setup>
import { ref } from "vue";

const eventIntroduction = ref("");

function getitle(event){
  this.$emit('get-title', {
    event: event
  })
}

</script>

