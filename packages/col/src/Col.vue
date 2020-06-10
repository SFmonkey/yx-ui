<script>
export default {
    name: 'yxCol',
    props: {
        span: {
            type: Number,
            default: 24,
        },
        offset: {
            type: Number,
            default: 0,
        },
        push: {
            type: Number,
            default: 0,
        },
        pull: {
            type: Number,
            default: 0,
        },
        xs: {
            type: [Number, Object],
        },
        sm: {
            type: [Number, Object],
        },
        md: {
            type: [Number, Object],
        },
        lg: {
            type: [Number, Object],
        },
        xl: {
            type: [Number, Object],
        },
        tag: {
            type: String,
            default: 'div',
        },
    },
    computed: {
        gutter() {
            const parent = this.$parent;

            while (parent && parent.$options.componentName !== 'ElRow') {
                parent = parent.$parent;
            }

            return parent ? parent.gutter : 0;
        },
    },
    methods: {
        getClassList() {
            const classList = ['yx-col'];
            ['span', 'offset', 'push', 'pull'].forEach(item => {
                if (this[item] === 0) {
                    return;
                }
                item !== 'span'
                    ? classList.push(`yx-col-${item}-${this[item]}`)
                    : classList.push(`yx-col-${this[item]}`);
            });

            ['xs', 'sm', 'md', 'lg', 'xl'].forEach(item => {
                if (
                    Object.prototype.toString.call(this[item]) ===
                    '[object Object]'
                ) {
                    Object.keys(item).forEach(v => {
                        if (this[item] === 0) {
                            return;
                        }
                        v !== 'span'
                            ? classList.push(
                                  `yx-col-${item}-${v}-${this[item]}`,
                              )
                            : classList.push(`yx-col-${item}-${this[item]}`);
                    });
                } else if (
                    Object.prototype.toString.call(this[item]) ===
                    '[object Number]'
                ) {
                    if (this[item] === 0) {
                        return;
                    }
                    classList.push(`yx-col-${item}-${this[item]}`);
                }
            });

            return classList;
        },
    },
    render(createElement) {
        const style = {};
        if (this.gutter) {
            style.paddingLeft = `${this.gutter / 2}px`;
            style.paddingRight = `${this.gutter / 2}px`;
        }
        return createElement(
            this.tag,
            {
                style,
                class: this.getClassList(),
            },
            this.$slots.default,
        );
    },
};
</script>

<style lang="scss" scoped>
</style>