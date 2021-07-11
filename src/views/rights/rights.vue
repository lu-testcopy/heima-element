<template>
    <div>
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 列表组件 -->
      <el-card class="rights-card">
        <el-table
            :data="rightsData"
            style="width: 100%"
            border
            stripe>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
                property="authName"
                label="权限名称"
                width="400">
          </el-table-column>
          <el-table-column
                property="path"
                label="路径"
                width="398">
          </el-table-column>
           <el-table-column
                label="权限等级"
                width="388">
             <template slot-scope="scope">
                <el-button type="primary" size="mini" v-if="scope.row.level==='0'">一级</el-button>
                <el-button type="success" size="mini" v-else-if="scope.row.level==='1'">二级</el-button>
                <el-button type="warning" size="mini" v-else>三级</el-button>
             </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
</template>
<script>
import { getgetRightsList } from '../../../api/rights'
export default {
  name: 'Rights',
  data() {
      return {
        rightsData: [] 
      }
  },
  created() {
     this.getRights()
  },
  methods: {
    async getRights() {
        const { data } = await getgetRightsList('list')
        console.log(data);
        this.rightsData = data.data
    }
  },
}
</script>
<style scoped>
   .rights-card {
       margin-top: 10px;
   }
</style>