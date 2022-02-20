<template>
  <div>
    <q-tree
      :nodes="tree"
      no-connectors
      default-expand-all
      v-model:selected="selected"
      node-key="label"
    />
  </div>
</template>

<script lang="ts">
import { useRouter, Router } from "vue-router";
import { ref, watch, Ref } from "vue";

export default {
  props: ["option"],

  setup(props: any) {
    const selected: Ref<string> = ref("");
    const router: Router = useRouter();
    let itemMap: Map<any, any> = new Map([
      ["personalInfo", "個人檔案"],
      ["personalPhoto", "大頭貼"],
      ["accountManager", "帳號管理"],
      ["accountNotify", "通知"],
      ["activities", "我的活動"],
      ["achievement", "成就系統"],
    ]);

    function getMapValue(option: string) {
      if (itemMap.has(option)) {
        return itemMap.get(option);
      } else {
        return "個人檔案";
      }
    }

    function getMapKey(mapValue: string) {
      for (let [key, value] of itemMap) {
        if (value == mapValue) {
          return key;
        }
      }
      return "personalInfo";
    }

    watch(
      () => props.option,
      () => {
        selected.value = getMapValue(props.option);
      },
      { immediate: true }
    );

    watch(
      () => selected.value,
      () => {
        let selectedItem: string = selected.value;
        router.push({ path: "/UserProfile/" + getMapKey(selectedItem) });
      },
      { immediate: true }
    );

    return {
      selected,

      tree: [
        {
          label: "設定",
          icon: "img:" + require(`@/assets/icon/set.svg`),
          selectable: false,
          children: [
            {
              label: "個人檔案",
            },
            {
              label: "大頭貼",
            },
            {
              label: "帳號管理",
            },
            {
              label: "通知",
            },
          ],
        },
        {
          label: "我的活動",
          icon: "img:" + require(`@/assets/icon/activities.svg`),
        },
        {
          label: "成就系統",
          icon: "img:" + require(`@/assets/icon/achievement.svg`),
        },
      ],
    };
  },
};
</script>
