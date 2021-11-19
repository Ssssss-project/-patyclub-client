<template>
    <main id="ActivityView">
        <Head />
        <div class="container">
            <div class="activity-main">
                <div class="event-category">
                    <event-category />
                </div>
                <div class="card-list scrollbarCol">
                    <card-list />
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Head from "../components/Head.vue";
import CardList from "../components/ActivityViewPage/CardList.vue";
import EventCategory from "../components/ActivityViewPage/EventCategory.vue";

export default {
    setup() {},
    components: {
        Head,
        CardList,
        EventCategory,
    },
};
</script>
