<template>
    <div class="users-contation">
       <!-- 头部面包屑导航 -->
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 添加用户区域 -->
      <el-card class="box-card"> 
        <div class="addUser">
            <el-input v-model="input"  placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search" ></el-button>
            </el-input>
            <el-button type="primary" class="add-button" @click="AddDialogVisible = true">添加用户</el-button>
        </div>
        <!-- table表格 -->
        <el-table
        :data="userData"
        style="width: 100%"
        border
        >
            <el-table-column
            type="index">
            </el-table-column>
            <el-table-column
                prop="username"
                label="姓名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="email"
                label="邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                width="220">
            </el-table-column>
            <el-table-column
                prop="role_name"
                label="角色"
                width="206">
            </el-table-column>
            <el-table-column
                label="状态"
                width="210">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.mg_state"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="210">
                <template slot-scope="scope">
                    <!-- 编辑按钮 -->
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row.id)"></el-button>
                    <!-- 删除按钮 -->
                    <el-button type="warning" icon="el-icon-delete"  size="mini" @click="deleteUser((scope.row.id))"></el-button>
                    <el-button type="danger" icon="el-icon-s-tools" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            class="pagination"
            >
        </el-pagination>
      </el-card>
      <!-- 添加用户显示的对话框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="AddDialogVisible"
        width="50%">
        <!-- 添加用户的表单 -->
        <el-form :model="addUserForm"  :rules="addUserRules" ref="addUserFormRef"  label-width="70px">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="addUserForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="addUserForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="addUserForm.email"></el-input>
            </el-form-item>
             <el-form-item label="电话" prop="mobile">
                <el-input v-model="addUserForm.mobile"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="AddDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑用户的对话框 -->
      <el-dialog
        title="编辑用户"
        :visible.sync="editDialogVisible"
        width="50%">
          <el-form :model="editUserForm"  :rules="editUserRules" ref="editUserFormRef"  label-width="70px">
            <el-form-item label="用户名">
                <el-input type="text" v-model="editUserForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="editUserForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="mobile">
                <el-input type="text" v-model="editUserForm.mobile"></el-input>
            </el-form-item>
          </el-form>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmEdit(userId)">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除用户的会话框 -->
      <el-dialog
        title="提示"
        :visible.sync="deleteDialogVisible"
        width="50%">
        <i class="el-icon-warning" :style="{color:'yellow',width:'20px'}"></i>
        <span>此操作将永久删除该用户, 是否继续?</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="deleteDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click=" confrimDelete()">确 定</el-button>
        </span>
     </el-dialog>
    </div>
</template>
<script>
import { getUser,addUserInfo,getEditUserInfo,submitEditInfo,removeUser } from '../../../api/users'
export default {
    name: 'Users',
    data() {
        return {
           input: '',
           userData: [],
           total: 0,
           pageSize: 1,
           pageNum:1,
           userId: '',
           AddDialogVisible: false,
           editDialogVisible: false,
           deleteDialogVisible: false,
          //新增的用户信息
           addUserForm: {
               username: '',
               password: '',
               email: '',
               mobile: ''
           },
           editUserForm: {},
         //新增用户表单信息的规则
           addUserRules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 5, max: 10, message: '长度在 5 到 10个字符', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } 
            ],
            mobile: [
                {required: true, message: '请输入电话', trigger: 'blur' }
            ]
           },
           editUserRules: {
             email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] } 
            ],
             mobile: [
                 {required: true, message: '请输入电话', trigger: 'blur' }
             ] 
           }
        }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      async getUserInfo() {
          const { data } = await getUser({pagenum:this.pageNum, pagesize:this.pageSize})
          console.log(data);
          this.userData = data.data.users
          this.total = data.data.total
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.getUserInfo()
      },
      handleCurrentChange(pagenum) {
        this.pageNum = pagenum
        this.getUserInfo()
      },
    //   点击对话框确定按钮添加用户执行的函数
      addUser() {
        // 先对表单进行验证
        this.$refs.addUserFormRef.validate(async (valite) => {
            console.log(valite);
            if(valite) {
              const { data }= await addUserInfo(this.addUserForm)
              if(data.meta.status !== 201) {
                  this.$message.error('创建用户失败')
                  this.AddDialogVisible = false
              } else {
                  this.$message.success('创建用户成功')
                  this.getUserInfo()
                  this.AddDialogVisible = false
                  this.$refs.addUserFormRef.resetFields()
              }
            }
        })
      },
    //   编辑用户执行的函数
      async editUser(id) {
        this.editDialogVisible = true
        const { data } = await getEditUserInfo(id)
        console.log(data)
        // console.log(data.data);
        if(data.meta.status === 200) {
            console.log(data.data);
            this.editUserForm = data.data
            this.userId = data.data.id
        }
      },
    // 确定修改用户执行的函数
      async confirmEdit(userId) {
        const editInfo = {}
        editInfo.id = userId
        editInfo.email = this.editUserForm.email
        editInfo.mobile = this.editUserForm.mobile
        const { data } = await submitEditInfo(userId, editInfo)
        console.log(data);
        if(data.meta.status === 200) {
            this.getUserInfo()
            this.$message.success('用户修改成功')
            this.editDialogVisible = false
        }
      },
    //点击删除用户按钮，打开删除绘话框
      deleteUser(userId) {
        this.deleteDialogVisible = true
        this.userId = userId
      },
      async confrimDelete() {
        const {data} = await removeUser(this.userId)
        console.log(data);
        if(data.meta.status === 200) {
            this.$message.success('删除用户成功')
            this.deleteDialogVisible = false
            await this.getUserInfo()
            // 如果
            if(this.userData.length === 0) {
                console.log(1);
                this.pageNum = this.pageNum - 1
                console.log(this.pageNum);
                this.getUserInfo()
            } else {
                return
            }
        }
      }
    },
}
</script>
<style scoped>
  .box-card {
      margin-top: 15px;
  }
  .addUser {
    margin: 10px 0 ;
  }
  .box-card .el-input {
      width: 400px;
  }
  .addUser .add-button {
      margin-left: 20px;
  }
  .pagination {
      margin-top: 10px;
  }
</style>