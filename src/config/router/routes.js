const compRoutes = {
  path: "/table",
  meta: { icon: "yingyongguanliyuanguanli" },
  name: "表格",
  component: () =>
    import(/* webpackChunkName: "users" */ "@comps/layout/index.vue"),
  children: [
    {
      path: "dynamic-table",
      name: "动态表格",
      meta: { icon: "", keepAlive: true, isTab: true },
      component: () =>
        import(
          /* webpackChunkName: "users" */ "@/pages/table/dynamicTable.vue"
        ),
    },
    {
      path: "full-table",
      name: "功能表格",
      meta: { icon: "", keepAlive: true, isTab: true },
      component: () =>
        import(
          /* webpackChunkName: "users" */ "@/pages/table/functionTable.vue"
        ),
    },
  ],
};

export default compRoutes;
