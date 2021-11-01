<template>
    <main id="Home">
        <div class="main-bar">
            <button class="btns" @click="bShowChat = true">測試聊天室</button>
            <button class="btns">所有活動</button>
            <router-link :to="`/activityCreate`">
                <button class="btns">創建活動</button>
            </router-link>
            <button class="btns" @click="bShowModal = true">登入</button>
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
                <div class="billboardInfo" v-if="showBillBoardInfo">
                    <div class="billboardInfo-right">
                        <div class="tag-group">
                            <div class="tag">公佈欄｜BillBoard</div>
                            <div class="tag" @click="showActivities">活動精選｜Hot Activities</div>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="hotActivity-step">
                <div class="hotActivityInfo" v-if="showActivitiesInfo">
                    <div class="hotActivityInfo-right">
                        <div class="tag-group">
                            <div class="tag" @click="showBillBoard">公佈欄｜BillBoard</div>
                            <div class="tag">活動精選｜Hot Activities</div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
        <div class="bg-image" :class="{ 'opacity-set': isopacity }" :style="backgroundimg"></div>
        <LoginModal :openModal="bShowModal" @close-modal="bShowModal = false" />
        <TestChat :openModal="bShowChat" @close-modal="bShowChat = false" />
    </main>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import TestChat from "./TestChat.vue";
export default {
    components: {
        LoginModal,
        TestChat,
    },
    data() {
        return {
            showFirstStep: true,
            showSecondStep: false,
            showThirdStep: false,
            showBillBoardInfo: false,
            showActivitiesInfo: false,
            isopacity: true,
            backgroundimg: {
                backgroundImage: "url(" + require("../assets/backgroundImage.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundPosition: "bottom",
            },
            bShowModal: false,
            bShowChat: false,
        };
    },
    methods: {
        showInfo() {
            this.showFirstStep = false;
            this.showSecondStep = true;
            this.showBillBoardInfo = false;
            this.showActivitiesInfo = false;
        },
        showBillBoard() {
            this.showSecondStep = false;
            this.showBillBoardInfo = true;
            this.showActivitiesInfo = false;
        },
        showActivities() {
            this.showSecondStep = false;
            this.showBillBoardInfo = false;
            this.showActivitiesInfo = true;
        },
        routeLoginPage() {},
    },
};
</script>
