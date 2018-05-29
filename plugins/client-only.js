
document.body.addEventListener('touchstart',function(){});
var protobuf = require("protobufjs");

// var BaseMessage;
// var baseMessage;
// var buffer;
// var TextMessage;
protobuf.load("/Message.proto", function (err, root) {
    if (err) throw err;
    Vue.prototype.$TextMessage = root.lookup("TextMessage");
    // var textMessage = TextMessage.create({ msgId: "1", content: "hello"})
    // TextMessage.
    Vue.prototype.$BaseMessage = root.lookup("BaseMessage");
    Vue.prototype.$MessageRes = root.lookup("MessageRes");
    // baseMessage = BaseMessage.create({ msgType: 1,bytesData:TextMessage.encode(textMessage).finish()});
    // console.log(baseMessage)
    // buffer = BaseMessage.encode(baseMessage).finish();
});
