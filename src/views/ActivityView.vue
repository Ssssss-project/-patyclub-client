<template>
    <Head />
    <main id="ActivityView">
        <div class="container">
            <div class="activity-main">
                <div class="activity-filter">
                    <div class="right-btn">
                        <q-btn
                            style="background: #eeb888; color: #402e32;border:1px solid black;"
                            label="全部"
                            size="sm"
                        />
                        <q-btn
                            style="background: #ffffff; color: #402e32 ;border:1px solid black;"
                            label="精選"
                            size="sm"
                        />
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
                </div>
                <div class="activity-information">
                    <div class="event-category">
                        <event-category />
                    </div>
                    <div class="card-list scrollbarCol">
                        <card-list />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import Head from "../components/Head.vue";
import CardList from "../components/ActivityViewPage/CardList.vue";
import EventCategory from "../components/ActivityViewPage/EventCategory.vue";

import { ref } from "vue";

export default {
    setup() {
        const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
        const model = ref(options[0]);
        return {
            options,
            model,
        };
    },
    components: {
        Head,
        CardList,
        EventCategory,
    },
};
</script>
