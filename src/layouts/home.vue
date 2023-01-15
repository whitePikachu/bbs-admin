<script setup lang="ts">
import { defineComponent, onMounted } from 'vue'
import Aside from '@/views/home/aside.vue'
import Header from '@/views/home/header.vue'
onMounted(() => {
  const vertical = document.querySelector('.el-container .is-vertical')
  const el = document.querySelector('.el-container .is-vertical')
  const aside = document.querySelector('.aside') as HTMLElement
  if (el && aside) {
    console.log(aside)
    aside.style.height = `${el.clientHeight - 20}px`
  }
})
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <Aside class="aside" />
    </el-aside>
    <el-container>
      <el-header>
        <el-card class="Header">
          <Header />
        </el-card>
      </el-header>
      <el-main>
        <el-card class="home">
          <Suspense>
            <template #default>
              <router-view />
            </template>
            <template #fallback>
              <el-skeleton />
            </template>
          </Suspense>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped >
.home {
  min-height: 700px;
}
.Header {
  position: relative;
}
</style>
