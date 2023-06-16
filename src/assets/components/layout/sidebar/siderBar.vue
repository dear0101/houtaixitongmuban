<template>
  <div class="siderbar_content">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      default-active="/"
      class="el-menu-vertical-demo"
      text-color="#fff"
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
      <template v-for="route in props.myRouter" :key="route.name">
        <sider-bar-item :routerItem="route" :base-path="route.path" />
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["myRouter"]);
import siderBarItem from "./siderBarItem.vue";
import routerTitleIcon from "./routerTitleIcon.vue";
import { storeToRefs } from "pinia";
</script>

<style></style>
