<template>
<div class="container">
    <my-header title="搜索">
       
    </my-header>
    <div class="search">
        <input placeholder="输入用户名全程进行搜索用户哦" v-model='searchContent' />
        <button @click="getAllList">搜索</button>
   </div>
    <div class="height40"></div>
    <div class="cell ub border-bottom ub-ac ub hoverlink item"  v-if="listData.length>0" v-for="item in listData" @click="goDetail(item)">
        <div class="ce-right">
            <img :src="item.headPhoto" alt="">
        </div>
        <div class="ce-left ub ub-sb">
            <div>
                <p class=" big-font"><span>{{item.nickname}}</span></p>
                <p class="date">账户名：{{item.username}}</p>
            </div>
            <!-- <button class="oper-btn" @click="addFreind(item)">加好友</button> -->
        </div>
        
    </div>
   
</div>
</template>

<script>
import FooterMenu from '~/components/FooterMenu'
export default {
    components:{
        FooterMenu,
    },
    data(){
        return {
            imgUrl:require('~/assets/img/user1.jpg'),
            listData: [],
            searchContent:'',
        }

    },
    methods:{
        addFreind(item){

        },
        goDetail(item){
            this.$router.push(`/user/${item.id}`)
            // localStorage.setItem('toUserObj',JSON.stringify(item));
        },
        getAllList(){
            // if(!this.getCookie('userId')){
            //     this.$router.push('/login');
            //     return;
            // }
            this.$axios.get(`/user/getUserInfoByUserName?username=${this.searchContent}`)
            .then((data)=>{
                console.log(data);
                this.listData.splice(0,this.listData.length,data);
            })
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

    },
    head () {
        return {
          title: '搜索'
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
        width: 80px;
        height: 80px;
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
    width: 95%;
    margin:30px auto;
    input {
        width: 100%;
        padding: 15px;
        border:1Px solid #aaa;
        font-size: 30px;
    }
    button {
        float: right;
        margin-top: 10px;
        width:100px;
        height: 50px;
        border:1Px solid #aaa;
        border-radius: 10px;
        font-size: 26px;
        transition: all .5s;
        &:hover {
            background: #2c8cf0;
            color:white;
            border:none;
        }
    }
}
.newf {

}

</style>
