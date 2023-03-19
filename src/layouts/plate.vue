<script setup lang="ts">
import service from '../plugins/axios';
import { ElMessageBox,ElMessage } from 'element-plus';
const plate=ref((await service.get('/plate/getplate')).data)
function addplate(){
  ElMessageBox.prompt('请输入板块名称', '新增板块', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
    inputErrorMessage: '请输入板块名称',
  }).then(({ value })=>{
    service.post('/plate/addolate',{plate:value}).then((res)=>{
      plate.value.push(res.data)
      ElMessage.success('添加成功')
    })
  })
}
function editplate(id:number){
  ElMessageBox.prompt('请编辑板块名称', '编辑板块', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9_]+$/,
    inputErrorMessage: '请输入板块名称',
    inputValue:plate.value.find((item:any)=>item.id==id).name
  }).then(({ value })=>{
    service.put('/plate/updateplate',{
      plateid:id,
      plate:value
    }).then((res)=>{
      plate.value.find((item:any)=>item.id==id).name=value
      ElMessage.success('修改成功')
    })
  })
}
function deleteplate(id:number){
  ElMessageBox.confirm('此操作将永久删除该板块, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(()=>
    service.delete('/plate/deleteplate',{data:{plateid:id}}).then((res)=>{
      plate.value = plate.value.filter((item:any)=>item.id!=id)
      ElMessage.success('删除成功')
    })
  )
}
</script>

<template>
  <el-button @click="addplate">新增</el-button>
  <el-table :data="plate">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="name" label="板块名称" />
    <el-table-column >
      <template #default="{ row }">
        <el-button type="text" size="small" @click="editplate(row.id)">编辑</el-button>
        <el-button type="text" size="small" @click="deleteplate(row.id)">删除</el-button>
      </template>
    </el-table-column>     
  </el-table>
</template>

<style scoped>
</style>