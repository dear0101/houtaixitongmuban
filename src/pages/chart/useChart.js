import { CHART } from "./chartConfig";
import * as echarts from "echarts";
export const useChartLineChart = () => {
  const div = document.createElement("div");
  let lineOptions = chartType(CHART);
  let option = {
    xAxis: lineOptions.defaultData.xAxis,
    series: [
      {
        type: "line",
        data: lineOptions.defaultData.data,
      },
    ],
  };
};

const chartType = (arr) => {
  return arr.find((item) => item.type === "line");
};
