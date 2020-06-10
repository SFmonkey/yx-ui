<template>
    <header class="header">
        <div class="content">
            <span class="logo">Yx-UI</span>
        </div>
    </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
    height: 80px;
    background-color: #fff;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 80px;
    z-index: 100;
    position: relative;
    .content {
        width: 1140px;
        height: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #dcdfe6;
        margin: 0 auto;
        .logo {
            padding-left: 20px;
            font-size: 36px;
            color: rgb(109, 186, 180);
        }
    }
}
</style>
