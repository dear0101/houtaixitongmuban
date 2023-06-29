const routes = [
  {
    path: "/",
    redirect: "/index",
    meta: { icon: "shouye" },
    component: () =>
      import(/* webpackChunkName: "users" */ "@comps/layout/index.vue"),
    children: [
      {
        path: "index",
        name: "首页",
        meta: {
          icon: "",
          isTab: true,
          keepAlive: true,
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/pages/home/index.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "page" */ "@comps/error-page/404.vue"),
    name: "404",
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: true,
    },
  },
  {
    path: "/:catchAll(.*)", // 不识别的path自动匹配404
    redirect: "/404",
  },
];
export default routes;
