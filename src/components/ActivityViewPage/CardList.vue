<template>
    <q-card class="my-card" v-for="(data, idx) in Activity" :key="idx">
        <img :src="data.image" />
        <div color="primary" class="absolute">
            <span>{{ data.Time }}</span>
        </div>
        <q-card-section>
            <div class="text-h6">{{ data.title }}</div>
            <div class="text-subtitle2">by John Doe</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            {{ data.lorem }}
        </q-card-section>
    </q-card>
</template>

<script>
import { ref } from "vue";

export default {
    setup() {
        const Activity = ref([
            {
                title: "和明織品文化館 HMTM",
                Time: "-32min",
                image: "https://cdn.quasar.dev/img/mountains.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                title: "澎湖鯨魚洞",
                Time: "-32min",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                title: "石門班哨角休憩區",
                Time: "-32min",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                title: "宜蘭伯朗大道",
                Time: "-32min",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                title: "花蓮七星潭",
                Time: "-32min",
                image: "https://cdn.unwire.hk/wp-content/uploads/2017/01/monkeys-streetview.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
        ]);
        return {
            Activity,
        };
    },
};
</script>
