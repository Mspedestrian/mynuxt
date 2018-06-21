<template>
<div class="">
    <div class="header">
        <div class="left" @click='goBack'>返回</div>
        <div class="middom">{{title}}</div>
        <div class="right">
            
            <slot name="right">
            </slot>
        </div>
    </div>
   
</div>
</template>

<script>

export default {
    data(){
        return {
            
        }

    },
    props:{
        title:{
            type:String,
            default:'',
        }
    },
    methods:{
        goBack(){
            this.$router.back();
        },
    },
    watch:{
        
        
    },
    
}
</script>

<style lang="less" scoped>
.header {
    padding-right: 25px;
    padding-left: 25px;
    display: flex;
    justify-content: space-between;
    height: 80px;
    background: black;
    color:white;
    font-size: 32px;
    line-height: 80px;
    position: fixed;
    top:0;
    width: 100%;
    z-index: 999;
    .left,  .right {
        flex: 1;
    }
    .middom {
        flex:3;
        text-align: center;
    }
}


</style>
