<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="flex justify-between">
        <el-button type="primary" @click="handleAdd" :disabled="!hasPermission(SystemApi.menuAdd)">新增菜单</el-button>
        <!-- <el-input v-model="searchParams.searchKey" placeholder="请搜索ID" clearable class="w-80">
          <template #prepend>
            <el-button type="primary" @click="searchFun"><i class="i-ep:search"></i></el-button>
          </template>
          <template #append>
            <el-button type="primary" @click="searchFun"><i class="i-ep:search"></i></el-button>
          </template>
        </el-input> -->
        <el-input v-model="searchParams.searchKey" placeholder="请搜索ID" clearable class="w-80" @change="searchFun">
          <template #prepend>
            <!-- <el-button type="primary" @click="searchFun"><i class="i-ep:search"></i></el-button> -->
            <el-select v-model="searchParams.type" placeholder="全部" class="w-20" @change="searchFun">
              <el-option label="全部" value="" />
              <el-option label="目录" value="0" />
              <el-option label="菜单" value="1" />
              <el-option label="按钮" value="2" />
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
    <el-table :data="tableData" border max-height="350" class="mb-5">
      <el-table-column fixed prop="id" label="ID" align="center" min-width="80" />
      <el-table-column prop="name" label="名称" align="center" min-width="100"/>
      <el-table-column prop="icon" label="图标" align="center" min-width="60">
        <template #default="scope">
          <span :class="'i-'+scope.row.icon"></span>
        </template>
      </el-table-column>
      <el-table-column prop="apiPath" label="apiPath" align="center" min-width="140"/>
      <el-table-column prop="router" label="router" align="center" min-width="140"/>
      <el-table-column prop="parentId" label="上级ID" align="center" min-width="100"/>
      <el-table-column prop="type" label="类型" align="center" min-width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.type==0" type="success">目录</el-tag>
          <el-tag v-if="scope.row.type==1" type="">菜单</el-tag>
          <el-tag v-if="scope.row.type==2" type="info">权限按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" min-width="160" />
      <el-table-column prop="updateTime" label="更新时间" align="center" min-width="160" />
      <el-table-column fixed="right" label="操作" align="center" width="160">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)" :disabled="!hasPermission(SystemApi.menuEdit)">Edit</el-button
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

    <el-dialog v-model="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上级菜单" v-if="form.type>0" :label-width="formLabelWidth">
          <el-select
            v-model="form.parentId"
            placeholder="请选择上级菜单"
            style="width: 240px"
          >
            <el-option
              v-for="item in parents"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio-group v-model="form.type">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">权限按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="接口路径" v-if="form.type>0" :label-width="formLabelWidth">
          <el-input v-model="form.apiPath" autocomplete="off" placeholder="api地址" />
        </el-form-item>
        <el-form-item label="页面路径" v-if="form.type!=2" :label-width="formLabelWidth">
          <el-input v-model="form.router" autocomplete="off" placeholder="路由中的path值" />
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.type!=2" :label-width="formLabelWidth">
          <icon-picker v-model="form.icon"></icon-picker>
        </el-form-item>
        <el-form-item label="菜单排序" :label-width="formLabelWidth">
          <el-input-number
            v-model="form.sort"
            :min="0"
            :max="100"
            controls-position="right"
          />
        </el-form-item>
       
        <el-form-item label="菜单备注" :label-width="formLabelWidth">
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
import { SystemApi, systemMenusApi, systemMenuAddApi, systemMenuEditApi } from "core/api"
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
  "type": '',
})
const tableData = ref([])
// const tableData = ref([
//   {
//     id: 1,
//     date: '2016-05-03 12:12:12',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     id: 2,
//     date: '2016-05-03 12:12:12',
//     name: 'Tom',
//     address: 'No. 189, Grove St, Los Angeles',
//   },
// ])
const dialogFormVisible = ref(false)
const formLabelWidth = "120px"
const formDemo = {
  name: "",
  parentId: "",
  apiPath: "",
  router: "",
  type: "",
  remark: "",
  sort: 0,
}
const form = ref(formDemo)
// 1: 新增，2: 编辑
const formType = ref(1)
const parents = ref([
  {id: 0, pid:"", name: "无"}
])
/**
 * Method Area
 */
const searchFun = async () => {
  try{
    loading.value = true
    let data = await systemMenusApi(searchParams.value)
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
const getParentMenusFun = async () => {
  let res = await systemMenusApi({
    // "pid": 999999 // 999999 代表为 0
    "type": "0,1"
  })
  let arr = []
  res?.list?.length >=0 ? arr = res.list : ""
  // arr.forEach(element => {
  //   let tmp = {
  //     id: element.id,
  //     pid: element.parent_id,
  //     name: element.name,
  //   }
  //   parents.value.push(tmp)
  // })
  // 使用concat追加数组
  parents.value = parents.value.concat(arr)
  // console.log("getParentMenusFun-res=", res)
}
const handleAdd = (v) => {
  getParentMenusFun()
  form.value = formDemo
  form.value.type = 1
  dialogFormVisible.value = true
  formType.value = 1
}
const handleEdit = (index, v) => {
  getParentMenusFun()
  form.value = v
  dialogFormVisible.value = true
  formType.value = 2
}
const handleConfirm = async () => {
  
  console.log("form=", form.value)
  // dialogFormVisible.value = false
  try {
    let fucName = ""
    if (!form.value.name || form.value.parentId==="" || form.value.type==="") {
      // console.log("请填完整参数")
      return
    }
    if(formType.value == 1) {
      fucName = systemMenuAddApi
    }
    
    if(formType.value == 2) {
      fucName = systemMenuEditApi
    }
    if (!fucName) {
      // console.log("请填完整参数2=", formType.value)
      return
    }
    // return
    // console.log("请填完整参数3")
    let res = await fucName(form.value)
    // console.log("请填完整参数4=", res)
    // searchFun()
    dialogFormVisible.value = false
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  } catch (error) {
    console.log("errorerrorerrorerror=")
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