<script setup lang="ts">
import { ref, watch } from 'vue'
interface User {
  auth_id: number
  paw: string
  username: string
  email: string
  jurisdiction: string
  avatar: string
  nickname: string
  github: string
  QQ: string
  signature: string
  exp: number
  mapleCoin: number
}
const userProp = defineProps({
  user: { type: Object },
})
const userfrom = ref<User>(userProp.user as User)
userfrom.value.paw = ''
defineExpose({
  userfrom,
})
</script>

<template>
  <el-form :v-model="userfrom"
           label-position="left"
           label-width="65px">
    <el-form-item label="用户名">
      <el-input v-model="userfrom.username" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input type="password"
                placeholder="不修改密码请留空"
                show-password
                v-model="userfrom.paw" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="userfrom.email" />
    </el-form-item>
    <el-form-item label="权限">
      <!-- 多选框 -->
      <el-select v-model="userfrom.jurisdiction">
        <el-option label="普通用户"
                   value="普通用户" />
        <el-option label="管理员"
                   value="1" />
        <el-option label="超级管理员"
                   value="超级管理员" />
        <el-option label="禁封用户"
                   value="禁封用户" />
      </el-select>
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="userfrom.nickname" />
    </el-form-item>
    <el-form-item label="github">
      <el-input v-model="userfrom.github" />
    </el-form-item>
    <el-form-item label="QQ">
      <el-input v-model="userfrom.QQ" />
    </el-form-item>
    <el-form-item label="签名">
      <el-input v-model="userfrom.signature" />
    </el-form-item>
    <el-form-item label="经验">
      <el-input type="number"
                v-model="userfrom.exp" />
    </el-form-item>
    <el-form-item label="枫币">
      <el-input type="number"
                v-model="userfrom.mapleCoin" />
    </el-form-item>
  </el-form>
</template>

<style scoped>
</style>