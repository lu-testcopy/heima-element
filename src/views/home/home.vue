<template>
    <div class="home-contatior">
      <el-container>
          <!-- 头部区域 -->
        <el-header class="home-header">
            <div class="header-left">
              <img src="../../img/heima.png" alt="">
              <h2>黑马后台管理系统</h2>
            </div>
            <div class="header-right">
              <el-button>退出</el-button>
            </div>
        </el-header>
        <el-container class="home-box">
            <!-- 侧边区域 -->
            <el-aside 
             :style="isCollapse?'width:64px':'width:200px' " class="home-aside"
             >
                
                <el-menu
                    default-active="2"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    unique-opened
                    :collapse="isCollapse"
                    router
                >
                    <el-menu-item 
                    @click="folder"
                    class="fold-icon"
                    >|||
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title" class="iconfont icon-yonghu">
                            <i class="iconfont icon-quanxianguanli"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/users" class="iconfont icon-menu_flgl">用户列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="iconfont icon-quanxianguanli"></i>
                             <span>权限管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/roles" class="iconfont icon-menu_flgl">角色列表</el-menu-item>
                        <el-menu-item index="/rights" class="iconfont icon-menu_flgl">权限列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="iconfont icon-shangpin"></i>
                             <span>商品管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/goods" class="iconfont icon-menu_flgl">商品列表</el-menu-item>
                        <el-menu-item index="/params" class="iconfont icon-menu_flgl">分类参数</el-menu-item>
                        <el-menu-item index="/categories" class="iconfont icon-menu_flgl">商品分类</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="iconfont icon-dingdan"></i>
                            <span>订单管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/orders" class="iconfont icon-menu_flgl">订单列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                       <template slot="title">
                            <i class="iconfont icon-shuju"></i>
                             <span>数据统计</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item index="/reports" class="iconfont icon-menu_flgl">数据报表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="home-main">
                <router-view>

                </router-view>
            </el-main>
        </el-container>
      </el-container> 
    </div>
</template>
<script>
export default {
  name: 'Home',
  data() {
      return {
        isCollapse: false
      }
  },
  methods: {
      handleOpen() {

      },
      handleClose() {

      },
      folder() {
          this.isCollapse = !this.isCollapse
      }
  },
}
</script>
<style scoped>
   .home-contatior {
       height: 100%;
   }
   .home-header {
       display: flex;
       justify-content: space-between;
       width: 100%;
       line-height: 60px;
       background-color: #373d41;
   }
   .header-left {
       display: flex;
       align-items: center;
   }
   .header-left h2 {
      margin-left: 20px;
      color: #fff;
   }
   .home-box {
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: black;
   }
   .home-aside {
       background-color: #545c64;
       height: 100%;
   }
   .fold-icon {
       height: 30px;
       line-height: 30px;
       text-align: center;
       background-color: #333333 !important;
       color: #fff;
       font-size: 12px;
   }
   .home-main {
       background-color: #eeeeee;
       height: 100%;
       
   }
   .el-menu {
       border-right: none;
   }
   .home-aside /deep/.el-submenu__title {
       font-size: 13px;
       margin-right: 2px;
   }
   .iconfont {
       font-size: 13px;
       margin-right: 10px;
   }
</style>