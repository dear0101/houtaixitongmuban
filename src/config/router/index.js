import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./pagerouter";
import myRouters from "./routerlist";
import compRouter from "./routes";

export const permissionsRouter = [myRouters];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...permissionsRouter, ...compRouter],
});

export default router;
