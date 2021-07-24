<template>
    <div class="order-container">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 卡片区域 -->
      <el-card>
        <!-- input输入框 -->
        <el-row>
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="inputValue" type="text">
                <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <!-- 列表区域 -->
        <el-table
          :data="orderList"
          style="width: 100%"
          border>
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="order_number"
            label="订单编号"
            width="300">
          </el-table-column>
          <el-table-column
            property="order_price"
            label="订单价格"
            width="200">
          </el-table-column>
          <el-table-column
            label="是否付款"
            width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="success" v-if="scope.row.pay_status === '1'">已付款</el-button>
              <el-button size="mini" type="danger" v-else>未付款</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="是否发货"
            width="200">
            <template slot-scope="scope">
              {{scope.row.is_send}}
            </template>
          </el-table-column>
          <el-table-column
            property="update_time"
            label="下单时间"
            width="150">
          </el-table-column>
          <el-table-column
            label="操作"
            width="136">
            <template slot-scope="scope">
                <!-- 编辑按钮 -->
               <el-button type="primary" size="mini" icon="el-icon-edit"></el-button>
               <!-- 获取定位按钮 -->
               <el-button type="success" size="mini" icon="el-icon-s-promotion" @click="showLogistics"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页列表 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagenum"
          :page-sizes="[8, 10, 13, 15]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
      <!-- 查看物流信息的对话框 -->
      <el-dialog
        title="物流信息"
        :visible.sync="dialogVisible"
        width="70%">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
import { getOrderList,showInfo } from '../../../api/order'
export default {
    name: 'Order',
    data() {
        return {
          inputValue: '',
          pagenum: 1,
          pagesize: 10,
          total: 0,
          orderList: [],
          dialogVisible: false
        }
    },
    created() {
      this.getOrders({query:this.inputValue, pagenum: this.pagenum, pagesize: this.pagesize})
    },
    methods: {
      async getOrders(params) {
        const { data } = await getOrderList(params)
        console.log(data);
        this.orderList = data.data.goods
        this.total = data.data.total
      },
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        this.getOrders({query:this.inputValue, pagenum: this.pagenum, pagesize: this.pagesize})
      },
      handleCurrentChange(pagenum) {
        this.pagenum = pagenum
        this.getOrders({query:this.inputValue, pagenum: this.pagenum, pagesize: this.pagesize})
      },
      // 搜索订单  
      onSearch() {
        if(!this.inputValue.trim()) {
            return this.$message.warning('请输入搜索内容')
        }
         this.getOrders({query:this.inputValue, pagenum: this.pagenum, pagesize: this.pagesize})
      },
      async showLogistics() {
        this.dialogVisible = true
        const { data } = await showInfo()
        console.log(data);
      }
    },
}
</script>
<style scoped>
  .el-card {
    margin-top: 10px;
  }
  .el-table {
     margin-top: 15px;  
     margin-bottom: 15px;
  }
</style>