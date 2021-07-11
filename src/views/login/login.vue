<template>
    <div class="login-contatior">
      <!-- 绘制登录框 -->
      <div class="login-box">
        <div class="login-pic">
            <img src="../../assets/logo.png" alt="">
        </div>
        <el-form :model="ruleForm" class="login-form" status-icon :rules="rules" ref="ruleForm" >
            <el-form-item  prop="username"><el-input type="text" v-model="ruleForm.username" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item  prop="password"><el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item class="login-button">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button>重置</el-button>
            </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
import {getUserInfo} from '../../../api/login'
export default {
  name: 'Login',
  data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },  
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      }
  },
  //   用户登录
  methods: {
    login() {
      this.$refs.ruleForm.validate(async(valite) => {
        if(valite) {
            const { data } = await getUserInfo({username:this.ruleForm.username, password:this.ruleForm.password})
            console.log(data);
            if(data.meta.status === 200) {
                this.$message.success('登录成功')
                // 登录成功我们可以将获取的token值存放到本地
                window.localStorage.setItem('cookie', data.data.token)
                // 跳转到首页
                this.$router.push('/')
            }
        }
      })
    }
  },
}
</script>
<style scoped>
   .login-contatior {
       height: 100%;
       background-color: #2b4b6b;
   }
   .login-box {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%, -50%);
       width: 450px;
       height: 300px;
       background-color: #fff;
   }
   .login-pic {
       position: absolute;
       top: -30%;
       left: 50%;
       transform: translateX(-50%);
       width: 125px;
       height: 125px;
       box-shadow: 0 0 10px #ddd;
       padding: 10px;
       border: 1px solid #eee;
       border-radius: 50%;
       background: #fff;
   }
   .login-pic img {
       width: 100%;
       height: 100%;
       border-radius: 50%;
       background: #778899;
   }
   .login-form {
       position: absolute;
       top: 30%;
       width: 100%;
       padding: 0 10px;
       box-sizing: border-box;
   }
   .login-button {
     float: right;
   }
</style>