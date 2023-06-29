import router from "@conf/router/index.js";
import pinia from "@/store/index.js";
import { usekeepAliveComponent } from "@/store/index.js";
const UsekeepAliveComponent = usekeepAliveComponent(pinia);
router.beforeEach((to, from, next) => {
  if (to.path.includes("http") || to.path.includes("https")) {
    window.open(to.fullPath, "_blank");
    return;
  }
  let isTags = to.meta.isTab || false;
  if (isTags) {
    UsekeepAliveComponent.AddKeepAliveComp({
      path: to.fullPath || "/",
      name: to.name || "",
      label: to.name || "",
      params: to.params || {},
      query: to.query || {},
    });
  }
  next();
});
