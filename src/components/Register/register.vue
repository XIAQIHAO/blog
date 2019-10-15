<template>
  <div class="register">
    <div class="register-box b-r">
      <h3 style="text-align:center;font-size:20px;margin-bottom:20px;transform:translateX(35px)">
        <i class="el-icon-user"></i> 用户注册
      </h3>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" style="color:#fff">
          <el-input v-model.number="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
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
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("必须年满1岁"));
          } else {
            callback();
          }
        }
      }, 100);
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        username: "",
        age: ""
      },
      rules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到  10个字符", trigger: "blur" }
        ],
        age: [{ required: true, validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let person = {
            username: this.ruleForm.username,
            age: this.ruleForm.age,
            password: this.ruleForm.pass,
            date: this.datetime
          };
        
          this.$axios.post("/api/setuser", person).then(mes => {
            console.log(mes.data.errno);
             const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
          if (mes.data.errno == 1) {
              this.$message({
                showClose: true,
                message: "恭喜你，注册成功",
                type: "success"
              });
              this.$store.commit("getusers",this.ruleForm.username)
              setTimeout(() => {
                this.$router.push("/login");
              }, 500);
            } else if (mes.data.errno == 2) {
              this.$message({
                showClose: true,
                message: "该用户已被注册",
                type: "error"
              });
            } else if (mes.data.errno == 0) {
              this.$message({
                showClose: true,
                message: "注册失败",
                type: "error"
              });
            }
        }, 2000);
            
          });
        } else {
          this.$message({
            showClose: true,
            message: "请按要求来填写信息",
            type: "error"
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.back();
    }
  },
  computed: {
    datetime() {
      let date = new Date();
      let [year, mounth, day] = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      ];
      if (mounth < 10) {
        mounth = "0" + mounth;
      } else if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + mounth + "-" + day;
    }
  },
  created(){
    document.title = "注册"
  }
};
</script>
<style scoped>
.register {
  width: 100vw;
  height: 100vh;
  background-color: rgb(207, 216, 220);
  background-image: linear-gradient(
    135deg,
    rgb(105, 255, 151) 10%,
    rgb(0, 228, 255) 100%
  );
}
.register-box {
  width: 500px;
  height: 350px;
  text-align: center;
  position: absolute;
  padding: 50px 90px 30px 0;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  margin: auto;
  background-color: skyblue;
  color: white;
  box-shadow: 0 0 10px steelblue;
}
</style>