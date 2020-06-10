<script>
export default {
    name: 'yxRow',
    componentName: 'yxRow',
    props: {
        gutter: {
            type: Number,
            default: 0,
        },
        type: {
            type: String,
        },
        justify: {
            type: String,
            default: 'start',
        },
        align: {
            type: String,
            default: 'center',
        },
        tag: {
            type: String,
            default: 'div',
        },
    },
    computed: {
        rowStyle() {
            return this.type === 'flex'
                ? {
                      display: 'flex',
                      justifyContent: this.justify,
                      alignItems: this.align,
                  }
                : {};
        },
    },
    render(createElement) {
        return createElement(
            this.tag,
            {
                style: this.rowStyle,
                class: ['yx-row', { 'yx-row--flex': this.type === 'flex' }],
            },
            this.$slots.default,
        );
    },
};
</script>

<style lang="scss" scoped>
</style>