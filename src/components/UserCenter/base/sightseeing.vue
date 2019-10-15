<template>
  <div class="sight-seeing">
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
        <el-form-item>
          <el-button type="success" @click="toggle">选择图片</el-button>
          <span class="allimg" v-show="imges.length">您一共选择了{{imges.length}}张图片</span>
        </el-form-item>
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc" id="descinfo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="bg" v-show="bgshow"></div>
    <div class="img-box" v-show="bgshow">
      <div class="img-wrapper">
        <div v-for="(images,index) in selector[pages]" :key="index" class="b-r">
          <img :src="images.imgUrl[0]" alt="爱吃西瓜的小夏" title="爱吃西瓜的小夏" />
          <div class="btnList">
            <el-button size="mini" round @click="glance(images)">预览</el-button>
            <el-button size="mini" round @click="comfirm(images,index)">{{images.currently}}</el-button>
          </div>
          <span class="el-icon-success icon-cur" v-show="images.current"></span>
        </div>
      </div>
      <div class="pagelist">
        <a href="javascript:;">{{this.imgList.length}}</a>
        <a href="javascript:;" v-show="pages!=0" @click="changehide(1)">首页</a>
        <a href="javascript:;" v-show="pages!=0" @click="changehide(3)">上一页</a>
        <a
          href="javascript:;"
          v-for="(allength,indexs) in selector.length"
          :key="indexs"
          :class="{bgs:pages==indexs}"
          @click.prevent="changepage(indexs)"
        >{{allength}}</a>
        <a href="javascript:;" v-show="pages!=this.selector.length-1" @click="changehide(2)">下一页</a>
        <a href="javascript:;" v-show="pages!=this.selector.length-1" @click="changehide(0)">尾页</a>
        <div class="caozuo" style="float:right;margin-right:10px;">
          <a href="javascript:;" @click="caozuo(0)">取消</a>
          <a href="javascript:;" @click="caozuo(1)">提交</a>
        </div>
      </div>
    </div>
    <div class="img-boxs" v-show="imgshow">
      <div class="img-show">
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide class="swiper-item" v-for="(item,keywords) in showimg" :key="keywords">
            <img class="swiper-img" :src="item" />
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <p>
          <el-button plain size="mini" @click="imgshow=false">关闭</el-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textarea: "",
      swiperOption: {
        // 参数选项,显示小点

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        //循环
      },
      imgshow: false,
      pages: 0,
      end: true,
      start: true,
      showimg: [],
      imgList: [
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/201403/10/b7aa220089fa8054e6e012bafff63042.jpg_350x240_270dd586.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/1b/57758525e53c24b95d1b329718f670b5.water.jpg_350x240_416570b0.jpg",
            "http://img1.qunarzz.com/sight/p0/1411/38/217a6ffc968923cd95404a9b1e9e85e8.water.jpg_350x240_9ff2ff75.jpg",
            "http://img1.qunarzz.com/sight/p0/1411/e2/054836aeec12503879a5a4efa9c0ca75.water.jpg_350x240_9a0bedcc.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1901/7a/7a88091a47d04f9fa3.img.jpg_350x240_6b484a02.jpg",
            "http://img1.qunarzz.com/sight/p0/1901/1a/1a23a281559b846a3.img.jpg_350x240_458914ae.jpg",
            "http://img1.qunarzz.com/sight/p0/1901/bc/bc599fc44a75932fa3.img.jpg_350x240_27115b53.jpg",
            "http://img1.qunarzz.com/sight/p0/1901/5b/5bd3a7b1021da826a3.img.jpg_350x240_9abb80b4.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1611/20/205db6ee32a4a29ba3.water.jpg_350x240_4d2669a7.jpg",
            "http://img1.qunarzz.com/sight/p0/1703/65/656dc01092559eeda3.water.jpg_350x240_c12ef317.jpg",
            "http://img1.qunarzz.com/sight/p0/1703/4b/4b9037b42b411281a3.water.jpg_350x240_fd36b1b9.jpg",
            "http://img1.qunarzz.com/sight/p0/1703/ab/aba7fa2df75f9937a3.water.jpg_350x240_59a19786.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1505/a9/a9cd8c8550398407.water.jpg_350x240_dea99c1a.jpg",
            "http://img1.qunarzz.com/sight/p0/1505/a9/a9cd8c8550398407.water.jpg_350x240_dea99c1a.jpg",
            "http://img1.qunarzz.com/sight/p0/201305/30/1daea7cef7aaa85cc8d65eac.jpg_350x240_077648b3.jpg",
            "http://img1.qunarzz.com/sight/p0/201305/30/2f7ea4b00bbd44b7c8d65eac.jpg_350x240_48814c5b.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1505/57/579b6c97900745db.water.jpg_350x240_70801cb8.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/c1/74d874d376a6e45b72e72078e9f2aab2.water.jpg_350x240_0e99cdcb.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/30/cd0a0dce186c0c9944e3c86904759cad.water.jpg_350x240_edb61a64.jpg",
            "http://img1.qunahttp://img1.qunarzz.com/sight/p0/1412/9b/c0edc6d3714250fafe45929f562343fc.water.jpg_350x240_8102193f.jpgrzz.com/sight/p0/1412/63/70f57becac1d0bd5acc2572d106dbb52.water.jpg_350x240_ec34456a.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1412/68/42da26a54c27a3c237b4d10a61583c36.water.jpg_350x240_7f99e17b.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/a8/16cc8703a97e51f1399588ba5a8d19fb.water.jpg_350x240_ed55ec50.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/5d/3af148adfad51bae79a29d028e44d228.water.jpg_350x240_157e3e3c.jpg",
            ""
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "https://imgs.qunarzz.com/sight/p0/1809/e5/e557eddf1b11c017a3.img.jpg_200x200_7a3d492d.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/68/42da26a54c27a3c237b4d10a61583c36.water.jpg_350x240_7f99e17b.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/73/07107f07b9bfe91b4368bc532a8c339e.water.jpg_350x240_914410d3.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/71/8cbbdea87824801986f866e20a447e0a.water.jpg_350x240_1491cbcb.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1412/7c/3a7508ed823cc4e3d06f60f3d16d3a6c.water.jpg_350x240_06be4733.jpg",
            "http://img1.qunarzz.com/sight/p0/201305/30/1f20f020e88b80f7c8d65eac.jpg_350x240_bc1bd77f.jpg",
            "http://img1.qunarzz.com/sight/p0/201305/13/59cd789bceba41c2c8d65eac.jpg_350x240_03ceb3eb.jpg",
            "http://img1.qunarzz.com/sight/p0/1411/b8/0c8e29ab4e4266b3b1e3fdadae8231fb.water.jpg_350x240_09120382.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/201407/14/e948e22c69c5ef745a005865ef127597.jpg_350x240_a9139c43.jpg",
            "http://img1.qunarzz.com/sight/p0/201407/14/6165a8241d0c60af2e49e500cb0d3b05.jpg_350x240_80ccc55d.jpg",
            "http://img1.qunarzz.com/sight/p0/201407/14/c799124bfd702fe59e6b9ec387958cf5.jpg_350x240_013b1255.jpg",
            "http://img1.qunarzz.com/sight/p0/201407/14/04ab265d6281aed2f894f19ecf57eae2.jpg_350x240_7efafd04.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/wugc/p111/201306/06/bb1d8a2cd8af3c1393835fbb.jpg_350x240_2e80672c.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/fa/2141b6a685fbd1b3d5f8720b9b4eb207.water.jpg_350x240_e0edb45c.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/de/b1c070aadcadd1dca10516c97783da8a.water.jpg_350x240_45ef396e.jpg",
            "http://img1.qunarzz.com/sight/p0/1412/b0/260bb6a74321764c26cef90b8e7d69f2.water.jpg_350x240_991d10e8.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1604/6c/6c23afe8742f14f790.img.jpg_350x240_66cbf948.jpg",
            "http://img1.qunarzz.com/sight/p0/1604/bb/bb2ec456f91e3f7d90.img.jpg_350x240_fcad2a97.jpg",
            "http://img1.qunarzz.com/sight/p0/1604/7b/7b4537e274bf716990.img.jpg_350x240_6499473b.jpg"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1611/dc/dcf77cef5b6ff080a3.img.png_350x240_046c69c0.png",
            "http://img1.qunarzz.com/sight/p0/1611/5b/5b8ed1fa52a094b8a3.img.png_350x240_8f778fa5.png",
            "http://img1.qunarzz.com/sight/p0/1611/9b/9bc54900044ea03ea3.img.png_350x240_33b935fa.png",
            "http://img1.qunarzz.com/sight/p0/1611/ee/eea3fd1306c56da6a3.img.png_350x240_3b590401.png"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1805/e7/e7e33cbcbcf9ab56a3.img.png_350x240_1b5de551.png",
            "http://img1.qunarzz.com/sight/p0/1805/4b/4b87422502601f5fa3.img.jpg_350x240_7f05aa9c.jpg",
            "http://img1.qunarzz.com/sight/p0/1805/23/23099ecb3acfa4d6a3.img.png_350x240_761f76e0.png",
            "http://img1.qunarzz.com/sight/p0/1805/df/df5fa886a4926fbaa3.img.png_350x240_0032c94a.png"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1712/8f/8fed56e3ce1614f0a3.img.png_350x240_832aaa33.png",
            "http://img1.qunarzz.com/sight/p0/1712/4e/4eaffc6b74e6fb84a3.img.png_350x240_422bb239.png",
            "http://img1.qunarzz.com/sight/p0/1712/fb/fb02473b95486559a3.img.png_350x240_ebc49980.png",
            "http://img1.qunarzz.com/sight/p0/1712/3d/3d173e450ab59a26a3.img.png_350x240_15cd4a16.png"
          ]
        },
        {
          currently: "确认",
          current: false,
          imgUrl: [
            "http://img1.qunarzz.com/sight/p0/1811/d2/d27a8eacefc20f47a3.img.jpg_350x240_f09b9782.jpg",
            "http://img1.qunarzz.com/sight/p0/1812/bb/bbebc3a076c027c2a3.img.jpg_350x240_324ec711.jpg",
            "http://img1.qunarzz.com/sight/p0/1812/bb/bbebc3a076c027c2a3.img.jpg_350x240_324ec711.jpg",
            "http://img1.qunarzz.com/sight/p0/1811/f5/f57efb06b21d35a9a3.img.jpg_350x240_bbf92c66.jpg"
          ]
        }
      ],

      ruleForm: {
        name: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "请输入内容", trigger: "blur" },
          { min: 1, max: 500, message: "您输入的内容为空", trigger: "blur" }
        ]
      },
      bgshow: false,
      imges: []
    };
  },
  methods: {
    caozuo(num) {
      this.bgshow = false;
      if (num) {
        this.selectimg.forEach((item, index, arr) => {
          this.imges.push(item.imgUrl);
        });

        this.imges = this.imges.reduce(function(a, b) {
          return a.concat(b);
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid && this.imges.length) {
          let imginfo = {
            title: this.ruleForm.name,
            imges: this.imges,
            descinfo: this.ruleForm.desc
          };
          this.$axios.post("api/comment",imginfo).then(mes=>{
            if(mes.data){
               this.$message({
          showClose: true,
          message: '恭喜您提交成功!!',
          type: 'success'
            })
            }else{
                 this.$message({
          showClose: true,
          message: '添加失败',
          type: 'error'
        });
            }
          })
  
          this.ruleForm.name = this.ruleForm.desc = "";
          this.imges = [];
        } else {
          this.$message({
          showClose: true,
          message: '您填写的信息不完整',
          type: 'error'
        });
          return false;
        }
      });
    },
    glance(imgages) {
      this.imgshow = true;
      this.showimg = imgages.imgUrl;
    },
    comfirm(images) {
      images.current = !images.current;
      if (images.current) {
        images.currently = "取消";
      } else {
        images.currently = "确定";
      }
    },
    toggle() {
      this.bgshow = true;
      this.pages = 0;
      this.selectimg.forEach((item, index, arr) => {
        item.current = false;
        item.currently = "确定";
      });
      this.imges = [];
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
        this.pages = this.selector.length - 1;
      } else if (num == 2) {
        this.pages =
          this.pages >= this.selector.length - 1 ? this.pages : this.pages + 1;
      } else {
        this.pages = this.pages <= 0 ? this.pages : this.pages - 1;
      }
      if (this.pages == 0) {
        this.start = false;
      } else {
        this.start = true;
      }

      if (this.pages == this.selector.length - 1) {
        this.end = false;
      } else {
        this.end = true;
      }
    }
  },
  computed: {
     selector(){
       let newarry = [];
       this.imgList.forEach((item,index,arr)=>{
         let page = ~~(index/6);
          if(!newarry[page]){
            newarry[page] = []
          }
          newarry[page].push(item);
       })
       return newarry;

     },
    selectimg() {
      return this.imgList.filter((item, index, arr) => {
        return item.current;
      });
    }
  },
  
};
</script>
<style scoped>
.sight-seeing {
  height: 495px;
  background-color: #fff;
}
.from-box {
  padding-right: 40px;
  padding-top: 20px;
}
.bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.img-box {
  position: fixed;
  width: 800px;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.img-box > .img-wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 200px;
}
.img-box > .img-wrapper > div {
  position: relative;
  overflow: hidden;
  width: 28%;
  height: 150px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px skyblue;
}
.img-box > .img-wrapper > div > img {
  float: left;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  transition: transform 0.5s linear;
}
.img-box > .img-wrapper > div:hover img {
  transform: scale(1.2);
}
.btnList {
  width: 100%;
  position: absolute;
  transform: translateY(-50%);
  text-align: center;
  top: 50%;
}
.pagelist {
  float: left;
  text-align: center;
  border-radius: 5px;
  width: 100%;
  clear: both;
  background: rgba(255, 255, 255, 0.3);
  padding: 10px 0;
  margin-bottom: 20px;
}
.pagelist > a,
.caozuo > a {
  color: #fffcfc;
  margin: 0 2px;
  border: 1px solid #1f7994;
  padding: 5px 10px;
  background: #176c86;
  display: inline-block;
  border-radius: 3px;
  transition: all 0.5s linear;
}
.pagelist > a:hover,
.caozuo > a:hover {
  text-decoration: none;
}
.bgs {
  background: #a9d0dc !important;
  color: #1f7994 !important;
  font-weight: bold;
}
.caozuo > a:hover {
  background: #a9d0dc !important;
  color: #1f7994 !important;
  font-weight: bold;
  text-decoration: none;
}
.img-show {
  position: fixed;
  width: 700px;
  height: 300px;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  box-shadow: 0 0 10px white;
}
.img-show img {
  width: 700px;
  height: 300px;
  user-select: none;
}
.img-boxs {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.swiper-pagination {
  font-size: 25px;
  color: white;
}
.icon-cur {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  color: #176c86;
  text-shadow: 0 0 10px white;
}
#descinfo {
  background-color: #fff;
  border: 1px solid rgb(220, 223, 230);
  resize: none;
  height: 200px !important;
  width: 100%;
  border-radius: 5px;
  outline: none;
}
.allimg {
  font-size: 20px;
  color: #176c86;
  text-decoration: none;
}
</style>