<template>
    <div class="message">
        <Header></Header>
        <desces></desces>
    </div>
</template>
<script>
import Header from '@/comment/Header'
import desces from './base/desc'
export default {
    data(){
        return{
            
        }
    },
    components:{
        Header,
        desces
    },
    created(){
        document.title = "留言"
    }
}
</script>
<style scoped>

</style>