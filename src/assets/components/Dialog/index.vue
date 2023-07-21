<template>
  <el-dialog
    v-model="dialogConfig.visible"
    :title="dialogConfig.title || 'tips'"
    :width="dialogConfig.width || '50%'"
    :before-close="dialogConfig.beforeClose()"
  >
    <slot name="content"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogConfig.close">关闭</el-button>
        <el-button type="primary" @click="dialogConfig.operate">
          {{ dialogConfig.lebel || "确认" }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, defineProps } from "vue";
const props = defineProps({
  dialogConfig: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style></style>
