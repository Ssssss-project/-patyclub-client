<template>
    <q-card
        v-ripple
        class="my-card cursor-pointer "
        v-for="(data, idx) in Activity"
        :key="idx"
        @mouseover="data.showInfo = true"
        @mouseleave="data.showInfo = false"
        @click="clickCard"
    >
        <q-icon name="favorite" class="unfavorite" @click="(e) => clickFavorite(e, data.id)" />
        <img :src="data.image" />
        <q-card-section>
            <div class="text-h6">{{ data.eventTitle }}</div>
            <div class="text-subtitle2">{{ data.owner !== "" ? `by ${data.owner}` : "" }}</div>
        </q-card-section>
        <div class="timeline">
            <span>{{ timeDiffCalc(new Date(data.eventEdDate)) }}</span>
        </div>

        <div class="q-pt-none" v-if="data.showInfo">
            <div class="text-h6 card-title scrollbarCol">{{ data.eventTitle }}</div>
            <div class="hover-content scrollbarCol">
                <span>{{ data.eventIntroduction }}</span>
                <div class="text-subtitle2">{{ data.owner !== "" ? `by ${data.owner}` : "" }}</div>
            </div>

            <div class="timeline">
                <span>{{ timeDiffCalc(new Date(data.eventEdDate)) }}</span>
            </div>
        </div>
    </q-card>
</template>

<script lang="ts">
import { toRef } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";
import { apiPutWatchEvent } from "@/apis/api/userRequest";

export default {
    name: "CardList",
    props: ["allEvent"],
    setup(props: any) {
        const Activity = toRef(props, "allEvent");
        const store = useStore();
        const $q = useQuasar();

        //計算時間差距
        function timeDiffCalc(dateFuture: Date) {
            let dateNow = new Date();
            let diffInMilliSeconds: number = Math.abs(dateFuture.getTime() - dateNow.getTime()) / 1000;
            // calculate days
            const days = Math.floor(diffInMilliSeconds / 86400);
            diffInMilliSeconds -= days * 86400;
            // calculate hours
            const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
            diffInMilliSeconds -= hours * 3600;
            // calculate minutes
            const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
            diffInMilliSeconds -= minutes * 60;
            let difference = "";
            if (days > 0) {
                difference += days === 1 ? `${days} day ` : `${days} days `;
            }
            difference += hours === 0 || hours === 1 ? `${hours} hour ` : `${hours} hours `;
            difference += minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;
            return difference;
        }

        const returnSVG = () => {
            return "img:" + require(`@/assets/icon/heartSolid.svg`);
        };

        const loginCheck = (eventID: number) => {
            let token = store.getters.getUserStore.sToken;
            if (token === "") {
                $q.notify({
                    color: "red-5",
                    textColor: "white",
                    icon: "warning",
                    message: "請先登入!",
                });
            } else {
                apiPutWatchEvent({
                    token: token,
                    eventId: eventID,
                })
                    .then(() => {
                        $q.notify({
                            icon: "done",
                            color: "positive",
                            message: "加入成功",
                        });
                    })
                    .catch(() => {
                        $q.notify({
                            color: "red-5",
                            textColor: "white",
                            icon: "warning",
                            message: "新增失敗!",
                        });
                    });
            }
        };

        const clickFavorite = (e: any, eventID: number) => {
            e.stopPropagation();
            loginCheck(eventID);
        };

        const clickCard = () => {
            console.log("---clickCard---");
        };

        return {
            Activity,
            timeDiffCalc,
            returnSVG,
            clickFavorite,
            clickCard,
        };
    },
};
</script>
