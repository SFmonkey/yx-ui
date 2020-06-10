<template>
    <div>
        <template v-if="type !== 'textarea'">
            <div v-if="$slots.prepend">
                <slot name="prepend"></slot>
            </div>
            <input
                ref="input"
                class="yx-input__inner"
                v-bind="$attrs"
                :tabindex="tabindex"
                :type="
                    showPassword
                        ? passwordVisible
                            ? 'text'
                            : 'password'
                        : type
                "
                :disabled="inputDisabled"
                :readonly="readonly"
                :autocomplete="autoComplete"
                @compositionstart="handleCompositionStart"
                @compositionupdate="handleCompositionUpdate"
                @compositionend="handleCompositionEnd"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
                :aria-label="label"
            />
            <span v-if="$slots.prefix || prefixIcon">
                <slot name="prefix"></slot>
                <i v-if="prefixIcon" :class="prefixIcon"></i>
            </span>
            <span v-if="getSuffixVisible">
                <span>
                    <template
                        v-if="
                            !showClear || !showPwdVisible || !isWordLimitVisible
                        "
                    >
                        <slot name="suffix"></slot>
                        <i v-if="suffixIcon" :class="suffixIcon"></i>
                    </template>
                    <i
                        v-if="showClear"
                        class="yx-input__icon yx-icon-circle-close yx-input__clear"
                        @mousedown.prevent
                        @click="clear"
                    ></i>
                    <i
                        v-if="showPwdVisible"
                        class="yx-input__icon yx-icon-view yx-input__clear"
                        @click="handlePasswordVisible"
                    ></i>
                    <span v-if="isWordLimitVisible" class="yx-input__count">
                        <span class="yx-input__count-inner">
                            {{ textLength }}/{{ upperLimit }}
                        </span>
                    </span>
                </span>
                <i
                    v-if="vaildateState"
                    :class="['yx-input__validateIcon', validateIcon]"
                ></i>
            </span>
            <div v-if="$slots.append">
                <slot name="append"></slot>
            </div>
        </template>
        <textarea
            v-else
            ref="textarea"
            :tabindex="tabindex"
            class="yx-textarea__inner"
            v-bind="$attrs"
            :disabled="inputDisabled"
            :readonly="readonly"
            :autocomplete="autoComplete"
            :style="textareaStyle"
            @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate"
            @compositionend="handleCompositionEnd"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :aria-label="label"
        >
        </textarea>
        <span v-if="isWordLimitVisible">{{ textLength }}/{{ upperLimit }}</span>
    </div>
</template>

