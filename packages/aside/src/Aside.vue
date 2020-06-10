<template>
    <aside :style="{width}">
        <slot></slot>
    </aside>
</template>

<script>
export default {
    name: 'yxAside',
    props: {
        width: {
            type: String,
            default: '300px',
        },
    },
};
</script>

<style lang="scss" scoped>
</style>