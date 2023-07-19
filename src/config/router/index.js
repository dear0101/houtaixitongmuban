import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./pagerouter";
import myRouters from "./routerlist";
import compRoutes from "./routes";
import chartRoutes from "./chartrouter";

export const permissionsRouter = [myRouters, compRoutes, chartRoutes];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...permissionsRouter],
});
export default router;
