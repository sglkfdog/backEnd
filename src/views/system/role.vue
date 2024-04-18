<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="flex justify-between">
        <el-button type="primary" @click="handleAdd" :disabled="!hasPermission(SystemApi.roleAdd)">新增角色</el-button>
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
      <el-table-column fixed prop="id" label="ID" align="center" min-width="80" />
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
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" :disabled="!hasPermission(SystemApi.roleEdit)">编辑</el-button
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
        <el-form-item label="菜单权限" :label-width="formLabelWidth">
          <div class="w-full flex" v-for="(v, i) in menusOptions" :key="i">
            <!-- <el-checkbox
              v-model="checkAllMenu"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllMenuChange"
              >{{ v.name }}</el-checkbox
            >
            <el-checkbox-group
              v-model="checkedMenus"
              @change="handleCheckedMenuChange"
            >
              <el-checkbox v-for="m in v.children" :key="m.id" :label="m.name">{{
                m.name
              }}</el-checkbox>
            </el-checkbox-group> -->
            <template v-if="v.children.length <= 0">
              <el-checkbox v-if="checkedPerms.includes(v.id)" @change="checked=>checkedOption(checked, v)" :label="v.name" checked>{{ v.name }}：</el-checkbox>
              <el-checkbox v-else @change="checked=>checkedOption(checked, v)" :label="v.name">{{ v.name }}：</el-checkbox>
            </template>
            <template v-else>{{ v.name }}：</template>
            <!-- <el-checkbox @change="checked=>checkedOption(checked, m)" v-for="m in v.children" :key="m.id" :label="m.name" :checked="checkedPerms.includes(m.id)">{{m.name}}</el-checkbox> -->
            <!-- <el-checkbox @change="checked=>checkedOption(checked, m)" v-for="m in v.children" :key="m.id" :label="m.name" :checked="()=>getChecked(m)">{{m.name}}</el-checkbox> -->
            <div class="mr-4" v-for="m in v.children" :key="m.id">
              <el-checkbox @change="checked=>checkedOption(checked, m)" v-if="checkedPerms.includes(m.id)" :label="m.name" checked>{{m.name}}</el-checkbox>
              <el-checkbox @change="checked=>checkedOption(checked, m)" v-else :label="m.name">{{m.name}}</el-checkbox>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="资源权限" :label-width="formLabelWidth">
          <div class="w-full flex" v-for="(v, i) in resourceOptions" :key="i">
            {{ v.name }}：
            <!-- <el-checkbox @change="checked=>checkedOption(checked, m)" v-for="m in v.children" :key="m.id" :label="m.name" :checked="checkedPerms.includes(m.id)">{{m.name}}</el-checkbox> -->
            <!-- <el-checkbox @change="checked=>checkedOption(checked, m)" v-for="m in v.children" :key="m.id" :label="m.name" :checked="()=>getChecked(m)">{{m.name}}</el-checkbox> -->
            <!-- <el-checkbox @change="checked=>checkedOption(checked, m)" v-for="m in v.children" :key="m.id" :label="m.name" :checked="getIsChecked(m)">{{m.name}}</el-checkbox> -->
            <div class="mr-4" v-for="m in v.children" :key="m.id">
              <el-checkbox @change="checked=>checkedOption(checked, m)" v-if="checkedPerms.includes(m.id)" :label="m.name" checked>{{m.name}}</el-checkbox>
              <el-checkbox @change="checked=>checkedOption(checked, m)" v-else :label="m.name">{{m.name}}</el-checkbox>
            </div>
          </div>
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
import { SystemApi, systemRoleApi, systemRoleOperaApi, systemMenusApi, systemRoleAddApi, systemRoleEditApi } from "core/api"
import { filterParams, listToTree } from "core/utils"
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
  status: 1,
  permissionIds: []
})
const menusOptions = ref([])
const resourceOptions = ref([])
const checkedPerms = ref([])
const getIsChecked = computed(() => {
  return (v) => {
    let r = checkedPerms.value.includes(v.id)
    console.log("getIsChecked=", r, checkedPerms.value, v.id)
    return r ? true : ''
  }
})
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
const handleAdd = () => {
  form.value = {
    id: "",
    name: "",
    remark: "",
    status: 1,
    permissionIds: []
  }
  checkedPerms.value = []
  console.log("handleAdd=", form.value, formDemo, checkedPerms.value)
  dialogFormVisible.value = true
  formType.value = 1
}
const handleEdit = (index, v) => {
  v?.name ? form.value.name = v.name : form.value.name = ""
  v.remark ? form.value.remark = v.remark : form.value.remark = ""
  v.id ? form.value.id = v.id : form.value.id = ""
  console.log("handleEdit-v=", v)
  // v?.permission_ids ? checkedPerms.value = v.permission_ids.split(",") : checkedPerms.value = []
  if (v?.permission_ids) {
    let arr = v.permission_ids.split(",")
    let newArr = arr.map((item) => {
      return Number(item)
    })
    checkedPerms.value = newArr
  } else {
    checkedPerms.value = []
  }
  dialogFormVisible.value = true
  formType.value = 2
  console.log("handleEdit-form.value=", v, form.value, checkedPerms.value)
}
const handleConfirm = async () => {
  console.log("form=", form.value)
  // dialogFormVisible.value = false
  try {
    let fucName = ""
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
    // checkedPerms.value去重
    checkedPerms.value = checkedPerms.value.filter((item, index) => checkedPerms.value.indexOf(item) === index)
    console.log("handleConfirm-checkedPerms-2=", checkedPerms.value)
    form.value.permissionIds = checkedPerms.value
    let _params = filterParams(form.value)
    console.log("handleConfirm-params=", _params, form.value.roleIds)
    console.log("handleConfirm-checkedPerms=", checkedPerms.value)
    // return 
    // let res = await systemRoleOperaApi(_params)
    formType.value == 1 ? fucName = systemRoleAddApi : fucName = systemRoleEditApi
    if (!fucName) {
      return
    }
    let res = await fucName(_params)
    // searchFun()
    dialogFormVisible.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  } catch (error) {
    
  } finally {
  }
}

