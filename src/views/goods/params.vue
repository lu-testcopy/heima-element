<template>
    <div class="params-contation">
         <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>参数列表</el-breadcrumb-item>
      </el-breadcrumb>  
      <!-- 卡片区域 -->
      <el-card class="params-card">
        <el-alert
          title="注意：只允许为第三级分类设置相关参数！"
          type="warning"
          effect="dark"
          show-icon>
        </el-alert>
        <el-row class="select-sort">
          <el-col>
             <span>选择商品分类:</span>
            <el-cascader
              v-model="value"
              :options="categoriesList"
              @change="handleChange"
              :props="defProps"
              clearable
              ref="categoriesCascader">
            </el-cascader>
          </el-col>
        </el-row>
        <!-- tab栏 -->
        <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="静态属性" name="only">
             <params-children :paramsList="paramsList" :activeName="activeName" :idStr="idStr" v-if="activeName === 'only'"></params-children>
          </el-tab-pane>
          <el-tab-pane label="动态参数" name="many">
             <params-children :paramsList="paramsList" :activeName="activeName" :idStr="idStr" v-if="activeName === 'many'"></params-children>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>
<script>
import { getGoodsSorts, getCategories } from '../../../api/goods'
const ParamsChildren = () => import('./children/paramsChildren.vue')
export default {
  name: 'Params',
  components: {
    ParamsChildren 
  },
  data() {
      return {
        value: [],
        categoriesList: [],
        defProps: {
          label: 'cat_name',
          children: 'children',
          value: 'cat_id',
          expandTrigger: 'hover' 
        },
        activeName: 'only',
        paramsList: [],
        idStr: ''
      }
  },
  created() {
     this.getCategoriesList()
  },
  methods: {
     async getCategoriesList() {
         const { data } = await getGoodsSorts()
         console.log(data);
         this.categoriesList = data.data
        //  将分类参数中的字符串变成数组
         
     },
     async handleChange() {
       console.log(this.value);
      //  如果选中的不是三级分类
       if(this.value.length < 3) {
         this.value = []
         return this.$message.warning('请选择三级分类')
       }
       this.idStr = ''
       this.value.forEach(item => {
        console.log(item);
        this.idStr = this.idStr + item
       });
       this.getCategoriesInfo()
      },
     async handleClick() {
       this.getCategoriesInfo()
     },
     async getCategoriesInfo() {
       const { data } = await getCategories(this.idStr, this.activeName)
       console.log( data );
        data.data.forEach((item) => {
          if(item.attr_vals) {
            item.attr_vals = item.attr_vals.split(",")
          } else{
            item.attr_vals = []
          }
          item.inputVisible = false
          item.inputValue = ''
         })
       this.paramsList = data.data
     }
  },
}
</script>
<style scoped>
   .params-card {
       margin-top: 20px;
   }
   .select-sort {
       margin-top: 15px;
       margin-bottom: 15px;
   }
   .el-cascader {
       margin-left: 10px;
   }
</style>