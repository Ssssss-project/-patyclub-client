<template>
    <div class="q-pa-md q-gutter-sm">
        <q-tree :nodes="simple" node-key="label" />
    </div>
</template>

<script>
export default {
    setup() {
        return {
            simple: [
                {
                    label: "Satisfied customers (with avatar)",
                    avatar: "",
                    children: [
                        {
                            label: "name1",
                            icon: "",
                            children: [{ label: "event1" }, { label: "event2" }],
                        },
                        {
                            label: "name2",
                            icon: "",
                            disabled: false,
                            children: [{ label: "event1" }, { label: "event2" }],
                        },
                        {
                            label: "name3",
                            icon: "",
                            children: [{ label: "event1" }, { label: "event2" }],
                        },
                    ],
                },
                {
                    label: "Satisfied customers 2 (with avatar)",
                    avatar: "",
                    children: [
                        {
                            label: "Good food (with icon)",
                            icon: "",
                            children: [{ label: "Quality ingredients" }, { label: "Good recipe" }],
                        },
                        {
                            label: "Good service (disabled node with icon)",
                            icon: "",
                            disabled: false,
                            children: [{ label: "Prompt attention" }, { label: "Professional waiter" }],
                        },
                        {
                            label: "Pleasant surroundings (with icon)",
                            icon: "",
                            children: [
                                {
                                    label: "Happy atmosphere (with image)",
                                    img: "",
                                },
                                { label: "Good table presentation" },
                                { label: "Pleasing decor" },
                            ],
                        },
                    ],
                },
            ],
        };
    },
};
</script>
