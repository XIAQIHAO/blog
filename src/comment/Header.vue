<template>
  <div class="header allWidth">
    <header>
      <div class="profile clearfix">
        <div class="logo">
          <a href="javascript:;">
            <img src="/static/img/logo.jpg" alt srcset />
          </a>
        </div>
        <div class="guanzu">
          <ul class="list clearfix" style="padding:0">
            <li v-for="(infos,index) in info" :key="index">
              <img :src="infos.imgUrl" alt />
              <span>{{infos.message}}</span>
            </li>
          </ul>
        </div>
        <div class="username">爱吃西瓜的小夏の博客</div>
      </div>
      <nav>
        <ul class="clearfix list b-s">
         <li v-for="(routerlinks,index) in routerlink" :key="index">
           <router-link :to="routerlinks.link" @click="nav(index)">{{routerlinks.them}}</router-link>
  
         </li>
         <li v-show="isshow">
            <a href="javascript:;" @click="without">退出登录</a>
         </li>
         <li v-show="isshow" style="float:right;font-size:14px;" class="admin">
            <a href="javascript:;" style="color:rgb(255, 208, 75);">
              欢迎:{{isshow}}
            </a>
         </li>
        </ul>
      </nav>
    </header>
    <img src alt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      info: [
        {
          imgUrl: "https://www.daiyiyang.com/skin/baby/images/nianling.png",
          message: "生日:  2000-12-06"
        },
        {
          imgUrl: "https://www.daiyiyang.com/skin/baby/images/weizhi.png",
          message: "湖南-岳阳"
        },
        {
          imgUrl: "https://www.daiyiyang.com/skin/baby/images/qq.png",
          message: "QQ:  1515987013"
        },
        {
          imgUrl: "https://www.daiyiyang.com/skin/baby/images/weixin.png",
          message: "wechat: 17397300191"
        }
      ],
      routerlink:[
        {them:"小家首页",link:'/'},
        {them:"新鲜事儿",link:'/happy/happyinfo'},
        {them:"时光机",link:"/time"},
        {them:"关于我",link:"/about"},
        {them:"留言",link:"/message"},
        {them:"个人中心",link:"/usercenter/userlist"},
        {them:"登录",link:"/login"},
        {them:"注册",link:"/register"}
      ]
    };
  
  },
  methods:{
    without(){
       this.$confirm('退出后将无法进入个人中心, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           localStorage.setItem("admin","");
          this.$message({
            type: 'success',
            message: '退出登录!'
          });
          this.$router.push("/");
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });          
        });
     
    },
   

  },
  computed:{
      isshow(){
      return localStorage.getItem("admin"); 
      }
  }
};
</script>
<style scoped>
header {
  width: 1000px;
  margin: auto;
  position: relative;
  background: url(https://www.daiyiyang.com/skin/baby/images/72242_w.png)
    no-repeat top right;
  padding-top: 30px;
  overflow: hidden;
  animation-name: myfirst;
  animation-duration: 5s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
}
@keyframes myfirst {
  0% {
    background: url(https://www.daiyiyang.com/skin/baby/images/72242_w.png)
      no-repeat top right top;
  }
  100% {
    background: url(https://www.daiyiyang.com/skin/baby/images/72242_w.png)
      no-repeat top right 100px;
  }
}
nav {
  width: 100%;
  overflow: hidden;
  background: #63a1b4;
  line-height: 40px;
  height: 40px;
  margin: 20px 0;
  margin-bottom: 0;
  border-radius: 5px;
}
.profile {
  position: relative;
  height: 132px;
}
.list {
  padding-left: 30px;
}
.list li {
  float: left;
  margin-right: 2px;
}
.list li > a {
  display: block;
  height: 100%;
  padding: 0 20px;
  color: #ffffff;
  transition: background .3s linear;
  text-shadow: 0 0 10px wheat;
}
.list li > a:not(.admin):hover {
  text-decoration: none;
  background-color: rgb(23, 108, 134);
}
.router-link-exact-active{
  background-color:  rgb(23, 108, 134);
}
.logo {
  float: left;
  width: 132px;
  height: 132px;
}
.logo > a {
  display: block;
  width: 120px;
  height: 120px;
  border: rgb(99, 161, 180) 6px solid;
  border-radius: 5px;
}
.logo > a > img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.username {
  position: absolute;
  top: 10px;
  left: 140px;
  font-size: 26px;
  color: #fff;
}
.guanzu {
  position: absolute;
  bottom: 0;
  left: 140px;
  color: #fff;
}
.guanzu > ul {
  position: relative;
}
.guanzu > ul > li {
  margin-right: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  height: 32px;
}
.guanzu > ul > li > img {
  opacity: 0.6;
}
.guanzu > ul > li > img:hover {
  opacity: 1;
}
.guanzu > ul > li > span {
  display: none;
  position: absolute;
  width: 163px;
  top: -40px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 3px 0;
  text-align: center;
  border-radius: 5px;
}
.guanzu > ul > li:hover span {
  display: block;
}
</style>