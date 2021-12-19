<template>
  <q-img :src="preview" height="300px" width="700px"/>
  <!-- <q-img
    src="https://placeimg.com/500/300/nature"
    height="300px"
    width="700px"
  /> -->
  <br />

  <q-icon class="test2" size="30px" style="margin-left: 10px" name="person" />
  <q-icon class="test2" size="30px" name="person" />
  <q-icon class="test2" size="30px" name="person" />
  <q-icon class="test2" size="30px" name="person" />
  <q-btn class="btn-temp1" @click="test"></q-btn>
  <q-btn class="btn-temp2" @click="test">我要報名</q-btn>
</template>

<style>
.test2 {
  border-radius: 999em;
  color: white;
  background-color: #945b47;
  margin-left: 45px;
  margin-top: -18px;
}

.btn-temp1 {
  background: #deb06b;
  border: 1.5px solid #402e32;
  box-sizing: border-box;
  border-radius: 2px;
  width: 135px;
  height: 38px;
  font-size: 9px;
  line-height: 16px;
  color: #402e32;
  margin-top: -10px;
  margin-left: 150px;
}

.btn-temp2 {
  background: #deb06b;
  border: 1.5px solid #402e32;
  box-sizing: border-box;
  border-radius: 2px;
  width: 135px;
  height: 69px;
  font-size: 9px;
  line-height: 16px;
  color: #402e32;
  margin-top: 20px;
  margin-left: 7px;
}
</style>

<script setup>
import { defineProps } from "vue";

const temp = defineProps(["preview"]);
const preview = temp.preview ? temp.preview[0].__img.currentSrc : "";

function test() {
  console.log(preview.preview);
}
</script>
