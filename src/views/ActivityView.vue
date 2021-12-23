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
                            <card-list />
                        </div>
                        <q-pagination v-model="page" color="orange-12" :min="1" :max="15" :max-pages="6" :input="true"/>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import CardList from "../components/ActivityViewPage/CardList.vue";
import EventCategory from "../components/ActivityViewPage/EventCategory.vue";
import ActivityFilter from "../components/ActivityViewPage/ActivityFilter.vue";

import { ref } from "vue";

export default {
    setup() {
        const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const model = ref(options[0]);
        const page = ref(1)
        return {
            options,
            model,
            page: page,
            minPages: 1,
            maxPages: 15,
        };
    },
    components: {
        CardList,
        EventCategory,
        ActivityFilter,
    },
};
</script>
