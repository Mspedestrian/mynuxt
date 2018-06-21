<template>
<div class="container" id="container" v-if="toUserObj">
    <my-header :title="toUserObj.nickname"></my-header>
    <div v-for="item in newsList" v-if="newsList.length>0">
        <div class="cell ub cell-left" v-if="item.type==0">
            <div class="ce-img">
                <img :src="toUserObj.imgUrl" alt="">
            </div>
            <div class="ce-message">
                <p class="big-font mes-pop-left"><span>{{item.content}}</span></p>
            </div>
            
        </div>
        <div class="cell ub cell-right ub-pe" v-if="item.type==1">
            
            <div class="ce-message">
                <p class="big-font mes-pop-right"><span>{{item.content}}</span></p>
            </div>
            <div class="ce-img">
                <img :src="fromUserObj.headPhoto" alt=""> 
            </div>
            
        </div>
    </div>
    <div><a id="msg_end" name="1" href="#1"></a></div>
    
    <div class="detail-bottom">
        <input type="text" class="input" v-model="msg" ref="inputMsg" id="inputMsg">
        <mt-button size="small" @click="sendMsg" id="sendMsg">发送</mt-button>
    </div>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            msg:'',
            newsList:[],
            fromUserObj:null,
            ws:null,
            toUserObj:null,

        }
    },
    computed:{
        // toUserObj(){
        //     return JSON.parse(localStorage.getItem('toUserObj'));
        // }
    },
    methods:{
        sendMsg(){
            let vm = this;
            if(vm.msg.match(/^\s*$/)){
                
                Toast({
                    message: '不能输入空白消息',
                    position: 'middle',
                    // duration: 2000
                });
                return;
            }
            let textObj = vm.$TextMessageReq.create({ 
                msgId:'1',
                userId:vm.fromUserObj.id,
                reciverId:parseInt(vm.$route.params.id),
                content:vm.msg,
            });
            this.newsList.push({
                msgId:'1',
                userId:vm.fromUserObj.id,
                reciverId:parseInt(vm.$route.params.id),
                content:vm.msg,
                type:1,
            })
            let baseMessage =  vm.$BaseMessage.create({ msgType: 5,bytesData:vm.$TextMessageReq.encode(textObj).finish()});

            let buffer =  vm.$BaseMessage.encode(baseMessage).finish();
            vm.ws.send(buffer); 
            this.msg = '';
            
            
            
        },
        getSocketData(res,type){
            
            
            setTimeout(function(){
                $('#msg_end').click(); 
                // $('#msg_end').scrollIntoView();
                // $('#container').scrollTop = $('#container').scrollHeight;
            },500)
            if(type == 5){
                console.log(res);
                let obj = {
                    type:0,
                }
                obj = Object.assign({},obj,res);
                this.newsList.push(obj);
            }
            
            
        },
        getAllList(){
            this.$axios.get('/api/message/getMessageList')
            .then((data)=>{
                console.log(data);
                this.newsList = data;
            })
        },
        setSocket(){
            let vm = this;
            console.log('开始请求')
            if(window.WebSocket){
                this.ws = new WebSocket(`ws://172.28.194.26:8889/ws`);

                this.ws.onopen = function(e){
                    console.log("连接服务器成功");
                    let userObj = vm.$LoginReq.create({ userId:vm.fromUserObj.id});
                    let baseMessage =  vm.$BaseMessage.create({ msgType: 1,bytesData:vm.$LoginReq.encode(userObj).finish()});
    
                    let buffer =  vm.$BaseMessage.encode(baseMessage).finish();
                    vm.ws.send(buffer);
                }
                this.ws.onclose = function(e){
                    console.log("服务器关闭");
                }
                this.ws.onerror = function(){
                    console.log("连接出错");
                }

                this.ws.onmessage = function(evt){
                    // ws.send('我在发消息');
                    // document.querySelector("#sendMsg").onclick = function(e){
                    //     // var time = new Date();
                    //     vm.ws.send('我在发消息');
                    // console.log(e);
                    // }


                    let reader = new FileReader();
                    reader.readAsArrayBuffer(evt.data);
                    reader.onload = function (e) {
                        let buf = new Uint8Array(reader.result);
                        let tempMessage = vm.$BaseMessage.decode(buf);
                        console.log(tempMessage)
                  
                        if(tempMessage.msgType == 1){
                            let textMessage = vm.$LoginRes.decode(tempMessage.bytesData);
                 
                            if(textMessage.code!==30100){
                                Toast({
                                    message: textMessage.desc,
                                    position: 'middle',
                                    // duration: 2000
                                });
                            }
                        }
                        // 6消息发送相应
                        if(tempMessage.msgType == 6){
                            let textMessage = vm.$MessageRes.decode(tempMessage.bytesData);
                            vm.getSocketData(textMessage,6);
                        }
                        if(tempMessage.msgType == 5){
                            let textMessage = vm.$TextMessageReq.decode(tempMessage.bytesData);
                            vm.getSocketData(textMessage,5);
                        }

                    
                    }
                    
                }
            }
        },
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        getUserById(id,callback){
            this.$axios.get(`/user/getUserInfoById?userId=${id}`)
            .then((data)=>{
                
                callback&&callback(data);
            })
            .catch((e)=>{

            })
        },
        
    },
    mounted(){
        // setTimeout(function(){
        //         $('#msg_end').click(); 
                
        //     },500)
        // this.getAllList();
        // this.setSocket();
        if(!this.getCookie('userId')){
            this.$router.push('/login');
            return;
        }
        let vm = this;
        this.getUserById(this.$route.params.id,(data)=>{
            vm.toUserObj = data;
        });
        this.getUserById(this.getCookie('userId'),(data)=>{
            vm.fromUserObj = data;
            vm.setSocket();
        });
        // this.$refs.inputMsg.focus(function(){
        //     alert('1111');
        // })
        // console.log(this.$refs.inputMsg);
        // $('#container').animate({scrollTop:300},500);/

        
        
    },

    head () {
        let vm = this;
        return {
          // title: `${vm.toUserObj.nickName}`
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    padding-bottom: 100px;
    padding-top: 50px;
}
.cell {
    margin-bottom: 30px;
    
}
.ce-img {
    width: 80px;
    
    // border:1px solid red;
   
    img {
        width: 80px;
        height: 80px;
        // border-radius: 100%;

    }
    
}
.cell-left {
    .ce-img {
        margin-right: 30px;
    }
}
.cell-right {

    .ce-img {
        margin-left: 30px;
    }
}

.ce-message {

}
.detail-bottom {
    background: #e5e5e5;
    width: 100%;
    padding: 20px;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
}
.input {
    width: 600px;
    height: 65px;
    background: white;
    border:none;
    font-size: 30px;
    padding:20px;

}


.mes-pop-left,{
    max-width: 400px;
    white-space: normal; 
    word-wrap:break-word;
    background: white;
    padding: 10px 20px;
    border-radius: 10px;
    min-height: 80px;
    position: relative;
    padding-top: 18px;
    padding-bottom: 18px;
    &:before {
        content:'';
        border:34px solid transparent;
        
        position:absolute;
        top:20px;  
        left:0;
        transform: translateX(-50%);
        // border-top: none;
        // border-left: none;
        border-top-color:white;
        border-bottom:0; 
        border-right:0; 
    }
}
.mes-pop-right,{

    max-width: 400px;
    white-space: normal; 
    word-wrap:break-word;




    background: #58d400;
    padding: 10px 20px;
    border-radius: 10px;
    position: relative;
    padding-top: 18px;
    padding-bottom: 18px;
    &:before {
        content:'';
        border:34px solid transparent;
        
        position:absolute;
        top:20px;  
        right:0;
        transform: translateX(50%);
        border-top-color:#58d400;
        border-bottom:0; 
        border-left:0; 
    }
}
</style>
