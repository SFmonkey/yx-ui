import Form from './src/Form';
console.log(Form.name);
Form.install = Vue => {
    Vue.component(Form.name, Form);
};
export default Form;
