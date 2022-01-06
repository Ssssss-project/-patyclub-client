<template>
  <div class="right-search">
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
    <div>
      <div class="col-3">
        <q-input v-model="searchWords" @keydown.enter="submit(searchWords)">
          <template v-slot:append>
            <q-icon name="search" @click="submit(searchWords)" class="cursor-pointer"/>
          </template>
        </q-input>
      </div>
      <div>
        <span
          v-for="val in stringOptions"
          :key="val"
        >
          <q-chip dense size="md">{{val}}  <q-icon name="close" @click="text = ''" class="cursor-pointer" /></q-chip>
        </span>
      </div>
    </div>
  </div>
  <div class="left-search">
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
    const stringOptions = [];
    const searchWords = ref(null);

    const submit = (refKey) => {
      stringOptions.push(refKey)
      searchWords.value = ""
    }

    

    return {
      options,
      model,
      stringOptions,
      searchWords,
      submit
    };
  },
  components: {},
};
</script>
