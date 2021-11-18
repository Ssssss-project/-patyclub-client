<template>
    <main id="ActivityView">
        <Head />
        <div class="container">
            <CardList />
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
