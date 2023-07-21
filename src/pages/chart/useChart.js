import { CHART } from "./chartConfig";
import { h, defineComponent, ref } from "vue";
import { useBasicStore } from "@/store/index.js";
const BasicStore = useBasicStore();
import * as echarts from "echarts";
export const useChartLineChart = (ele, chartType) => {
  const div = document.createElement("div");
  div.style.cssText =
    "height:250px;width:300px;position:absolute;top:0;left:0;z-index:1";
  let lineOptions = getchartType(CHART, chartType);
  let option = {
    backgroundColor: "#eee",
    xAxis: { type: "category", data: lineOptions.defaultData.xAxis },
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        type: lineOptions.type,
        data: lineOptions.defaultData.data,
      },
    ],
  };
  let chart = echarts.init(div);
  chart.setOption(option, true);
  ele.appendChild(div);
  setEvent(div, ele);
};

const setEvent = (ele, parentElement) => {
  let startX = 0,
    isDragging = false,
    startY = 0;
  ele.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    BasicStore.updateShowDrawer(true);
  });
  ele.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    ele.style.cssText += ";border:1px solid yellow;z-index:3";
    isDragging = true;
    startX = e.pageX - ele.offsetLeft;
    startY = e.pageY - ele.offsetTop;
  });
  document.addEventListener("mousemove", (e) => {
    let movex = 0,
      movey = 0;
    if (isDragging) {
      movex = e.pageX - startX;
      movey = e.pageY - startY;

      ele.style.left = movex + "px";
      ele.style.top = movey + "px";
      if (movex < 0 || movex == 0) {
        ele.style.left = 0;
      }
      if (
        movex > parentElement.offsetWidth - ele.offsetWidth ||
        movex == parentElement.offsetWidth - ele.offsetWidth
      ) {
        ele.style.left = parentElement.offsetWidth - ele.offsetWidth + "px";
      }
      if (movey < 0 || movey == 0) {
        ele.style.top = 0;
      }
      if (
        movey > parentElement.offsetHeight - ele.offsetHeight ||
        movey == parentElement.offsetHeight - ele.offsetHeight
      ) {
        ele.style.top = parentElement.offsetHeight - ele.offsetHeight + "px";
      }
      console.log(
        movex,
        movey,
        parentElement.offsetWidth,
        parentElement.offsetHeight - ele.offsetHeight
      );
    }
  });
  document.addEventListener("mouseup", (e) => {
    e.stopPropagation();
    e.preventDefault();
    isDragging = false;
    ele.style.cssText += ";border:none";
  });
};

const getchartType = (arr, type) => {
  return arr.find((item) => item.type === type);
};
