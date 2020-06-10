<template>
    <form
        class="yx-form"
        :class="[
            labelPosition ? 'yx-form--label-' + labelPosition : '',
            { 'yx-form--inline': inline },
        ]"
    >
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'yxForm',

    provide() {
        return {
            yxForm: this,
        };
    },

    props: {
        model: Object,
        rules: Object,
        labelPosition: String,
        labelWidth: String,
    },
    watch: {
        rules() {
            this.fields.forEach(field => {
                field.removeValidateEvents();
                field.addValidateEvents();
            });

            if (this.validateOnRuleChange) {
                this.validate(() => {});
            }
        },
    },

    data() {
        return {
            field: [],
        };
    },

    created() {
        this.$on('yx.form.addField', field => {
            if (field) {
                this.fields;
            }
        });
    },

    methods: {
        resetFields() {
            if (!this.model) {
                return;
            }

            this.fields.forEach(field => {
                field.resetField();
            });
        },

        clearValidate(props = []) {
            const fields = props.length
                ? typeof props === 'string'
                    ? this.fields.filter(field => props === field.prop)
                    : this.fields.filter(
                          field => props.indexOf(field.prop) > -1,
                      )
                : this.fields;

            fields.forEach(field => {
                field.clearValidate();
            });
        },

        validate(callback) {
            if (!this.model) {
                return;
            }

            let promise;

            if (typeof callback !== 'function' && window.Promise) {
                promise = new Promise((resolve, reject) => {
                    callback = function(valid) {
                        valid ? resolve(valid) : reject(valid);
                    };
                });
            }

            let valid = true;
            let count = 0;

            if (this.fields.length === 0 && callback) {
                callback(true);
            }

            let invalidFields = {};

            this.fields.forEach(field => {
                field.validate('', (message, field) => {
                    if (message) {
                        valid = false;
                    }
                    invalidFields = objectAssign({}, invalidFields, field);
                    if (
                        typeof callback === 'function' &&
                        ++count === this.fields.length
                    ) {
                        callback(valid, invalidFields);
                    }
                });
            });

            if (promise) {
                return promise;
            }
        },
    },
};
</script>
