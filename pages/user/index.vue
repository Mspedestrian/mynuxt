<template>
<div class="container" v-if="userObj">
    <my-header title="我的首页"></my-header>
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
    <mt-button type="primary" size="large" @click="signOut(userObj)">退出登录</mt-button>
    
   <footer-menu selected="user"></footer-menu>
</div>
</template>

<script>
import FooterMenu from '~/components/FooterMenu'
export default {
    components:{
        FooterMenu
    },
    data(){
        return {
            imgUrl:require('~/assets/img/user1.jpg'),
            name:'遗落的灯花',
            userObj:null,
        }

    },
    
    methods:{
        signOut(){
            this.setCookie('userId','',-1);
            this.$router.push('/login');
        },
        getUserById(){
            // if(!this.getCookie('userId')){
            //     this.$router.push('/login');
            // }
            this.$axios.get(`/user/getUserInfoById?userId=${this.getCookie('userId')}`)
            .then((data)=>{
                this.userObj = data;
            })
            .catch((e)=>{

            })
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/;domain='+location.hostname;
        },
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        
    },
    mounted(){
        if(!this.getCookie('userId')){
            this.$router.push('/login');
            return;
        }
        this.getUserById();
    },
    head () {
        return {
          title: ''
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
