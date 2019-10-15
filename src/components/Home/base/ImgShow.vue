<template>
    <transition enter-active-class="animated bounceInDown" leave-active-class="animated bounceOutDown">
        <div class="img-show" v-show="images.isshow">
            <div class="img-box">
                    <div class="imgshow">
                          <a href="javascript:;" class="comm prev" @click="change(0)">
                              <i class="el-icon-arrow-left
"></i>
                          </a>
                          <a href="javascript:;" class="comm next" @click="change(1)">
                              <i class="el-icon-arrow-right"></i>
                          </a>
                          <a href="javascript:;" class="close" @click="close">
                              <i class="el-icon-close"></i>
                          </a>
                          <p class="numshow">
                              <span>{{images.index+1}}/{{images.imgList.length}}</span>张
                          </p>
                           
                            <img :src="img" alt="" v-for="(img,index) in images.imgList" :key="index" v-show="images.index==index">
                                
                    </div>
            </div>
    </div>
    </transition>
</template>
<script>
import TimeShowVue from '../../Time/base/TimeShow.vue';
export default {
    data(){
        return{
            cur:0,
            getList:{}
        }
    },
    props:['images'],
   methods:{
       close(){
          this.images.isshow = false;
       },
       change(bool){
           if(bool){
               this.images.index++;
               this.images.index = this.images.index>this.images.imgList.length-1?0:this.images.index
           }else{
               this.images.index--;
               this.images.index = this.images.index<0?this.images.imgList.length-1:this.images.index;
           }
       }
   },
   
}
</script>
<style scoped>
a:active{
    color: white;
}
.img-show{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
}
.img-box{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    
}
.imgshow{
    position: relative;
    width: 900px;
    padding: 50px;
    background-color: #fff;
    border-radius: 5px;
   text-align: center;
}
.imgshow img{
    width: 95%;
    height: 500px;
    box-shadow: 0 0 10px skyblue;
}
.comm{
    display: block;
    position: absolute;  
    top: 50%;
    transform: translateY(-50%); 
    padding:5px 10px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, .1);
    font-size: 20px; 
    transition: background-color 1s linear;
}
.comm:hover{
    background-color: skyblue;
}
.prev{
    left:10px;
}
.next{
    right: 10px;
}
.close{
    position: absolute;
    top:10px;
    right: 10px;
    display: block;
    font-size: 20px;
   
   
}
.close i{
     display: block;
      transition: all .5s linear;
       transform: rotate(-270deg);
}

.close:hover{
    text-decoration: none;
}
.close:hover i{
    transform: rotate(0deg);
    
}
.numshow{
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 2px;
}
</style>