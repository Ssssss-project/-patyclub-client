<template>
    <div class="right-search">
        <div class="right-btn">
            <q-btn style="background: #eeb888; color: #402e32;border:1px solid black;" label="全部" size="sm" />
            <q-btn style="background: #ffffff; color: #402e32 ;border:1px solid black;" label="精選" size="sm" />
        </div>
        <div>
            <q-select
                v-model="searchWords"
                use-input
                use-chips
                multiple
                borderless
                input-debounce="0"
                @new-value="createValue"
                :options="filterOptions"
                @filter="filterFn"
                class="select-category"
                dropdown-icon="search"
                style="max-width:250px"
            />
            <div class="search-words">
                <span v-for="val in stringOptions" :key="val">
                    {{ val }}
                </span>
            </div>
        </div>
    </div>
    <div class="left-search">
        <div>
            <label>檢視</label>
            <q-select class="select-category" v-model="model" :options="options" borderless dense options-dense />
        </div>
        <div>
            <label>排序</label>
            <q-select class="select-category" v-model="model" :options="options" borderless dense options-dense />
        </div>
    </div>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const model = ref(options[0]);
        const stringOptions = [];
        const filterOptions = ref(stringOptions);
        const searchWords = ref(null);

        const createValue = (val, done) => {
            if (!stringOptions.includes(val)) {
                stringOptions.push(val);
                done(val, "add-unique");
            }
        };

        const filterFn = (val, update) => {
            update(() => {
                if (val === "") {
                    filterOptions.value = stringOptions;
                } else {
                    const needle = val;
                    filterOptions.value = stringOptions.filter((v) => v.indexOf(needle) > -1);
                }
            });
        };
        const inputValue = (val) => {
            console.log(val);
        };

        return {
            options,
            model,
            stringOptions,
            filterOptions,
            searchWords,
            filterFn,
            createValue,
            inputValue,
        };
    },
    components: {},
};
</script>
