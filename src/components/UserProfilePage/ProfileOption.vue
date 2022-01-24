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

<script>
import { ref, watch } from "vue";
export default {
  props: ["option"],

  setup(props) {
    const selected = ref("");

    function setItem(option) {
      if (option == "activities") {
        return "我的活動";
      } else if (option == "achievement") {
        return "成就系統";
      } else {
        return "個人檔案";
      }
    }

    watch(() => props.option,() => {
        selected.value = setItem(props.option);
    },{ immediate: true }
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
