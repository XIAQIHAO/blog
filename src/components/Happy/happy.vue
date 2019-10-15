<template>
  <div class="happy">
    <div class="allWidth clearfix">
      <Header></Header>
      
        <Article></Article>
        <router-view></router-view>

    </div>
  </div>
</template>
<script>
import Header from "@/comment/Header"
import Article from "@/comment/Article"

export default {
  data() {
    return {
      
    };
  },
  mounted(){
    this.$store.dispatch("getcomment").then(()=>{
     
    })
  },
  components: {
    Header,
    Article,
    
  },
  created(){
    document.title = "新鲜事儿"
  }
};
</script>
<style scoped>
</style>
