<script setup lang="ts">
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { token } from '../plugins/pinia'
import service from '../plugins/axios'
const loginForm = reactive({
  name: '',
  paw: '',
})
const fromref = ref<FormInstance>()
const login = async (formEl: FormInstance | undefined) => {
  formEl?.validate(async (valid: boolean) => {
    if (valid) {
      const res = (
        await service({
          url: '/auth/login',
          method: 'post',
          data: loginForm,
        })
      ).data
      const p = (
        await service({
          url: '/auth/Permissions',
          method: 'get',
          headers: {
            Authorization: `Bearer ${res.token}`,
          },
        })
      ).data
      if (p.msg === '超级管理员') {
        token().token = res.token
        window.location.href = '/home'
      } else {
        ElMessage.error('权限不足')
      }
    }
  })
}
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  paw: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
</script>

<template>
  <div class="center">
    <div class="blur"></div>
    <el-card class="login-card"
             shadow="hover">
      <template #header>
        <div class="card-header">
          枫酱论坛后台管理系统
        </div>
      </template>
      <el-form :model="loginForm"
               label-position="top"
               :rules="rules"
               :hide-required-asterisk="true"
               ref="fromref">
        <el-form-item label="用户名"
                      prop="name">
          <el-input v-model="loginForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="paw">
          <el-input v-model="loginForm.paw"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     class="btn-login"
                     @click="login(fromref)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<style scoped>
* {
  font-family: 'Microsoft YaHei', sans-serif;
  /* 字体描边 */
  text-shadow: 0 0 3px #fff;
}
.btn-login {
  width: 100%;
}
.login-card {
  width: 400px;
  opacity: 0.8;
}
.card-header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font: 600 20px/50px 'Microsoft YaHei', sans-serif;
}
.blur {
  position: absolute;
  width: 400px;
  height: 337px;
  -webkit-filter: blur(5px);
  filter: blur(5px);
  background: url('https://picsum.photos/1920/1080') no-repeat center center;
}
.center {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 随机背景 */
  background: url('https://picsum.photos/1920/1080') no-repeat center center;
}
</style>