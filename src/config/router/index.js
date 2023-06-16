import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./pagerouter";
import myRouters from "./routerlist";

export const permissionsRouter = [myRouters];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...permissionsRouter],
});

export default router;
