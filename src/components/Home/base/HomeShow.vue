<template>
  <div class="home-show">
   
    <div class="b-l b-s">
      <ul class="show-box">
        <li>
          <i class="feed-avatar">
            <img src="/static/img/logo.jpg" alt />
          </i>
          <h2>
            <a href="javascript:;">【开启时光】我的个人博客，是我的小家，也是我的时光机</a>
          </h2>
          <p
            class="feed-info"
          >这是我的个人博客，也是我的小家，它也是一个时光机。平时的我与人沟通幽默和蔼可亲，乐于帮助他人。喜欢不断的尝试新事物，不畏惧代码的难度。对待代码不会觉得难就放弃，对待前端的学习之路，我也不会觉得枯燥而打退堂鼓。懂得坚持一件事，并想尽一切办法做好，不比聪明比勤奋。。</p>
          <span class="feed-img">
            <a href="javascript:;">
              <img v-for="(images,index) in imgList" :key="index"
                :src="images"
                alt
                srcset
                @click="imgshow(index)"
              />
             
            </a>
          </span>
        </li>
      </ul>
      <div class="bloglist">
        <li v-for="(images,index) in newinfo" :key="index">
          <i>
            <a href="javascript:;">
              <img
                :src="images.imges[0]"
                alt
              />
            </a>
          </i>
          <h3>
            <a href="javascript:;" @click="skip(images._id,index)">{{images.title}}</a>
          </h3>
          <p>{{images.desc}}</p>

          <p class="feed-date">
            <span class="fd01">{{images.date}}</span>
            <span class="fd01">阅读({{images.readnum}})</span>
            <span class="fd01">喜欢({{images.likenum}})</span>
          </p>
        </li>
      </div>
    </div>

    
  </div>
</template>
<script>
export default {
  data() {
    return {
      isshow:false,
       newinfo:[],
       imgList:[
         "./static/img/1.png",
         "./static/img/2.png",
         "./static/img/3.png",
         "./static/img/4.png",
         "./static/img/5.png",
         "./static/img/6.png",
         "./static/img/7.png",
         "./static/img/8.png",
         "./static/img/9.png",
         "./static/img/10.png",
       ]
    };
  },
  created(){
      this.$store.dispatch("getcomment").then(() => {
      this.newinfo = this.$store.state.allcommentinfo.reverse().slice(0, 4);
      document.title = "小家首页"
    });
  },
  
  methods:{
    skip(title,index){
      this.$router.push("/happy/happying");
      this.$store.commit("gethappy",title);
      
    },
    imgshow(index){
      this.isshow = true;
      let imginfo = {imgList:this.imgList,index,isshow:this.isshow};

      this.$emit("setimg",imginfo)
    }
  }
  
  
}
</script>
<style scoped>
.home-show {
  float: left;
  width: 700px;
}
.b-l {
  width: 100%;
  border-radius: 5px;
  color: #383737;
}
.first-show {
  height: 200px;
  width: 100%;
  box-shadow: 0px 0px 20px #67b3dd;
  border-radius: 5px;
  background-image: linear-gradient(
    135deg,
    rgb(105, 255, 151) 10%,
    rgb(0, 228, 255) 100%
  );
}

.show-box > li {
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  padding: 20px;
  border-radius: 5px;
  background-image: linear-gradient(
    135deg,
    rgb(105, 255, 151) 10%,
    rgb(0, 228, 255) 100%
  );
}

.feed-avatar {
  display: block;
  float: left;
  margin-right: 20px;
  border-radius: 50%;
}
.show-box h2 {
  font-size: 22px;
  font-weight: normal;
  margin-left: 80px;
}
.show-box h2 a {
  color: #000;
}
.show-box .feed-info {
  margin: 10px 0 10px 80px;
  color: #6b6b6b;
}

.show-box .feed-img img {
  width: 100px;
  float: left;
  display: block;
  border: #1f7994 1px solid;
  margin: 5px;
  border-radius: 10px;
  height: 70px;
  transition: all 0.5s ease;
  opacity: 1;
}
.show-box .feed-img img:hover {
  opacity: 0.8;
  border-radius: 0;
}
.feed-avatar img {
  width: 54px;
  padding: 2px;
  border: #a39a89 1px solid;
  border-radius: 5px;
}
.show-box .feed-img {
  overflow: hidden;
  display: block;
  margin-left: 80px;
}
.bloglist li {
  background: rgba(255, 255, 255, 1);
  padding: 15px;
  overflow: hidden;
  color: #6b6b6b;
  margin-bottom: 20px;
  border-radius: 5px;
  list-style: none;
  background-image: linear-gradient(
    135deg,
    rgb(105, 255, 151) 10%,
    rgb(0, 228, 255) 100%
  );
}
.bloglist li i {
  width: 150px;
  display: block;
  max-height: 100px;
  overflow: hidden;
  float: right;
  margin-left: 20px;
  border-radius: 5px;
}
.bloglist li img {
  float: right;
  clear: right;
  width: 100%;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}
.bloglist li img:hover{
  transform: scale(1.2);
}
.bloglist li h3 {
  font-size: 16px;
  line-height: 25px;
  color: #fff;
}
.bloglist li h3 a {
  color: #000;
}
.bloglist li p {
  margin: 20px 0 0 0;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 2;
}
.feed-date {
  margin-left: 80px;
  color: #63a1b4;
  margin-top: 10px;
  font-size: 13px;
}
.bloglist li i {
  width: 150px;
  display: block;
  max-height: 100px;
  overflow: hidden;
  float: right;
  margin-left: 20px;
  border-radius: 5px;
}
.feed-date .fd01 {
  margin-right: 20px;
  border-right: #ccc 1px dotted;
  padding-right: 20px;
}
a:hover {
  text-decoration: none;
  color: #1f7994 !important;
}
.bg{
  position: fixed;
  width: 100%;
  height: 300px;
  background-color: #000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index:1;
}
</style>