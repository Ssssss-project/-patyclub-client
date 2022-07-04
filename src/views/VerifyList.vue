<template>
  <main id="VerifyPage">
    <div class="container">
      <div class="btn-list">
        <q-btn
          @click="selectALL"
          :class="btnSearch==='ALL' ? 'clicked-btn' : ''"
        >全部</q-btn>
        <div class="line"></div>
        <q-btn
          @click="selectAUDIT"
          :class="btnSearch==='AUDIT' ? 'clicked-btn' : ''"
        >待審</q-btn>
        <q-btn
          @click="selectAUDITPASS"
          :class="btnSearch==='AUDITPASS' ? 'clicked-btn' : ''"
        >已審</q-btn>
        <q-btn>上呈</q-btn>
        <div class="line"></div>
        <q-input
          :dense="true"
          class="search"
          outlined
          v-model="stringSearch"
          @keydown.enter.prevent="SearchEvent"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <table class="list-table">
        <tr>
          <th>活動名稱</th>
          <th>活動資訊</th>
          <th>狀態</th>
        </tr>
        <tr v-if="allEvent.length===0">
          <td colspan="3">查無活動</td>
        </tr>
        <tr
          v-else
          v-for="(event,index) in allEvent"
          :key="index"
        >
          <td>{{event.eventTitle}}</td>
          <td>{{event.eventStDate}}</td>
          <td>{{event.statusDesc}}</td>
        </tr>

      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { ref, Ref, onMounted } from "vue";
import { EventType } from "@/apis/type";
import { apiGetEventWithCondition } from "@/apis/api/userRequest";
export default {
  setup() {
    const allEvent: Ref<EventType[]> = ref([]);
    const stringSearch: Ref<string> = ref("");
    const btnSearch: Ref<string> = ref("ALL");

    const getEventWithCondition = () => {
      apiGetEventWithCondition({}).then((response: any) => {
        allEvent.value = response.data;
      });
    };

    const SearchEvent = () => {
      apiGetEventWithCondition({
        queryList: [stringSearch.value],
      }).then((response: any) => {
        allEvent.value = response.data;
      });
    };

    const selectALL = () => {
      getEventWithCondition();
      btnSearch.value = "ALL";
    };

    const selectAUDIT = () => {
      btnSearch.value = "AUDIT";
      apiGetEventWithCondition({
        status: "AUDIT",
        queryList: [stringSearch.value],
      }).then((response: any) => {
        allEvent.value = response.data;
      });
    };

    const selectAUDITPASS = () => {
      btnSearch.value = "AUDITPASS";
      apiGetEventWithCondition({
        status: "AUDIT_PASS",
        queryList: [stringSearch.value],
      }).then((response: any) => {
        allEvent.value = response.data;
      });
    };

    onMounted(() => {
      getEventWithCondition();
    });

    return {
      allEvent,
      stringSearch,
      btnSearch,
      SearchEvent,
      selectALL,
      selectAUDIT,
      selectAUDITPASS,
    };
  },
};
</script>
