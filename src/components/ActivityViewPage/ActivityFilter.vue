<template>
  <div class="left-search">
    <div class="right-btn">
      <q-btn
        class="activity-all"
        label="全部"
        size="md"
      />
      <q-btn
        class="activity-recommended"
        label="精選"
        size="md"
      />
    </div>
    <div class="search-input">
      <q-input
        class="search-textfield"
        v-model="searchWords"
        @keydown.enter="submit(searchWords)"
        borderless
      >
        <template v-slot:append>
          <q-icon
            name="search"
            @click="submit(searchWords)"
            class="cursor-pointer"
          />
        </template>
      </q-input>
      <div class="search-words">
        <span
          v-for="(val, index) in stringOptions"
          :key="val"
        >
          <q-chip
            dense
            size="md"
            color="#eeb888"
          >{{ val }}
            <q-icon
              name="close"
              @click="deleteValue(index)"
              class="cursor-pointer"
            />
          </q-chip>
        </span>
      </div>
    </div>
  </div>
  <div class="right-search">
    <div>
      <label>檢視</label>
      <q-select
        class="select-category"
        v-model="model"
        :options="options"
        borderless
        dense
        options-dense
      />
    </div>
    <div>
      <label>排序</label>
      <q-select
        class="select-category"
        v-model="model"
        :options="options"
        borderless
        dense
        options-dense
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
    const model = ref(options[0]);
    const stringOptions = ref([]);
    const searchWords = ref(null);

    const submit = (refKey) => {
      stringOptions.value.push(refKey);
      searchWords.value = null;
    };

    const deleteValue = (index) => {
      stringOptions.value.splice(index, 1);
    };

    return {
      options,
      model,
      stringOptions,
      searchWords,
      deleteValue,
      submit,
    };
  },
  components: {},
};
</script>
