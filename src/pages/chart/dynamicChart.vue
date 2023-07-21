<template>
  <div class="chart_box">
    <div class="left_chart_icon">
      <!-- <draggable
        v-model="chartArray"
        @start="drag = true"
        @end="drag = false"
        class="drager"
        :sort="false"
        item-key="id"
        @update="onDraggableUpdate"
      >
        <template #item="{ element }"> -->
      <template v-for="element in chartArray" :key="element.id">
        <chart-item
          @handlerDragstart="handlerDragstart"
          @handlerDragend="handlerDragend"
          :chartConfig="element"
        />
      </template>
      <!-- </template> -->
      <!-- </draggable> -->
    </div>
    <div class="chart_view">
      <!-- <draggable> -->
      <!-- <div
        ref="targetDropElement"
        :class="['canvas_box', isshowBorder ? 'shawdow' : '']"
      ></div> -->
      <div
        ref="targetDropElement"
        :class="['canvas_box', isshowBorder ? 'shawdow' : '']"
      ></div>
      <el-drawer
        v-model="isshowDrawer"
        title="I am the title"
        direction="rtl"
        :append-to-body="false"
        :modal="false"
        :before-close="handleClose"
      >
        <span>Hi, there!</span>
      </el-drawer>
      <!-- </draggable> -->
    </div>
  </div>
</template>

<script setup>
const targetDropElement = ref(null);
import chartItem from "./chartItem.vue";
import { onMounted, ref, reactive, nextTick, computed } from "vue";
import draggable from "vuedraggable";
import { useChartLineChart } from "./useChart";
import { CHART } from "./chartConfig";
const chartArray = reactive(CHART);
let chartItemData = ref({});
let isshowBorder = ref(false);
const handlerDragstart = (msg) => {
  isshowBorder.value = true;
  chartItemData.value = msg;
  console.log("开始拖拽");
};
import { useBasicStore } from "@/store/index.js";
const BasicStore = useBasicStore();
let isshowDrawer = computed(() => BasicStore.isshowDrawer);
const handlerDragend = (msg) => {
  isshowBorder.value = false;
};
const handleClose = () => {
  BasicStore.updateShowDrawer(false);
};
onMounted(() => {
  console.log(targetDropElement);
  nextTick(() => {
    targetDropElement.value.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    targetDropElement.value.addEventListener("drop", (event) => {
      event.preventDefault();
      console.log("在目标内", chartItemData);
      useChartLineChart(targetDropElement.value, chartItemData.value.type);
    });
  });
  document.addEventListener("click", (e) => {
    BasicStore.updateShowDrawer(false);
  });
});
</script>

<style lang="scss" scoped>
.chart_box {
  width: 100%;
  height: 100%;
  display: flex;
  .left_chart_icon {
    width: 240px;
    height: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: flex-start;
    box-shadow: 1px 1px 4px rgba(0, 21, 41, 0.08);
  }
  .chart_view {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    .canvas_box {
      width: 100%;
      position: relative;
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.08);
      .active {
        border: 1px solid #9bf0ff;
      }
    }
    .shawdow {
      box-shadow: 0 0 5px rgb(3, 209, 250);
    }
  }
}
</style>
