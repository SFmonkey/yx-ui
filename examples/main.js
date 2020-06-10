import Vue from 'vue';
import App from './App.vue';

import YxUI from '../src';
import '../packages/theme-chalk/src/index.scss';

Vue.config.productionTip = false;

Vue.use(YxUI);

new Vue({
    render: h => h(App),
}).$mount('#app');
