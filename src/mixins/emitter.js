export default {
    methods: {
        dispatch(componentName, event, params) {
            let parent = this.$parent || this.$root;

            while (parent) {
                if (parent.$options.componentName !== componentName) {
                    parent = parent.$parent;
                } else {
                    parent.$emit.apply(parent, [event].concat(params));
                    break;
                }
            }
        },
    },
};
