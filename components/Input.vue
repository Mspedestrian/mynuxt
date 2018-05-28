<template>
<div class="container">
   <span>{{label}}</span>
   <input :type="type" :value="currentValue" @input="handInput">
</div>
</template>

<script>

export default {
    data(){
        return {
            currentValue:this.value,
        }

    },
    props:{
        label:{
            type:String,
            default:'',
        },
        type:{
            type:String,
            default:'text',
        }
    },
    methods:{
        handInput(event){
            this.setCurrentValue(event.target.value);
        },
        setCurrentValue(value){
            this.currentValue = value;
            this.value = value;
        }
    },
    watch:{
        value(newval){
            this.setCurrentValue(newval)
        },
        
    },
    mounted(){
        console.log('input')
    },
    head () {
        return {
          title: ''
        }
    }
}
</script>

<style lang="less" scoped>



</style>
