<template>
  <div class="layout">
    <div class="header">
      <header></header>
    </div>
    <div class="layout_view">
      <div class="siderbar">
        <sider-bar :myRouter="myRouter"></sider-bar>
      </div>
      <div class="views">
        <tags />
        <div class="view-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import header from "./header/header.vue";
import tags from "./tag/index.vue";
import SiderBar from "./sidebar/siderBar.vue";
import { reactive } from "vue";
import { permissionsRouter } from "@config/router/index";

const myRouter = reactive(permissionsRouter);
</script>

<style></style>
