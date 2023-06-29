const myRouters = {
  path: "/admin",
  meta: { icon: "yingyongguanliyuanguanli" },
  name: "系统管理",
  component: () =>
    import(/* webpackChunkName: "users" */ "@comps/layout/index.vue"),
  children: [
    {
      path: "user",
      name: "用户管理",
      meta: { icon: "", keepAlive: true, isTab: true },
      component: () =>
        import(/* webpackChunkName: "users" */ "@/pages/admin/user/index.vue"),
    },
    {
      path: "roles",
      name: "角色管理",
      meta: { icon: "", keepAlive: true, isTab: true },
      component: () =>
        import(/* webpackChunkName: "roles" */ "@/pages/admin/roles/index.vue"),
    },
    {
      path: "auth",
      name: "权限管理",
      meta: { icon: "", keepAlive: true, isTab: true },
      component: () =>
        import(/* webpackChunkName: "auth" */ "@/pages/admin/auth/index.vue"),
    },
  ],
};

export default myRouters;
