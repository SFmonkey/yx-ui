<template>
    <header :style="{height}">
        <slot></slot>
    </header>
</template>

<script>
export default {
    name: 'yxHeader',
    props: {
        height: {
            type: String,
            default: '60px',
        },
    },
};
</script>

<style lang="scss" scoped>
</style>