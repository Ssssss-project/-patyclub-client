<template>
    <div class="q-pa-md q-gutter-sm">
        <q-tree :nodes="simple" node-key="label" color="red" control-color="red" />
    </div>
</template>

<script>
export default {
    setup() {
        return {
            simple: [
                {
                    label: "APEX",
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
                    label: "LOL",
                    avatar: "",
                    children: [
                        {
                            label: "name4",
                            icon: "",
                           children: [{ label: "event1" }, { label: "event2" }],
                        },
                        {
                            label: "name5",
                            icon: "",
                            disabled: false,
                            children: [{ label: "event1" }, { label: "event2" }],
                        },
                        {
                            label: "name6",
                            icon: "",
                           children: [{ label: "event1" }, { label: "event2" }],
                        },
                    ],
                },
            ],
        };
    },
};
</script>
