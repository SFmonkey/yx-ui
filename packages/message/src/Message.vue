<template>
    <transition name="yx-message-fade" @after-leave="handleAfterLeave">
        <div
            v-show="visible"
            :class="[
                'yx-message',
                type && !iconClass ? `yx-message--${type}` : '',
                center ? 'is-center' : '',
                showClose ? 'is-closable' : '',
                customClass,
            ]"
            :style="positionStyle"
            @mouseenter="clearTimer"
            @mouseleave="startTimer"
        >
            <i :class="iconClass" v-if="iconClass"></i>
            <i :class="typeClass" v-else></i>
            <slot>
                <p v-if="!dangerouslyUseHTMLString" class="yx-message__content">
                    {{ message }}
                </p>
                <p v-else v-html="message" class="yx-message__content"></p>
            </slot>
            <i
                v-if="showClose"
                class="yx-message__closeBtn yx-icon-close"
                @click="close"
            ></i>
        </div>
    </transition>
</template>

<script>
const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error',
};

export default {
    name: 'yxMessage',

    data() {
        return {
            visible: false,
            closed: false,
            type: 'info',
            iconClass: '',
            center: false,
            showClose: false,
            customClass: '',
            dangerouslyUseHTMLString: false,
            message: '',
            duration: 3000,
        };
    },

    computed: {
        typeClass() {
            return this.type && !this.iconClass
                ? `el-message__icon el-icon-${typeMap[this.type]}`
                : '';
        },
        positionStyle() {
            return {
                top: `${this.verticalOffset} px`,
            };
        },
    },

    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false;
            }
        },
    },

    methods: {
        handleAfterLeave() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            this.closed = true;
            if (typeof this.onClose === 'function') {
                this.onClose(this);
            }
        },
        keydown(e) {
            if (e.keyCode === 27) {
                // esc关闭消息
                if (!this.closed) {
                    this.close();
                }
            }
        },
        startTimer() {
            if (this.duration > 0) {
                this.timer = setTimeout(() => {
                    if (!this.closed) {
                        this.close();
                    }
                }, this.duration);
            }
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
    },
    mounted() {
        this.startTimer();
        document.addEventListener('keydown', this.keydown);
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this.keydown);
    },
};
</script>
