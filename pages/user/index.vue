<template>
<div class="container">
    <div class="user-con" v-if="userObj">
       <img :src="userObj.imgUrl" alt="" class="touxiang">
       <p class="name">{{userObj.nickName}}</p>
       <p class="hello">欢迎</p>
       <div class="button" @click="signOut">退出登录</div>
    </div>
    

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
            this.$axios.get('/api/user/getUserById')
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
.touxiang {
    width:160px;
    height: 160px;
    border-radius: 100%;
}
.container {
    position: relative;
    width: 100%;
    height: 100%;
}

.user-con {
    text-align: center;
    margin-top: 300px;
    .name {
        margin-top:10px;
        margin-bottom: 200px;
        font-size: 36px;
        color:#aaa;
    }
    .button {
        margin-top: 100px;
        color:#2c8cf0;
        text-decoration: underline;
    }
}



</style>
