<template>
  <div
    class="chart_icon"
    :draggable="true"
    :data-msg="JSON.stringify(chartItem)"
  >
    <i :class="['iconfont', chartItem.icon]"></i>
    <label>{{ chartItem.label }}</label>
  </div>
</template>

<script setup>
import { defineProps, onMounted, defineEmits } from "vue";
const props = defineProps({
  chartConfig: {
    type: Object,
    default: () => ({}),
  },
});
const chartItem = props.chartConfig;
const emits = defineEmits(["handlerDragstart", "handlerDragend"]);
onMounted(() => {
  document.addEventListener("dragstart", (e) => {
    emits("handlerDragstart", JSON.parse(e.target.dataset.msg));
    e.target.classList.add("dragging");
  });
  document.addEventListener("dragend", (e) => {
    console.log("dragend");
    e.target.classList.remove("dragging");
    emits("handlerDragend");
  });
});
</script>

<style lang="scss" scoped>
.chart_icon {
  width: 100px;
  height: 100px;
  cursor: pointer;
  @include flexCenter();
  flex-direction: column;
  i {
    font-size: 50px;
  }
}
.dragging {
  opacity: 0.5;
}
</style>
