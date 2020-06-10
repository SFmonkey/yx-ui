<template>
    <div class="yx-checkbox-group">
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'yxCheckboxGroup',
    componentName: 'yxCheckboxGroup',

    props: {
        value: Array,
        max: Number,
        min: Number,
        size: String,
        disabled: Boolean,
    },
};
</script>
