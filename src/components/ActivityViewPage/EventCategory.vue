<template>
    <div class="q-pa-md q-gutter-sm">
        <q-tree
            :nodes="CategoryNode"
            v-model:selected="selected"
            node-key="id"
            color="red"
            text-color="#402e32"
            no-connectors
            @update:selected="GetNodeID"
        />
    </div>
</template>

<script lang="ts">
import { toRef, ref, onMounted, watch } from "vue";
import { categoryNode, QuasartreeNode } from "../../apis/type";
export default {
    props: ["categoryList", "selectedCategory"],
    setup(props: any, { emit }: any) {
        const categoryList = toRef(props, "categoryList");
        const CategoryNode = ref<QuasartreeNode[]>([]);
        const selected = toRef(props, "selectedCategory");

        const processCategoryNode = (NodeItem: categoryNode) => {
            let tempNode: QuasartreeNode = {
                id: NodeItem.cateId,
                label: NodeItem.cateName,
                children: [],
            };
            if (NodeItem.childNode?.length !== 0 && NodeItem.childNode !== undefined) {
                NodeItem.childNode.forEach((item: categoryNode) => {
                    tempNode.children.push(processCategoryNode(item));
                });
            }
            return tempNode;
        };

        const GetNodeID = (ID: any) => {
            emit("setselectedcategory", ID);
        };

        watch(selected, (newVal, oldVal) => {
            console.log("selected-watchsssssss", newVal, oldVal);
        });

        onMounted(() => {
            if (categoryList.value.length !== 0) CategoryNode.value = processCategoryNode(categoryList.value).children;
        });

        return {
            CategoryNode,
            selected,
            GetNodeID,
        };
    },
};
</script>
