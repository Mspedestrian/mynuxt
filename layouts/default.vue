<template>
<div style="width:100%;height:100%;position: absolute;">
    <nuxt/>
    
</div>
</template>

<script>


export default {
  components: {
    
  },

  mounted(){
  	
  },
  methods:{
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
    getUserById(){
        this.$axios.get('/api/user/getUserById')
        .then((data)=>{
            console.log('111');
            this.$store.dispatch('CHANGE_USER',data);
        })
        .catch((e)=>{

        })
    },
  }
}
</script>

<style>

</style>
