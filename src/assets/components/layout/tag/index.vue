<template>
  <div class="tag">
    <el-tabs
      v-model="currentValue"
      type="card"
      stretch
      closable
      @tab-remove="handlerRemoveTab"
      @tab-click="handlerClickTab"
    >
      <el-tab-pane
        closable
        v-for="item in keepAliveComponent"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          <span class="title">{{ item.label }}</span>
        </template>
      </el-tab-pane>
    </el-tabs>
    <el-dropdown size="default" split-button>
      操作
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handlerClickCloseOthers"
            >关闭其他</el-dropdown-item
          >
          <el-dropdown-item @click="handlerClickCloseAll"
            >关闭所有</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { usekeepAliveComponent } from "@/store/index.js";
import { reactive, computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
const routers = useRoute();
const router = useRouter();
let currentValue = ref(routers.name);
watch(routers, (newVal) => {
  currentValue.value = newVal.name;
});
const AliveComponentStore = usekeepAliveComponent();
let tagLen = computed(() => {
  return AliveComponentStore.keepAliveComp.length;
});

const keepAliveComponent = computed(() => {
  return AliveComponentStore.keepAliveComp;
});

const handlerClickTab = (cur) => {
  let currentRoutes = keepAliveComponent.value.find(
    (item) => item.name == cur.props.name
  );
  if (!currentRoutes) return;
  router.push({ path: currentRoutes.path });
};
const handlerRemoveTab = (cur) => {
  console.log(cur, currentValue);
  if (currentValue.value == cur) {
    let index = keepAliveComponent.value.findIndex((item) => item.name === cur);
    let currentCom = keepAliveComponent.value[index - 1];
    router.push({ path: currentCom.path });
  }
  AliveComponentStore.DelKeepAliveComp(cur);
};
const handlerClickCloseAll = async (cur) => {
  await AliveComponentStore.clearKeepAliveComp();
  router.push({ path: "/index" });
};
const handlerClickCloseOthers = () => {
  AliveComponentStore.CloseOthersKeepAliveComp(routers);
};
</script>

<style lang="scss" scoped>
.tag {
  width: 100%;
  height: 34px;
  display: flex;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /deep/ .el-tabs {
    margin-top: 1px;
    .el-tabs__header {
      margin: 0;
      margin-right: 10px;
      height: 30px;
      border-bottom: 0;
      .el-tabs__nav {
        border-radius: 4px;
        border-bottom: 1px solid var(--el-border-color-light);
        .el-tabs__item {
          width: 100px;
          height: 28px;
          padding: 0 10px;
          .title {
            width: 60px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .el-icon {
            flex-shrink: 0;
          }
        }
      }
    }
  }
  .el-dropdown {
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>
