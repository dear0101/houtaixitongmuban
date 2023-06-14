<template>
  <div class="layout">
    <div class="header">
      <header></header>
    </div>
    <div class="layout_view">
      <div class="siderbar">
        <sider-bar></sider-bar>
      </div>
      <div class="views">
        <tags />
        <div class="view-content">
          <!-- <keep-alive v-if="routes.meta.keepAlive"> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
          <!-- <router-view v-else></router-view> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import header from "@assets/components/layout/header.vue";
import tags from "../tag/index.vue";
import SiderBar from "@assets/components/layout/siderBar.vue";
import { useRouter, useRoute } from "vue-router";
import { reactive } from "vue";
import myRouters from "@config/router/routerlist";
const routes = reactive(useRouter());
console.log(routes, "routes");
const myRouter = reactive(myRouters);
</script>

<style></style>
