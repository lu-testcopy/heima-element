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
         <el-button type="primary" 
          class="ad-button"
          @click="addRoles">
          添加角色
         </el-button>
         <!-- 列表区域 -->
         <el-table
            :data="rolesData"
            style="width: 100%"
            border>
            <el-table-column 
              type="expand"
              width="50">
              <template slot-scope="scope">
                 <el-row v-for="(item,index) in scope.row.children" 
                 :key="item.id" 
                 :class="['bd-bottom',index === 0? 'bd-top': '']">
                   <!-- 一级权限 -->
                   <el-col :span="5">
                     <el-tag type="success" 
                     closable>
                     {{item.authName}}
                     </el-tag>
                     <i class="el-icon-caret-right"></i>
                   </el-col>
                   <!-- 二级权限及三级权限 -->
                   <el-col :span="19">
                     <el-row  
                     v-for="(item1, index1) in item.children" 
                     :key="item1.id" 
                     :class="[index1 === item.children.length-1?'':'bd-bottom']">
                       <!-- 二级权限 -->
                       <el-col :span="8" >
                          <el-tag  closable>{{item1.authName}}</el-tag>
                          <i class="el-icon-caret-right"></i>
                       </el-col>
                       <!-- 三级权限 -->
                       <el-col :span="16">
                          <el-tag type="warning"  
                          v-for="(item2, index2) in item1.children" 
                          :key="item2.id"
                          closable
                          @close="handleClose(scope.row,item2.id)">
                          {{item2.authName}}
                          </el-tag>
                       </el-col>
                     </el-row>
                   </el-col>
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
              width="371">
            </el-table-column>
            <el-table-column
              property="roleDesc"
              label="角色描述"
              width="384">
            </el-table-column>
            <el-table-column
              label="操作"
              width="382">
              <template slot-scope="scope">
                <!-- 编辑角色 -->
                <el-button 
                  type="primary" 
                  icon="el-icon-edit" 
                  size="mini" 
                  @click="editRoles(scope.row.id)">
                编辑
                </el-button>
                <!-- 删除角色 -->
                <el-button 
                  type="danger" 
                  icon="el-icon-delete" 
                  size="mini"
                  @click="deleteRole(scope.row.id)">
                  删除
                </el-button>
                <el-button 
                  type="warning" 
                  icon="el-icon-setting" 
                  size="mini"
                  @click="setRights(scope.row)">
                  分配权限
                </el-button>
              </template>
            </el-table-column>
         </el-table>
      </el-card>
      <!-- 添加角色弹出的对话框 -->
      <el-dialog
        title="添加角色"
        :visible.sync="addDialogVisible"
        width="70%"
        >
        <el-form 
          :model="addRolesForm" 
          :rules="addRolesRules" 
          ref="addRolesRuleForm" 
          label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="addRolesForm.roleName"></el-input>
          </el-form-item>
           <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="addRolesForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible= false">取 消</el-button>
          <el-button type="primary" @click="confirmAdd">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑角色弹出的对话框 -->
      <el-dialog
        title="添加角色"
        :visible.sync="editDialogVisible"
        width="70%"
        >
        <el-form 
          :model="editRolesForm" 
          :rules="editRolesRules" 
          ref="editRolesRuleForm" 
          label-width="100px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="editRolesForm.roleName"></el-input>
          </el-form-item>
           <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="editRolesForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible= false">取 消</el-button>
          <el-button type="primary" @click="confirmEdit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除角色弹出的对话框 -->
      <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="50%"
        >
        <span>此操作将永久删除该角色, 是否继续?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confrimDelete">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配权限打开的对话框 -->
      <el-dialog
        title="分配权限"
        :visible.sync="allotDialogVisible"
        width="70%"
        @close="setRightsClose"
        >
        <el-tree
          :data="rightsList"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          default-expand-all
          :default-checked-keys="defKeys"
          v-if="allotDialogVisible"
          check-on-click-node
          ref="rightsKeys"
         >
        </el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="allotDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confrimSetRights">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import { getRolesList, addRoles, editRolesInfo, submitEditRole, removeRole, removeRights, getgetRightsList, allotRights } from '../../../api/rights'
