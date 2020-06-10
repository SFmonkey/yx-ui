<template>
    <a
        :disabled="disabled"
        :href="!disabled && href"
        :class="['yx-link', `yx-link--${type}`,  disabled ? 'is-disabled' : underline ? 'is-underline' : '']"
        @click="handleClick"
    >
        <i :class="icon" v-if="icon"></i>
        <slot></slot>
    </a>
</template>

<script>
export default {
    name: 'yxLink',
    props: {
        type: {
            type: String,
            default: 'default',
        },
        underline: {
            type: Boolean,
            default: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        href: {
            type: String,
        },
        icon: {
            type: String,
        },
    },
    methods: {
        handleClick(e) {
            !this.disabled && !this.href && this.$emit('click', e);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>