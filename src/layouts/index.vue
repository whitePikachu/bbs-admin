<script setup lang="ts">
import service from '../plugins/axios';
const data = ref((await service.get('/auth/concat')).data)
const title = ref(`最新注册用户 ${data.value.data.newuser} 目前论坛以及注册了 ${data.value.data.count} 人`)
</script>

<template>
  <el-alert title="左侧选择合适管理模块" type="success" />
  <br/>
  <el-alert :title="title" type="success" />
</template>

<style scoped lang="scss">
</style>