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
            to="/activityView/0"
          />
          <q-breadcrumbs-el
            v-for="(value, index) in shownBreadcrumbs"
            :label="value.label"
            :to="value.destination"
            :key="index"
          />
          <q-breadcrumbs-el :label="eventTitle" />
        </q-breadcrumbs>

        <ActivityDetailsView :allChildPara="allChildPara" />
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import ActivityDetailsView from "../components/ActivityDetailsView.vue";
import { apiGetSourceEventCategoryList } from "../apis/api/userRequest";
export default {
  setup() {
    const route = useRoute();
    let allChildPara: any = { id: route.params.id };
    let showProfile: boolean = route.params.source == "profile" ? true : false;
    let categoryId: any = route.params.categoryId;
    let eventTitle: any = route.params.eventTitle;

    const shownBreadcrumbs: Array<object> = reactive([]);

    onMounted(() => {
      apiGetSourceEventCategoryList({ rootCateId: categoryId }).then(
        (response: any) => {
          let categoryList: Array<object> = response.data.reverse();
          categoryList.forEach((object: any) => {
            shownBreadcrumbs.push({
              id: object.id,
              label: object.name,
              destination: `/activityView/${object.id}`,
            });
          });
        }
      );
    });

    return {
      allChildPara,
      activityImg: "img:" + require(`@/assets/icon/activities.svg`),
      shownBreadcrumbs,
      showProfile,
      eventTitle,
    };
  },

  components: {
    ActivityDetailsView,
  },
};
</script>