const getOptions = async () => {
  let res = await systemMenusApi()
  let menus = []
  let resource = []
  res.list.forEach(element => {
    element?.apiPath ? resource.push(element) : ''
    if (element.type != 2) {
      menus.push(element)
    }
  })
  if (menus.length > 0) {
    menusOptions.value = listToTree(menus)
  }
  if (resource.length > 0) {
    resourceOptions.value = listToTree(resource)
  }
  console.log("getOptions:", res, menusOptions.value, resourceOptions.value)
}
const getChecked = (v) => {
  console.log("getChecked=", v.id, checkedPerms.value, checkedPerms.value.includes(v.id))
  let res = checkedPerms.value.includes(v.id)
  // if (res) {
  //   checkedPerms.value.push(v.id)
  //   checkedPerms.value.push(v.parentId)
  // }
  return res
}
const checkedOption = (e, v) => {
  if (e && !checkedPerms.value.includes(v.id)) {
    checkedPerms.value.push(v.id)
    checkedPerms.value.push(v.parentId)
  }
  if (!e && checkedPerms.value.includes(v.id)) {
    checkedPerms.value = checkedPerms.value.filter(item=>{
      return item != v.id
    })
    // checkedPerms.value = checkedPerms.value.slice(checkedPerms.value.indexOf(v.parentId), 1)
    // 删除v.parentId
    checkedPerms.value.splice(checkedPerms.value.indexOf(v.parentId), 1)
  }
}
/**
 * Life cycle Area
 */
onMounted(() => {
  searchFun()
  getOptions()
})
// watch([dialogFormVisible, formType], ([newA, newB], [oldA, oldB]) => {
//   console.log("a-val==", newA, oldA)
//   console.log("b-val==", newB, oldB)
//   if (!newA) {
//     checkedPerms.value.length > 0 ? checkedPerms.value = [] : ''
//     console.log("newA为false")
//   }
// })
</script>