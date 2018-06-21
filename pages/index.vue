<template>
<div class="container">
    <my-header title="我的首页">
        <div slot="right"><span  @click="goSearch">添加好友</span></div>
    </my-header>
    <input class="search" placeholder="输入用户名全程进行搜索用户哦">
        
    </input>
    <div v-if="showFriendType == 'friend'">
        <div class="cell ub border-bottom ub-ac ub hoverlink item" @click="()=>{
            this.showFriendType = 'newfriend'
        }">
            <div class="ce-right">
                <img :src="imgUrl" alt="">
            </div>
            <div class="ce-left">
                <p class="ub ub-sb big-font"><span>新的朋友</span></p>
                
            </div>
        </div>
        <div class="height40"></div>
    
        <div class="cell ub border-bottom ub-ac ub hoverlink item"  v-for="item in contactList" @click="goDetail(item)" v-if="item.status == 2">
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
    <div v-if="showFriendType == 'newfriend'">
        <div class="cell ub border-bottom ub-ac ub hoverlink item"  v-for="item in contactList" @click="goDetail(item)" v-if="item.status == 1">
            <div class="ce-right">
                <img :src="item.headPhoto" alt="">
            </div>
            <div class="ce-left ub ub-sb">
                <div>
                    <p class=" big-font"><span>{{item.nickname}}</span></p>
                    <p class="date">账户名：{{item.username}}</p>
                </div>
                <button class="oper-btn" @click="changeFriend(item,2)">同意</button>
            </div>
            
        </div>
    </div>
    <footer-menu selected="index"></footer-menu>
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
            contactList: [],
            userObj:null,
            showFriendType:'friend',
        }

    },
    methods:{
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
        goDetail(item){
            this.$router.push(`/user/${item.id}`)
            // localStorage.setItem('toUserObj',JSON.stringify(item));
        },
        goSearch(){
            this.$router.push('/search');
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
.newf {

}

</style>
