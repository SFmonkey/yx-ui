<template>
    <label
        class="yx-radio"
        :class="[
        border && radioSize && `yx-radio--${radioSize}`,
        border && 'is-bordered',
        radioDisabled && 'is-disabled',
    ]"
    >
        <span
            class="yx-radio__input"
            :class="[
                {'is-checked': label === model}
            ]"
        >
            <span class="yx-radio__inner"></span>
            <input
                type="radio"
                v-model="model"
                :value="label"
                :disabled="radioDisabled"
                class="yx-radio__native"
                :class="[{'is-disabled': radioDisabled}]"
                @change="handleChange"
            />
        </span>
        <span class="yx-radio__label">
            <slot></slot>
        </span>
        <template v-if="!$slots.default">{{label}}</template>
    </label>
</template>

<script>
import Emitter from '@src/mixins/emitter';

export default {
    name: 'yxRadio',

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
            radioGroup: '',
        };
    },
    computed: {
        isGroup() {
            let parent = this.$parent;

            while (parent) {
                if (parent.$options.componentName !== 'yxRadioGroup') {
                    parent = parent.$parent;
                } else {
                    this.radioGroup = parent;
                    return true;
                }
            }

            return false;
        },
        model: {
            get() {
                return this.isGroup ? this.radioGroup.value : this.value;
            },
            set(val) {
                this.isGroup
                    ? this.dispatch('yxRadioGroup', 'input', val)
                    : this.$emit('input', val);
            },
        },
        radioSize() {
            return this.isGroup ? this.radioGroup.radioGroupSize : this.size;
        },
        radioDisabled() {
            return this.isGroup
                ? this.radioGroup.disabled || this.disabled
                : this.disabled;
        },
    },
    methods: {
        handleChange() {
            this.$nextTick(() => {
                this.$emit('change', this.model);
                this.isGroup &&
                    this.dispatch('yxRadioGroup', 'handleChange', this.model);
            });
        },
    },
};
</script>