<template>
    <div class="roles-contatior">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card class="roles-card">
         <el-button type="primary" class="ad-button">添加角色</el-button>
         <!-- 列表区域 -->
         <el-table
            :data="rolesData"
            style="width: 100%"
            border>
            <el-table-column 
              type="expand"
              width="50">
              <template slot-scope="scope">
                 <el-row v-for="(item,index) in scope.row.children" :key="item.id" :class="['bd-bottom',index === 0? 'bd-top': '']">
                   <!-- 一级权限 -->
                   <el-col :span="5">
                     <el-tag type="success">{{item.authName}}</el-tag>
                   </el-col>
                   <!-- 二级权限 -->
                   <el-col :span="19"></el-col>
                 </el-row>
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              property="roleName"
              label="角色名称"
              width="384">
            </el-table-column>
            <el-table-column
              property="roleDesc"
              label="角色描述"
              width="384">
            </el-table-column>
            <el-table-column
              label="操作"
              width="385">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
              </template>
            </el-table-column>
         </el-table>
      </el-card>
    </div>
</template>
<script>
import { getRolesList } from '../../../api/rights'
export default {
  name: 'Roles',
  data() {
      return {
        rolesData: []
      }
  },
  created() {
    this.getRoles()
  },
  methods: {
    // 获取角色列表的函数
    async getRoles() {
      const { data } = await getRolesList()
      console.log(data);
      if(data.meta === 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesData = data.data
    }
  },
}
</script>
<style scoped>
   .roles-card {
       margin-top: 10px;
   }
   .ad-button {
     margin-bottom: 10px;
   }
   .el-tag {
     margin: 7px;
   }
   .bd-bottom {
     border-bottom: 1px solid #ccc;
   }
   .bd-top {
     border-top: 1px solid #ccc;
   }
</style>