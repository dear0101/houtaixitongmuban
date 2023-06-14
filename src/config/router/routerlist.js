const myRouters = [
  {
    path: "",
    name: "用户管理",
    component: () =>
      import(/* webpackChunkName: "users" */ "@/pages/admin/user/index.vue"),
  },
  {
    path: "",
    name: "角色管理",
    component: () =>
      import(/* webpackChunkName: "roles" */ "@/pages/admin/roles/index.vue"),
  },
  {
    path: "",
    name: "权限管理",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/pages/admin/auth/index.vue"),
  },
];
export default myRouters;
