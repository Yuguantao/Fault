<template>
  <div id="word">
    <img :src='wordSrc' width='100%' height='100%' frameborder='1'>
  </div>
</template>

<script>
export default {
    name: 'word',
    data (){
        return{
            wordSrc:''
        }
    },
    methods:{
        initWordSrc(){

            //this.wordSrc = "https://view.officeapps.live.com/op/view.aspx?src="+sessionStorage.getItem("url");
            this.wordSrc = sessionStorage.getItem("url")
        }
    },
    mounted(){
        this.initWordSrc()
    },
}
</script>

<style>
    #word{
        width: 100%;
        height: 800px;
        display: flex;
    }
</style>
