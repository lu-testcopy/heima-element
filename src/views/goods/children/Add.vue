<template>
    <div class="add-container">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card>
        <el-alert
          title="添加商品信息"
          type="info"
          show-icon
          center>
        </el-alert>
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <el-form ref="goodsformRef" :model="goodsForm" label-width="80px" :rules="goodsRules" label-position="top">
            <el-tabs tab-position="left" v-model="activeName" :before-leave="beforeLeave" @tab-click="tabClick">
            <el-tab-pane label="基本信息" name="0">
              <el-form-item label="商品名称" prop="goods_name">
                <el-input v-model="goodsForm.goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="goods_price">
                <el-input v-model="goodsForm.goods_price"></el-input>
              </el-form-item>
              <el-form-item label="商品重量" prop="goods_weight">
                <el-input v-model="goodsForm.goods_weight"></el-input>
              </el-form-item>
              <el-form-item label="商品数量" prop="goods_number">
                <el-input v-model="goodsForm.goods_number"></el-input>
              </el-form-item>
              <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader
                v-model="goodsForm.goods_cat"
                  :options="goodsCategories"
                  :props="catProps"
                  @change="handleChange"
                  ref="catRef">
                </el-cascader>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
              <el-form-item :label="item.attr_name" v-for="(item,index) in tabsManyData" :key="index">
                 <el-checkbox-group v-model="item.attr_vals">
                   <el-checkbox :label="item1" v-for="(item1,index1) in item.attr_vals" :key="index1" border></el-checkbox>
                 </el-checkbox-group>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
              <el-form-item 
              :label="item.attr_name" 
              v-for="(item,index) in tabOnlyData" 
              :key="index">
              <el-input v-model="item.attr_vals"></el-input>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
              <el-upload
                action="http://127.0.0.1:8888/api/private/v1/upload"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                list-type="picture"
                :headers ="headerObj">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
              <!-- 富文本编辑器 -->
              <quill-editor v-model="goodsForm.goods_introduce"></quill-editor>
              <el-button type="primary" class="addBtn" @click="confrimAdd">确定添加</el-button>
            </el-tab-pane>
            </el-tabs>
        </el-form>
      </el-card>
    </div>
</template>
<script>
import { getGoodsSorts,getCategories,addGoods } from '../../../../api/goods'
import _ from 'lodash'
export default {
  name: 'Add',
  data() {
      return {
        activeName: '0',
        goodsForm: {
          goods_name: '',
          goods_price: '',
          goods_weight: '',
          goods_number: '',
          goods_cat: [],
          pics: [],
          goods_introduce: '',
          attrs: []
        },
        goodsRules: {
          goods_name: [
            {required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          goods_price: [
            {required: true, message: '请输入商品价格', trigger: 'blur' }
          ],
          goods_weight: [
            {required: true, message: '请输入商品重量', trigger: 'blur' }
          ],
          goods_number: [
            {required: true, message: '请输入商品数量', trigger: 'blur' }
          ]
        },
        catProps: {
          expandTrigger: 'hover',
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        goodsCategories: [],
        tabsManyData: [],
        tabOnlyData: [],
        headerObj: {
          Authorization:  window.localStorage.getItem('cookie')
        }
      }
  },
  created() {
    this.getGoodsCategories()
  },
  computed: {
    active() {
      return this.activeName - 0
    },
    idStr() {
      var id = ''
      if(this.goodsForm.goods_cat.length === 3) {
         this.goodsForm.goods_cat.forEach((item) => {
           id += item
         })
      }
      return id
    }
  },
  methods: {
    async getGoodsCategories() {
      const { data } = await getGoodsSorts()
      console.log(data);
      if(data.meta.status !== 200) {
        return this.$message.error('获取商品分类列表失败')
      }
      this.$message.success('获取商品分类成功')
      this.goodsCategories = data.data
    },
    handleChange(id) {
      if(id.length !== 3) {
         this.goodsForm.goods_cat = []
         return this.$message.warning('请选择三级分类')
      }
    },
    beforeLeave(activeName, oldActiveName) {
      console.log(activeName, oldActiveName);
      if(this.goodsForm.goods_cat.length !== 3) {
        this.$message.error('请选择商品分类')
        return false
      }
    },
    async getGoodsParams(idStr, sel) {
       const { data } = await getCategories(idStr, sel)
        // console.log(data);
        // console.log(data.data);
        // this.tabsManyData = data.data
    },
     async tabClick() {
      console.log(this.active);
      if(this.active === 1) {
        const { data } = await getCategories(this.idStr, 'many')
        this.tabsManyData = data.data
        this.tabsManyData.forEach((item) => {
            if(item.attr_vals.length !== 0) {  
                item.attr_vals = item.attr_vals.split(',')
            } else {
                item.attr_vals = []
            }
        })
      }else if(this.active === 2) {
      //  await this.getGoodsParams(this.idStr, 'only')
         const { data } = await getCategories(this.idStr, 'only')
         this.tabOnlyData = data.data
      } else if(this.active === 3) {

      }
     },
    //  添加图片的钩子
     handleSuccess(response,file) {
       console.log(response)
      // 1.当我们上传图片成功时
      const pics = {}
      pics.pic = response.data.tmp_path
      this.goodsForm.pics.push(pics)
     },
    //  预览图片的钩子
     handlePreview() {

     },
    //  删除图片的钩子
     handleRemove(response) {
      // 删除的图片的临时路径
      const file = response.response.data.tmp_path
      console.log(file);
      const index = this.goodsForm.pics.findIndex((item) => {
        return item.pic = file
      })
      this.goodsForm.pics.splice(index,1)
     },
      confrimAdd() {
       this.$refs.goodsformRef.validate(async(valite) => {
         if(valite) {
           console.log(1);
          const from = _.cloneDeep(this.goodsForm)
          // 将三级分类的商品Id从数组变成字符串
          from.goods_cat = from.goods_cat.join(',')
          console.log(from);
          // 将商品的动态参数变成数组
          this.tabsManyData.forEach((item) => {
            const attrObj = {attr_id: item.attr_id, attr_value: item.attr_vals}
            this.goodsForm.attrs.push(attrObj)
            console.log(this.goodsForm.attrs);
          })
           this.tabOnlyData.forEach((item) => {
            const attrObj = {attr_id: item.attr_id, attr_value: item.attr_vals}
            this.goodsForm.attrs.push(attrObj)
          })
          // const A =JSON.parse(JSON.stringify(this.goodsForm.attrs))
          
          from.attrs = this.goodsForm.attrs
          // 发起网络请求
          const { data } = await addGoods(from)
          console.log(data)
          if(data.meta.status === 201) {
            this.$message.success('创建商品成功')
            this.$router.push('/goods')
          } else {
            this.$message.error(data.meta.msg)
          }
         }
       })
      }
    },
}
</script>
<style scoped>
   .el-card {
       margin-top: 10px;
   }
   .el-steps {
      margin-top: 15px;
      margin-bottom: 15px;
      margin-left: 50px;
   }
   .addBtn {
     margin-top: 10px;
   }
</style>