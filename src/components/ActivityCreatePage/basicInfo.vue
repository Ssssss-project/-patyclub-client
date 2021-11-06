<template>
  <div class="basicInfo">
    <div class="page-title">活動基本資料</div>
    <div class="text-title">活動名稱</div>
    <q-input v-model="eventIntroduction" class="input-title" @update:modelValue="event => getitle(event)"  borderless placeholder="30字以內"/>
    <div class="text-category">活動類別</div>
    <q-select class="select-category" v-model="eventCategory" :options="options" borderless/>
    <div class="row">
      <div class="column">
        <div class="text-date">活動日期</div>
        <div class="select-date">
          <q-input v-model="eventDate" borderless>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="eventDate" color="yellow-9">
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
          <q-file bottom-slots v-model="dataField" counter max-files="12" borderless>
            <template v-slot:append>
              <q-icon v-if="dataField !== null" name="close" @click="dataField = null" class="cursor-pointer" />
              <q-icon name="create_new_folder" @click.stop />
            </template>
            <template v-slot:hint />
          </q-file>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// const variable
const eventIntroduction = ref("");
const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const eventCategory = ref("");
const eventDate = ref("");
const dataField = ref(null);


// set now date
let newdate = new Date();
let year = newdate.getFullYear();
let month = newdate.getMonth() + 1 < 10? "0" + (newdate.getMonth() + 1): newdate.getMonth() + 1;
let date  = newdate.getDate() < 10? "0" + newdate.getDate(): newdate.getDate();
eventDate.value =  year + "/" + month + "/" + date;


// methods
function getitle(event){
  this.$emit("get-title", {
    event: event
  })
}

</script>

