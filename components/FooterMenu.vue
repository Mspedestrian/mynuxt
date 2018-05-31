<template>
<div class="container">
   <!-- <mt-tabbar v-model="selected" :fixed="true">
        <mt-tab-item id="index">
        
            首页
        </mt-tab-item>
        <mt-tab-item id="user">
        
            我的
        </mt-tab-item>
    </mt-tabbar> -->
    <div class="bottom-menu">
        <div class="menu-item" :class="{actived:currentClick == 'index'}" @click="clickRouter('index')">
            我的好友
        </div>
        <div class="menu-item" :class="{actived:currentClick == 'user'}" @click="clickRouter('user')">
            我
        </div>
    </div>
</div>
</template>

<script>

export default {
    data(){
        return {
            currentClick:this.selected,
        }

    },
    props:{
        selected:{
            type:String,
            default:'',
        }
    },
    methods:{
        clickRouter(val){
            this.currentClick = val;
            if(val == 'index'){
                this.$router.push('/')
            }
            if(val=="user"){
                this.$router.push('/user')
            }
        }
    },
    watch:{
        selected(val){
            this.currentClick = val;
            if(val == 'index'){
                this.$router.push('/')
            }
            if(val=="user"){
                this.$router.push('/user')
            }
            
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
.bottom-menu {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #f3f3f3;
    .menu-item {
        width: 50%;
        text-align: center;
        padding:20px 0;
        
        
        &:first-child {
            margin-right: 1Px;
        }
        transition: all 2s;
        &.actived {
            background: #26a2ff;
            color:white;
        }
    }
}


</style>
