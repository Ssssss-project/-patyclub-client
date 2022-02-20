<template>
  <div v-if="selected === 'personalInfo'">
    <ProfileViewInfo />
  </div>
  <div v-if="selected === 'personalPhoto'">
    <ProfileViewPhoto />
  </div>
  <div v-if="selected === 'accountManager'">
    <ProfileViewManage />
  </div>
  <div v-if="selected === 'accountNotify'">
    <ProfileViewNotify />
  </div>
  <div v-if="selected === 'activities'">
    <ProfileViewActivities />
  </div>
  <div v-if="selected === 'achievement'">
    <ProfileViewAchievement />
  </div>
</template>

<script lang="ts">
import { watch, ref, Ref } from "vue";
import ProfileViewInfo from "./ProfileViewPage/ProfileViewInfo.vue";
import ProfileViewPhoto from "./ProfileViewPage/ProfileViewPhoto.vue";
import ProfileViewManage from "./ProfileViewPage/ProfileViewManage.vue";
import ProfileViewNotify from "./ProfileViewPage/ProfileViewNotify.vue";
import ProfileViewActivities from "./ProfileViewPage/ProfileViewActivities.vue";
import ProfileViewAchievement from "./ProfileViewPage/ProfileViewAchievement.vue";

export default {
  props: ["option"],
  setup(props: any) {
    const selected: Ref<string> = ref("");

    watch(
      () => props.option,
      () => {
        selected.value = props.option;
      },
      { immediate: true }
    );
    return {
      selected,
    };
  },
  components: {
    ProfileViewInfo,
    ProfileViewPhoto,
    ProfileViewManage,
    ProfileViewNotify,
    ProfileViewActivities,
    ProfileViewAchievement,
  },
};
</script>
