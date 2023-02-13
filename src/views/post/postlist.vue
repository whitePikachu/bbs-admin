<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import service from '../../plugins/axios'
import { VUE_URL } from '../../config'
import { ElMessageBox } from 'element-plus'
import { token } from '../../plugins/pinia'
const props = defineProps({
  posts: {
    type: Object,
    required: true,
  },
})
type postinfo = {
  id: number
  title: string
  content: string
  author: string
  isTop: boolean | string
  plate: string
  plateId: number
  views: number
  createdAt: string
  updatedAt: string
}
const posts = ref(props.posts as postinfo[])
posts.value = posts.value.map((element: postinfo) => {
  element.isTop = element.isTop ? '是' : '否'
  element.createdAt = formatDate(element.createdAt)
  element.updatedAt = formatDate(element.updatedAt)
  return element
})
watch(props, (val) => {
  posts.value = val.posts as postinfo[]
  posts.value = posts.value.map((element: postinfo) => {
    element.isTop = element.isTop ? '是' : '否'
    element.createdAt = formatDate(element.createdAt)
    element.updatedAt = formatDate(element.updatedAt)
    return element
  })
})
//格式化时间
function formatDate(time: string) {
  //判断是否已经格式化
  // if (time.indexOf('-') !== -1) return time
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}/${month}/${day}`
}
//编辑
function handleEdit(row: postinfo) {
  window.location.href = `/newpost?plate=${row.plateId}&postid=${row.id}`
}
//删除
function handleDelete(row: postinfo) {
  ElMessageBox.confirm('此操作将永久删除该帖子, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res = (
      await service({
        url: `/post?postid=${row.id}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    posts.value = posts.value.filter((element) => element.id !== row.id)
  })
}
//新增
function addPost() {
  window.location.href = `/newpost?plate=0`
}
</script>

<template>
  <div class="bts-post">
    <el-button type="primary"
               @click="addPost"
               plain>
      新增
    </el-button>
  </div>
  <el-table :data="posts"
            style="width: 100%">
    <el-table-column prop="id"
                     label="id"
                     width="80" />
    <el-table-column prop="title"
                     label="标题"
                     :show-overflow-tooltip="true"
                     width="180" />
    <el-table-column prop="author"
                     label="作者"
                     :show-overflow-tooltip="true" />
    <el-table-column prop="views"
                     label="浏览量" />
    <el-table-column prop="isTop"
                     label="置顶" />
    <el-table-column prop="plate"
                     label="所属板块"
                     width="180" />
    <el-table-column prop="createdAt"
                     label="发表时间" />
    <el-table-column prop="updatedAt"
                     label="更新时间" />
    <!-- 操作 -->
    <el-table-column type="action"
                     label="操作">
      <template #default="{ row }">
        <el-button type="text"
                   size="small"
                   @click="handleEdit(row)">编辑</el-button>
        <el-divider direction="vertical" />
        <el-button type="text"
                   size="small"
                   @click="handleDelete(row)">删除</el-button>
      </template>
    </el-table-column>

  </el-table>
  <br />
</template>

<style scoped>
.bts-post {
  margin: 10px 0px;
}
</style>