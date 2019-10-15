<template>
    <div class="user-center">
        <Header></Header>
        <useraside></useraside>
        
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import useraside from './base/useraside'
import Header from '@/comment/Header'
export default {
    data(){
        return{

        }
    },
    components:{
        Header,
       useraside
    },
    created(){
        document.title = "个人中心"
    }
}
</script>
<style scoped>

</style>
