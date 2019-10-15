<template>
  <div class="time-show animated zoomIn">
    <div class="b-s time-box">
      <ul class="list2">
        <li v-for="(TimeInfo,index) in selectinfo[pages]" :key="index">
          <span>{{TimeInfo.date}}</span>
          <i>
            <a href="javascript:;" @click="navhappy(index)">{{TimeInfo.title}}</a>
          </i>
        </li>
      </ul>
    </div>
    <div class="pagelist" v-show="selectinfo.length>=2">
      <a href="javascript:;">{{this.timeinfo.length}}</a>
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
export default {
  data() {
    return {
      
      timeinfo:[],
      pages: 0,
      end: true,
      start: true
    };
  },
  methods: {
    navhappy(index) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$store.commit("gethappy", this.timeinfo[index]._id);
        this.$router.push("/happy/happying");
      }, 1500);
    },
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
    }
  },
  created() {
    this.$store.dispatch("getcomment").then(() => {
      this.timeinfo = this.$store.state.allcommentinfo.reverse();
    });
  },
  computed: {
    selectinfo() {
      let newarry = [];
      this.timeinfo.forEach((item, index, arr) => {
        let page = ~~(index / 26);
        if (!newarry[page]) {
          newarry[page] = [];
        }
        newarry[page].push(item);
      });
      return newarry;
    }
  }
};
</script>
<style scoped>
.bg {
  background: #a9d0dc !important;
  color: #1f7994 !important;
  font-weight: bold;
}
.time-show {
  width: 700px;
  height: 1143px;
  float: left;
  overflow: hidden;
  margin-bottom: 20px;
  
}
.time-box {
  background-image: linear-gradient(135deg, rgb(60, 140, 231) 10%, rgb(0, 234, 255) 100%);
  padding: 30px 30px 10px 30px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.time-box li {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.time-box span {
  position: relative;
  line-height: 32px;
  padding-right: 40px;
  color: #1f7994;
  display: inline-block;
  width: 180px;
}
.time-box li i {
  position: relative;
  font-style: normal;
}
.time-box li i a {
  text-decoration: none;
  color: #666;
}
.time-box li i a:hover {
  text-decoration: none;
  color: #1f7994;
}
.time-box li i::before {
  content: " ";
  height: 10px;
  width: 10px;
  border: 2px solid #cccaca;
  background: #fff;
  position: absolute;
  top: 4px;
  left: -30px;
  border-radius: 50%;
  transition: all 0.5s ease;
}
.time-box span::after {
  position: absolute;
  content: "";
  width: 2px;
  height: 40px;
  background: #e0dfdf;
  right: 18px;
}
.time-box li:hover i::before {
  background: #1f7994;
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
</style>