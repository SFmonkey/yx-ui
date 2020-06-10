import Vue from 'vue';
import YX from 'src';

Vue.use(YX);

let id = 0;

const createEl = () => {
    const el = document.createElement('div');
    el.id = 'app' + ++id;
    document.body.appendChild(el);

    return el;
};

export const createVue = template => {
    const el = createEl();
    return new Vue({ template }).$mount(el);
};

export const createTest = function(Compo, propsData = {}, mounted = false) {
    if (propsData === true || propsData === false) {
        mounted = propsData;
        propsData = {};
    }
    const elm = createEl();
    const Ctor = Vue.extend(Compo);
    return new Ctor({ propsData }).$mount(mounted === false ? null : elm);
};
