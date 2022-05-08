<template>
  <main id="ActivityShowView">
    <div class="container">
      <div>
        <q-breadcrumbs
          gutter="sm"
          active-color="#2f4858"
          style="font-size:15px;padding-bottom:5px"
        >
          <template v-slot:separator>
            <q-icon
              size="2em"
              name="chevron_right"
            />
          </template>

          <q-breadcrumbs-el
            label="首頁"
            icon="home"
            to="/"
          />
          <q-breadcrumbs-el
            v-if="showProfile"
            label="我的活動"
            to="/UserProfile/activities"
            :icon="activityImg"
          />
          <q-breadcrumbs-el
            v-if="!showProfile"
            label="所有活動"
            to="/activityView"
          />
          <q-breadcrumbs-el
            v-for="(value, index) in shownBreadcrumbs"
            :label="value.label"
            :to="value.destination"
            :key="index"
          />
        </q-breadcrumbs>

        <ActivityDetailsView :allChildPara="allChildPara" />
      </div>
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
    let showProfile: boolean = route.params.source == "profile" ? true : false;
    let shownBreadcrumbs: Array<object> = [
      { label: route.params.categoryName, destination: "" },
    ];

    return {
      allChildPara,
      activityImg: "img:" + require(`@/assets/icon/activities.svg`),
      shownBreadcrumbs,
      showProfile,
    };
  },

  components: {
    ActivityDetailsView,
  },
};
</script>
