<template>
  <div class="user-list">
   
    <div class="search-box clearfix" style="text-align:center">
       <div style="float:right;margin-right:10px;">
           <el-button size="mini" @click="alluser">全部用户</el-button>
      </div>
      <i style="text-align:center;letter-spacing:3px;line-height:29px;">用户信息展示</i>
      <div class="btn">
        <el-button size="mini" @click="finduser">查询</el-button>
      </div>
      <div class="search">
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </div>
       
    </div>
    
      <el-table :data="tableData" style="width: 100%;height:458px;overflow:auto;">
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="120">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.username }}</p>
            <p>密码: {{ scope.row.password }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.username }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="密码" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="change(scope.$index)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteuser(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   

    <div class="bg" v-show="bgshow"></div>
    <transition enter-active-class="animated rollIn" leave-active-class="animated rollOut">
      <div class="from b-r" v-show="bgshow">
        <div class="from-box">
          <h3 class="clearfix">
            <i class="el-icon-user"></i>编辑信息
            <span class="el-icon-close closes" @click="toggle"></span>
          </h3>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>您确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        password: "",
        age: "",
        username: "",
        _id: ""
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        age: [{ required: true, validator: checkAge, trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      },
      search: "",
      bgshow: false,
      dialogVisible: false,
      tableData: []
    };
  },
  methods: {
    ...mapActions(["getUserList"]),
    change(index) {
      this.ruleForm.username = this.tableData[index].username;
      this.ruleForm.age = this.tableData[index].age;
      this.ruleForm.password = this.tableData[index].password;
      this.ruleForm._id = this.tableData[index]._id;

      this.toggle();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let user = {
            username: this.ruleForm.username,
            age: this.ruleForm.age,
            password: this.ruleForm.password,
            _id: this.ruleForm._id
          };
          console.log(user);
          this.$axios.post("/api/changeinfo", user).then(mes => {
            if (mes.data.errno) {
              setTimeout(() => {
                this.$message({
                  showClose: true,
                  message: "恭喜你，修改成功",
                  type: "success"
                });
              }, 800);
              this.getUserList().then(() => {
                this.tableData = this.$store.state.UserList.reverse();
                console.log(this.tableData);
              });
            } else {
              alert("修改失败");
            }
          });
          this.toggle();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toggle() {
      this.bgshow = !this.bgshow;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    sure() {
      this.$message({
        showClose: true,
        message: "删除成功",
        type: "success"
      });
      this.dialogVisible = false;
    },
    deleteuser(index) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let { _id } = this.tableData[index];
          this.$axios.post("/api/deleteuser", { _id }).then(mes => {
            if (mes.data.errno) {
              this.getUserList().then(() => {
                this.tableData = this.$store.state.UserList.reverse();
              });
              this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
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
    finduser() {
      this.$axios.post("/api/search", { username: this.search }).then(mes => {
        if (mes.data.errno) {
          this.search = "";
          this.$message({
            showClose: true,
            message: "查询成功",
            type: "success"
          });
          this.tableData = [mes.data.info];
        } else {
          this.$message({
            showClose: true,
            message: "查询失败",
            type: "error"
          });
        }
      });
    },
    alluser(){
       this.getUserList().then(() => {
      this.tableData = this.$store.state.UserList.reverse();
    });
    }
  },

  created() {
    this.getUserList().then(() => {
      this.tableData = this.$store.state.UserList.reverse();
      console.log(this.tableData);
    });
  }
};
</script>
<style scoped>
.user-list {
  position: relative;
  width: 100%;
 
  
}
.search-box{
  padding:5px 0;
  background-color: #fff;
  border-bottom: 1px solid rgba(192,192,192,.3);
}
.search {
  float: right;
 
}
.btn {
  float: right;
  margin-left: 10px;
  margin-right: 10px;
}
.table-box{
 height: 750px;
  overflow: hidden !important;
}
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.from {
  position: fixed;
  width: 500px;
  background-color: #fff;
  margin-left: -250px;
  left: 50%;
  top: 250px;
  box-shadow: 0 0 10px skyblue;
  padding: 20px 40px 0 0;
  text-align: center;
  transition: all 0.5s linear;
  background: #b2fefa; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #b2fefa, #0ed2f7); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #b2fefa, #0ed2f7);
}

.from h3 {
  font-size: 25px;
  letter-spacing: 3px;
  margin-bottom: 20px;
}
.from-box {
  position: relative;
}
.closes {
  display: inline-block;
  float: right;
  right: 20px;
  top: 10px;
  cursor: pointer;
  transition: all 0.5s linear;
}
.closes:hover {
  transform: rotate(180deg);
  color: skyblue;
}

</style>