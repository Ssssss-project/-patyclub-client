<template>
  <div class="viewActivities-filter">
    <div class="row q-gutter-sm items-center">
      <label style="font-size: large;font-weight: bold;">我</label>
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
      <label style="font-size: large;font-weight: bold;">的活動</label>
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
      :visible-columns="visibleColumns"
      v-model:pagination="pagination"
      hide-pagination
      @row-dblclick="tableDoubleClickHandler"
    >
      <template v-slot:header="">
        <q-tr>
          <q-th
            colspan="1"
            class="table-column-font"
          >類別</q-th>
          <q-th
            colspan="1"
            class="table-column-font"
          >活動資訊</q-th>
          <q-th
            colspan="2"
            class="table-column-font"
          >活動時間</q-th>
          <q-th
            colspan="2"
            class="table-column-font"
          >參與人數</q-th>
          <q-th
            colspan="2"
            class="table-column-font"
          >{{tabMode == "OWNER" ? "審核狀態" : "活動狀態"}}</q-th>
        </q-tr>
      </template>
      <!--活動時間-->
      <template v-slot:body-cell-timeStatus="colValue">
        <q-td align="center">
          <div>
            <label style="font-size:18px">{{colValue.row.eventStDate + " ～ " + colValue.row.eventEdDate}}</label>
          </div>
        </q-td>
      </template>
      <!--活動時間圖例-->
      <template v-slot:body-cell-timeStatusIcon="colValue">
        <q-td align="center">
          <div>
            <q-icon
              style="margin-right:5px"
              :name="getTimeImg(new Date(colValue.row.eventStDate), new Date(colValue.row.eventEdDate))"
              size="3em"
            />
            <q-tooltip
              class="bg-amber-14 text-black shadow-4 text-bold text-body2"
              transition-show="rotate"
              transition-hide="rotate"
            >{{getToolTips(colValue.col.name, colValue.value)}}
            </q-tooltip>
          </div>
        </q-td>
      </template>
      <!--參與者-->
      <template v-slot:body-cell-memberCount="colValue">
        <q-td align="center">
          <div style="display:inline">
            <label style="font-size:18px">{{colValue.row.memberCount + " / " + colValue.row.memberLimit}}</label>
          </div>
        </q-td>
      </template>
      <!--參與者圖例-->
      <template v-slot:body-cell-memberCountIcon="colValue">
        <q-td align="center">
          <div style="display:inline">
            <q-icon
              :name="getMemberImg(colValue.row.memberCount, colValue.row.memberLimit)"
              size="3em"
            >
            </q-icon>
            <q-tooltip
              class="bg-amber-14 text-black shadow-4 text-bold text-body2"
              transition-show="rotate"
              transition-hide="rotate"
            >{{colValue.value + "位參與者"}}
            </q-tooltip>
          </div>
        </q-td>
      </template>
      <!--審核狀態-->
      <template v-slot:body-cell-statusDesc="colValue">
        <q-td align="center">
          <div style="display:inline">
            <q-icon
              :name="getImg(colValue.col.name, colValue.value)"
              size="3em"
            >
            </q-icon>
            <q-tooltip
              class="bg-amber-14 text-black shadow-4 text-bold text-body2"
              transition-show="rotate"
              transition-hide="rotate"
            >{{colValue.value}}
            </q-tooltip>
          </div>
        </q-td>
      </template>
      <!--活動狀態-->
      <template v-slot:body-cell-activityStatus="colValue">
        <q-td align="center">
          <div style="display:inline">
            <q-icon
              :name="getActivityImg(colValue.value)"
              size="3em"
            >
            </q-icon>
            <q-tooltip
              class="bg-amber-14 text-black shadow-4 text-bold text-body2"
              transition-show="rotate"
              transition-hide="rotate"
            >{{colValue.value == "expired" ? "已截止" : "即將開始或進行中"}}
            </q-tooltip>
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="row justify-center q-mt-md">
      <q-pagination
        class="pagination"
        v-model="pagination.page"
        color="orange-12"
        :min="1"
        :max="pagesNumber"
        :input="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, onMounted, reactive, watch, computed } from "vue";
