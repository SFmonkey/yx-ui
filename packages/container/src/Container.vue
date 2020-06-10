<template>
    <section :class="`yx-container ${isVertical ? 'is-vertical' : ''}`">
        <slot></slot>
    </section>
</template>

<script>
export default {
    name: 'yxContainer',
    props: {
        direction: {
            type: String,
        },
    },
    computed: {
        isVertical() {
            if (this.direction === 'horizontal') {
                return false;
            } else if (this.direction === 'vertical') {
                return true;
            } else if (this.$slots && this.$slots.default) {
                let vertical = false;
                this.$slots.default.forEach(v => {
                    if (
                        v.componentOptions &&
                        (v.componentOptions.tag === 'yx-header' ||
                            v.componentOptions.tag === 'yx-footer')
                    ) {
                        vertical = true;
                    }
                });
                return vertical;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
</style>