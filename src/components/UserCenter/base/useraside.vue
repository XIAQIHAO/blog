<template>
  <div class="user-info allWidth">
    <div class="user-box clearfix">
      <el-container style="height: 500px;">
        <el-aside width="200px" style="background-color: #545c64;">
          <el-menu
           
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            
          >
            <el-menu-item index>
              <template slot="title">
                <i class="el-icon-user"></i>
                <big>
                  <span>博客管理</span>
                </big>
              </template>
            </el-menu-item>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-edit"></i>写博客
              </template>
              <el-menu-item-group>
                <el-menu-item index @click="sightplay"><span>游玩经历</span></el-menu-item>
               
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>查看信息
              </template>
              <el-menu-item-group>
                <el-menu-item index @click="userlist">用户列表</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
           <keep-alive>
              <router-view></router-view>
           </keep-alive>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
 export default {
  data() {
    return {

    };
  },
  methods: {
    ...mapActions(['getUserList']),
    userlist() {
    this.$router.push("/usercenter/userlist");
      
   
    },
    sightplay(){
      this.$router.push("/usercenter/sightseeing")
    },
    sightphoto(){
      this.$router.push("/usercenter/sightphoto")
    }
  }
};
</script>
<style scoped>
.sidebar {
  width: 15%;
  height: 100%;
  background-color: skyblue;
  overflow: hidden;
}
.el-menu {
  border: none;
}
.el-main {
  padding: 2px 0 0 20px !important;
}
</style>