<template>
    <main id="ActivityView">
        <div class="container">
            <div class="activity-main">
                <div class="head-block"></div>
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
                            @setselectedcategory="setselectedCategory"
                        />
                    </div>
                    <div class="card-set" :key="allEvent">
                        <div v-if="allEvent.length === 0">
                            尚無活動
                        </div>
                        <div class="card-list scrollbarCol" v-else>
                            <card-list :allEvent="allEvent" />
                        </div>
                        <q-pagination
                            class="pagination"
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
import { apiGetEventWithCondition, apiGetEventCategory } from "../apis/api/userRequest";
import { categoryNode, EventType, GetEventWithCondition } from "../apis/type";
import { ref, onMounted, Ref, watch } from "vue";

export default {
    setup() {
        const sortCondition: string[] = [
            "依活動開始時間升序",
            "依活動開始時間降序",
            "依參與人數升序",
            "依參與人數降序",
        ];
        const defaultCondition: GetEventWithCondition = {
            category: 0,
            tag: "",
            queryList: [],
            nonCompleteEvent: "No",
            sortBy: "non_sort",
            eventPersonnel: "",
        };
        const allCondition: Ref<GetEventWithCondition> = ref(JSON.parse(JSON.stringify(defaultCondition)));

        const sortConditionModel = ref(sortCondition[0]);
        const options: string[] = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const page: Ref<number> = ref(1);
        const allEvent: Ref<EventType[]> = ref([]);
        const categoryList: Ref<categoryNode[]> = ref([]);
        const selectedCategory: Ref<number> = ref(-1);

        const stringOptions: Ref<string[]> = ref([]);

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
            }).then((response: any) => {
                allEvent.value = response.data;
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

        onMounted(() => {
            getEventTree();
            allCondition.value.sortBy = "eventStDate_asc";
            getEventWithCondition();
        });

        return {
            options,
            page: page,
            minPages: 1,
            maxPages: 15,
            allEvent,
            categoryList,
            selectedCategory,
            sortCondition,
            sortConditionModel,
            stringOptions,
            setselectedCategory,
            setSortCondition,
            setDefaultAllCondition,
            setArticles,
            handleSearchWord,
            deleteSearchWord,
        };
    },

    components: {
        CardList,
        EventCategory,
        ActivityFilter,
    },
};
</script>
