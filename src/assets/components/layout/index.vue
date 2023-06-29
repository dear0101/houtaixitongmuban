<template>
  <div class="layout">
    <div class="header">
      <Header />
    </div>
    <div class="layout_view">
      <div class="siderbar">
        <sider-bar></sider-bar>
      </div>
      <div class="views">
        <tags />
        <div class="view-content">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component
                :is="Component"
                :key="routes.path"
                v-if="routes.meta.keepAlive"
              />
            </keep-alive>
            <component
              :is="Component"
              :key="routes.path"
              v-if="!routes.meta.keepAlive"
            />
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "./header/header.vue";
import tags from "./tag/index.vue";
import SiderBar from "./sidebar/siderBar.vue";
import { reactive } from "vue";
import { useRoute } from "vue-router";
const routes = useRoute();
</script>

<style></style>
