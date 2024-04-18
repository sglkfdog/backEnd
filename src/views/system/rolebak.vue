<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="flex justify-between">
        <el-button type="primary" @click="handleAdd">新增角色</el-button>
        <el-input v-model="searchParams.searchKey" placeholder="请搜索ID" clearable class="w-80" @change="searchFun">
          <template #prepend>
            <el-select v-model="searchParams.status" placeholder="全部" class="w-20" @change="searchFun">
              <el-option label="全部" value="" />
              <el-option label="正常" :value="1" />
              <el-option label="禁用" :value="2" />
            </el-select>
          </template>
          <template #suffix>
            <i class="i-ep:search" @click="searchFun"></i>
          </template>
        </el-input>
      </div>
    </template>
    <el-table :data="tableData" border max-height="350" class="mb-5" v-loading="loading">
      <el-table-column fixed prop="id" label="ID" align="center" min-width="40" />
      <el-table-column prop="name" label="名称" align="center" min-width="100"/>
      <!-- <el-table-column prop="avatar" label="头像" align="center" min-width="120"/> -->
      <el-table-column prop="remark" label="备注" align="center" min-width="100"/>
      <el-table-column prop="status" label="状态" align="center" min-width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status==1" type="success">正常</el-tag>
          <el-tag v-else type="">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="160" />
      <el-table-column prop="updateTime" label="更新时间" align="center" min-width="160" />
      <el-table-column fixed="right" label="操作" align="center" min-width="160">
        <template #default="scope">
          <el-button size="small" @click="showPermission(scope.$index, scope.row)"
            >查看权限</el-button
          >
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      :hide-on-single-page="paginationInfo.totalPages <= 1"
      :current-page="paginationInfo.page"
      :page-size="paginationInfo.limit"
      :page-sizes="paginationInfo.pageSizes"
      :small="paginationInfo.small"
      :disabled="paginationInfo.disabled"
      :background="paginationInfo.background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogFormVisible" title="角色">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            v-model="form.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入备注内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogPermVisible" title="权限">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="permLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="备注" :label-width="permLabelWidth">
          <el-input
            v-model="form.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="请输入备注内容"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script setup>
import { systemRoleApi, systemRoleOperaApi } from "core/api"
import { filterParams } from "core/utils"
/**
 * Variables area
 */
const loading = ref(false)
const pageSize = ref(10)
const currentPage = ref(1)
const paginationInfo = ref({
  "limit": pageSize,
  "page": currentPage,
  "total": 0,
  "totalPages": 2,
  "pageSizes": [1, 200, 300, 400],
  "disabled": false,
  "small": true,
  "background": true
})
const searchParams = ref({
  "limit": pageSize,
  "page": currentPage,
  "searchKey": '',
  "status": '',
})
const tableData = ref([])
// 1: 新增，2: 编辑
const formType = ref(1)
const dialogFormVisible = ref(false)
const formLabelWidth = "120px"
const permLabelWidth = "50px"
const formDemo = {
  id: "",
  name: "",
  remark: "",
  status: 1
}
const form = ref({
  id: "",
  name: "",
  remark: "",
  status: 1
})
const dialogPermVisible= ref(false)
/**
 * Method Area
 */
const searchFun = async () => {
  try{
    loading.value = true
    let _params = filterParams(searchParams.value)
    let data = await systemRoleApi(_params)
    data?.pagination?.total ? paginationInfo.value.total = data.pagination.total : ""
    data?.pagination?.totalPage ? paginationInfo.value.totalPages = data.pagination.totalPage : ""
    data?.list ? tableData.value = data.list : ""
  } catch (error) {

  } finally {
    loading.value = false
  }
}
const handleSizeChange = (val) => {
  pageSize.value = val
  searchFun()
}
const handleCurrentChange = (val) => {
  currentPage.value = val
  searchFun()
}
const showPermission = () => {
  dialogPermVisible.value = true
}
const handleAdd = () => {
  form.value = formDemo
  console.log("handleAdd=", form.value, formDemo)
  dialogFormVisible.value = true
  formType.value = 1
}
const handleEdit = (index, v) => {
  v?.name ? form.value.name = v.name : form.value.name = ""
  v.remark ? form.value.remark = v.remark : form.value.remark = ""
  v.id ? form.value.id = v.id : form.value.id = ""
  console.log("handleEdit-v=", v)
  // v?.role_ids ? form.value.roleIds = v.role_ids.split(",") : form.value.roleIds = []
  // v?.role_ids ? form.value.roleIds = v.role_ids.split(",") : ""
  dialogFormVisible.value = true
  formType.value = 2
  console.log("handleEdit-form.value=", form.value)
}
const handleConfirm = async () => {
  console.log("form=", form.value)
  // dialogFormVisible.value = false
  try {
    if (!form.value.name) {
      return
    }
    if(formType.value == 1 && form.value.id) {
      return
    }
    console.log("formType.value =", formType.value)
    if(formType.value == 2 && !form.value.id) {
      return
    }
    let _params = filterParams(form.value)
    console.log("params=", _params, form.value.roleIds)
    let res = await systemRoleOperaApi(_params)
    searchFun()
    dialogFormVisible.value = false
  } catch (error) {
    
  } finally {
  }
}
/**
 * Life cycle Area
 */
onMounted(() => {
  searchFun()
})
</script>