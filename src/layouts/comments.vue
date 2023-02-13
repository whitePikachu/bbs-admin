<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import commentslist from '../views/comments/commentslist.vue'
import service from './../plugins/axios'
import { token } from '../plugins/pinia'
const commentssearch = ref('')
async function Get_comments(page: number, limit: number) {
  if (commentssearch.value === '') {
    const { data, totalPage } = (
      await service({
        url: `admin/getCommentList?page=${page}&limit=${limit}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    Page.value = totalPage
    return data
  } else {
    const data = await service({
      url: `admin/searchComment?search=${commentssearch.value}&page=${page}&limit=${limit}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token().token}`,
      },
    })
    Page.value = data.data.totalPage
    comments.value = data.data.data
    return data.data.data
  }
}
const Page = ref(0)
const comments = ref(await Get_comments(1, 5))
async function bt_search(val: string) {
  comments.value = await Get_comments(1, 5)
}
const handleCurrentChange = async (val: number) => {
  comments.value = await Get_comments(val, 5)
}
</script>

<template>
  <el-input v-model="commentssearch"
            placeholder="请输入帖子标题搜索">
    <template #append>
      <el-button :icon="Search"
                 @click="bt_search(commentssearch)" />
    </template>
  </el-input>
  <commentslist :comments="comments" />
  <el-pagination background
                 layout="prev, pager, next"
                 :page-count="Page"
                 @current-change="handleCurrentChange" />
</template>

<style scoped >
</style>