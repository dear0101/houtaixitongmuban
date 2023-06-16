<template>
  <template v-if="routerItem.children">
    <el-sub-menu>
      <template #title>
        <router-title-icon
          v-if="routerItem.meta.icon"
          :iconClass="routerItem.meta.icon"
        />
        <span>{{ routerItem.name }}</span>
      </template>
      <SiderBarItem
        v-for="child in routerItem.children"
        :key="child.path"
        :routerItem="child"
      />
    </el-sub-menu>
  </template>
  <template v-else>
    <el-menu-item :index="resolvePath(routerItem.path)">
      <router-title-icon
        v-if="routerItem.meta.icon"
        :iconClass="routerItem.meta.icon"
      />
      <span>{{ routerItem.name }}</span></el-menu-item
    >
  </template>
</template>
<script setup>
import { reactive } from "vue";
import routerTitleIcon from "./routerTitleIcon.vue";
const props = defineProps({
  routerItem: {
    type: Object,
    required: true,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const resolvePath = (path) => {
  let fullPath = "";
  fullPath = "/admin" + "/" + path;
  console.log(fullPath, "full");
  return fullPath;
};
</script>

<style scoped lang="scss"></style>
