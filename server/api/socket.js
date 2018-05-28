var ws = require("nodejs-websocket");
console.log("开始建立连接...")
var socketList = [];
var socket = ws.createServer(function(conn){
    conn.on("text", function (res) {
        let request = JSON.parse(res);
        if(request.type == 'openUser'){
            let connUserId = request.userId;
            let obj = {
                connUserId:request.userId,
                connObj:conn,
            }
            socketList.push(obj);
        }
        if(request.type == 'message'){

            let toUserObj = socketList.find((value,index)=>{
                return value.connUserId == request.toUserId;
            })
            let messageObj = {
                code:'000001',
                desc:'success',
                data:request,
                type:'message',
            }
            console.log(toUserObj,'111111');
            if(toUserObj){
                toUserObj.connObj.sendText(JSON.stringify(messageObj));
            }
            
            conn.sendText(JSON.stringify(messageObj));
            // for(var socketItem of socketList){
            //     socketItem.sendText(JSON.stringify(obj))
            // }
        }
        
        // conn.sendText('hello');
        // console.log(res)
    })

    conn.on("close", function (code, reason) {
        console.log("关闭连接")
    });
    conn.on("error", function (code, reason) {
        console.log("异常关闭")
    });
}).listen(8001)
// 
console.log("WebSocket建立完毕")