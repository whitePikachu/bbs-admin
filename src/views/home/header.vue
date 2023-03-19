<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
import { token } from '../../plugins/pinia'
function logout() {
  token().token = ''
  window.location.href = '/login'
}
</script>

<template>
  <!-- 退出登陆 -->
  <span>欢迎来使用本后台管理系统</span>
  <el-button type="danger"
             link
             @click="logout"
             class="btn">
    退出登陆
  </el-button>
</template>

<style scoped >
.btn {
  position: absolute;
  right: 10px;
  top: 25px;
}
</style>