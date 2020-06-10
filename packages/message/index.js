import Message from './src/Message';
Message.install = Vue => {
    Vue.component(Message.name, Message);
};
export default Message;