<script>
import emitter from 'yx-ui/src/mixins/emitter';
import { isKorean } from 'yx-ui/src/utils/shared';
import calcTextareaHeight from './calcTextareaHeight';
import merge from 'yx-ui/src/utils/merge';
export default {
    name: 'yxInput',

    componentName: 'yxInput',

    mixins: [emitter],

    inject: {
        yxForm: {
            default: '',
        },
        yxFormItem: {
            default: '',
        },
    },

    props: {
        type: {
            type: String,
            default: 'text',
        },
        value: [String, Number],
        prefixIcon: String,
        suffixIcon: String,
        label: String,
        tabindex: String,
        resize: String,
        readonly: Boolean,
        disabled: Boolean,
        clearable: {
            type: Boolean,
            default: false,
        },
        showPassword: {
            type: Boolean,
            default: false,
        },
        showWordLimit: {
            type: Boolean,
            default: false,
        },
        autoComplete: {
            type: String,
            default: 'off',
        },
        validateEvent: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            textareaCalcStyle: {},
            focused: false,
            hovering: false,
            passwordVisible: false,
            isComposing: false,
        };
    },

    computed: {
        isWordLimitVisible() {
            return (
                this.showWordLimit &&
                this.$attrs.maxlength &&
                (this.type === 'text' || this.type === 'textarea') &&
                !this.inputDisabled &&
                !this.readonly &&
                !this.showPassword
            );
        },
        textLength() {
            if (typeof this.value === 'number') {
                return this.value;
            }

            return (this.value || '').length;
        },
        upperLimit() {
            return this.$attrs.maxLength;
        },
        getSuffixVisible() {
            return (
                this.$slots.suffix ||
                this.suffixIcon ||
                this.showClear ||
                this.showPassword ||
                this.isWordLimitVisible ||
                (this.vaildateState && this.needStatusIcon)
            );
        },
        vaildateState() {
            return this.yxFormItem ? this.yxFormItem.vaildateState : '';
        },
        needStatusIcon() {
            return this.yxForm ? this.yxForm.statusIcon : false;
        },
        validateIcon() {
            return {
                validating: 'yx-icon-loading',
                success: 'yx-icon-circle-check',
                error: 'yx-icon-circle-close',
            }[this.vaildateState];
        },
        showClear() {
            return (
                this.clearable &&
                !this.inputDisable &&
                !this.readonly &&
                this.nativeInputValue &&
                (this.focused || this.hovering)
            );
        },
        showPwdVisible() {
            return (
                this.showPassword &&
                !this.inputDisabled &&
                !this.readonly &&
                (!!this.nativeInputValue || this.focused)
            );
        },
        inputDisabled() {
            return this.disabled || (this.elForm || {}).disabled;
        },
        nativeInputValue() {
            return this.value === null || this.value === undefined
                ? ''
                : String(this.value);
        },
        textareaStyle() {
            return merge({}, this.textareaCalcStyle, { resize: this.resize });
        },
    },
    watch: {
        nativeInputValue() {
            this.setNativeInputValue();
        },
    },
    methods: {
        resizeTextarea() {
            if (this.$isServer) return;
            const { autosize, type } = this;
            if (type !== 'textarea') return;
            if (!autosize) {
                this.textareaCalcStyle = {
                    minHeight: calcTextareaHeight(this.$refs.textarea)
                        .minHeight,
                };
                return;
            }
            const minRows = autosize.minRows;
            const maxRows = autosize.maxRows;
            this.textareaCalcStyle = calcTextareaHeight(
                this.$refs.textarea,
                minRows,
                maxRows,
            );
        },
        getInput() {
            return this.$refs.input || this.$refs.textarea;
        },
        focus() {
            this.getInput().focus();
        },
        blur() {
            this.getInput().blur();
        },
        clear() {
            this.$emit('input', '');
            this.$emit('change', '');
            this.$emit('clear');
        },
        handlePasswordVisible() {
            this.passwordVisible = !this.passwordVisible;
            this.focus();
        },
        handleCompositionStart() {
            this.isComposing = true;
        },
        handleCompositionUpdate(event) {
            const text = event.target.value;
            const lastCharacter = text[text.length - 1] || '';
            this.isComposing = !isKorean(lastCharacter);
        },
        handleCompositionEnd(event) {
            if (this.isComposing) {
                this.isComposing = false;
                this.handleInput(event);
            }
        },
        handleInput(event) {
            if (this.isComposing) return;

            this.$emit('input', event.target.value);

            this.$nextTick(this.setNativeInputValue);
        },
        handleFocus(event) {
            this.focused = true;
            this.$emit('focus', event);
        },
        handleBlur(event) {
            this.focused = false;
            this.$emit('blur', event);
            if (this.validateEvent) {
                this.dispatch('yxFormItem', 'yx.form.blur', [this.value]);
            }
        },
        handleChange(event) {
            this.$emit('change', event.target.value);
        },
        select() {
            this.getInput().select();
        },
        setNativeInputValue() {
            const input = this.getInput();
            if (!input) return;
            if (input.value === this.nativeInputValue) return;
            input.value = this.nativeInputValue;
        },
    },
    created() {
        this.$on('inputSelect', this.select);
    },
    mounted() {
        this.resizeTextarea();
    },
    updated() {
        this.$nextTick(this.updateIconOffset);
    },
};
</script>