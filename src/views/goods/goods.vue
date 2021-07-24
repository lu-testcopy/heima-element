<template>
    <div class="goods-contation">
        <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card class="goods-card">
         <div class="addGoods">
            <el-input v-model="input"  placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-search"  @click="getGoodsList"></el-button>
            </el-input>
            <el-button type="primary" class="add-button" @click="addPush">添加商品</el-button>
         </div>
         <!-- 表格区域 -->
        <el-table
          :data="goodsList"
            style="width: 100%"
            border>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="商品名称"
            width="700">
          </el-table-column>
          <el-table-column
            prop="goods_price"
            label="商品价格"
            width="100">
          </el-table-column>
          <el-table-column
            prop="goods_weight"
            label="商品重量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="upd_time"
            label="创建时间"
            width="150">
         </el-table-column>
         <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <!-- 编辑商品的按钮 -->
               <el-button type="primary" icon="el-icon-edit" size="mini" @click="editGoods(scope.row)"></el-button>
               <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
         </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 15, 20, 25]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="goods-pagination">
        </el-pagination>
      </el-card>
    </div>
</template>
<script>
import { getGoodsData,inquireGoodsInfo } from '../../../api/goods'
export default {
    name: 'Goods',
    created() {
      this.getGoodsList()  
    },
    data() {
        return {
          input: '',
          goodsList: [],
          total: 0,
          pageNum: 1,
          pageSize: 20,
          goodId: ''
        }
    }, 
    methods: {
      async getGoodsList() {
         const{ data } = await getGoodsData({query:this.input, pagenum: this.pageNum, pagesize: this.pageSize})
         console.log(data);
         this.goodsList = data.data.goods
         this.total = data.data.total
      },
      // 当我们改变了每页的所显示的条目数，执行的函数
      handleSizeChange(pageSize) {
        // console.log(pageSize);
        this.pageSize = pageSize
        this.getGoodsList()  
      },
      handleCurrentChange(pageNum) {
        // console.log(pageNum);
        this.pageNum = pageNum
        this.getGoodsList()  
      },
      async editGoods(row) {
         console.log(row.goods_id);
         this.goodId = row.goods_id
        //  获取单个商品的详细信息
         const { data } = await inquireGoodsInfo(this.goodId)
         console.log(data);
      },
      addPush() {
        this.$router.push('/goods/add')
      }
    },
}
</script>
<style scoped>
  .goods-card {
      margin-top: 10px;
  }
  .addGoods {
      margin: 10px 0 ;
  }
  .goods-card .el-input {
      width: 400px;
  }
  .addGoods .add-button {
      margin-left: 20px;
  }
  .goods-pagination {
      margin-top: 20px;
  }
</style>