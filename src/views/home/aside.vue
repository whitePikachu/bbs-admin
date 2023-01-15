<script setup lang="ts"></script>

<template>
  <!-- logo -->
  <div class="logo">
    <img src="@/assets/logo.png"
         alt="logo" />
  </div>
  <!-- 菜单 -->
  <el-menu default-active="home"
           :router="true">
    <el-menu-item index="home">首页</el-menu-item>
    <el-menu-item index="user">用户管理</el-menu-item>
    <el-menu-item index="post">帖子管理</el-menu-item>
    <el-menu-item index="comments">回复管理</el-menu-item>
    <el-menu-item index="plate">板块管理</el-menu-item>
  </el-menu>
</template>

<style scoped>
.logo {
  text-align: center;
  padding: 10px 0;
}
</style>