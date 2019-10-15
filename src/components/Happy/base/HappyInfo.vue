<template>
 
  <div class="happy-info animated lightSpeedIn">
    <ul class="list b-s">
      <li class="b-r reveal-top" v-for="(infoList,index) in selectinfo[pages]" :key="index">
        <h3 @click="skip(infoList._id,index)">{{infoList.title}}</h3>
        <p>{{infoList.desc}}</p>
        <a href="javascript:;" class="b-r">
          <img :src="infoList.imges[0]" alt class="b-r" />
        </a>
        <p class="fade-date">
          <span class="fd01"></span>
          <span class="fd01">{{infoList.date}}</span>
          <span class="fd01">阅读 ({{infoList.readnum}})</span>
          <span class="fd01">喜欢 ({{infoList.likenum}})</span>
        </p>
      </li>
    </ul>
    <div class="pagelist" v-show="selectinfo.length>=2">
      <a href="javascript:;">{{this.infolist.length}}</a>
      <a href="javascript:;" v-show="pages!=0" @click="changehide(1)">首页</a>
      <a href="javascript:;" v-show="pages!=0" @click="changehide(3)">上一页</a>
      <a
        href="javascript:;"
        v-for="(allength,indexs) in selectinfo.length"
        :key="indexs"
        :class="{bg:pages==indexs}"
        @click.prevent="changepage(indexs)"
      >{{allength}}</a>
      <a href="javascript:;" v-show="pages!=this.selectinfo.length-1" @click="changehide(2)">下一页</a>
      <a href="javascript:;" v-show="pages!=this.selectinfo.length-1" @click="changehide(0)">尾页</a>
    </div>
  </div>
</template>
<script>
import scrollReveal from "scrollreveal";
export default {
  data() {
    return {
      infolist: [
       
      ],
      scrollReveal: scrollReveal(),
      pages: 0,
      end: true,
      start: true,
      start:0
    };
  },
  methods: {
    changepage(indexs) {
      this.pages = indexs;
      console.log(this.pages);
       document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
    changehide(num) {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      if (num == 1) {
        this.pages = 0;
      } else if (num == 0) {
        this.pages = this.selectinfo.length - 1;
      } else if (num == 2) {
        this.pages =
          this.pages >= this.selectinfo.length - 1
            ? this.pages
            : this.pages + 1;
      } else {
        this.pages = this.pages <= 0 ? this.pages : this.pages - 1;
      }
      if (this.pages == 0) {
        this.start = false;
      } else {
        this.start = true;
      }

      if (this.pages == this.selectinfo.length - 1) {
        this.end = false;
      } else {
        this.end = true;
      }
    },
    skip(title,index){

      this.$router.push("/happy/happying");
      this.$store.commit("gethappy",title);
      
    }
  },

  mounted() {
    this.scrollReveal.reveal(".reveal-top", {
      // 动画的时�?
      duration: 1500,
      // 延迟时间
      delay: 500,
      // 动画开始的位置�?bottom', 'left', 'top', 'right'
      origin: "top",
      // 回滚的时候是否再次触发动�?
      reset: false,
      // 在移动端是否使用动画
      mobile: false,
      // 滚动的距离，单位可以�?，rem�?
      distance: "50px",
      // 其他可用的动画效�?
      opacity: 0.001,
      easing: "linear",
      scale: 0.9
    });

  },
  computed: {
    selectinfo() {
      let newarry = [];
      this.infolist.forEach((item, index, arr) => {
        let page = ~~(index / 5);
        if (!newarry[page]) {
          newarry[page] = [];
        }
        newarry[page].push(item);
      });
      return newarry;
    },
   
  },
  
  created(){
    this.$store.dispatch("getcomment").then(()=>{
      this.infolist = this.$store.state.allcommentinfo.reverse();
    });
    
   
 
  }
}
</script>
<style scoped>
.bg {
  background: #a9d0dc !important;
  color: #1f7994 !important;
  font-weight: bold;
}
.pagelist {
  text-align: center;
  border-radius: 5px;
  width: 100%;
  clear: both;
  background: rgba(255, 255, 255, 0.3);
  padding: 10px 0;
  margin-bottom: 20px;
}
.pagelist > a {
  color: #fffcfc;
  margin: 0 2px;
  border: 1px solid #1f7994;
  padding: 5px 10px;
  background: #176c86;
  display: inline-block;
  border-radius: 3px;
}
.pagelist > a:hover {
  text-decoration: none;
}
.happy-info {
  width: 700px;
  float: left;
  height: auto;
}

.happy-info > ul > li {
  position: relative;
  padding: 18px 180px 0 15px;
  margin-bottom: 20px;
 background-image: linear-gradient(135deg, rgb(121, 241, 164) 10%, rgb(14, 92, 173) 100%);
}
.happy-info > ul > li > h3 {
  cursor: pointer;
}
.happy-info > ul > li > h3:hover {
  color: #63a1b4;
}

.happy-info > ul > li > p {
  margin: 20px 0 0 0;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-orient: vertical;
  height: 40px;
  color: #6b6b6b;
  text-shadow: 0 0 5px white;
}
.happy-info > ul > li > a > img {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: transform 0.5s linear;
}
.happy-info > ul > li > a {
  overflow: hidden;
  display: block;
  position: absolute;
  width: 150px;
  height: 100px;
  right: 20px;
  top: 20px;
}
.happy-info > ul > li > a:hover img {
  transform: scale(1.2);
}
.fade-date {
  margin: 20px 0 0 0;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  box-orient: vertical;
  display: -webkit-box;
  line-clamp: 2;
}
.fade-date > .fd01 {
  margin-right: 20px;
  border-right: #ccc 1px dotted;
  padding-right: 20px;
  color: #63a1b4;
  font-size: 13px;
}
</style>