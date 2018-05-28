<template>
<div>
    <div class="login-con">
        
    <div class="logo"><img :src="imgUrl" alt="" class="logo"></div>
    
    <div class="my-input">
        <span class="label">用户名</span>
        <input type="text" v-model="userName" class="input" placeholder="请输入用户名">
    </div>
    <div class="my-input">
        <span class="label">密码</span>
        <input type="password" v-model="password" class="input" placeholder="请输入密码">
    </div>
    
    <div class="login-but" v-on:click="login()"><mt-button type="primary" size="large" >登录</mt-button></div>
    </div>
</div>
</template>

<script>

import MyInput from '~/components/Input'
import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            userName:'',
            password:'',
            imgUrl:require('~/assets/img/user1.jpg'),
        }

    },
    components:{
        MyInput
    },
    methods:{
        login(){
            this.$axios.post('/api/signup',{
                userName:this.userName,
                password:this.password,
            })
            .then((data)=>{
                console.log(data);
                this.setCookie('userId', encodeURIComponent(data), 7);
                Toast({
                    message: '登录成功',
                    position: 'top',
                    // duration: 2000
                });
                this.$router.push('/');
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
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + ';path=/;domain='+location.hostname;
        },
        
    },
    head () {
        return {
          title: ''
        }
    }
}
</script>

<style lang="less" scoped>
.login-con {
    width:  100%;
    margin-top: 50px;
    .login-but {
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
        width:200px;
        height:200px;
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
    .input {
        width: 100%;
        font-size: 33px;
        padding: 10px;
        border:none;

    }
}

</style>