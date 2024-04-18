<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="flex justify-between">
        <el-button type="primary" @click="handleAdd" :disabled="!hasPermission(SystemApi.userAdd)">新增用户</el-button>
        <el-input v-model="searchParams.searchKey" placeholder="请搜索ID" clearable class="w-80" @change="searchFun">
          <template #prepend>
            <!-- <el-button type="primary" @click="searchFun"><i class="i-ep:search"></i></el-button> -->
            <el-select v-model="searchParams.status" placeholder="全部" class="w-20" @change="searchFun">
              <el-option label="全部" value="" />
              <el-option label="正常" :value="1" />
              <el-option label="禁用" :value="2" />
            </el-select>
          </template>
          <template #suffix>
            <i class="i-ep:search" @click="searchFun"></i>
          </template>
          <!-- <template #append>
            <el-button type="primary" @click="searchFun"><i class="i-ep:search"></i></el-button>
          </template> -->
        </el-input>
      </div>
    </template>
    <el-table :data="tableData" border max-height="350" class="mb-5" v-loading="loading">
      <el-table-column fixed prop="id" label="ID" align="center" min-width="40" />
      <el-table-column prop="name" label="名称" align="center" min-width="100"/>
      <!-- <el-table-column prop="avatar" label="头像" align="center" min-width="120"/> -->
      <el-table-column prop="remark" label="备注" align="center" min-width="100"/>
      <el-table-column prop="role_names" label="角色" align="center" min-width="100"/>
      <el-table-column prop="status" label="状态" align="center" min-width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status==1" type="success">正常</el-tag>
          <el-tag v-else type="">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="160" />
      <el-table-column prop="updateTime" label="更新时间" align="center" min-width="160" />
      <el-table-column fixed="right" label="操作" align="center" width="160">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" :disabled="!hasPermission(SystemApi.userEdit)">编辑</el-button
          >
          <!-- <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          > -->
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

    <el-dialog v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.password_confirm" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select
            v-model="form.roleIds"
            multiple
            placeholder="请选择角色"
            style="width: 240px"
          >
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
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
  </el-card>
</template>

<script setup>
import { usePermission } from '@/composables'
import { SystemApi, systemUserApi, systemRoleApi, systemUserAddApi, systemUserEditApi } from "core/api"
import { filterParams } from "core/utils"
/**
 * Variables area
 */
const { hasPermission } = usePermission()
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
const roles = ref([])
const dialogFormVisible = ref(false)
const formLabelWidth = "120px"
const formDemo = {
  id: "",
  name: "",
  roleIds: [],
  password: "",
  password_confirm: "",
  remark: "",
}
const form = ref({
  id: "",
  name: "",
  roleIds: [],
  password: "",
  password_confirm: "",
  remark: "",
})
// 1: 新增，2: 编辑
const formType = ref(1)
// const options = [
//   {
//     value: "1",
//     label: 'Option1',
//   },
//   {
//     value: "2",
//     label: 'Option2',
//   },
//   {
//     value: "3",
//     label: 'Option3',
//   },
//   {
//     value: "4",
//     label: 'Option4',
//   },
//   {
//     value: "5",
//     label: 'Option5',
//   },
// ]
/**
 * Method Area
 */
const searchFun = async () => {
  try{
    loading.value = true
    let _params = filterParams(searchParams.value)
    // console.log("_params=", _params, searchParams.value)
    // let data = await systemUserApi(searchParams.value)
    console.log("loading-1", loading.value)
    let data = await systemUserApi(_params)
    data?.pagination?.total ? paginationInfo.value.total = data.pagination.total : ""
    data?.pagination?.totalPage ? paginationInfo.value.totalPages = data.pagination.totalPage : ""
    data?.list ? tableData.value = data.list : ""
    console.log("loading-2", loading.value)

  } catch (error) {

  } finally {
    loading.value = false
    console.log("loading-3", loading.value)
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
const getRolesFun = async () => {
  let res = await systemRoleApi()
  res?.list?.length >=0 ? roles.value = res.list : ""
}
const handleEdit = (index, v) => {
  v?.name ? form.value.name = v.name : form.value.name = ""
  v.remark ? form.value.remark = v.remark : form.value.remark = ""
  v.id ? form.value.id = v.id : form.value.id = ""
  console.log("handleEdit-v=", v)
  if (v?.role_ids) {
    let arr = v.role_ids.split(",")
    let newArr = arr.map((item) => {
      return Number(item)
    })
    form.value.roleIds = newArr
  } else {
    form.value.roleIds = []
  }
  // v?.role_ids ? form.value.roleIds = v.role_ids.split(",") : ""
  form.password = ""
  form.password_confirm = ""
  dialogFormVisible.value = true
  formType.value = 2
  console.log("handleEdit-form.value=", form.value)
}
const handleAdd = () => {
  console.log("handleAdd-0=", formDemo)
  // form.value = formDemo
  form.value = {
    id: "",
    name: "",
    roleIds: [],
    password: "",
    password_confirm: "",
    remark: "",
  }
  console.log("handleAdd=", form.value, formDemo)
  dialogFormVisible.value = true
  formType.value = 1
}
const handleConfirm = async () => {
  console.log("form=", form.value)
  try {
    let fucName = ""
    let params = {}
    if (!form.value.name) {
      return
    }
    params.name = form.value.name
    params.remark = form.value.remark
    params.roleIds = toRaw(form.value.roleIds)
    if(formType.value == 1) {
      fucName = systemUserAddApi
      if (!form.value.password || !form.value.password_confirm || form.value.password != form.value.password_confirm) {
        return
      }
      params.password = form.value.password
    }

    if(formType.value == 2) {

      fucName = systemUserEditApi
      if (!form.value.id) {
        return 
      }
      if (form.value.password != form.value.password_confirm) {
        return
      }
      
      params.id = form.value.id
      if (form.value.password) {
        params.password = form.value.password
      }
    }

    if (!fucName) {
      return
    }
    let res = await fucName(params)
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
  getRolesFun()
})
</script>