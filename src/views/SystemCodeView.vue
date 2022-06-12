<template>
  <main id="SystemCodeView">
    <div class="container">
      <div class="main">
        <div>
          <q-card v-for="(data, idx) in codeMst" :key="idx"
                  v-ripple
                  class="cardMst my-box cursor-pointer q-hoverable" @click="cardClick(data.keyword)">
            <span class="q-focus-helper"></span>
            <q-card-section>
              {{ data.name }} <br>
              {{ data.keyword }}
            </q-card-section>
          </q-card>
        </div>
        <div class="dtlDiv">
          <q-btn>asdasd</q-btn>
          <q-btn>asdasd</q-btn>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted, reactive } from "vue";
import { apiGetCodeMstList } from "../apis/api/userRequest";
import { sysCodeMst } from "../apis/type"
export default {
  setup() {
    const codeMst:sysCodeMst[] = reactive([]);

    onMounted(() => {
      getCodeMst();
    });

    function getCodeMst() {
      apiGetCodeMstList().then((response:any) => {
        response.data.forEach((object: any) => {
            codeMst.push(object);
          }); 
      });
    }


    function cardClick(keyWord:any){
      console.log("keyWord:"+keyWord);
    }

    return {
      codeMst,
      getCodeMst,
      cardClick
    }
  },

  components: {
  },
};
</script>
