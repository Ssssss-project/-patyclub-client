<template>
  <main id="ActivityShowView">
    <div class="container">
      <ActivityDetailsView :allChildPara="allChildPara" />
    </div>
  </main>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import ActivityDetailsView from "../components/ActivityDetailsView.vue";
export default {
  setup() {
    const route = useRoute();
    let allChildPara: any = { id: route.params.id };

    return {
      allChildPara,
    };
  },

  components: {
    ActivityDetailsView,
  },
};
</script>
