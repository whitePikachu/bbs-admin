<script setup lang="ts">
</script>

<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <el-skeleton />
    </template>
  </Suspense>
</template>

<style scoped>
</style>
