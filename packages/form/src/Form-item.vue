<template>
    <div class="yx-form-item">
        <label-warp></label-warp>
        <div class="yx-form-item__content" :style="contentStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { getPropByPath } from 'element-ui/src/utils/util';
export default {
    name: 'yxFormItem',

    provide() {
        return {
            yxFormItem: this,
        };
    },

    props: {
        label: String,
        labelWidth: String,
        prop: String,
    },

    data() {
        return {
            isNested: false,
        };
    },

    computed: {
        form() {
            let parent = this.$parent;
            let parentName = parent.$options.componentName;

            while (parentName !== 'yxForm') {
                if (parentName === 'yxFormItem') {
                    this.isNested = true;
                }
                parent = parent.$parent;
                parentName = parent.$options.componentName;
            }

            return parent;
        },
        fieldValue() {
            const model = this.form.model;
            if (!model || !this.prop) return;

            let path = this.prop;
            if (path.indexOf(':') !== -1) {
                path = path.replace(/:/, '.');
            }

            return getPropByPath(model, path, true).v;
        },
    },

    methods: {
        resetField() {
            this.validateState = '';
            this.validateMessage = '';

            let model = this.form.model;
            let value = this.fieldValue;
            let path = this.prop;
            if (path.indexOf(':') !== -1) {
                path = path.replace(/:/, '.');
            }

            let prop = getPropByPath(model, path, true);

            this.validateDisabled = true;
            if (Array.isArray(value)) {
                prop.o[prop.k] = [].concat(this.initialValue);
            } else {
                prop.o[prop.k] = this.initialValue;
            }

            this.$nextTick(() => {
                this.validateDisabled = false;
            });
        },

        clearValidate() {
            this.validateState = '';
            this.validateMessage = '';
            this.validateDisabled = false;
        },
    },

    mounted() {
        if (this.prop) {
            this.dispatch('yxForm', 'el.form.addField', [this]);

            let initialValue = this.fieldValue;
            if (Array.isArray(initialValue)) {
                initialValue = [].concat(initialValue);
            }

            Object.defineProperty(this, 'initialValue', {
                value: initialValue,
            });
        }
    },
};
</script>