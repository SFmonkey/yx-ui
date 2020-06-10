<template>
    <div id="app">
        <page-header></page-header>
        <!-- <div class="content">
            <router-view></router-view>
        </div>-->
        <HelloWorld></HelloWorld>
    </div>
</template>

<script>
import pageHeader from './components/header.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
    name: 'app',
    components: {
        pageHeader,
        HelloWorld,
    },
};
</script>

<style>
body {
    margin: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
