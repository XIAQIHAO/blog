<template>
  <div class="home">
    <div class="allWidth clearfix">
      <Header></Header>
     <div class="animated bounceInUp">
       <home-show :messge='this.$store.state.allcommentinfo' @setimg="getimg"></home-show>
     </div>
      <Article></Article>
      <img-show :images="allimg"></img-show>
    </div>
  </div>
</template>

<script>
import Header from "@/comment/Header"
import HomeShow from "./base/HomeShow"
import Article from '@/comment/Article'
import ImgShow from './base/ImgShow'
export default {
  data() {
    return {
        allimg:{
          num:0,
        imgList:[],
        isshow:false
        }

    };
  },
  components: {
    Header,
    HomeShow,
    Article,
    ImgShow
  },
  created(){
    this.$store.dispatch("getcomment").then(()=>{
      console.log(this.$store.state.allcommentinfo)
    })
},
methods:{
      getimg(value){
       this.allimg = value;
       console.log(this.allimg)
      }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100%;
}
.home {
  width: 100%;
  height: 100%;
  background-color: rgb(31, 128, 141);
}
</style>
