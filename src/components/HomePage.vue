<template>
    <main id="Home">
        <div class="main-bar">
            <button class="btns" @click="bShowChat = true">測試聊天室</button>
            <button class="btns">所有活動</button>
            <router-link :to="`/activityCreate`">
                <button class="btns">創建活動</button>
            </router-link>
            <button class="btns" @click="openLoginDialog">登入</button>
        </div>
        <div class="container">
            <transition name="first-step" mode="out-in">
                <div class="first-step" @click="showInfo" v-if="showFirstStep">
                    <img src="../assets/PatyLogo.png" />
                </div>
                <div class="second-step" v-else-if="showSecondStep">
                    <div class="billboard" @click="showBillBoard">公佈欄｜BillBoard</div>
                    <div class="hotActivity" @click="showActivities">活動精選｜Hot Activities</div>
                </div>
            </transition>
            <transition name="billboard-step">
                <div class="CardInfo billboard-info" v-if="showBillBoardInfo">
                    <div class="CardInfo-right CardInfo-right-bill">
                        <div class="tag-group tag-group-billboard">
                            <div class="tag tag-billboard">公佈欄｜BillBoard</div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="hotActivity-step">
                <div class="CardInfo hotActivity-info" v-if="showActivitiesInfo">
                    <div class="CardInfo-right CardInfo-right-hot" @mouseleave="showInfo">
                        <div class="tag-group tag-group-hotActivity">
                            <div class="tag tag-hotActivity">活動精選｜Hot Activities</div>
                            <div class="information-bg scrollbarCol">
                                <ul class="timeline">
                                    <li class="event">
                                        <p>Text1</p>
                                    </li>
                                    <li class="event">
                                        <p>Text2</p>
                                    </li>
                                    <li class="event">
                                        <p>Text3</p>
                                    </li>

                                    <li class="event">
                                        <p>Text4</p>
                                    </li>
                                    <li class="event">
                                        <p>Text5</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="bg-image opacity-set" :style="backgroundimg"></div>

        <TestChat :openModal="bShowChat" @close-modal="bShowChat = false" />
    </main>
</template>

<script>
import LoginDialog from "./LoginDialog.vue";
import TestChat from "./TestChat.vue";
import { useQuasar } from "quasar";
import { ref } from "vue";
export default {
    setup() {
        const $q = useQuasar();
        function openLoginDialog() {
            $q.dialog({
                component: LoginDialog,
                // componentProps: {
                //   message: "something",
                // },
            })
                .onOk(() => {
                    console.log("OK");
                })
                .onCancel(() => {
                    console.log("Cancel");
                });
        }
        const showFirstStep = ref(true);
        const showSecondStep = ref(false);
        const showBillBoardInfo = ref(false);
        const showActivitiesInfo = ref(false);
        const isopacity = ref(true);
        const bShowChat = ref(false);
        const backgroundimg = ref({
            // backgroundImage: "url(" + require("../assets/backgroundImage.png") + ")",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundPosition: "bottom",
        });

        function showInfo() {
            showFirstStep.value = false;
            showSecondStep.value = true;
            showBillBoardInfo.value = false;
            showActivitiesInfo.value = false;
        }
        function showBillBoard() {
            showSecondStep.value = false;
            showBillBoardInfo.value = true;
            showActivitiesInfo.value = false;
        }
        function showActivities() {
            showSecondStep.value = false;
            showBillBoardInfo.value = false;
            showActivitiesInfo.value = true;
        }

        return {
            backgroundimg,
            showFirstStep,
            showSecondStep,
            showBillBoardInfo,
            showActivitiesInfo,
            bShowChat,
            isopacity,
            openLoginDialog,
            showInfo,
            showBillBoard,
            showActivities,
        };
    },
    components: {
        TestChat,
    },
};
</script>
