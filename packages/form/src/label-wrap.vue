<script>
export default {
    props: {
        isAutoWidth: Boolean,
        updateAll: Boolean,
    },

    inject: ['yxForm', 'elForm'],

    render() {
        const slots = this.$slots.default;
        if (!slots) return null;
        if (this.isAutoWidth) {
            const autoLabelWidth = this.yxForm.autoLabelWidth;
            const style = {};

            if (autoLabelWidth && autoLabelWidth !== 'auto') {
                const marginLeft = parseInt() - 
            }
        }
    }
};
</script>>