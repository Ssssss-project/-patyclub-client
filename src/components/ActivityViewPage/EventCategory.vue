<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      :nodes="CategoryNode"
      node-key="label"
      color="red"
      control-color="red"
      no-connectors
    />
  </div>
</template>

<script lang="ts">
import { toRef, ref, onMounted } from "vue";
import { categoryNode, QuasartreeNode } from "../../apis/type";
export default {
  props: ["categoryList"],
  setup(props: any) {
    const categoryList = toRef(props, "categoryList");
    const CategoryNode = ref<QuasartreeNode[]>([]);
    console.log("11");

    const processCategoryNode = (NodeItem: categoryNode) => {
      console.log("NodeItem", NodeItem);
      let tempNode: QuasartreeNode = {
        id: NodeItem.cateId,
        label: NodeItem.cateName,
        children: [],
      };
      console.log(tempNode);
      if (
        NodeItem.childNode?.length !== 0 &&
        NodeItem.childNode !== undefined
      ) {
        NodeItem.childNode.forEach((item: categoryNode) => {
          tempNode.children.push(processCategoryNode(item));
        });
      }
      return tempNode;
    };

    onMounted(() => {
      if (categoryList.value.length !== 0)
        CategoryNode.value = processCategoryNode(categoryList.value).children;
    });

    return {
      CategoryNode,
    };
  },
};
</script>
