<template>
  <div class="login">
    <!-- <canvas
      class="snow-canvas"
      speed="3"
      interaction="true"
      size="12"
      count="20"
      wind-power="-5"
      image="/static/img/snow.png"
      width="1366"
      height="667"
    ></canvas>
    <canvas
      class="snow-canvas"
      speed="1"
      interaction="false"
      size="2"
      count="80"
      opacity="0.00001"
      start-color="rgba(253,252,251,1)"
      end-color="rgba(251,252,253,0.3)"
      wind-power="0"
      image="false"
      width="1366"
      height="667"
    ></canvas>
    <canvas
      class="snow-canvas"
      speed="3"
      interaction="true"
      size="6"
      count="30"
      start-color="rgba(253,252,251,1)"
      end-color="rgba(251,252,253,0.3)"
      opacity="0.00001"
      wind-power="2"
      image="false"
      width="1366"
      height="667"
    ></canvas>-->

    <div class="login-box b-r">
      <h3 style="text-align:center;font-size:20px;margin-bottom:20px;transform:translateX(35px)">
        <i class="el-icon-user"></i> 用户登录
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
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
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
        pass: "",
        username: ""
      },
      rules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          let admin = {
            username: this.ruleForm.username,
            password: this.ruleForm.pass
          };
          console.log(admin);
          this.$axios.post("/api/findadmin", admin).then(mes => {
            if (mes.data.errno) {
              this.openFullScreen();
            } else {
              this.$message({
                showClose: true,
                message: "登录失败",
                type: "error"
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$router.back();
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        this.$message({
          showClose: true,
          message: "恭喜你，登录成功",
          type: "success"
        });
        let admin = {
          username: this.ruleForm.username,
          password: this.ruleForm.pass
        };
        this.$store.commit("setadmin", admin.username);
        this.ruleForm.username = this.ruleForm.pass = "";
        this.$router.push("/usercenter");
      }, 2000);
    }
  },
  created(){
    this.ruleForm.username = this.$store.state.username;
    document.title = "登录"
  }
};
</script>
<style scoped>
.snow-canvas {
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  pointer-events: none;
}
.login {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  overflow: hidden;
  background-image: linear-gradient(
    135deg,
    rgb(146, 255, 192) 10%,
    rgb(0, 38, 97) 100%
  );
}
.login-box {
  width: 500px;
  height: 240px;
  position: absolute;
  padding: 50px 80px 30px 0;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  margin: auto;
  background-color: skyblue;
}
</style>