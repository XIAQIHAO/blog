<template>
  <div class="tuijian b-r">
    <h3 class="b-s">点击排行</h3>
    <ul class="list clearfix">
      <li v-for="(headtitle,keywords) in headinfo" :key="keywords">
        <span @click="navhappy(keywords)">{{headtitle.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newinfo: []
    };
  },
  created() {
    this.$store.dispatch("getcomment").then(() => {
      this.newinfo = this.$store.state.allcommentinfo;
    });
  },
  computed: {
    headinfo() {
      let sorts = this.newinfo.sort((a, b) => b.readnum - a.readnum);
      return sorts.slice(0, 6);
    }
  },
  methods:{
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
  }
};
</script>
<style scoped>
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
.list > li:hover {
  color: #1f7994;
}
article h3 {
  color: #1f7994;
  font-size: 14px;
  line-height: 34px;
  padding: 0 0 0 10px;
}
</style>