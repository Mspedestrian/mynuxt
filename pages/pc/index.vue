<template>
<div class="container" id="container">
    
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
            

        }
    },
    computed:{
        
    },
    methods:{
        getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },
        getUserById(){
            
        },
        getToUser(){
             
        }
    },
    mounted(){
        
        
        
    },

    head () {
        let vm = this;
        return {
          // title: `${vm.toUserObj.nickName}`
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    // padding-bottom: 100px;
    // padding-top: 50px;
    width: 800px;
    height: 500px;
    background: white;
    border:1px solid red;
}

</style>
