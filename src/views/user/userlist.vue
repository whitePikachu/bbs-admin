<script setup lang="ts">
import { ref, watch, h, onMounted } from 'vue'
import { Timer, Search } from '@element-plus/icons-vue'
import userform from '../../components/user/userform.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import service from '../../plugins/axios'
import { token } from '../../plugins/pinia'
const data = defineProps({
  user: { type: Object },
})
watch(data, (val) => {
  tableData.value = val.user as any
  refresh()
})
const tableData = ref<User[]>(data.user as any)
function refresh() {
  function pname(p: string | number) {
    if (
      p === '超级管理员' ||
      p === '普通用户' ||
      p === '管理员' ||
      p === '禁封用户'
    ) {
      return p
    }

    switch (+p) {
      case 0:
        return '普通用户'
      case 1:
        return '管理员'
      case 2:
        return '超级管理员'
      case 3:
        return '禁封用户'
      default:
        return '未知'
    }
  }
  return (data.user as any).map((element: User) => {
    element.jurisdiction = pname(element.jurisdiction) as string
    return element
  })
}
refresh()

interface User {
  authId: number
  username: string
  email: string
  jurisdiction: string
  avatar: string
  nickname: string
  github: string
  QQ: string
  signature: string
  exp: number
  mapleCoin: number
}

const handleEdit = (row: User) => {
  ElMessageBox({
    title: `编辑用户${row.username}`,
    message: () => h(userform, { user: row }),
    draggable: true,
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(async () => {
    const data = (
      await service({
        url: '/admin/updateUserInfo',
        method: 'patch',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
        data: row,
      })
    ).data
    ElMessage.success(data.msg)
  })
}
const addUser = () => {
  const userformref = h(userform, { user: {} })
  ElMessageBox({
    title: `新增用户`,
    message: userformref,
    draggable: true,
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: async (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        const userformrefdata = (userformref.component!.proxy as any).user
        try {
          const data = (
            await service({
              url: '/admin/addUser',
              method: 'post',
              headers: {
                Authorization: `Bearer ${token().token}`,
              },
              data: userformrefdata,
            })
          ).data
          instance.confirmButtonLoading = false
          ElMessage.success(data.msg)
          done()
          window.location.reload()
        } catch (error) {
          instance.confirmButtonLoading = false
          done()
        }
      } else {
        done()
      }
    },
  })
}
const handleDelete = (row: User) => {
  ElMessageBox({
    title: `删除用户${row.username}`,
    message: '此操作将永久删除该用户, 是否继续?',
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
  }).then(async () => {
    const data = (
      await service({
        url: `/admin/deleteUser?authId=${row.authId}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token().token}`,
        },
      })
    ).data
    ElMessage.success(data.msg)
    tableData.value = tableData.value.filter(
      (item) => item.authId === row.authId
    )
  })
}
// 多选
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}
const handleDeletes = (row: User[]) => {
  ElMessageBox({
    title: `删除用户`,
    message: '此操作将永久删除该用户, 是否继续?',
    dangerouslyUseHTMLString: true,
    showCancelButton: true,
  }).then(() => {
    row.forEach(async (item) => {
      const data = (
        await service({
          url: `/admin/deleteUser?authId=${item.authId}`,
          method: 'delete',
          headers: {
            Authorization: `Bearer ${token().token}`,
          },
        })
      ).data
      tableData.value = tableData.value.filter(
        (item) => item.authId === item.authId
      )
    })
    // 刷新
    window.location.reload()
  })
}
</script>

<template>
  <div class="bt_dell">
    <el-button type="danger"
               v-show="multipleSelection.length!==0"
               @click="handleDeletes(multipleSelection)">批量删除</el-button>
    <el-button type="success"
               @click="addUser"
               v-show="multipleSelection">新增</el-button>
  </div>
  <el-table :data="tableData"
            style="width: 100%"
            @selection-change="handleSelectionChange">
    <el-table-column type="selection"
                     width="55" />
    <el-table-column prop="authId"
                     label="id"
                     width="55" />
    <el-table-column prop="username"
                     label="用户名"
                     width="120">
    </el-table-column>
    <el-table-column prop="email"
                     label="邮箱"
                     width="150" />
    <el-table-column prop="jurisdiction"
                     width="150"
                     label="权限" />
    <el-table-column prop="nickname"
                     :show-overflow-tooltip="true"
                     label="昵称" />
    <el-table-column prop="github"
                     label="github"
                     width="150" />
    <el-table-column prop="QQ"
                     width="150"
                     label="QQ" />
    <el-table-column prop="signature"
                     :show-overflow-tooltip="true"
                     label="签名"
                     width="150" />
    <el-table-column prop="exp"
                     label="经验"
                     width="80" />
    <el-table-column prop="mapleCoin"
                     width="80"
                     label="枫币" />
    <el-table-column width="180"
                     label="操作">
      <template #default="scope">
        <el-button size="small"
                   @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="small"
                   type="danger"
                   @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped >
.bt_dell {
  margin: 10px 0;
}
</style>