<template>
<div class="container" v-if="userObj">
    <my-header :title="userObj.nickname"></my-header>
    <div class="cell ub border-bottom back-white">
        <div class="ce-right">
            <img :src="userObj.headPhoto" alt="">
        </div>
        <div class="ce-left">
            <p>{{userObj.nickname}}</p>
            <p>账号：{{userObj.username}}</p>
            <!-- <p v-if="item.userId == userObj.userId">这是我</p> -->
        </div>
        
    </div>
    <div class="height40"></div>
    <div class="cell ub border-bottom back-white">
        <div class="ce-right">年龄</div>
        <div class="ce-left">{{userObj.age}}</div>
    </div>
    <div class="cell ub border-bottom back-white">
        <div class="ce-right">性别</div>
        <div class="ce-left">{{userObj.sex}}</div>
    </div>
     <div class="height40"></div>
    <mt-button type="primary" size="large" @click="goDetail(userObj)">发消息</mt-button>
    <div class="height40"></div>
    <mt-button type="primary" size="large" @click="changeFriend(userObj,2)">接受</mt-button>
    <div class="height40"></div>
    <mt-button size="large" @click="changeFriend(userObj,5)">拒绝</mt-button>
    <div class="height40"></div>
    <mt-button size="large" type="primary" @click="changeFriend(userObj,1)">加好友</mt-button>
    <div class="height40"></div>
    <mt-button size="large" @click="changeFriend(userObj,4)">删除好友</mt-button>
    <div class="height40"></div>
    <mt-button size="large" @click="changeFriend(userObj,3)">拉入黑名单</mt-button>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    components:{
       
    },
    data(){
        return {
            imgUrl:require('~/assets/img/user1.jpg'),
            contactList: [],
            userObj:null,
        }

    },
    methods:{
        goDetail(item){
            this.$router.push(`/detail/${item.id}`)
            // localStorage.setItem('toUserObj',JSON.stringify(item));
        },
    //     APPLYING(1,"申请中"),
    // AGREED(2,"已同意"),
    // BLACK_LIST(3,"黑名单"),
    // DELETE(4,"已删除"),
    // REJECT(5,"已拒绝");
        changeFriend(obj,type){
            this.$axios.post(`/friend/agree`,{
                friendId:this.userObj.id,
                userId:parseInt(this.getCookie('userId')),
                status:type,
            })
            .then((data)=>{
                this.getUserById();
                Toast({
                    message: '操作成功',
                    position: 'middom',
                })
            })
        },
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        getUserById(){
            // if(!this.getCookie('userId')){
            //     this.$router.push('/login');
            // }
            this.$axios.get(`/user/getUserInfoById?userId=${this.$route.params.id}`)
            .then((data)=>{
                this.userObj = data;
            })
            .catch((e)=>{

            })
        },
    },
    mounted(){
        this.getUserById();
    },
    head () {
        return {
          title: '详细资料'
        }
    }
}
</script>

<style lang="less" scoped>
.ce-right {
    width: 130px;
    padding-top: 15px;
    padding-bottom: 15px;
    // border:1px solid red;
   
    img {
        width: 130px;
        height: 130px;
        border-radius: 2Px;

    }
    
}
.ce-left {
    width:600px;
    margin-left: 30px;
    margin-top: 30px;
    p:last-child {
        margin-top: 10px;
        color:#aaa;
    }
}

</style>
