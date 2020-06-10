import Vue from 'vue';
import Row from '@packages/row';
import { createTest } from '../util';

describe('Row', () => {
    let vm;
    it('use', () => {
        Vue.use(Row);
        expect(Vue.component(Row.name)).to.be.a('function');
    });

    it('create', () => {
        vm = createTest(Row, {}, true);
        expect(vm.$el.classList.contains('yx-row')).to.true;
    });
});
