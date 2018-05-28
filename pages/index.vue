<template>
<div class="container" v-if="userObj">
    <div class="cell ub border-bottom ub-ac ub hoverlink item" v-for="item in contactList" @click="goDetail(item)">
        <div class="ce-right">
            <img :src="item.imgUrl" alt="">
        </div>
        <div class="ce-left">
            <p class="ub ub-sb big-font"><span>{{item.nickName}}</span><span class="date">{{item.nickName}}</span></p>
            <p>{{item.nickName}}</p>
            <p v-if="item.userId == userObj.userId">这是我</p>
        </div>
        
    </div>
    <footer-menu selected="index"></footer-menu>
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
            contactList: [],
            userObj:null,
        }

    },
    methods:{
        goDetail(item){
            this.$router.push(`/detail/item.userId`)
            localStorage.setItem('toUserObj',JSON.stringify(item));
        },
        getAllList(){
            if(!this.getCookie('userId')){
                this.$router.push('/login');
                return;
            }
            this.$axios.get('/api/user/userList')
            .then((data)=>{
                console.log(data);
                this.contactList = data;
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
            if(!this.getCookie('userId')){
                this.$router.push('/login');
            }
            this.$axios.get('/api/user/getUserById')
            .then((data)=>{
                this.userObj = data;
            })
            .catch((e)=>{

            })
        },
    },
    mounted(){
        this.getAllList();
        this.getUserById();
    },
    head () {
        return {
          title: '通讯录'
        }
    }
}
</script>

<style lang="less" scoped>
.ce-right {
    width: 120px;
    padding-top: 15px;
    padding-bottom: 15px;
    // border:1px solid red;
   
    img {
        width: 100px;
        height: 100px;
        border-radius: 2Px;

    }
    
}
.item {
    background: white;
}
.ce-left {
    width:600px;
}


</style>
