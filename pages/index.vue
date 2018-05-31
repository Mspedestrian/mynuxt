<template>
<div class="container">
    <input class="search" @click="goSearch" placeholder="输入用户名全程进行搜索用户哦">
        
    </input>
    <div class="cell ub border-bottom ub-ac ub hoverlink item"  v-for="item in contactList" @click="goDetail(item)">
        <div class="ce-right">
            <img :src="item.headPhoto" alt="">
           

        </div>
        <div class="ce-left">
            <p class="ub ub-sb big-font"><span>{{item.nickname}}</span><span class="date">{{item.nickname}}</span></p>
            <p>{{item.nickname}}</p>
            <!-- <p v-if="item.userId == userObj.userId">这是我</p> -->
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
            this.$router.push(`/user/${item.id}`)
            // localStorage.setItem('toUserObj',JSON.stringify(item));
        },
        goSearch(){
            this.router.push('/search');
        },
        getAllList(){
            // if(!this.getCookie('userId')){
            //     this.$router.push('/login');
            //     return;
            // }
            this.$axios.get(`/friend/getFriend?userId=${this.getCookie('userId')}`)
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
            // if(!this.getCookie('userId')){
            //     this.$router.push('/login');
            // }
            this.$axios.get('/user/getUserInfo')
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
.search {
    border:1Px solid #f3f3f3;
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    height: 60px;
    border-radius: 10px;
    background: white;
    line-height: 60px;
    // text-align: center;
    font-size: 26px;
    display: inline-block;
    padding: 15px;
    // margin-left: 10px;
    // color:#aaa;
}

</style>
