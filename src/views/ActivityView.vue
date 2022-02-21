<template>
    <main id="ActivityView">
        <div class="container">
            <div class="activity-main">
                <div class="head-block"></div>
                <div class="activity-filter">
                    <activity-filter :viewCondition="viewCondition" />
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
import { categoryNode, EventType } from "../apis/type";
import { ref, onMounted, Ref, watch } from "vue";

export default {
    setup() {
        const viewCondition: string[] = ["依時間順序檢視", "依熱度順序檢視", "依人數順序檢視"];
        const options: string[] = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const page: Ref<number> = ref(1);
        const allEvent: Ref<EventType[]> = ref([]);
        const categoryList: Ref<categoryNode[]> = ref([]);
        const selectedCategory:Ref<number> = ref(-1);
        const getEventWithCondition = (tag: string, eventStDate: string) => {
            apiGetEventWithCondition({ tag: tag, eventStDate: eventStDate }).then((response: any) => {
                allEvent.value = response.data;
            });
        };

        const getEventTree = () => {
            apiGetEventCategory().then((response: any) => {
                categoryList.value = response.data;
            });
        };

        const setselectedCategory = (newID: number) => {
            selectedCategory.value = newID;
        };

        watch(selectedCategory, (newVal, oldVal) => {
            console.log("selected-watchsssssss", newVal, oldVal);
        });

        onMounted(() => {
            getEventTree();
            getEventWithCondition("", "");
        });

        return {
            options,
            page: page,
            minPages: 1,
            maxPages: 15,
            allEvent,
            categoryList,
            selectedCategory,
            viewCondition,
            setselectedCategory
        };
    },

    components: {
        CardList,
        EventCategory,
        ActivityFilter,
    },
};
</script>
