<template>
    <i :class="`yx-icon-${name}`"></i>
</template>

<script>
export default {
    name: 'yxIcon',
    props: {
        name: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
</style>