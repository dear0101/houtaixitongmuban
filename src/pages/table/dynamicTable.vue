<template>
  <div class="page">
    <div class="button_group">
      <el-button type="primary" plain @click="handlerClick('opt-add-col')"
        >新增列</el-button
      >
      <el-button type="primary" plain>显隐列</el-button>
    </div>
    <el-table
      border
      stripe
      :data="tableConfig.tableData"
      height="250"
      style="width: 100%"
    >
      <el-table-column type="index" width="80" label="序号" />
      <template v-for="item in tableConfig.columnConfig" :key="item.prop">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
      </template>
      <el-table-column fixed="right" label="操作" width="300" slotScope="scope">
        <el-button
          type="primary"
          plain
          @click="handlerClick('opt-update', scope.$index)"
          >修改</el-button
        >
        <el-button
          type="primary"
          plain
          @click="handlerClick('opt-del', scope.$index)"
          >删除</el-button
        >
      </el-table-column>
    </el-table>

    <el-config-provider :locale="zhCn">
      <el-pagination
        :current-page="tableConfig.pageConfig.currentPage"
        :page-size="tableConfig.pageConfig.pageSize"
        :page-sizes="tableConfig.pageConfig.pageSizes"
        small
        background
        :layout="tableConfig.pageConfig.layout"
        :total="tableConfig.pageConfig.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-config-provider>
  </div>
  <Dialog :dialogConfig="dialogConfig">
    <template v-slot:content>
      <div class="diolag_input">
        <template v-if="handlerEventType == 'opt-add-col'">
          <el-col :span="12">
            <label>字段名</label>
            <el-input v-model="tableConfig.indicatorName" placeholder="请输入"
          /></el-col>
          <el-col :span="12">
            <label>值</label>
            <el-input v-model="tableConfig.indicatorValue" placeholder="请输入"
          /></el-col>
        </template>
        <template
          v-else
          v-for="item in tableConfig.columnConfig"
          :key="item.prop"
        >
          <el-col :span="12">
            <label :for="item.label">{{ item.label }}</label>
            <el-input
              :name="item.label"
              v-model="tableConfig.inputConfig[item.prop]"
              placeholder="请输入"
          /></el-col>
        </template>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import Dialog from "@/assets/components/Dialog/index.vue";
import { reactive, ref, getCurrentInstance } from "vue";
import { toUpperCase } from "@/util/index.js";
const { proxy } = getCurrentInstance();

const tableConfig = reactive({
  columnConfig: [
    {
      prop: "date",
      label: "Date",
      width: "200",
    },
    {
      prop: "name",
      label: "Name",
      width: "200",
    },
    {
      prop: "address",
      label: "Address",
      width: "300",
    },
    {
      prop: "age",
      label: "Age",
      width: "200",
    },
    {
      prop: "priot",
      label: "Priot",
      width: "200",
    },
    {
      prop: "height",
      label: "Height",
      width: "200",
    },
    {
      prop: "weight",
      label: "Weight",
      width: "200",
    },
  ],
  inputConfig: {
    prop: "",
    name: "",
    age: "",
    height: "",
    weight: "",
    priot: "",
    address: "",
  },
  indicatorName: "",
  indicatorValue: "",
  loadingicon: "",
  loadLabel: "加载中...",
  tableData: [],
  pageConfig: {
    total: 0,
    currentPage: 1,
    pageSize: 20,
    layout: "total, sizes, prev, pager, next, jumper",
    pageSizes: [20, 40, 60],
  },
});
const dialogConfig = reactive({
  title: "标题",
  width: "60%",
  visible: false,
  close: () => (dialogConfig.visible = false),
  operate: () => operate(),
  beforeClose: () => beforeClose(),
});
const beforeClose = () => {};
const handlerEventType = ref("");
const operate = () => {
  const funMap = new Map([
    [
      "opt-add-col",
      () => {
        tableConfig.columnConfig.push({
          prop: tableConfig.indicatorName,
          width: "200",
          label: toUpperCase(tableConfig.indicatorName),
        });
        tableConfig.tableData = tableConfig.tableData.map((item) => ({
          ...item,
          [tableConfig.indicatorName]: tableConfig.indicatorValue,
        }));
      },
    ],
    ["opt-update", () => {}],
    ["opt-del", () => 4],
  ]);
  funMap.get(handlerEventType.value)();
  dialogConfig.visible = false;
};
setTimeout(() => {
  tableConfig.tableData = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      height: 220,
      weight: 180,
      age: 20,
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      height: 220,
      age: 20,
      weight: 180,
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      age: 20,
      height: 220,
      weight: 180,
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      age: 20,
      height: 220,
      weight: 180,
    },
    {
      date: "2016-05-08",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      age: 20,
      height: 220,
      weight: 180,
    },
    {
      date: "2016-05-06",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      age: 20,
      height: 220,
      weight: 180,
    },
    {
      date: "2016-05-07",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      priot: 80,
      height: 220,
      age: 20,
      weight: 180,
    },
  ];
  tableConfig.pageConfig.total = tableConfig.tableData.length;
});
const handlerClick = (eventType, index) => {
  handlerEventType.value = eventType;
  dialogConfig.visible = true;
  console.log(proxy);
};
const handleSizeChange = () => {};
const handleCurrentChange = () => {};
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  .button_group {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0;
  }
  .el-pagination {
    margin: 10px 0;
    display: flex;
    justify-content: flex-end;
  }
}
.diolag_input {
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  .el-col {
    margin-top: 20px;
    padding-right: 40px;
    display: flex;
    align-items: center;
    label {
      width: 80px;
      text-align: right;
      padding-right: 20px;
    }
    .el-input {
      width: calc(100% - 80px);
    }
  }
}
</style>
