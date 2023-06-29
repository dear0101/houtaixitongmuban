<template>
  <div class="siderbar_content">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      :default-active="currentPath"
      class="el-menu-vertical-demo"
      text-color="#fff"
      isCollapse
      :collapse="false"
      :collapse-transition="false"
      mode="vertical"
      :unique-opened="true"
      router
    >
      <el-menu-item :index="'/'">
        <router-title-icon :iconClass="'shouye'" />
        <span>首页</span></el-menu-item
      >
      <sider-bar-item :routerItem="myRouter" />
    </el-menu>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import siderBarItem from "./siderBarItem.vue";
import routerTitleIcon from "./routerTitleIcon.vue";
import { permissionsRouter } from "@conf/router/index";
const myRouter = reactive(permissionsRouter);
const routes = useRoute();
let currentPath = ref(routes.fullPath);
watch(routes, (newVal) => {
  currentPath.value = newVal.fullPath;
});
</script>

<style></style>