import { useRouter, Router } from "vue-router";
import { apiGetEventWithCondition } from "@/apis/api/userRequest";
import { EventList, GetEventWithCondition, sysCodeDtl } from "@/apis/type";
import { getCodeByKeyword } from "@/utils/utils";
export default {
  setup() {
    const router: Router = useRouter();
    const loading: Ref<boolean> = ref(false);
    const tabMode: Ref<string> = ref("OWNER");

    const activityFilter: string[] = [
      "無篩選",
      "活動即將開始",
      "活動報名中",
      "活動已截止",
    ];
    const filter: Ref<string> = ref(activityFilter[0]);

    const activitySort: string[] = ["近期截止優先", "近期發佈優先"];
    const sort: Ref<string> = ref(activitySort[0]);

    const rows: Ref<EventList[]> = ref([]);
    const codeDtl: Ref<sysCodeDtl[]> = ref([]);

    let conditionMap: Map<any, any> = new Map([
      ["近期發佈優先", "eventStDate_asc"],
      ["近期截止優先", "eventStDate_desc"],
    ]);

    const visibleColumns: Ref<Array<string>> = ref([
      "categoryName",
      "eventTitle",
      "timeStatus",
      "timeStatusIcon",
      "memberCount",
      "memberCountIcon",
      "statusDesc",
    ]);

    const pagination = reactive({
      sortBy: "desc",
      descending: false,
      page: 1,
      rowsPerPage: 8,
    });

    const searchCondition: GetEventWithCondition = reactive({
      eventPersonnel: "OWNER",
      sortBy: conditionMap.get(sort.value),
      requestPageNum: pagination.page,
      rownumPerPage: pagination.rowsPerPage,
    });

    const columns = reactive([
      {
        name: "categoryName",
        label: "類別",
        field: "categoryName",
        align: "left",
        style: "font-size:18px",
      },
      {
        name: "eventTitle",
        label: "活動資訊",
        field: "eventTitle",
        align: "left",
        style: "font-size:18px",
      },
      {
        name: "timeStatus",
        label: "活動時間",
        field: "timeStatus",
        align: "center",
        style: "font-size:18px",
      },
      {
        name: "timeStatusIcon",
        label: "活動時間圖例",
        field: "timeStatus",
        align: "center",
        style: "font-size:18px",
      },
      {
        name: "memberCount",
        label: "參與者",
        field: "memberCount",
        align: "center",
        style: "font-size:18px",
      },
      {
        name: "memberCountIcon",
        label: "參與者圖例",
        field: "memberCount",
        align: "center",
        style: "font-size:18px",
      },
      {
        name: "activityStatus",
        label: "活動狀態",
        field: "timeStatus",
        align: "center",
        style: "font-size:18px",
      },
      {
        name: "statusDesc",
        label: "審核狀態",
        field: "statusDesc",
        align: "center",
        style: "font-size:18px",
      },
    ]);

    const postEventWithCondition = () => {
      loading.value = true;
      apiGetEventWithCondition(searchCondition)
        .then((response: any) => {
          loading.value = false;
          let originalRows: EventList[] = response.data;

          if (filter.value == "活動報名中") {
            rows.value = originalRows.filter((row) =>
              row.timeStatus.includes("inProgress")
            );
          } else if (filter.value == "活動已截止") {
            rows.value = originalRows.filter((row) =>
              row.timeStatus.includes("expired")
            );
          } else if (filter.value == "活動即將開始") {
            rows.value = originalRows.filter((row) =>
              row.timeStatus.includes("comingSoon")
            );
          } else {
            rows.value = response.data;
          }
        })
        .catch(() => {
          loading.value = false;
          rows.value = [];
        });
    };

    onMounted(() => {
      postEventWithCondition();
      getCodeByKeyword("eventStatus").then((response: sysCodeDtl[]) => {
        console.log(response);
        codeDtl.value = response;
      });
    });

    function getImg(column: string, value: any) {
      let imgName: string = "";
      switch (value) {
        case "暫存中":
          imgName = "checkSaved";
          break;
        case "已完成未送審":
          imgName = "checkUnSaved";
          break;
        case "已刪除":
          imgName = "checkFail";
          break;
        case "審核通過":
          imgName = "checkPass";
          break;
        case "送審中":
          imgName = "checkSend";
          break;
      }
      if (imgName == "") {
        return "hide_image";
      }
      return "img:" + require(`@/assets/info/pixel/${imgName}.png`);
    }

    function getTimeImg(eventStDate: Date, eventEdDate: Date) {
      let imgName: string = "";
      let today: Date = new Date();

      if (today.getTime() < eventStDate.getTime()) {
        imgName = "timeOutStage1";
      } else if (eventEdDate.getTime() < today.getTime()) {
        imgName = "timeOutStageBroken";
      } else {
        imgName = "timeOutStage3";
      }

      return "img:" + require(`@/assets/info/pixel/${imgName}.png`);
    }

    function getMemberImg(memberCount: number, memberLimit: number) {
      let imgName: string = "";
      if (memberCount == 0 || memberLimit == 0) {
        imgName = "pplStage0";
      } else {
        let percentage: number = Math.round((memberCount / memberLimit) * 100);
        if (percentage <= 25) {
          imgName = "pplStage0";
        } else if (percentage <= 50) {
          imgName = "pplStage1";
        } else if (percentage <= 75) {
          imgName = "pplStage2";
        } else {
          imgName = "pplStage3";
        }
      }

      return "img:" + require(`@/assets/info/pixel/${imgName}.png`);
    }

    function getActivityImg(value: string) {
      if (value == "expired") {
        return "img:" + require(`@/assets/info/pixel/checkRegisterUnable.png`);
      } else {
        return "img:" + require(`@/assets/info/pixel/checkRegisterAble.png`);
      }
    }

    function getToolTips(column: string, value: string) {
      switch (value) {
        case "comingSoon":
          return "活動即將開始";
        case "inProgress":
          return "活動進行中";
        case "expired":
          return "活動已截止";
      }
    }

    function tableDoubleClickHandler(evt: Event, row: any, index: number) {
      console.log(`route to ActivityShowView id:${row.id},index:${index}`);
      router.push({ path: "/ActivityShowView/" + row.id });
    }

    watch(tabMode, (val: string) => {
      visibleColumns.value.pop();
      visibleColumns.value.push(
        val == "OWNER" ? "statusDesc" : "activityStatus"
      );
      searchCondition.eventPersonnel = val;
      postEventWithCondition();
    });

    watch([sort, filter], ([newSort]) => {
      searchCondition.sortBy = conditionMap.get(newSort);
      postEventWithCondition();
    });

    return {
      tabMode,
      loading,
      activityFilter,
      filter,
      activitySort,
      sort,
      columns,
      pagination,
      pagesNumber: computed(() =>
        Math.ceil(rows.value.length / pagination.rowsPerPage)
      ),
      visibleColumns,
      rows,
      searchCondition,
      conditionMap,
      postEventWithCondition,
      getImg,
      getMemberImg,
      getTimeImg,
      getToolTips,
      getActivityImg,
      tableDoubleClickHandler,
    };
  },
};
</script>
