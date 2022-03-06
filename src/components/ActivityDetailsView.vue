<template>
  <div id="ActivityDetailsView">
     <q-carousel ref="test"
        animated
        v-model="slide"
        arrows
        navigation
        infinite
      >
        <q-carousel-slide v-for="x in images"
          :key="x.id"
          :name="x.id"
          :img-src="x.img"
        />
      </q-carousel>
    <div class="main">
      <!-- <q-img
        :src="appendixPath"
        height="360px"
        width="900px"
      /> -->
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
            <label>NT {{ cost }}</label>
          </div>
          <div class="icon_info">
            <q-icon class="display" size="30px" name="schedule" />
            <div class="icon_text">活動時長</div>
            <label>5-6小時</label>
          </div>
          <div class="icon_info">
            <q-icon class="display" size="30px" name="timer" />
            <div class="icon_text">報名截止倒數</div>
            <label>{{ signUpEdDate }}</label>
          </div>
        </div>
        <div class="C2">
          <div class="C2_L">
            <div class="C2_L_1">
              <div class="C2_L_1_L">創辦人</div>
              <div class="user_name">{{ createUserName }}</div>
            </div>
            <div class="C2_L_2">
              <q-btn class="C2_L_btn" icon="favorite">收藏</q-btn>
              <q-btn class="C2_L_btn" icon="share">分享</q-btn>
            </div>
          </div>
          <q-btn class="btn-apply" icon="person_add_alt_1">我要報名</q-btn>
        </div>
      </div>
      <div class="title">{{ eventTitle }}</div>
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
              {{ eventIntroduction }}
            </q-tab-panel>
            <q-tab-panel name="two">
              {{ eventDetail }}
            </q-tab-panel>
            <q-tab-panel name="three">
              {{ eventAttantion }}
            </q-tab-panel>
            <q-tab-panel name="four"> </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref} from "vue";
import { defineProps } from "vue";
import { defineEmits } from "vue";
import { apiGetEvent } from "@/apis/api/userRequest.ts";
// import { apiGetEventAppendix } from "@/apis/api/userRequest.ts";
import store from "@/store";
import jwt_decode from "jwt-decode";

/********************const variable********************/

// const temp = defineProps(["preview"]);
// const preview = temp.preview ? temp.preview[0].__img.currentSrc : "";
const tab = ref("one");
const token = store.getters.getUserStore.sToken; // 取得token
const decoded = jwt_decode(token); // 解析token
const createUserName = decoded["userName"]; // 活動創建人姓名
const cost = ref(""); // 參與費用
const signUpEdDate = ref(""); // 報名截止倒數
const eventTitle = ref("");   // 活動標題
const eventIntroduction = ref("");  // 活動簡介
const eventDetail = ref("")   // 活動細項
const eventAttantion = ref("")  // 注意事項
// const appendixPath = ref("");
const eventId = defineProps(["allChildPara"]);
const emit = defineEmits(["get-para"]);
const slide = ref(1);
const test = ref();
const images =  ref([]);

/********************const variable end********************/

let id = eventId.allChildPara.id ? eventId.allChildPara.id : 0;
getEvent(); // 進入此頁面後先讀取活動資訊(創建活動時)



/********************methods********************/

// 讀取活動資訊
function getEvent() {
  apiGetEvent(id).then((response) => {
    let eventObj = response.data.eventDtl;
    console.log(eventObj);

    // 報名截止倒數處理
    let newDate = new Date();
    let dateTemp = new Date(eventObj.signUpEdDate);
    let difference = (dateTemp.getTime() - newDate.getTime()) / 1000;
    let signUpEdDateStr = formatSecToStr(difference);
    
    // 將資料帶回畫面
    cost.value = eventObj.cost;
    eventTitle.value = eventObj.eventTitle;
    eventIntroduction.value = eventObj.eventIntroduction;
    eventDetail.value = eventObj.eventDetail;
    eventAttantion.value = eventObj.eventAttantion;
    signUpEdDate.value = signUpEdDateStr;
    // appendixPath.value = "https://localhost:5001" + response.data.eventAppendixList[0].appendixPath;
    response.data.eventAppendixList.forEach(function (value, index) {
      images.value.push({id:index + 1, img:"https://localhost:5001" + value.appendixPath});
    });
  });

  // 與父元件參數做連結
  emit("get-para", {
  });
}

// 將日期相差秒數轉為"幾天幾小時幾分幾秒"顯示
function formatSecToStr(seconds) {
  let daySec = 24 * 60 * 60;
  let hourSec = 60 * 60;
  let minuteSec = 60;
  let dd = Math.floor(seconds / daySec);
  let hh = Math.floor((seconds % daySec) / hourSec);
  let mm = Math.floor((seconds % hourSec) / minuteSec);
  let ss = Math.round(seconds % minuteSec);
  if (dd > 0) {
    return dd + "天" + hh + "小時" + mm + "分鐘" + ss + "秒";
  } else if (hh > 0) {
    return hh + "小時" + mm + "分鐘" + ss + "秒";
  } else if (mm > 0) {
    return "分鐘" + ss + "秒";
  } else {
    return ss + "秒";
  }
}

// function test() {
//   console.log(preview.preview);
// }

/********************methods end********************/
</script>
