import "@/assets/css/index.scss";
import "./permission.js";
import axios from "@conf/axios";
import router from "@/config/router/index.js";
import VueAxios from "vue-axios";
import { createApp } from "vue";
import App from "@/App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import pinia from "@/store/index.js";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(pinia);
app.use(ElementPlus);
app.use(VueAxios, axios);
app.mount("#app");
