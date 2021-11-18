<template>
    <main id="ActivityView">
        <Head />
        <div class="container">
            <div class="card-list">
                <card-list />
            </div>
        </div>
    </main>
</template>

<script>
import Head from "../components/Head.vue";
import CardList from "../components/ActivityViewPage/CardList.vue";

export default {
    setup() {},
    components: {
        Head,
        CardList,
    },
};
</script>
