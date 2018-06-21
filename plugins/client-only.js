import Vue from 'vue'
document.body.addEventListener('touchstart',function(){});
var protobuf = require("protobufjs");

// var BaseMessage;
// var baseMessage;
// var buffer;
// var TextMessage;
protobuf.load("/Message.proto", function (err, root) {
    if (err) throw err;
    // var textMessage = TextMessage.create({ msgId: "1", content: "hello"})
    // TextMessage.
    Vue.prototype.$BaseMessage = root.lookup("BaseMessage");
    Vue.prototype.$TextMessageReq = root.lookup("TextMessageReq");
    Vue.prototype.$MessageRes = root.lookup("MessageRes");

    Vue.prototype.$LoginReq = root.lookup("LoginReq");
    Vue.prototype.$LoginRes = root.lookup("LoginRes");
    // LoginReq
    // baseMessage = BaseMessage.create({ msgType: 1,bytesData:TextMessage.encode(textMessage).finish()});
    // console.log(baseMessage)
    // buffer = BaseMessage.encode(baseMessage).finish();
});


import MyHeader from '~/components/Header'


Vue.component('my-header', MyHeader)
