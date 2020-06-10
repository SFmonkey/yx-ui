<template>
    <div class="yx-radio-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'yxRadioGroup',
    componentName: 'yxRadioGroup',
    props: {
        value: {
            type: [String, Number, Boolean],
        },
        change: {
            type: Function,
        },
        size: {
            type: String,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        radioGroupSize() {
            return this.size || (this.$YX || {}).size;
        },
    },
    methods: {},
    created() {
        this.$on('handleChange', val => {
            this.$emit('change', val);
        });
    },
};
</script>
