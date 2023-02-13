<script setup lang="ts">
import { ref } from 'vue'
import { token } from '../plugins/pinia'
import service from '../plugins/axios'
import { Search } from '@element-plus/icons-vue'
import Postlist from '../views/post/postlist.vue'
const totalPage = ref(0)
const handleCurrentChange = async (val: number) => {
  if (postsearch.value) {
    const data = (
      await service({
        url: `admin/searchPost?page=1&limit=5&search=${val}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    posts.value = data.data
    totalPage.value = data.totalPage
  } else {
    const data = (
      await service({
        url: `/admin/getPostList?page=${val}&limit=5`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    posts.value = data.data
    totalPage.value = data.totalPage
  }
}
const data = (
  await service({
    url: `/admin/getPostList?page=1&limit=5`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token().token}`,
    },
  })
).data
const posts = ref(data.data)
totalPage.value = data.totalPage
console.log(posts.value)
const postsearch = ref('')
const bt_search = async (val: string) => {
  const data = (
    await service({
      url: `admin/searchPost?page=1&limit=5&search=${val}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token().token}`,
      },
    })
  ).data
  posts.value = data.data
  totalPage.value = data.totalPage
}
</script>

<template>
  <el-input v-model="postsearch"
            placeholder="请输入标题/内容搜索">
    <template #append>
      <el-button :icon="Search"
                 @click="bt_search(postsearch)" />
    </template>
  </el-input>
  <Postlist :posts="posts" />
  <el-pagination background
                 layout="prev, pager, next"
                 :page-count="totalPage"
                 @current-change="handleCurrentChange" />
</template>

<style scoped lang="scss">
</style>