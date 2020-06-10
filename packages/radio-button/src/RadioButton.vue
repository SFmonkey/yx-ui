<template>
    <label
        class="yx-radio-button"
        :class="[
        buttonSize && `yx-radio-button--${buttonSize}`,
        model === label && `is-checked`
    ]"
    >
        <input
            type="radio"
            :value="label"
            v-model="model"
            @change="handleChange"
            class="yx-radio-button__origin"
        />
        <span class="yx-radio-button__inner">
            <slot></slot>
            <template v-if="!$slots.default">{{label}}</template>
        </span>
    </label>
</template>

<script>
import Emitter from '@src/mixins/emitter';
export default {
    name: 'yxRadioButton',

    mixins: [Emitter],

    props: {
        value: {
            type: [String, Number, Boolean],
        },
        label: {
            type: [String, Number, Boolean],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
        },
        name: {
            type: String,
        },
    },
    data() {
        return {
            _groupRadio: '',
        };
    },
    computed: {
        isGroup() {
            let parent = this.$parent || this.$root;

            while (parent) {
                if (parent.$options.componentName !== 'yxRadioGroup') {
                    parent = this.$parent;
                } else {
                    this._groupRadio = parent;
                    return true;
                }
            }

            return false;
        },
        model: {
            get() {
                return this.isGroup ? this._groupRadio.value : this.value;
            },
            set(val) {
                this.isGroup
                    ? this.dispatch('yxRadioGroup', 'input', val)
                    : this.$emit('input', val);
            },
        },
        buttonSize() {
            return this.isGroup ? this._groupRadio.radioGroupSize : this.size;
        },
    },
    methods: {
        handleChange() {
            this.isGroup &&
                this.dispatch('yxRadioGroup', 'handleChange', this.model);
        },
    },
    created() {},
};
</script>
