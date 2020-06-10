<template>
    <label
        class="yx-checkbox"
        :class="[
            border && checkboxSize ? 'yx-checkbox--' + checkboxSize : '',
            { 'is-disabled': isDisabled },
            { 'is-bordered': border },
            { 'is-checked': isChecked },
        ]"
    >
        <span
            class="yx-checkbox__input"
            :class="[
                { 'is-checked': isChecked },
                { 'is-disabled': isDisabled },
                { 'is-indeterminate': indeterminate },
            ]"
        >
            <span class="yx-checkbox__inner"></span>
            <input
                type="checkbox"
                v-model="model"
                class="yx-checkbox__origin"
                :disabled="isDisabled"
                :value="label"
                @change="handleChange"
            />
        </span>
        <span class="yx-checkbox__label" v-if="$slots.default || label">
            <slot></slot>
            <template v-if="!$slots.default">{{ label }}</template>
        </span>
    </label>
</template>

<script>
import Emitter from '@src/mixins/emitter';

export default {
    name: 'yxCheckbox',
    mixins: [Emitter],
    props: {
        value: {
            type: [String, Number, Boolean],
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: [String, Number, Boolean],
        },
        indeterminate: {
            type: Boolean,
            default: false,
        },
        border: {
            type: Boolean,
            default: false,
        },
        size: String,
    },
    data() {
        return {
            checkBoxGroup: '',
        };
    },
    computed: {
        isGroup() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.componentName !== 'yxCheckboxGroup') {
                    parent = parent.$parent;
                } else {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.checkBoxGroup = parent;
                    return true;
                }
            }

            return false;
        },
        model: {
            get() {
                return this.isGroup ? this.checkBoxGroup.value : this.value;
            },
            set(val) {
                this.isGroup
                    ? this.dispatch('yxCheckboxGroup', 'input', [val])
                    : this.$emit('input', val);
            },
        },
        // eslint-disable-next-line vue/return-in-computed-property
        isChecked() {
            if (
                Object.prototype.toString.call(this.model) ===
                '[object Boolean]'
            ) {
                return this.model;
            } else if (
                Object.prototype.toString.call(this.model) === '[object Array]'
            ) {
                return this.model.indexOf(this.label) > -1;
            }
        },
        isLimitDisabled() {
            const { min, max } = this.checkBoxGroup;

            return (
                (!!(max || min) &&
                    this.model.length >= max &&
                    !this.isChecked) ||
                (this.model.length <= min && this.isChecked)
            );
        },
        isDisabled() {
            return this.isGroup
                ? this.checkBoxGroup.disabled ||
                      this.disabled ||
                      this.isLimitDisabled
                : this.disabled;
        },
        checkboxSize() {
            const temCheckboxSize = this.size || (this.$ELEMENT || {}).size;
            return this.isGroup
                ? this.checkBoxGroup.size || temCheckboxSize
                : temCheckboxSize;
        },
    },
    methods: {
        handleChange(e) {
            let value;
            if (e.target.checked) {
                value = true;
            } else {
                value = false;
            }

            this.$emit('change', value, e);
            this.$nextTick(() => {
                if (this.isGroup) {
                    this.dispatch('yxCheckboxGroup', 'change', [
                        this.checkBoxGroup.value,
                    ]);
                }
            });
        },
    },
};
</script>
