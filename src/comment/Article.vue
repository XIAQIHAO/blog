<template>
  <div class="article b-s">
    <article class="b-s">
      <div class="b-r wrapper">
        <h3 class="b-s">我的照片</h3>
        <div class="wrap-img b-s">
          <div class="b-r" v-for="(images,index) in newinfo" :key="index">
            <img :src="images.imges[0]" alt class="b-r" @click="navhappy(index)" />
          </div>
        </div>
      </div>
      <div class="box-wrap">
        <div class="search">
          <input type="text" v-model="search" class="b-s" placeholder="请输入关键字" />
          <input type="submit" class="keywords" value="搜索" @click.stop="show" />
        </div>

        <div class="tuijian b-r">
          <h3 class="b-s">最近更新</h3>
          <ul class="list clearfix">
            <li v-for="(title,indexes) in newinfo" :key="indexes">
              <span @click="navhappy(indexes)">{{title.title}}</span>
            </li>
          </ul>
        </div>

       <tuijain></tuijain>

        <div class="tuijian b-r">
          <h3 class="b-s">点击排行</h3>
          <ul class="list clearfix">
            <li @click="happy">新鲜事儿 ({{this.$store.state.allcommentinfo.length}})</li>
       
          </ul>
        </div>
        <div class="tuijian b-r">
          <h3 class="b-s">友情链接</h3>
          <ul class="list clearfix">
            <li class="github">
              <!-- <a href="https://github.com/XiaQiHao">爱吃西瓜的小夏的github</a> -->
              <a href="http://localhost:8081/#/">爱吃西瓜的小夏</a>
            </li>
          </ul>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import tuijain from './tuijian'
export default {
  data() {
    return {
      search: "",
      pos: {},
      newinfo: []
    };
  },
  methods: {
    show() {
      if(this.search){
          this.$axios.post("/api/findthing", { title: this.search }).then(mes => {
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
        setTimeout(() => {
          loading.close();
          if (mes.data.errno) {
            this.$message({
              showClose: true,
              message: "恭喜你，查询成功",
              type: "success"
            });
            this.$store.commit("gethappy", mes.data.info._id);
            this.$router.push("/happy/happying");
          } else {
             this.$message({
              showClose: true,
              message: "不好意思，查询失败",
              type: "warning"
            });
          }
        }, 2000);
      });
      }else{
            this.$message({
              showClose: true,
              message: "不好意思，请输入关键字",
              type: "warning"
            });
      }
    },
    happy() {
      this.$router.push("/happy/happyinfo");
    },
    navhappy(index) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$store.commit("gethappy", this.newinfo[index]._id);
        this.$router.push({
          path: "/happy/happying"
        });
      }, 1500);
    }
  },
  created() {
    this.$store.dispatch("getcomment").then(() => {
      this.newinfo = this.$store.state.allcommentinfo.reverse().slice(0, 6);
      
    });
  },
  components:{
    tuijain
  }
  
};
</script>
<style scoped>
.article {
  float: right;
  width: 280px;
  border-radius: 5px;
  height: 1300px;
}
.box-wrap {
  width: 280px;
}
article h3 {
  color: #1f7994;
  font-size: 14px;
  line-height: 34px;
  padding: 0 0 0 10px;
}
.wrapper {
  background-color: #fff;
}
.wrap-img {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
}
.wrap-img > div {
  overflow: hidden;
  width: 32%;
  height: 70px;
  background-color: #63a1b4;
  margin-bottom: 4px;
  cursor: pointer;
}
.wrap-img > div > img {
  width: 100%;
  height: 100%;
  transition: transform 0.5s linear;
}
.wrap-img > div > img:hover {
  transform: scale(1.2);
}
.search {
  position: relative;
  margin: 20px 0;
}
.search input:nth-child(1) {
  border: 0;
  line-height: 36px;
  height: 36px;
  width: 72%;
  padding-left: 10px;
  outline: none;
  background-color: #fff;
  color: rgb(153, 153, 153);
  font-size: 14px;
}

.keywords {
  width: 28%;
  border: 0;
  background: 0;
  color: #fff;
  outline: none;
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgb(99, 161, 180);
  height: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
}
.tuijian {
  background-color: #fff;
}
.list {
  padding: 10px 0 10px 10px;
  box-sizing: border-box;
}
.list > li > img {
  vertical-align: middle;
}
.list > li {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 5px;
  color: #666666;
  background: url(https://www.daiyiyang.com/skin/baby/images/li.png) left center
    no-repeat;
  padding-left: 20px;
  cursor: pointer;
}
.github > a {
  color: #666666;
}
.github > a:hover {
  text-decoration: none;
  color: #1f7994;
}
.list > li:hover {
  color: #1f7994;
}
.tuijian {
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
