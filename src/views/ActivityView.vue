<template>
    <main id="ActivityView">
        <div class="container">
            <div class="activity-main">
                <div class="head-block">
                </div>
                <div class="activity-filter">
                    <activity-filter />
                </div>
                <div class="activity-information">
                    <div class="event-category scrollbarCol">
                        <event-category />
                    </div>
                    <div class="card-list scrollbarCol">
                        <card-list />
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
        return {
            options,
            model,
        };
    },
    components: {
        CardList,
        EventCategory,
        ActivityFilter,
    },
};
</script>
