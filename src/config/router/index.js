import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./pagerouter";
import myRouters from "./routerlist";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...myRouters],
});

export default router;
