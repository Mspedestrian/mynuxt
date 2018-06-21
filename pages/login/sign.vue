<template>
<div>
    <div class="sign-con">
    <div class="my-input">
        <span class="label">用户名</span>
        <input type="text" v-model="username" class="input" placeholder="请输入用户名">
    </div>
    <div class="my-input">
        <span class="label">密码</span>
        <input type="password" v-model="password" class="input" placeholder="请输入密码">
    </div>
    <div class="my-input">
        <span class="label">密码</span>
        <input type="password" v-model="repassword" class="input" placeholder="请再次输入密码">
    </div>
    <div class="height40"></div>
    <div class="my-input">
        <span class="label">昵称</span>
        <input type="text" v-model="nickname" class="input" placeholder="请输入昵称">
    </div>
    <div class="my-input">
        <span class="label">头像</span>
        <img :src="imgUrl" alt="" class="headPhoto" >
    </div>
    <div class="my-input">
        <span class="label">年龄</span>
        <!-- <input type="password" v-model="age" class="input" placeholder="请再次输入密码"> -->
        <select v-model="age" class="select" placeholder="请选择年龄">
            <option v-for="item in ageList" :value="item">{{item}}</option>
        </select>
    </div>
    <div class="my-input">
        <span class="label">性别</span>
        <select v-model="gender" class="select" placeholder="请选择年龄">
            <option :value="0">保密</option>
            <option :value="1">男</option>
            <option :value="2">女</option>
        </select>
    </div>
    
    <div class="sign-but" v-on:click="sign()"><mt-button type="primary" size="large" >注册</mt-button></div>
    <span class="hovera">忘记密码</span><span class="hovera" @click="goLogin">去登陆</span>
    </div>
</div>
</template>

<script>

import MyInput from '~/components/Input'
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            username:'',
            password:'',
            repassword:'',
            nickname:'',
            age:null,
            gender:null,
            imgUrl:require('~/assets/img/user1.jpg'),
            ageList:100,
        }

    },
    components:{
        MyInput
    },
    methods:{
        sign(){
            if(this.username.length == 0){
                Toast({
                    message: '请输入用户名',
                    position: 'middom',
                    // duration: 2000
                });
                return;
            }
            if(this.repassword!==this.password){
                Toast({
                    message: '两次输入密码不一致',
                    position: 'middom',
                    // duration: 2000
                });
                return;
            }
            this.$axios.post('/user/addUserInfo',{
                username:this.username,
                password:this.password,
                nickname:this.nickname,
                age:this.age,
                gender:this.gender,
            })
            .then((data)=>{
                console.log(data);
                // this.setCookie('userId', encodeURIComponent(data.userId), 7);
                Toast({
                    message: '注册成功，去登陆',
                    position: 'top',
                    // duration: 2000
                });
                this.$router.push('/login');
                // setTimeout(function(){
                //     this.$router.push('/');
                // },1000)
                
            })
            .catch((e)=>{
                Toast({
                    message: e.message,
                    position: 'top',
                    // duration: 2000
                });
            })
            
        },
        goLogin(){
            this.$router.push('/login');
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/;domain='+location.hostname;
        },
        
    },
    head () {
        return {
          title: '登录'
        }
    }
}
</script>

<style lang="less" scoped>
.sign-con {
    width:  100%;
    margin-top: 50px;
    .sign-but {
        margin-top: 80px;
    }
}
.logo {
    width:100%;
    height:100%;
    border-radius:  100%;
    text-align: center;
    margin-bottom:  20px;
    img {
        width:100px;
        height:100px;
    } 
}
.my-input {
    background: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1Px solid #e5e5e5;
    align-items: center;
    .label {
        font-size: 33px;
        width: 220px;
    }
    .input,.select {
        width: 100%;
        font-size: 33px;
        padding: 10px;
        border:none;

    }
    .headPhoto {
        width: 100px;
        height: 100px;
        border-radius: 100%;
    }
}
.hovera {
    color:#2c8cf0;
    margin-right: 20px;
    margin-left: 30px;
    margin-top: 20px;
    float: right;
    &:hover {
        color:#82d447;
    }
}


</style>