<template>
    <p :class="isHomepage ? 'footer-home' : 'footer'">
        Copyright {{ new Date().getFullYear() }}, PatyClub. All right reserved.
    </p>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const isHomepage = ref(true);
        const route = useRoute();

        watch(route, (curVal) => {
            isHomepage.value = curVal.path === "/";
        });
        return {
            isHomepage,
        };
    },
};
</script>
