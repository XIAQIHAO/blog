<template>
  <div class="time">
    <Header></Header>
    <div class="allWidth clearfix">
      <time-show></time-show>
      <Article></Article>
    </div>
  </div>
</template>
<script>
import Header from "@/comment/Header"
import Article from "@/comment/Article"
import TimeShow from './base/TimeShow'
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Article,
    TimeShow
  },
  created(){
    document.title = "时光机"
  }
};
</script>
<style scoped>

</style>