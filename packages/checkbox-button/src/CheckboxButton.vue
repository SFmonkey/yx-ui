<template>
    <label
        class="yx-checkbox-button"
        :class="[
                {'is-checked': isChecked},
                {'is-disabled': isDisabled},
                size ? 'yx-checkbox-button--' + size : '',
            ]"
    >
        <input
            type="checkbox"
            class="yx-checkbox-button__origin"
            v-model="model"
            :value="label"
            @change="handleChange"
        />
        <span class="yx-checkbox-button__inner" v-if="$slots.default || label">
            <slot>{{label}}</slot>
        </span>
    </label>
</template>

<script>
import Emitter from '@src/mixins/emitter';

export default {
    name: 'yxCheckboxButton',
    mixins: [Emitter],
    props: {
        label: [String, Number, Boolean],
    },

    computed: {
        isGroup() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.componentName !== 'yxCheckboxGroup') {
                    parent = parent.$parent;
                } else {
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
                    (this.model.length >= max && !this.isChecked)) ||
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
        size() {
            return this.checkBoxGroup.size || (this.$YX || {}).size;
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
                    console.log(this.checkBoxGroup.value);
                    this.dispatch('yxCheckboxGroup', 'change', [
                        this.checkBoxGroup.value,
                    ]);
                }
            });
        },
    },
};
</script>
