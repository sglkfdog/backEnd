<template>
  <el-card v-loading="loading">
    <template #header>
      <el-input v-model="searchParams.search" placeholder="Please input">
        <template #prepend>
          <el-button type="primary"><i class="i-ep:search"></i></el-button>
        </template>
        <template #append>
          <el-button type="primary"><i class="i-ep:search"></i></el-button>
        </template>
      </el-input>
    </template>

    <el-table :data="tableData" border max-height="350" class="mb-5">
      <el-table-column fixed prop="id" label="ID" min-width="80" />
      <el-table-column
        prop="name"
        label="Name"
        align="center"
        min-width="100"
      />
      <el-table-column
        prop="address"
        label="Address"
        align="center"
        min-width="160"
      />
      <el-table-column prop="date" label="Date" min-width="160" />
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :hide-on-single-page="paginationInfo.totalPages <= 1"
      :current-page="paginationInfo.currentPage"
      :page-size="paginationInfo.pageSize"
      :page-sizes="paginationInfo.pageSizes"
      :small="paginationInfo.small"
      :disabled="paginationInfo.disabled"
      :background="paginationInfo.background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationInfo.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup>
/**
 * Variables area
 */
const loading = ref(false);
const pageSize = ref(1);
const currentPage = ref(1);
const paginationInfo = ref({
  pageSize: pageSize,
  currentPage: currentPage,
  total: 100,
  totalPages: 2,
  pageSizes: [1, 200, 300, 400],
  disabled: false,
  small: true,
  background: true,
});
const searchParams = ref({
  pageSize: pageSize,
  currentPage: currentPage,
  search: "",
});
const tableData = ref([
  {
    id: 1,
    date: "2016-05-03 12:12:12",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    id: 2,
    date: "2016-05-03 12:12:12",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
/**
 * Method Area
 */
const searchFun = () => {
  try {
    loading.value = true;
    console.log(
      "searchFun=",
      searchParams.value.pageSize,
      searchParams.value.currentPage
    );
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
const handleSizeChange = (val) => {
  pageSize.value = val;
  searchFun();
};
const handleCurrentChange = (val) => {
  currentPage.value = val;
  searchFun();
};
/**
 * Life cycle Area
 */
onMounted(() => {
  searchFun();
});
</script>
