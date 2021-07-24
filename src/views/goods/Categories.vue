<template>
    <div class="categories">
       <!--面包屑导航  -->
       <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card>
        <el-row>
          <el-button type="primary" @click="addCategories">添加分类</el-button>
        </el-row>
        <!-- 表个区域 -->
        <el-table
          :data="CategoriesList"
          row-key="cat_id"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
            type="index"
            label="#"
            width="50">
          </el-table-column>
          <el-table-column
            prop="cat_name"
            label="商品名称"
            width="297">
          </el-table-column>
          <el-table-column
            label="是否有效"
            width="297">
            <template slot-scope="scope">
               <i class="el-icon-success" :style="{color: 'green'}" v-if="scope.row.cat_deleted === false"></i>
               <i class="el-icon-error" :style="{color: 'red'}" v-else></i>
            </template>
          </el-table-column>
          <el-table-column
            label="排序"
            width="297">
            <template slot-scope="scope">
               <el-button  type="success" size="mini" v-if="scope.row.cat_level === 0">一级</el-button>
               <el-button  type="primary" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-button>
               <el-button  type="warning" size="mini" v-else>三级</el-button>
            </template>
          </el-table-column>
          <el-table-column
              label="操作"
              width="296">
            <template slot-scope="scope">
               <el-button type="primary" icon="el-icon-edit" size="mini" @click="edieCategory(scope.row)">编辑</el-button>
               <el-button type="danger"  icon="el-icon-delete" size="mini"
               @click="deleteCategory(scope.row)">删除</el-button>
            </template> 
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="pagenum"
         :page-sizes="[5, 10, 15, 20]"
         :page-size="10"
         layout="total, sizes, prev, pager, next, jumper"
         :total="total">
        </el-pagination>
      </el-card>
      <!-- 添加分类的对话框 -->
      <el-dialog
        title="添加商品分类"
        :visible.sync="addDialogVisible"
        width="70%"
        >
        <el-form :model="addCategoriesForm" :rules="addCategoriesRules" ref="addCategoriesRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="addCategoriesForm.name"></el-input>
          </el-form-item>
        </el-form>
        <el-row class="father-category">
           <span>父级分类</span>
           <el-cascader
            :options="twoLevel"
            :props="prop"
            clearable
            @change="handleChange">
           </el-cascader>
        </el-row>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confrimAdd">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑分类的对话框 -->
      <el-dialog
       title="修改分类"
       :visible.sync="editDialogVisible"
       width="70%"
       >
       <el-form :model="editCategoriesForm" :rules="editCategoriesRules" ref="addCategoriesRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="分类名称" prop="cat_name">
            <el-input v-model="editCategoriesForm.cat_name"></el-input>
          </el-form-item>
        </el-form>
       <span slot="footer" class="dialog-footer">
         <el-button @click="editDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="confrimEdit">确 定</el-button>
       </span>
      </el-dialog>
    </div>
</template>
<script>
import { getGoodsSorts, addGoodsCategory, inquireCategory, submitEditCategory,removeCategory  } from '../../../api/goods'
export default {
  name: 'Categories',
  data() {
      return {
        CategoriesList: [],
        twoLevel: [],
        pagenum: 1,
        pagesize: 10,
        total: 0,
        addDialogVisible: false,
        editDialogVisible: false,
        addCategoriesForm: {
          name: ''
        },
        addCategoriesRules:{
          name: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        catId: '',
        editCategoriesForm: {},
        editCategoriesRules: {
          cat_name: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        prop: {
          expandTrigger: ' hover',
          value: 'cat_id',
          label: 'cat_name',
          children: 'children',
          checkStrictly: true
        },
        idStr: '',
        catLevel: 0
      }
  },
  computed:{
   
  },
  created() {
    this.getCategoriesList()
  },
  methods: {
    //   获取分类列表
    async getCategoriesList () {
      const {data} = await getGoodsSorts ({pagenum: this.pagenum, pagesize: this.pagesize})
      console.log(data);
      this.total = data.data.total
      this.CategoriesList = data.data.result
    },
    handleSizeChange(pagesize) {
      this.pagesize = pagesize
      this.getCategoriesList()
    },
    handleCurrentChange(pagenum) {
      this.pagenum = pagenum
      this.getCategoriesList()
    },
    async addCategories() {
      this.addDialogVisible = true
      const {data} = await getGoodsSorts ({type: 2})
      console.log(data);
      this.twoLevel = data.data
    },
    handleChange(id) {
      console.log(id);
      console.log(id.length);
      if(id.length === 0) {
        this.catLevel = 0
      } else if (id.length === 1) {
        this.catLevel = 1
      } else {
        this.catLevel = 2
      }
      id.forEach((item) => {
          this.idStr += item
      })
    },
    confrimAdd() {
      this.$refs.addCategoriesRef.validate(async (valite) => {
          if(valite) {
            //如果验证通过发起网络请求
            const { data } = await addGoodsCategory({
               cat_pid: this.idStr ? this.idStr : '0',
               cat_name: this.addCategoriesForm.name,
               cat_level: this.catLevel
            })
            console.log( data );
            if(data.meta.status !== 201) {
                this.addDialogVisible = false
                return this.$message.error('创建商品分类失败')
            }
            this.$message.success('创建商品分类成功')
            this.addCategoriesForm.name = ''
            this.getCategoriesList()
            this.addDialogVisible = false
          }
      })
    },
    async edieCategory(row) {
      this.editDialogVisible = true
      this.catId = row.cat_id
      const { data } = await inquireCategory(this.catId)
      console.log(data);
      this.editCategoriesForm = data.data
    },
    // 确定修改分类执行的函数
    confrimEdit() {
      this.$refs.addCategoriesRef.validate(async(valite) => {
        if(valite) {
          const { data } = await submitEditCategory(this.catId, {cat_name: this.editCategoriesForm.cat_name})
          console.log(data);
          if(data.meta.status !== 200) {
            this.editDialogVisible = false
            return this.$message.error('修改分类失败')
          }
          this.$message.success('修改分类成功')
          this.editDialogVisible = false
          this.getCategoriesList()
        }
      })
    },
    deleteCategory(row) {
      this.catId = row.cat_id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发起网络请求
          const  {data } = await removeCategory(this.catId)
          console.log(data);
          if(data.meta.status !== 200) {
           return this.$message.error('删除分类失败')
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getCategoriesList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
    }
  },  
}
</script>
<style scoped>
   .el-card {
     margin-top: 10px;
   }
   .el-table {
      margin-top: 20px;
   }
   .el-pagination {
      margin-top: 15px;
   }
   .father-category {
     margin-left: 29px;
   }
   .father-category span {
       margin-right: 15px;
   }
</style>