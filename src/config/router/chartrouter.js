const chartRoutes = {
  path: "/chart",
  meta: { icon: "tubiao" },
  name: "图表",
  component: () =>
    import(/* webpackChunkName: "users" */ "@comps/layout/index.vue"),
  children: [
    {
      path: "dynamic-chart",
      name: "动态图表",
      meta: { icon: "", keepAlive: true, isTab: true },
      component: () =>
        import(
          /* webpackChunkName: "users" */ "@/pages/chart/dynamicChart.vue"
        ),
    },
    //   {
    //     path: "full-table",
    //     name: "功能表格",
    //     meta: { icon: "", keepAlive: true, isTab: true },
    //     component: () =>
    //       import(
    //         /* webpackChunkName: "users" */ "@/pages/table/functionTable.vue"
    //       ),
    //   },
  ],
};

export default chartRoutes;
