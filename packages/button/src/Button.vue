<template>
    <button
        :type="nativeType"
        :class="getClassList"
        :autofocus="autofocus"
        :disabled="disabled || loading"
    >
        <i :class="getIcon" v-if="icon || loading"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
    </button>
</template>

<script>
export default {
    name: 'yxButton',
    props: {
        size: {
            type: String,
        },
        type: {
            type: String,
            default: 'default',
        },
        plain: {
            type: Boolean,
            default: false,
        },
        round: {
            type: Boolean,
            default: false,
        },
        circle: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        nativeType: {
            type: String,
            default: 'button',
        },
    },
    computed: {
        getClassList() {
            const classList = ['yx-button'];
            ['size', 'type'].forEach(v => {
                this[v] && classList.push(`yx-button--${this[v]}`);
            });

            ['plain', 'round', 'circle', 'disabled', 'loading'].forEach(v => {
                this[v] && classList.push(`is-${v}`);
            });

            return classList;
        },
        getIcon() {
            if (this.loading) {
                return 'yx-icon-loading';
            } else {
                return this.icon;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>