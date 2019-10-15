<template>
  <div class="happying">
    <div class="happy-box b-s b-r" v-for="(happything,index) in happyes" :key="index">
      <div class="newsview">
        <h3 class="news_title">{{happything.title}}</h3>
      </div>
      <div class="bloginfo">
        <ul class="clearfix">
          <li class="lmname">新鲜事儿</li>
          <li class="timer">时间：{{happything.date}}</li>
          <li class="view">{{readnum}} 人已阅读</li>
        </ul>
      </div>
      <div class="tags"></div>
      <div class="news_about">
        <strong>简介</strong>
        {{happything.desc.slice(0,78)}}
      </div>
      <div class="news_con">
        <p>{{happything.desc}}</p>
      </div>
      <div class="img-show">
        <div v-for="(imges,index) in happything.imges" :key="index">
          <img :src="imges" alt />
        </div>
      </div>
      <p align="center" class="pageLink"></p>
      <p class="diggit">
        <a href="javascript:;" @click="addlikenum">
          很赞哦！
          <b class="diggnum">{{likenum}}</b>
        </a>
      </p>

      <div class="news_pl">
        <h2>文章评论</h2>
        <div class="gbko">
          <div class="fb" v-show="discuss">
            <ul>
              <li v-for="(discusses,index) in discuss" :key="index">
                <p class="fbtime">
                  <span>{{discusses.date}}</span>
                  {{discusses.usercomment}}
                </p>
                <p class="fbinfo">
                  {{discusses.comment}}
                  <span style="float:right;">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      size="mini"
                      circle
                      @click="deletedis(index)"
                    ></el-button>
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <div class="plpost">
            <p class="saying">
              <span>
                <a href="javascript:;">共有{{discuss.length}}条评论</a>
              </span>
              来说两句吧...
            </p>
            <div class="from-box">
              <el-form
                :model="ruleForm"
                status-icon
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="标题" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="活动内容" prop="desc">
                  <el-input type="textarea" v-model="ruleForm.desc" id="descinfo"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      readnum:0,
      likenum: 0,
      num: 0,
      discuss: [],
      happing: "",
      ruleForm: {
        name: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 500, message: "您输入的内容为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    deletedis(index) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/deletedis", { _id: this.discuss[index]._id })
            .then(mes => {
              if (mes.data.errno) {
                this.$message({
                  showClose: true,
                  message: "删除成功",
                  type: "success"
                });
                this.getdiscuss();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败",
                  type: "error"
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      let rn = this.ruleForm.name.length,
        rs = this.ruleForm.desc.length;
      if (rn && rs >= 1 && rs <= 500) {
        let [along] = this.happings;
        let descinfo = {
          comment: this.ruleForm.desc,
          usercomment: this.ruleForm.name,
          title: this.$store.state.title
        };

        this.$axios.post("/api/adddiscuss", descinfo).then(mes => {
          if (mes.data.errno) {
            this.ruleForm.desc = this.ruleForm.name = "";
            this.$message({
              showClose: true,
              message: "提交成功",
              type: "success"
            });
            this.getdiscuss();
          } else {
            this.$message({
              showClose: true,
              message: "提交失败",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "提交失败",
          type: "error"
        });
      }
    },
    getdiscuss() {
      this.$axios
        .post("/api/finddiscuss", { title: this.$store.state.title })
        .then(mes => {
          if (mes.data.errno) {
            this.discuss = mes.data.info.reverse();
          } else {
            alert("评论信息获取失败");
          }
        });
    },
    addreadnum() {
      let [happ] = this.happings;
      this.$axios
        .post("/api/addreadnum", {
          _id: this.$store.state.title,
          readnum: happ.readnum
        })
        .then(mes => {
          if (mes.data.errno) {
            this.$store.dispatch("getcomment")
            this.happyes = [mes.data.info];
            this.likenum = mes.data.info.likenum;
            this.readnum = mes.data.info.readnum;
          } else {
            alert("失败");
          }
        });
    },
    addlikenum() {
      let [happ] = this.happyes;
      this.num += 1;
      if (this.num <= 1) {
        
        this.$message({
          showClose: true,
          message: "谢谢亲的点赞",
          type: "success"
        });
        this.$axios
          .post("/api/addlikenum", {
            _id: this.$store.state.title,
            likenum: happ.likenum
          })
          .then(mes => {
            if (mes.data.errno) {
              this.likenum = mes.data.info.likenum;
               this.readnum = mes.data.info.readnum;
               this.$store.dispatch("getcomment")
            } else {
              alert("失败");
            }
          });
      } else {
        alert("一次只能赞一次哟");
      }
    }
  },

  created() {
    this.happing = this.$store.state.allcommentinfo;
    document.documentElement.scrollTop = 0;
    this.getdiscuss();
    this.addreadnum();
    this.happyes = this.happings;
  },
   
    
  

  computed: {
    happings() {
      return this.happing.filter((item, index, arr) => {
        return item._id.indexOf(this.$store.state.title) != -1;
      });
    }
  }
};
</script>
<style scoped>
.happying {
  position: relative;
  width: 1000px;
  z-index: 11;

  background-color: skyblue;
  border-radius: 5px;
}
.happy-box {
  width: 1000px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 30px;
  padding-bottom: 20px;
  height: auto;
  background-color: #fff;
  margin-bottom: 30px;
}
.newsview {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
}
.bloginfo {
  width: 100%;
  overflow: hidden;
}
.bloginfo li {
  float: left;
  margin-right: 20px;
  color: #7d7d7d;
}
.tags {
  margin: 10px 0;
  overflow: hidden;
}
.news_about {
  padding: 10px;
  margin: 10px auto 15px auto;
  line-height: 23px;
  background: rgb(239, 239, 239);
  color: #423f3f;
}
.news_about strong {
  color: #1f7994;
  font-weight: 400 !important;
  font-size: 13px;
  padding-right: 8px;
}
.news_con {
  overflow: hidden;
}
.news_con p {
  overflow: hidden;
  padding-bottom: 4px;
  padding-top: 6px;
  word-wrap: break-word;
}
.news_con p {
  overflow: hidden;
  padding-bottom: 4px;
  padding-top: 6px;
  word-wrap: break-word;
}
.diggit {
  width: 160px;
  margin: 0 auto 20px;
  background: #e2523a;
  color: #fff;
  box-shadow: 1px 2px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  line-height: 40px;
  text-align: center;
}
.newsview h3 {
  font-size: 25px;
}
a:hover {
  text-decoration: none;
}
.diggnum::before {
  content: "(";
}
.diggnum::after {
  content: ")";
}
.diggit a {
  color: #fff;
}
.nextinfo {
  line-height: 24px;
  width: 100%;
  overflow: hidden;
  margin: 20px 0;
}
.nextinfo p {
  padding: 4px 0;
  border-radius: 5px;
}
a {
  text-decoration: none;
  color: #666;
  letter-spacing: 2px;
}
.nextinfo p a:hover {
  color: #1f7994;
}
.news_pl {
  margin: 10px 0;
  width: 100%;
  overflow: hidden;
}
.news_pl h2 {
  border-bottom: #1f7994 2px solid;
  line-height: 40px;
  font-size: 14px;
}
.plpost {
  margin: 0 20px;
}
.saying {
  line-height: 30px;
  color: #a9a6a6;
}
.saying span {
  float: right;
}
.saying span a {
  color: #de1513;
}
.from-box {
  margin-top: 20px;
}
.fb ul {
  margin: 10px 10px;
  padding: 20px 30px;
}
.fb ul li {
  border-bottom: #ececec 1px solid;
  margin-bottom: 10px;
}
p.fbinfo {
  margin: 10px 0;
}
p.fbtime {
  color: #1f7994;
}
.fbtime span {
  float: right;
  color: #999;
  font-size: 12px;
  width: 112px;
  overflow: hidden;
  white-space: nowrap;
}
.img-show {
  text-align: center;
}
.img-show img {
  width: 80%;
  height: 400px;
  cursor: pointer;
  transition: all 0.5s linear;
  border-radius: 5px;
}
.img-show img:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px silver;
}
</style>