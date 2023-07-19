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
      <div
        ref="targetDropElement"
        :class="['canvas_box', isshowBorder ? 'shawdow' : '']"
      >
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import chartItem from "./chartItem.vue";
import { onMounted, ref } from "vue";
// import draggable from "vuedraggable";
import { CHART } from "./chartConfig";
import { reactive } from "vue";
const chartArray = reactive(CHART);
let chartItemData = ref({});
let isshowBorder = ref(false);
const targetDropElement = ref(null);
const handlerDragstart = (msg) => {
  isshowBorder.value = true;
  chartItemData.value = msg;
  console.log("开始拖拽");
};
const handlerDragend = (msg) => {
  isshowBorder.value = false;
};
onMounted(() => {
  console.log(targetDropElement.value);
  targetDropElement.value.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  targetDropElement.value.addEventListener("drop", (event) => {
    event.preventDefault();
    console.log("在目标内", chartItemData);
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
      height: 100%;
      border: 1px solid rgba(0, 0, 0, 0.08);
    }
    .shawdow {
      box-shadow: 0 0 5px rgb(3, 209, 250);
    }
  }
}
</style>
