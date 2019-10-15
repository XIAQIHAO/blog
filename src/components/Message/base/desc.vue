<template>
  <div class="desc allWidth b-r animated jackInTheBox">
    <div class="gbook">
      <ul class="b-s">
        <li class="clearfix" v-for="(commentinfo,index) in Listinfo" :key="index">
          <span class="tximg">
            <img :src="commentinfo.imgUrl" alt class="b-r" />
          </span>
          <p class="fbtime">
            <span>{{commentinfo.date}}</span>
            {{commentinfo.username}}
          </p>
          <p class="fbinfo">{{commentinfo.desces}}</p>

          <span class="delete-icon">
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteinfo(index)"></el-button>
          </span>
        </li>
      </ul>
      <div class="hf">
        <p class="zzhf">
          <font color="#FF0000">爱吃西瓜的小夏回复:</font>
          谢谢你们的访问，我会努力的!!!
        </p>
      </div>
      <div class="gbook gbooks clearfix">
        <form>
          <p style="color:black">
            <strong>来说点什么吧...</strong>
          </p>
          <p>
            <span>您的姓名*:</span>
            <input type="text" class="username" v-model="username" />
          </p>
          <p>
            <span>选择您的头像*:{{imgUrl}}</span>
          </p>
          <ul class="list clearfix">
            <li
              v-for="(images,index) in imglist"
              :key="index"
              :class="{opac:imgUrl&&cur == index}"
              @click="changeindex(index)"
              :ref=" 'ue'+index"
            >
              <img :src="images" alt class="b-r" />
            </li>
          </ul>

          <p>
            <span>留言内容:</span>
          </p>
          <textarea v-model="desces"></textarea>

          <div class="btn" style="float:right;margin-top:20px">
            <el-button type="info" @click="rest">重置</el-button>
            <el-button type="primary" @click="sub">提交</el-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { MapState, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      fullscreenLoading: false,
      Listinfo: [],
      username: "",
      imgUrl: "",
      imglist: [
        "https://www.daiyiyang.com/e/tool/images/tx1.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx2.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx3.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx4.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx5.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx6.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx7.jpg",
        "https://www.daiyiyang.com/e/tool/images/tx8.jpg"
      ],
      cur: 0,
      desces: "",
    };
  },
  computed: {
    ...mapState(["allcustominfo"])
  },
  methods: {
    deleteinfo(index) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/deleteinfo",{ date:this.Listinfo[index].date})
            .then(mes => {
              if (mes.data.errno) {
                this.gets();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                
              } else {
                this.$message({
                  type: "erro",
                  message: "删除失败"
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
    ...mapActions(["getcustoment"]),
    changeindex(index) {
      this.cur = index;
      this.imgUrl = this.imglist[index];
    },
    sub() {
      if (this.username && this.imgUrl && this.desces) {
        let message = {
          username: this.username,
          imgUrl: this.imgUrl,
          desces: this.desces,
          date: new Date().toLocaleString()
        };
        this.$axios.post("/api/getcomment", message).then(mes => {
          if (mes.data.ernno) {
            this.rest();
            this.$message({
              showClose: true,
              message: "恭喜你，提交成功",
              type: "success"
            });
            this.gets();
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
          message: "信息输入不完整，提交失败",
          type: "error"
        });
      }
    },
    rest() {
      this.username = this.imgUrl = this.desces = "";
    },
    gets() {
      this.getcustoment().then(() => {
        this.Listinfo = this.allcustominfo.reverse().slice(0, 8);
        console.log(this.Listinfo);
      });
    }
  },
  created() {
    this.gets();
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
    
   if(this.Listinfo){
     setTimeout(()=>{
        loading.close();
     },800);
   }
  }
};
</script>


<style scoped>
.opac {
  opacity: 1 !important;
}
.gbooks p {
  color: #1f7994;
}
.gbook p {
  margin-bottom: 10px;
  overflow: hidden;
}
.username {
  border: none;
  height: 23px;
  border-radius: 5px;
  outline: none;
  text-indent: 0.5em;
  background-color: #fff;
  border: 2px dashed #ececec;
  color: #1f7994;
}
textarea {
  display: block;
  width: 100%;
  height: 200px;
  background-color: #fff;
  outline: none;
  resize: none;
  color: #1f7994;
}
.list > li {
  float: left;
  margin-right: 10px;
  cursor: pointer;
  opacity: 0.7;
}

.list > li:hover {
  opacity: 1;
}
.desc {
  background-image: linear-gradient(
    135deg,
    rgb(121, 241, 164) 10%,
    rgb(14, 92, 173) 100%
  );
  margin-bottom: 100px;
}
.gbook {
  padding: 20px;
}
.gbooks {
  padding-bottom: 0;
}
.gbook > ul > li {
  position: relative;
  margin: 10px;
  padding: 20px 30px;
  border-bottom: #ececec 1px solid;
}
span.delete-icon {
  display: block;
  position: absolute;
  right: 0;
  bottom: 10px;
}
span.tximg {
  display: block;
  float: left;
  margin-right: 10px;
}
.fbtime {
  color: #1f7994;
}
.fbtime span {
  float: right;
  color: black;
  font-size: 12px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
}
p.fbinfo {
  margin: 10px 0;
}
.hf {
  margin: 0 20px;
  padding-bottom: 20px;
  border-bottom: #dedddd 1px dashed;
}
.zzhf {
  padding: 10px 20px;
  background: #f9f9f9;
}
</style>