export default {
  name: 'Roles',
  data() {
      return {
        rolesData: [],
        addDialogVisible: false,
        editDialogVisible: false,
        deleteDialogVisible: false,
        allotDialogVisible: false,
        addRolesForm: {
          roleName: '',
          roleDesc: ''
        },
        editRolesForm:{},
        addRolesRules:{
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: '请输入角色的描述', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ]
        },
        roleId: '',
        editRolesRules:{
          roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur' }
          ],
          roleDesc: [
            { required: true, message: '请输入角色的描述', trigger: 'blur' },
            { min: 3, max: 6, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ]
        },
        rightsList: [],
        defaultProps: {
          label: 'authName',
          children: 'children'
        },
        defKeys:[]
      }
  },
  created() {
    this.getRoles()
    this.getRightsList()
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
    },
    // 获取权限的函数
    async getRightsList() {
      const { data } = await getgetRightsList('tree')
      console.log(data);
      this.rightsList = data.data
    },
    // 添加角色执行的函数
    addRoles() {
      this.addDialogVisible = true
    },
    // 确定添加角色执行的函数
    confirmAdd() {
      this.$refs.addRolesRuleForm.validate(async(valite) => {
        // console.log(valite);
        if(valite) {
          const { data } = await addRoles(this.addRolesForm)
          console.log(data);
          if(data.meta.status!==201) {
            return this.$message.error('创建角色失败')
          }
          this.getRoles()
          this.$message.success('创建角色成功')
          this.addDialogVisible = false
        }
      })
    },
    // 点击编辑按钮，获取需要编辑角色的资料
    async editRoles(roleId) {
      this.editDialogVisible = true
      // console.log(roleId);
      const { data } = await editRolesInfo(roleId)
      // console.log(data);
      if(data.meta.status!==200) {
        return this.$message.error('获取角色资料失败')
      }
      this.editRolesForm = data.data
      this.roleId = data.data.roleId
    },
    // 提交角色信息
    confirmEdit() {
       this.$refs.editRolesRuleForm.validate(async(valite) =>{
         console.log(valite)
         if(valite) {
           const { data } = await submitEditRole(this.roleId,this.editRolesForm)
          //  console.log(data);
           if(data.meta.status !== 200) {
             return this.$message.error('编辑角色失败')
           }
           this.$message.success('编辑角色成功')
           this.getRoles()
           this.editDialogVisible = false
         }
       })
    },
    // 删除角色
    deleteRole(roleId) {
      this.deleteDialogVisible = true
      this.roleId = roleId
    },
    // 确定删除角色
    async confrimDelete() {
       console.log(this.roleId);
       const {data} = await removeRole(this.roleId)
       console.log(data);
       if(data.meta.status !== 200) {
         return this.$message.error('删除角色失败')
       }
       this.$message.success('删除角色成功')
    },
    async handleClose(row,rightId) {
      console.log(row);
      console.log(rightId);
      const { data } = await removeRights(row.id, rightId)
      console.log(data)
      if(data.meta.status !== 200) {
        return this.$message.error('取消权限失败')
      }
      // this.$message.success('取消权限成功')
      row.children = data.data
    },
    // 点击分配权限按钮执行的函数
    setRights(row) {
      this.roleId = row.id
      console.log(this.roleId);
      // 选取三级id
       console.log(row);
      // 一级权限的数组
      const children1 = row.children
      if(children1.length !== 0) {
        children1.forEach((item) => {
          if(item.children) {
            item.children.forEach((item1) =>{
              if(item1.children) {
                item1.children.forEach((item2) => {
                  this.defKeys.push(item2.id)
                })
              }
            })
          }
        })
      }
      this.allotDialogVisible = true
    },
    setRightsClose() {
      this.defKeys = []
    },
    async confrimSetRights() {
      // 选中三级权限的id
      const keys1 = this.$refs.rightsKeys.getCheckedKeys()
      // 选中一级及二级那些半选中的id
      const keys2 = this.$refs.rightsKeys.getHalfCheckedKeys()
      // 将所有的id合并成一个数组
      const allKeys = [...keys1,...keys2]
      // 将allkeys变成一个字符串需要传给后端
      const idStr = allKeys.join(',')
      console.log(idStr);
      const { data } = await allotRights(this.roleId, {rids: idStr})
      console.log(data)
      this.getRoles()
      this.allotDialogVisible = false
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