<template>
    <main id="ActivityView">
        <Head />
        <div class="container">
            <div class="card-list">
                <q-card class="my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <div color="primary" class="absolute">
                        <span>Time</span>
                    </div>
                    <q-card-section>
                        <div class="text-h6">Our Changing Planet</div>
                        <div class="text-subtitle2">by John Doe</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        {{ lorem }}
                    </q-card-section>
                </q-card>
                <q-card class="my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <div color="primary" class="absolute">
                        <span>Time</span>
                    </div>
                    <q-card-section>
                        <div class="text-h6">Our Changing Planet</div>
                        <div class="text-subtitle2">by John Doe</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        {{ lorem }}
                    </q-card-section>
                </q-card>
                <q-card class="my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <div color="primary" class="absolute">
                        <span>Time</span>
                    </div>
                    <q-card-section>
                        <div class="text-h6">Our Changing Planet</div>
                        <div class="text-subtitle2">by John Doe</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        {{ lorem }}
                    </q-card-section>
                </q-card>
                <q-card class="my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <div color="primary" class="absolute">
                        <span>Time</span>
                    </div>
                    <q-card-section>
                        <div class="text-h6">Our Changing Planet</div>
                        <div class="text-subtitle2">by John Doe</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        {{ lorem }}
                    </q-card-section>
                </q-card>
                <q-card class="my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <div color="primary" class="absolute">
                        <span>Time</span>
                    </div>
                    <q-card-section>
                        <div class="text-h6">Our Changing Planet</div>
                        <div class="text-subtitle2">by John Doe</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        {{ lorem }}
                    </q-card-section>
                </q-card>
                <q-card class="my-card">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" />
                    <div color="primary" class="absolute">
                        <span>Time</span>
                    </div>
                    <q-card-section>
                        <div class="text-h6">Our Changing Planet</div>
                        <div class="text-subtitle2">by John Doe</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        {{ lorem }}
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </main>
</template>

<script>
import Head from "../components/Head.vue";
import { ref } from "vue";

export default {
    setup() {
        return {
            expanded: ref(false),
            lorem:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        };
    },
    components: {
        Head,
    },
};
</script>
