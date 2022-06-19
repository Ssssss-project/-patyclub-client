<template>
  <main id="ActivityShowView">
    <div class="container">
      <div class="main">
        <div>
          <q-breadcrumbs
            gutter="sm"
            active-color="#2f4858"
            style="font-size:15px;padding-bottom:5px"
          >
            <template v-slot:separator>
              <q-icon
                size="2em"
                name="chevron_right"
              />
            </template>

            <q-breadcrumbs-el
              label="首頁"
              icon="home"
              to="/"
            />
            <q-breadcrumbs-el
              v-if="showProfile"
              label="我的活動"
              to="/UserProfile/activities"
              :icon="activityImg"
            />
            <q-breadcrumbs-el
              v-if="!showProfile"
              label="所有活動"
              to="/activityView/0"
            />
            <q-breadcrumbs-el
              v-for="(value, index) in shownBreadcrumbs"
              :label="value.label"
              :to="value.destination"
              :key="index"
            />
            <q-breadcrumbs-el :label="eventTitle" />
          </q-breadcrumbs>

          <ActivityDetailsView :allChildPara="allChildPara" />
        </div>
        <div class="history-area">
          <q-btn label="瀏覽紀錄" class="history-btn" :icon-right="showHistory ? 'close':'expand_more' " align="between" @click="showHistory = !showHistory"/>
          <div class="card-list" :key="allEvent" v-if="showHistory">
            <div>
              <card-list
                :allEvent="allEvent"
                @getEventWithCondition="getEventWithCondition"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import CardList from "../components/ActivityViewPage/CardList.vue";
import { useRoute } from "vue-router";
import { onMounted, reactive, ref, Ref, watch } from "vue";
import ActivityDetailsView from "../components/ActivityDetailsView.vue";
import { apiGetSourceEventCategoryList } from "../apis/api/userRequest";
import { apiGetTop10PersonalEventTouchLog } from "../apis/api/userRequest";
import { EventType } from "../apis/type";
export default {
  setup() {
    const route = useRoute();
    let init: boolean = false;
    let allChildPara: any = { id: route.params.id };
    let showProfile: boolean = route.params.source == "profile" ? true : false;
    let categoryId: any = route.params.categoryId;
    let eventTitle: any = route.params.eventTitle;
    const showHistory:Ref<boolean> = ref(true);

    const shownBreadcrumbs: Array<object> = reactive([]);

    const allEvent: Ref<EventType[]> = ref([]);

    onMounted(() => {
      apiGetSourceEvent();
      apiGetTop10();
      init = true;
    });

    const apiGetSourceEvent = () => {
      apiGetSourceEventCategoryList({ rootCateId: categoryId }).then(
        (response: any) => {
          let categoryList: Array<object> = response.data.reverse();
          initBreadcrumbs();
          categoryList.forEach((object: any) => {
            shownBreadcrumbs.push({
              id: object.id,
              label: object.name,
              destination: `/activityView/${object.id}`,
            });
          });
        }
      );
    };

    const initBreadcrumbs = () => {
        while(shownBreadcrumbs.length > 0) {
          shownBreadcrumbs.pop();
        }
    }

    const apiGetTop10 = () => {
      apiGetTop10PersonalEventTouchLog().then((response: any) => {
        allEvent.value = response.data;
      });
    };

    watch(
      () => route.params.id,
      () => {
        if (init) {
          allChildPara = route.params.id;
          categoryId = route.params.categoryId;
          apiGetSourceEvent();
          apiGetTop10();
        }
      },
      { immediate: true }
    );

    return {
      allChildPara,
      activityImg: "img:" + require(`@/assets/icon/activities.svg`),
      shownBreadcrumbs,
      showProfile,
      eventTitle,
      allEvent,
      showHistory,
      apiGetSourceEvent,
      apiGetTop10,
      initBreadcrumbs
    };
  },

  components: {
    ActivityDetailsView,
    CardList
  },
};
</script>
