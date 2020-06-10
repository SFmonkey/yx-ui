<template>
    <footer :style="{height}">
        <slot></slot>
    </footer>
</template>

<script>
export default {
    name: 'yxFooter',
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