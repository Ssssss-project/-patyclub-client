<template>
  <div id="ActivityDetailsView">
    <div class="main">
      <!-- <q-img :src="preview" height="300px" width="700px"/> -->
      <q-img
        src="https://placeimg.com/500/300/nature"
        height="360px"
        width="900px"
      />
      <br />
      <div class="action_display">
        <div class="C1">
          <div class="icon_info">
            <q-icon class="display" size="30px" name="person" />
            <div class="icon_text">目前人數</div>
            <label>39/50</label>
          </div>
          <div class="icon_info">
            <q-icon class="display" size="30px" name="monetization_on" />
            <div class="icon_text">參與費用</div>
            <label>NT 150</label>
          </div>
          <div class="icon_info">
            <q-icon class="display" size="30px" name="schedule" />
            <div class="icon_text">活動時長</div>
            <label>5-6小時</label>
          </div>
          <div class="icon_info">
            <q-icon class="display" size="30px" name="timer" />
            <div class="icon_text">報名截止倒數</div>
            <label>5天12小時</label>
          </div>
        </div>
        <div class="C2">
          <div class="C2_L">
            <div class="C2_L_1">
              <div class="C2_L_1_L">創辦人</div>
            </div>
            <div class="C2_L_2">
              <q-btn class="C2_L_btn" icon="favorite">收藏</q-btn>
              <q-btn class="C2_L_btn" icon="share">分享</q-btn>
            </div>
          </div>
          <q-btn class="btn-apply" icon="person_add_alt_1">我要報名</q-btn>
        </div>
      </div>
      <div class="title">我是標題，鳶嘴山一日攻頂教學</div>
      <div class="q-pa-md">
      <q-card class="main_tab">
        <q-tabs v-model="tab" class="tab_title">
          <q-tab label="活動簡介" name="one" />
          <q-tab label="活動細項" name="two" />
          <q-tab label="注意事項" name="three" />
          <q-tab label="其他附件" name="four" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="one">
            The QCard component is a great way to display important pieces of
            grouped content.
          </q-tab-panel>
          <q-tab-panel name="two">
            With so much content to display at once, and often so little screen
            real-estate, Cards have fast become the design pattern of choice for
            many companies, including the likes of Google and Twitter.
          </q-tab-panel>
          <q-tab-panel name="three">
          </q-tab-panel>
          <q-tab-panel name="four">
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
    </div>
  </div>
</template>

<style>
</style>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";

const temp = defineProps(["preview"]);
const preview = temp.preview ? temp.preview[0].__img.currentSrc : "";
const tab = ref("one");

function test() {
  console.log(preview.preview);
}
</script>
