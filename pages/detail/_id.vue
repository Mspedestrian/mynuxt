<template>
<div class="container" id="container">
    <div v-for="item in newsList" v-if="newsList.length>0">
        <div class="cell ub cell-left" v-if="item.type==0">
            <div class="ce-img">
                <img :src="item.imgUrl" alt="">
            </div>
            <div class="ce-message">
                <p class="big-font mes-pop-left"><span>{{item.message}}</span></p>
            </div>
            
        </div>
        <div class="cell ub cell-right ub-pe" v-if="item.type==1">
            
            <div class="ce-message">
                <p class="big-font mes-pop-right"><span>{{item.message}}</span></p>
            </div>
            <div class="ce-img">
                <img :src="item.imgUrl" alt="">
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
            }
            else {
                let obj = {
                    // fromUserId:vm.fromUserObj.userId,
                    // fromNickName:vm.fromUserObj.fromNickName,
                    message:vm.msg,
                    messageId:0,
                    // toUserId:vm.toUserObj.userId,
                    // toNickName:vm.toUserObj.nickName,
                    type:'message',
                }
                this.ws.send(JSON.stringify(obj));
                // let obj = {
                //     id:1,
                //     imgUrl:'https://shop-file.tiancaixing.com/2018/5/14/1526267875600/ve1w37FG.jpg',
                //     message:'蒸水蛋蒸水蛋蒸水蛋蒸水蛋蒸水蛋蒸水蛋蒸水蛋蒸水蛋蒸水蛋',
                //     type:1,
                //     nickName:'蒸水蛋',
                //     userId:12,
                // }
                // console.log(obj);
                // this.newsList.push(obj);
            }
            
            this.msg = '';
            
            
            
        },
        getSocketData(res){
            console.log(res);
            if(res.code == '000001'&&res.type=='message'){
                let data = res.data;
                //本人发的

                if(data.fromUserId == this.fromUserObj.userId){
                    let obj = {
                        id:data.messageId,
                        // imgUrl:this.fromUserObj.imgUrl,
                        message:data.message,
                        type:1,
                        // nickName:this.fromUserObj.nickName,
                        // userId:this.fromUserObj.userId,
                    }
                    console.log(obj);
                    this.newsList.push(obj);
                    
                }
                else {
                    console.log(data.message);
                    let obj = {
                        id:data.messageId,
                        // imgUrl:this.toUserObj.imgUrl,
                        message:data.message,
                        type:0,
                        // nickName:this.toUserObj.nickName,
                        // userId:this.toUserObj.userId,
                    }
                    console.log(obj);
                    this.newsList.push(obj);
                    
                }
            }
            else {

            }
            setTimeout(function(){
                $('#msg_end').click(); 
                // $('#msg_end').scrollIntoView();
                // $('#container').scrollTop = $('#container').scrollHeight;
            },500)
            
            
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
            if(window.WebSocket){
                this.ws = new WebSocket(`ws://http://172.28.194.26:8889`);

                this.ws.onopen = function(e){
                    console.log("连接服务器成功");
                    let obj = {
                        type:'openUser',
                        userId:vm.fromUserObj.userId
                    }
                    // vm.ws.send(JSON.stringify(obj));
                }
                this.ws.onclose = function(e){
                    console.log("服务器关闭");
                }
                this.ws.onerror = function(){
                    console.log("连接出错");
                }

                this.ws.onmessage = function(e){
                    // ws.send('我在发消息');
                    // document.querySelector("#sendMsg").onclick = function(e){
                    //     // var time = new Date();
                    //     vm.ws.send('我在发消息');
                    console.log(e);
                    // }
                    vm.getSocketData(JSON.parse(e.data));
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
        getUserById(){
            this.$axios.get('/user/getUserInfo')
            .then((data)=>{
                this.fromUserObj = data;
                this.setSocket();
            })
            .catch((e)=>{

            })
        },
    },
    mounted(){
        setTimeout(function(){
                $('#msg_end').click(); 
                
            },500)
        // this.getAllList();
        // this.setSocket();
        if(!this.getCookie('userId')){
            this.$router.push('/login');
            return;
        }
        this.getUserById();
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
