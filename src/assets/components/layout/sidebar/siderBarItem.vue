<template>
  <template v-for="item in props.routerItem" :key="item.path">
    <template v-if="item.children">
      <el-sub-menu :index="''">
        <template #title>
          <router-title-icon
            v-if="item.meta.icon"
            :iconClass="item.meta.icon"
          />
          <span>{{ item.name }}</span>
        </template>
        <SiderBarItem :routerItem="item.children" :basePath="item.path" />
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="resolvePath(item.path)">
        <router-title-icon v-if="item.meta.icon" :iconClass="item.meta.icon" />
        <span>{{ item.name }}</span></el-menu-item
      >
    </template>
  </template>
</template>
<script setup>
import { reactive } from "vue";
import routerTitleIcon from "./routerTitleIcon.vue";
import { useRouter, useRoute } from "vue-router";
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
const routers = useRoute();
const resolvePath = (path) => {
  return props.basePath + "/" + path;
};
</script>

<style scoped lang="scss"></style>
