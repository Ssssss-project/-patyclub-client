<template>
  <div class="viewActivities-filter">
    <div class="row q-gutter-sm items-center">
      <label>我</label>
      <q-tabs
        v-model="tabMode"
        dense
        align="justify"
        active-class="tab-active-color"
      >
        <q-tab
          class="tab-color"
          label="發佈"
          name="OWNER"
        />
        <q-tab
          class="tab-color"
          label="參加"
          name="MEMBER"
        />
        <q-tab
          class="tab-color"
          label="收藏"
          name="WATCHER"
        />
      </q-tabs>
      <label>的活動</label>
    </div>
    <div class="right-filter">

      <label class="label">篩選</label>
      <q-select
        class="select-category"
        v-model="filter"
        :options="activityFilter"
        borderless
        dense
        options-dense
      />

      <label class="label">排序</label>
      <q-select
        class="select-category"
        v-model="sort"
        :options="activitySort"
        borderless
        dense
        options-dense
      />

    </div>
  </div>
  <div class="q-pt-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="name"
      separator="cell"
      no-data-label="查無活動"
      :loading="loading"
    >
      <template v-slot:body-cell-timeStatus="colValue">
        <q-td>
          <div>
            <q-icon
              :name="getImg(colValue.col.name, colValue.value)"
              size="2em"
            />
            <q-tooltip
              class="bg-amber-14 text-black shadow-4 text-bold text-body2"
              transition-show="rotate"
              transition-hide="rotate"
            >
              {{getToolTips(colValue.col.name, colValue.value)}}
            </q-tooltip>
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted, reactive, watch } from "vue";
import { apiGetEventWithCondition } from "@/apis/api/userRequest";
import { EventList } from "@/apis/type";
export default {
  setup() {
    const statusName: Ref<string> = ref("審核狀態");
    const loading: Ref<boolean> = ref(false);
    const tabMode: Ref<string> = ref("OWNER");

    const activityFilter: string[] = ["活動已結束", "活動報名中"];
    const filter: Ref<string> = ref(activityFilter[0]);

    const activitySort: string[] = ["近期發佈優先", "近期截止優先"];
    const sort: Ref<string> = ref(activitySort[0]);

    const rows: Ref<EventList[]> = ref([]);

    const postEventWithCondition = (eventPersonnel: string) => {
      loading.value = true;
      apiGetEventWithCondition({ eventPersonnel: eventPersonnel }).then(
        (response: any) => {
          loading.value = false;
          rows.value = response.data;
        }
      );
    };

    const columns = reactive([
      {
        name: "categoryName",
        label: "類別",
        field: "categoryName",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "eventTitle",
        label: "活動資訊",
        field: "eventTitle",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "timeStatus",
        label: "活動時間",
        field: "timeStatus",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "user",
        label: "參與者",
        field: "user",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "status",
        label: statusName,
        field: "status",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
    ]);

    onMounted(() => {
      postEventWithCondition("OWNER");
    });

    function getImg(column: string, value: string) {
      let imgName: string = "";
      switch (value) {
        case "comingSoon":
          imgName = "timeOutStage1";
          break;
        case "inProgress":
          imgName = "timeOutStage2";
          break;
        case "expired":
          imgName = "timeOutStage3";
          break;
        default:
          imgName = "timeOutStage3";
          break;
      }
      console.log(column + ".." + value + ".." + imgName);
      return "img:" + require(`@/assets/info/${imgName}.svg`);
    }

    function getToolTips(column: string, value: string) {
      switch (value) {
        case "comingSoon":
          return "活動即將開始";
        case "inProgress":
          return "活動報名中";
        case "expired":
          return "活動已截止";
      }
    }

    watch(tabMode, (val: string) => {
      statusName.value = val == "OWNER" ? "審核狀態" : "活動狀態";
      postEventWithCondition(val);
    });

    return {
      tabMode,
      loading,
      statusName,
      activityFilter,
      filter,
      activitySort,
      sort,
      columns,
      rows,
      postEventWithCondition,
      getImg,
      getToolTips,
    };
  },
};
</script>
