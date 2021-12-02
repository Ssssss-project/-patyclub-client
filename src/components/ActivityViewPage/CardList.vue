<template>
    <q-card
        v-ripple
        class="my-card cursor-pointer q-hoverable"
        v-for="(data, idx) in Activity"
        :key="idx"
        @mouseover="data.showInfo = true"
        @mouseleave="data.showInfo = false"
    >
        <img :src="data.image" />
        <div color="primary" class="absolute">
            <span>{{ data.Time }}</span>
        </div>
        <q-card-section>
            <div class="text-h6">{{ data.title }}</div>
            <div class="text-subtitle2">by {{ data.author }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-if="data.showInfo">
            <div>{{ data.title }}</div>
            {{ data.lorem }}
            <div class="text-subtitle2">by {{ data.author }}</div>
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
                author: "John Doe",
                image: "https://cdn.quasar.dev/img/mountains.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "澎湖鯨魚洞",
                Time: "-32min",
                author: "John Doe",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "石門班哨角休憩區",
                Time: "-32min",
                author: "John Doe",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "石門班哨角休憩區",
                Time: "-32min",
                author: "John Doe",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "石門班哨角休憩區",
                Time: "-32min",
                author: "John Doe",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "石門班哨角休憩區",
                Time: "-32min",
                author: "John Doe",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "宜蘭伯朗大道",
                Time: "-32min",
                author: "John Doe",
                image:
                    "http://3.bp.blogspot.com/-HQUoNcoZjNo/U_X29edQJGI/AAAAAAADu1U/4yru_qvtFKg/s1600/simple%2Bnew%2Btab-07.png",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "花蓮七星潭",
                Time: "-32min",
                author: "John Doe",
                image: "https://cdn.unwire.hk/wp-content/uploads/2017/01/monkeys-streetview.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "花蓮七星潭",
                Time: "-32min",
                author: "John Doe",
                image: "https://cdn.unwire.hk/wp-content/uploads/2017/01/monkeys-streetview.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "花蓮七星潭",
                Time: "-32min",
                author: "John Doe",
                image: "https://cdn.unwire.hk/wp-content/uploads/2017/01/monkeys-streetview.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "花蓮七星潭",
                Time: "-32min",
                author: "John Doe",
                image: "https://cdn.unwire.hk/wp-content/uploads/2017/01/monkeys-streetview.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
            {
                title: "花蓮七星潭",
                Time: "-32min",
                author: "John Doe",
                image: "https://cdn.unwire.hk/wp-content/uploads/2017/01/monkeys-streetview.jpg",
                lorem:
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                showInfo: false,
            },
        ]);
        return {
            Activity,
        };
    },
};
</script>
