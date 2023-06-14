import Home from "@/pages/home/index.vue";
const routes = [
  {
    path: "/",
    redirect: "/home/index",
    name: "Home",
    component: Home,
    meta: {
      keepAlive: false,
    },
    children: [
      {
        path: "/home/index",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/pages/home/wel.vue"),
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
