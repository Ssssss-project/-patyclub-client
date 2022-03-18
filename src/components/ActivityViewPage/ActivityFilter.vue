<template>
    <div class="left-search">
        <div class="right-btn">
            <q-btn class="activity-all" label="全部" size="md" @click="clickAll()" />
            <q-btn class="activity-recommended" label="精選" size="md" @click="clickArticles()" />
        </div>
        <div class="search-input">
            <q-input class="search-textfield" v-model="searchWords" @keydown.enter="submit(searchWords)" borderless>
                <template v-slot:append>
                    <q-icon name="search" @click="submit(searchWords)" class="cursor-pointer" />
                </template>
            </q-input>
            <div class="search-words">
                <span v-for="(val, index) in stringOption" :key="val">
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
import { ref, toRef } from "vue";

export default {
    props: ["sortCondition", "sortConditionModel", "stringOptions"],
    emits: ["setSortCondition", "setDefaultAllCondition", "setArticles", "handleSearchWord", "deleteSearchWord"],
    setup(props: any, { emit }: any) {
        const sortConditionFromProp = toRef(props, "sortCondition");
        const sortConditionSelect = toRef(props, "sortConditionModel");
        const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const model = ref(options[0]);
        const stringOption = toRef(props, "stringOptions");
        const searchWords = ref(null);

        const submit = (refKey: string) => {
            console.log(refKey);
            emit("handleSearchWord", refKey);
            searchWords.value = null;
        };

        const deleteValue = (index: number) => {
            emit("deleteSearchWord", index);
        };

        const changeSortCondition = (val: string) => {
            emit("setSortCondition", val);
        };

        const clickAll = () => {
            emit("setDefaultAllCondition");
        };

        const clickArticles = () => {
            emit("setArticles");
        };

        return {
            options,
            model,
            sortConditionFromProp,
            sortConditionSelect,
            stringOption,
            searchWords,
            deleteValue,
            submit,
            changeSortCondition,
            clickAll,
            clickArticles,
        };
    },
    components: {},
};
</script>
