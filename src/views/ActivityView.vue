<template>
  <main id="ActivityView">
    <div class="container">
      <div class="activity-main">
        <q-carousel
          class="slider-image"
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          :autoplay="5000"
        >
          <q-carousel-slide
            v-for="x in images"
            :key="x.id"
            :name="x.id"
            :img-src="x.img"
          />
        </q-carousel>
        <div class="activity-filter">
          <activity-filter
            :sortCondition="sortCondition"
            :sortConditionModel="sortConditionModel"
            :stringOptions="stringOptions"
            @setSortCondition="setSortCondition"
            @setDefaultAllCondition="setDefaultAllCondition"
            @setArticles="setArticles"
            @handleSearchWord="handleSearchWord"
            @deleteSearchWord="deleteSearchWord"
          />
        </div>
        <div class="activity-information">
          <div class="event-category scrollbarCol">
            <event-category
              :categoryList="categoryList"
              :key="categoryList"
              :selectedCategory="selectedCategory"
              v-model:ticked="selectedCategory"
              @setselectedcategory="setselectedCategory"
            />
          </div>
          <div
            class="card-set"
            :key="allEvent"
          >
            <div v-if="allEvent.length === 0">
              尚無活動
            </div>
            <div
              class="card-list scrollbarCol"
              v-else
            >
              <card-list
                :allEvent="allEvent"
                @getEventWithCondition="getEventWithCondition"
              />
            </div>
            <div>
              <q-pagination
                class="pagination"
                v-model="page"
                color="orange-12"
                :min="1"
                :max="maxPages"
                :input="true"
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
import EventCategory from "../components/ActivityViewPage/EventCategory.vue";
import ActivityFilter from "../components/ActivityViewPage/ActivityFilter.vue";
import {
  apiGetEventWithCondition,
  apiGetEventCategory,
  apiGetSlideList,
} from "../apis/api/userRequest";
import { categoryNode, EventType, GetEventWithCondition } from "../apis/type";
import { ref, onMounted, Ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const categoryid = route.params.category_id;
    const sortCondition: string[] = [
      "依活動開始時間升序",
      "依活動開始時間降序",
      "依參與人數升序",
      "依參與人數降序",
    ];
    const defaultCondition: GetEventWithCondition = {
      requestPageNum: 1,
      category: parseInt(categoryid as string)
        ? parseInt(categoryid as string)
        : 0,
      tag: "",
      queryList: [],
      nonCompleteEvent: "No",
      sortBy: "non_sort",
      eventPersonnel: "",
    };
    const allCondition: Ref<GetEventWithCondition> = ref(
      JSON.parse(JSON.stringify(defaultCondition))
    );

    const sortConditionModel = ref(sortCondition[0]);
    const options: string[] = [
      "Google",
      "Facebook",
      "Twitter",
      "Apple",
      "Oracle",
    ];
    const page: Ref<number> = ref(1);
    const maxPages: Ref<number> = ref(1);

    const allEvent: Ref<EventType[]> = ref([]);
    const categoryList: Ref<categoryNode[]> = ref([]);
    const selectedCategory: Ref<number> = ref(parseInt(categoryid as string));

    const stringOptions: Ref<string[]> = ref([]);
    const images: Ref<{ img: string; id: number }[]> = ref([]);

    const handleSearchWord = (refKey: string) => {
      console.log(refKey);
      stringOptions.value.push(refKey);
      allCondition.value.queryList = stringOptions.value;
      getEventWithCondition();
    };

    const deleteSearchWord = (index: number) => {
      stringOptions.value.splice(index, 1);
      allCondition.value.queryList = stringOptions.value;
      getEventWithCondition();
    };

    const getEventWithCondition = () => {
      apiGetEventWithCondition({
        category: allCondition.value.category,
        tag: allCondition.value.tag,
        queryList: allCondition.value.queryList,
        sortBy: allCondition.value.sortBy,
        rownumPerPage: 8,
        requestPageNum: page.value,
      }).then((response: any) => {
        allEvent.value = response.data;
        page.value = response.currentPageNum;
        maxPages.value = response.maxPageNum;
      });
    };

    const setDefaultAllCondition = () => {
      allCondition.value.category = 0;
      allCondition.value.tag = "";
      selectedCategory.value = 0;
      getEventWithCondition();
    };

    const getEventTree = () => {
      apiGetEventCategory().then((response: any) => {
        categoryList.value = response.data;
      });
    };

    const setselectedCategory = (newID: number) => {
      console.log("---click All----");
      allCondition.value.category = newID;
      selectedCategory.value = newID;
      getEventWithCondition();
    };

    const setArticles = () => {
      allCondition.value.tag = "S";
      getEventWithCondition();
    };

    const setSortCondition = (sortString: string) => {
      let tempSortString = "";
      switch (sortString) {
        case "依活動開始時間升序":
          tempSortString = "eventStDate_asc";
          break;
        case "依活動開始時間降序":
          tempSortString = "eventStDate_desc";
          break;
        case "依參與人數升序":
          tempSortString = "hot_asc";
          break;
        case "依參與人數降序":
          tempSortString = "hot_desc";
          break;
        default:
          tempSortString = "";
          break;
      }
      allCondition.value.sortBy = tempSortString;
      sortConditionModel.value = sortString;
      getEventWithCondition();
    };

    watch(selectedCategory, (newVal, oldVal) => {
      console.log("selected-watchsssssss", newVal, oldVal);
    });

    watch(sortConditionModel, (newVal) => {
      console.log("sortConditionModel-watchsssssss", newVal);
    });
    watch(allCondition, (newVal) => {
      console.log("allCondition-watchsssssss", newVal);
    });

    watch(page, () => {
      getEventWithCondition();
    });

    const getSlideImage = () => {
      apiGetSlideList().then((response: any) => {
        response.data.forEach(function (value: string, index: number) {
          images.value.push({
            id: index + 1,
            img:
              "https://localhost:5001" +
              value.split(".")[1] +
              "." +
              value.split(".")[2],
          });
        });
      });
      console.log(images.value);
    };

    onMounted(() => {
      getEventTree();
      allCondition.value.sortBy = "eventStDate_asc";
      getEventWithCondition();
      getSlideImage();
    });

    return {
      options,
      page: page,
      maxPages,
      allEvent,
      categoryList,
      selectedCategory,
      sortCondition,
      sortConditionModel,
      stringOptions,
      categoryid,
      images,
      slide: ref(1),
      setselectedCategory,
      setSortCondition,
      setDefaultAllCondition,
      setArticles,
      handleSearchWord,
      deleteSearchWord,
      getEventWithCondition,
    };
  },

  components: {
    CardList,
    EventCategory,
    ActivityFilter,
  },
};
</script>
