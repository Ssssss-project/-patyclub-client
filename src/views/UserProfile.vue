<template>
  <main id="UserProfile">
    <div class="container">
      <div class="profile-main">
        <div class="profile-option">
          <ProfileOption v-model:option="selectItem" />
        </div>
        <div class="profile-view">
          <ProfileView v-model:option="selectItem" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProfileOption from "../components/UserProfilePage/ProfileOption.vue";
import ProfileView from "../components/UserProfilePage/ProfileView.vue";
import { useRoute } from "vue-router";
import { ref, watch } from "vue";

export default {
  setup() {
    const route = useRoute();
    const selectItem = ref();

    watch(
      () => route.params.item,
      () => {
        selectItem.value = route.params.item;
      },
      { immediate: true }
    );

    return {
      selectItem,
    };
  },
  components: {
    ProfileOption,
    ProfileView,
  },
};
</script>
