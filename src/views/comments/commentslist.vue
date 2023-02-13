<script setup lang="ts">
import { ref } from 'vue'
import service from '../../plugins/axios'
import { ElMessageBox } from 'element-plus'
import { log } from 'console'
import { token } from '../../plugins/pinia'
const props = defineProps({
  comments: {
    type: Object,
    required: true,
  },
})
const commentsRef = ref<commentinfo[]>(props.comments as commentinfo[])
type commentinfo = {
  id: number
  comment: string
  postTitle: string
  username: string
}
watch(props, (val) => {
  commentsRef.value = val.comments as commentinfo[]
})
const handleDelete = (ID: number) => {
  ElMessageBox({
    title: '提示',
    message: '此操作将永久删除该评论, 是否继续?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(async () => {
    const res = (
      await service({
        url: `/comment`,
        method: 'delete',
        data: {
          Commentid: ID,
        },
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    console.log(res)
    commentsRef.value = commentsRef.value.filter((element) => element.id !== ID)
  })
}
</script>

<template>
  <el-table :data="commentsRef">
    <el-table-column prop="id"
                     label="ID"
                     width="180">
    </el-table-column>
    <el-table-column prop="comment"
                     :show-overflow-tooltip="true"
                     label="评论内容"></el-table-column>
    <el-table-column prop="postTitle"
                     label="所属帖子"></el-table-column>
    <el-table-column prop="username"
                     label="评论人"></el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="danger"
                   size="small"
                   @click="handleDelete(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped >
</style>