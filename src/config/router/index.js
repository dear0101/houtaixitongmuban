import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./pagerouter";
import myRouters from "./routerlist";
import compRoutes from "./routes";

export const permissionsRouter = [myRouters, compRoutes];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...routes, ...permissionsRouter],
});
export default router;
