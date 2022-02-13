<template>
  <main id="ActivityView">
    <div class="container">
      <div class="activity-main">
        <div class="head-block"></div>
        <div class="activity-filter">
          <activity-filter />
        </div>
        <div class="activity-information">
          <div class="event-category scrollbarCol">
            <event-category :categoryList="categoryList" />
          </div>
          <div class="card-set">
            <div v-if="allEvent.length===0">
              尚無活動
            </div>
            <div
              class="card-list scrollbarCol"
              v-else
            >
              <card-list :allEvent="allEvent" />
            </div>
            <q-pagination
              v-model="page"
              color="orange-12"
              :min="1"
              :max="15"
              :max-pages="6"
              :input="true"
            />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import CardList from "../components/ActivityViewPage/CardList.vue";
import EventCategory from "../components/ActivityViewPage/EventCategory.vue";
import ActivityFilter from "../components/ActivityViewPage/ActivityFilter.vue";
import {
  apiGetEventWithCondition,
  apiGetEventCategory,
} from "../apis/api/userRequest";
import { categoryNode, EventType } from "../apis/type";
import { ref, onMounted, Ref } from "vue";

export default {
  setup() {
    const options: string[] = [
      "Google",
      "Facebook",
      "Twitter",
      "Apple",
      "Oracle",
    ];
    const page: Ref<number> = ref(1);
    const allEvent: Ref<EventType[]> = ref([]);
    const categoryList: Ref<categoryNode[]> = ref([]);

    const getEventWithCondition = () => {
      apiGetEventWithCondition({ tag: "", eventStDate: "" }).then(
        (response: any) => {
          allEvent.value = response.data;
        }
      );
    };

    const getEventTree = () => {
      apiGetEventCategory().then((response: any) => {
        console.log("EventTreeFromAPI", response.data);
        categoryList.value = response.data;
      });
    };

    onMounted(() => {
      getEventTree();
      getEventWithCondition();
    });

    return {
      options,
      page: page,
      minPages: 1,
      maxPages: 15,
      allEvent,
      categoryList,
    };
  },

  components: {
    CardList,
    EventCategory,
    ActivityFilter,
  },
};
</script>
