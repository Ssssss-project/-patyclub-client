import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/activityCreate",
        name: "activityCreate",
        component: () => import("../views/ActivityCreate.vue"),
    },
    {
        path: "/activityView",
        name: "activityView",
        component: () => import("../views/ActivityView.vue"),
    },
    {
        path: "/user/resetPassword/:token",
        name: "resetPassword",
        component: () => import("../views/ResetPassword.vue"),
    },
    {
        path: "/UserProfile/:item",
        name: "UserProfile",
        component: () => import("../views/UserProfile.vue"),
    },
    {
        path: "/ActivityShowView/:id",
        name: "ActivityShowView",
        component: () => import("../views/ActivityShowView.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
