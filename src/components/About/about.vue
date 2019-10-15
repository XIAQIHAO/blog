<template>
  <div class="about">
      <Header></Header>
        <div class="allWidth clearfix">
          <Article></Article>
         <div class="animated rotateIn">
            <about-me></about-me>
         </div>
    </div>
  </div>
</template>
<script>
import Header from '@/comment/Header'
import Article from '@/comment/Article'
import AboutMe from './base/AboutMe'
export default {
  data() {
    return {}
  },
  components:{
      Header,
      Article,
      AboutMe
  },
  created(){
    document.title = "关于我"
  }
}
</script>
<style scoped>

</style>