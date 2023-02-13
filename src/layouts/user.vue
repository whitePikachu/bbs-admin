<script setup lang="ts">
import Userlist from '../views/user/userlist.vue'
import { Search } from '@element-plus/icons-vue'
import service from '../plugins/axios'
import { ref } from 'vue'
import { token } from '../plugins/pinia'
const handleCurrentChange = async (val: number) => {
  if (namesearch.value) {
    const data = (
      await service({
        url: `admin/searchUser?page=1&limit=5&username=${val}`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    users.value = data.data
    totalPage.value = data.totalPage
  } else {
    const data = (
      await service({
        url: `/admin/getuserlist?page=${val}&limit=5`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    users.value = data.data
    totalPage.value = data.totalPage
  }
}
const namesearch = ref('')
const bt_search = async (val: string) => {
  const data = (
    await service({
      url: `admin/searchUser?page=1&limit=5&username=${val}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${token().token}`,
      },
    })
  ).data
  users.value = data.data
  totalPage.value = data.totalPage
}

const data = (
  await service({
    url: `/admin/getuserlist?page=1&limit=5`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${token().token}`,
    },
  })
).data
const users = ref(data.data)
const totalPage = ref(data.totalPage)
</script>

<template>
  <el-input v-model="namesearch"
            placeholder="请输入用户名/昵称搜索">
    <template #append>
      <el-button :icon="Search"
                 @click="bt_search(namesearch)" />
    </template>
  </el-input>
  <Userlist :user="users" />
  <el-divider />

  <el-pagination background
                 layout="prev, pager, next"
                 :page-count="totalPage"
                 @current-change="handleCurrentChange" />
</template>

<style scoped >
</style>