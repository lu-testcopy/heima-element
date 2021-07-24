<template>
    <div>
       <el-button type="primary" @click="addParams">{{activeName==='only'?'添加属性':'添加参数'}}</el-button> 
       <!-- 表单 -->
       <el-table
        :data="paramsList"
        style="width: 100%" 
        border>
         <el-table-column 
           type="expand"
           width="50"
         >
         <template slot-scope="scope">
            <el-tag type="success" v-for="(item, index) in scope.row.attr_vals" :key="index"   closable>{{item}}</el-tag>
            <!-- 新增的tag标签 -->
            <el-input
              class="input-new-tag"
              v-if="scope.row.inputVisible"
              v-model="scope.row.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm(scope.row)"
              @blur="handleInputConfirm(scope.row)"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+ New Tag</el-button>
         </template>
         </el-table-column>
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
          <el-table-column
            prop="attr_name"
            :label="activeName==='only'?'属性名称':'参数名称'"
            width="561">
         </el-table-column>
         <el-table-column
            label="操作"
            width="561">
            <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="editParams(scope.row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            </template>
         </el-table-column>
       </el-table>
       <!-- 添加属性的会话框 -->
       <el-dialog
        title="添加参数"
        :visible.sync="addDialogVisible"
        width="70%"
        >
        <el-form :model="addForm" :rules="addRules" ref="addFormRef" label-width="100px">
            <el-form-item :label="activeName==='only'?'属性名称':'参数名称'" prop="params">
                <el-input v-model="addForm.params"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confrimAdd">确 定</el-button>
        </span>
       </el-dialog>
       <!-- 修改属性的会话框 -->
       <el-dialog
        title="修改参数"
        :visible.sync="editDialogVisible"
        width="70%"
        v-if="editDialogVisible"
        >
        <el-form :model="editForm" :rules="editRules" ref="editFormRef" label-width="100px">
            <el-form-item :label="activeName==='only'?'属性名称':'参数名称'" prop="attr_name">
                <el-input v-model="editForm.attr_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confrimedit">确 定</el-button>
        </span>
       </el-dialog>
    </div>
</template>
<script>
import { addGoodsParams, inquireParams,editParamsInfo  } from '../../../../api/goods'
export default {
  name: 'paramsChildren',
  props: {
    paramsList: {
        require: true,
        default: []
    },
    activeName: {
        require: true,
        default: ''
    },
    idStr: {
        default: ''
    }
  },
  data() {
      return {
        addDialogVisible: false,
        editDialogVisible: false,
        attrId: '',
        addForm: {
           params: ''
        },
        addRules: {
          params: [
              { required: true, message: '参数名称不能为空', trigger: 'blur' },
          ]
        },
        editForm: {

        },
        editRules:{
          attr_name: [
            { required: true, message: '参数名称不能为空', trigger: 'blur' },
          ]
        }
      }
  },
  methods: {
    addParams() {
      this.addDialogVisible = true
    },
    confrimAdd() {
    //   将表单进行验证
    this.$refs.addFormRef.validate(async (valite) => {
        if(valite) {
            // 如果验证通过发起网络请求
            const { data } = await addGoodsParams({id: this.idStr, attr_name: this.addForm.params,attr_sel:this.activeName,attr_vals: ''})
            console.log(data);
            this.paramsList.push(data.data)
            this.addDialogVisible = false
        }
    })
    },
    // 修改参数
    async editParams(row) {
      this.editDialogVisible = true
      this.attrId = row.attr_id
      console.log(this.attrId);
      const { data } = await inquireParams(this.idStr, row.attr_id, {attr_sel: this.activeName, attr_vals: ''})
      this.editForm = data.data
      console.log(this.editForm);
    },
    // 确定修改参数
    confrimedit() {
      this.$refs.editFormRef.validate(async(valite) => {
        if(valite) {
          // 发起编辑的网络请求
          const { data } = await editParamsInfo(this.idStr, this.attrId,this.editForm)
          console.log(data);
          if(data.meta.status !== 200) {
            this.editDialogVisible = false
            return this.$message('编辑参数失败')
          }
          // 找到更改了的资料的索引
          let index = this.paramsList.findIndex(item => {
            return item.attr_id === this.attrId
          })
          // 删除这个元素，将新的值把它代替
          this.paramsList.splice(index, 1, data.data)
          this.$message.success('编辑参数成功')
          this.editDialogVisible = false
        }
      })
    },
    // 添加每个参数下的属性执行的函数
    async handleInputConfirm(row) {
      // 1.将输入的值添加到每个item项中的attr_vals中
      row.attr_vals.push(row.inputValue)
      // 修改成功后发送网络请求
       const { data } = await inquireParams(this.idStr, row.attr_id, {attr_name:row.attr_name,attr_sel: this.activeName, attr_vals: row.attr_vals.join('')})
       console.log(data);
       if(data.meta.status !== 200) {
         return this.$message.error('添加属性失败')
       }
       this.$message.success('添加属性成功')
       row.inputValue = ''
       row.inputVisible = false
    },
    showInput(row) {
       row.inputVisible = true
       this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
    }
  },
}
</script>
<style scoped>
   .el-button {
       margin-bottom: 10px;
   }
   .el-tag {
     margin-right: 10px;
   }
   .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
   }
</style>