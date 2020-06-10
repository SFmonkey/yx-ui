import Vue from 'vue';
import { createTest } from '../util';
import Test from '@packages/test';

describe('Test', () => {
    let vm;
    it('use', () => {
        Vue.use(Test);
        expect(Vue.component(Test.name)).to.be.a('function');
    });

    it('create', () => {
        vm = createTest(Test, {}, true);

        expect(vm.$el.classList.contains('Yx-test')).to.true;
    });
});
