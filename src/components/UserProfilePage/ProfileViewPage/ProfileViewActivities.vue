<template>
  <div class="viewActivities-filter">
    <div class="q-gutter-sm">
      <q-btn
        flat
        label="我發佈的活動"
      />
      <q-btn
        flat
        label="我參加的活動"
      />
      <q-btn
        flat
        label="我收藏的活動"
      />
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
    />
  </div>
</template>

<script lang="ts">
import { ref, Ref } from "vue";
export default {
  setup() {
    const activityFilter: string[] = ["活動已結束", "活動報名中"];
    const filter: Ref<string> = ref(activityFilter[0]);

    const activitySort: string[] = ["近期發佈優先", "近期截止優先"];
    const sort: Ref<string> = ref(activitySort[0]);

    const columns = [
      {
        name: "info",
        label: "活動資訊",
        field: "info",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "detail",
        label: "參與者詳細",
        field: "detail",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "status",
        label: "狀態",
        field: "status",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
    ];

    const rows = [
      {
        info: "爬山",
        detail: "路人1",
        status: "已結束",
      },
    ];
    return {
      activityFilter,
      filter,
      activitySort,
      sort,
      columns,
      rows,
    };
  },
};
</script>
