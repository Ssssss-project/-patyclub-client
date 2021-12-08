<template>
  <div class="basicInfo">
    <div class="page-title">活動基本資料</div>
    <div class="text-title">活動名稱</div>
    <q-input v-model="eventTitle" class="input-title" @update:modelValue="event => getPara('eventTitle',event)"  borderless placeholder="30字以內"/>
    <div class="row">
      <div class="column">
        <div class="text-date">活動日期</div>
        <div class="select-date">
          <q-input v-model="eventStDate" @update:modelValue="event => getPara('eventStDate',event)"  borderless>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="eventStDate" @update:modelValue="event => getPara('eventStDate',event)" color="yellow-9">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="#deb06b" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="column">
        <div class="text-field">其他附件</div>
        <div class="file-field">
          <q-file multiple append bottom-slots v-model="dataField" counter max-files="12" borderless>
            <template v-slot:append>
              <q-icon v-if="dataField !== null" name="close" @click="dataField = null" class="cursor-pointer" />
              <q-icon name="create_new_folder" @click.stop />
            </template>
            <template v-slot:hint />
          </q-file>
        </div>
      </div>
    </div>
    <div class="text-image">活動圖片</div>
    <q-uploader class="uploader-image" :factory="factoryFn" multiple append url="https://localhost:5001/api/Event/dataUpload"/>
    <div class="text-introduction">活動簡介</div>
    <q-input class="input-introduction" v-model="eventIntroduction" @update:modelValue="event => getPara('eventIntroduction',event)" filled type="textarea"/>
    <div class="row">
      <div class="column">
        <div class="text-category">活動類別</div>
        <q-select class="select-category" v-model="eventCategory" :options="options" borderless/>
      </div>
      <div class="column">
        <div class="text-ageLimit">年齡限制</div>
        <q-select class="select-ageLimit" v-model="ageLimit" :options="options" borderless/>
      </div>
    </div>
    <div class="row">
      <div class="column">
        <div class="text-numberLimit">人數限制</div>
        <q-input class="input-numberLimit" v-model="numberLimit" borderless/>
      </div>
      <div class="column">
        <div class="text-cost">參與費用</div>
        <q-input class="input-cost" v-model="cost" @update:modelValue="event => getPara('cost',event)" borderless/>
      </div>
    </div>
    <div class="text-addTag">增加標籤</div>
    <q-input class="input-addTag" v-model="tag"  borderless/>
  </div>

  <q-img :src="preview" height="300px" width="700px"/>
 
</template>

<script setup>
import { ref } from "vue";
import { defineEmits } from 'vue'

// const variable
const eventTitle = ref("");
const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const eventCategory = ref("");
const eventStDate = ref("");
const dataField = ref(null);
const ageLimit = ref("");
const numberLimit = ref("");
const cost = ref("");
const tag = ref("");
const eventIntroduction = ref("");
const emit = defineEmits(['get-para']);
const preview = ref(null);

let savePara = {};
// set now date
let newdate = new Date();
let year = newdate.getFullYear();
let month = newdate.getMonth() + 1 < 10? "0" + (newdate.getMonth() + 1): newdate.getMonth() + 1;
let date  = newdate.getDate() < 10? "0" + newdate.getDate(): newdate.getDate();
eventStDate.value =  year + "/" + month + "/" + date;
getPara('eventStDate', eventStDate.value);


// methods
function getPara(key, event){
  switch(key){
    case 'eventTitle':
      savePara.eventTitle = event;
      break;

    case 'eventStDate':
      savePara.eventStDate = event;
      break;

    case 'eventIntroduction':
      savePara.eventIntroduction = event;
      break;

    case 'cost':
      savePara.cost = event;
      break;
    
    default:
      break;
  }

  emit('get-para', {
    event: savePara
  })
}

function factoryFn (file) {
  // return new Promise((resolve, reject) => {
  //   // Retrieve JWT token from your store.
  //   const token = "myToken";
  //   resolve({
  //     url: 'https://localhost:5001/api/Event/dataUpload',
  //     method: 'POST',
  //     headers: [
  //       { name: 'Authorization', value: `Bearer ${token}` }
  //     ]
  //   })
  // })
  preview.value = file[0].__img.currentSrc;
}

</script>

