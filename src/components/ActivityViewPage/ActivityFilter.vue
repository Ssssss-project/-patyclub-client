<template>
    <div class="left-search">
        <div class="right-btn">
            <q-btn class="activity-all" label="全部" size="md" />
            <q-btn class="activity-recommended" label="精選" size="md" />
        </div>
        <div class="search-input">
            <q-input class="search-textfield" v-model="searchWords" @keydown.enter="submit(searchWords)" borderless>
                <template v-slot:append>
                    <q-icon name="search" @click="submit(searchWords)" class="cursor-pointer" />
                </template>
            </q-input>
            <div class="search-words">
                <span v-for="(val, index) in stringOptions" :key="val">
                    <q-chip dense size="md" color="#eeb888"
                        >{{ val }}
                        <q-icon name="close" @click="deleteValue(index)" class="cursor-pointer" />
                    </q-chip>
                </span>
            </div>
        </div>
    </div>
    <div class="right-search">
        <div>
            <label>檢視</label>
            <q-select class="select-category" v-model="model" :options="options" borderless dense options-dense />
        </div>
        <div>
            <label>排序</label>
            <q-select
                class="select-category"
                v-model="sortConditionSelect"
                :options="sortConditionFromProp"
                @update:model-value="(val) => changeSortCondition(val)"
                borderless
                dense
                options-dense
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Ref, ref, toRef } from "vue";

export default {
    props: ["sortCondition", "sortConditionModel"],
    emits: ["setSortCondition"],
    setup(props: any, { emit }: any) {
        const sortConditionFromProp = toRef(props, "sortCondition");
        const sortConditionSelect = toRef(props, "sortConditionModel");
        const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const model = ref(options[0]);
        const stringOptions: Ref<string[]> = ref([]);
        const searchWords = ref(null);

        const submit = (refKey: string) => {
            stringOptions.value.push(refKey);
            searchWords.value = null;
        };

        const deleteValue = (index: number) => {
            stringOptions.value.splice(index, 1);
        };

        const changeSortCondition = (val: string) => {
            emit("setSortCondition", val);
        };

        return {
            options,
            model,
            sortConditionFromProp,
            sortConditionSelect,
            stringOptions,
            searchWords,
            deleteValue,
            submit,
            changeSortCondition,
        };
    },
    components: {},
};
</script>
