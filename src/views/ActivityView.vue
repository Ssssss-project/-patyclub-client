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
            <event-category />
          </div>
          <div class="card-set">
            <div class="card-list scrollbarCol">
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
import { apiGetEventWithCondition, EventType } from "../apis/api/userRequest";
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

    const getEventWithCondition = () => {
      apiGetEventWithCondition({ tag: "", eventStDate: "" }).then(
        (response: any) => {
          console.log(response.data);
          allEvent.value = response.data;
        }
      );
    };
    onMounted(() => {
      getEventWithCondition();
    });

    return {
      options,
      page: page,
      minPages: 1,
      maxPages: 15,
      allEvent,
    };
  },

  components: {
    CardList,
    EventCategory,
    ActivityFilter,
  },
};
</script>
