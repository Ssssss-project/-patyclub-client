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
      :visible-columns="visibleColumns"
      v-model:pagination="pagination"
      hide-pagination
      @row-dblclick="tableDoubleClickHandler"
    >
      <!--活動時間-->
      <template v-slot:body-cell-timeStatus="colValue">
        <q-td align="left">
          <div>
            <q-icon
              :name="getImg(colValue.col.name, colValue.value)"
              size="2em"
            />
            <label>{{colValue.row.eventStDate + " ～ " + colValue.row.eventEdDate}}</label>
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
      <!--參與者-->
      <template v-slot:body-cell-memberCount="colValue">
        <q-td align="left">
          <div style="display:inline">
            <q-icon
              :name="getImg(colValue.col.name, colValue.value)"
              size="2em"
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
        <q-td align="left">
          <div style="display:inline">
            <q-icon
              :name="getImg(colValue.col.name, colValue.value)"
              size="2em"
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
        <q-td align="left">
          <div style="display:inline">
            <q-icon
              :name="getActivityImg(colValue.value)"
              size="2em"
            >
            </q-icon>
            <q-tooltip
              class="bg-amber-14 text-black shadow-4 text-bold text-body2"
              transition-show="rotate"
              transition-hide="rotate"
            >{{colValue.value == "expired" ? "已截止" : "即將開始或報名中"}}
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
import { apiGetEventWithCondition } from "@/apis/api/userRequest";
import { EventList, GetEventWithCondition, sysCodeDtl } from "@/apis/type";
import { getCodeByMstName } from "@/utils/utils";
export default {
  setup() {
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
      "memberCount",
      "statusDesc",
    ]);

    const searchCondition: GetEventWithCondition = reactive({
      eventPersonnel: "OWNER",
      sortBy: conditionMap.get(sort.value),
    });

    const pagination = ref({
      sortBy: "desc",
      descending: false,
      page: 2,
      rowsPerPage: 10,
    });

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
        name: "memberCount",
        label: "參與者",
        field: "memberCount",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "activityStatus",
        label: "活動狀態",
        field: "timeStatus",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
      },
      {
        name: "statusDesc",
        label: "審核狀態",
        field: "statusDesc",
        align: "left",
        headerStyle: "width: 500px",
        headerClasses: "table-column-font",
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
      getCodeByMstName("eventStatus").then((response: sysCodeDtl[]) => {
        codeDtl.value = response;
      });
    });

    function getImg(column: string, value: any) {
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
        case 1:
          imgName = "pplStage0";
          break;
        case 2:
          imgName = "pplStage3";
          break;
        default:
          imgName = "timeOutStage3";
          break;
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
          return "活動報名中";
        case "expired":
          return "活動已截止";
      }
    }

    function tableDoubleClickHandler(evt: Event, row: object, index?: number) {
      console.log(`我是第${index}行`);
      console.log(row);
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
        Math.ceil(rows.value.length / pagination.value.rowsPerPage)
      ),
      visibleColumns,
      rows,
      searchCondition,
      conditionMap,
      postEventWithCondition,
      getImg,
      getToolTips,
      getActivityImg,
      tableDoubleClickHandler,
    };
  },
};
</script>
