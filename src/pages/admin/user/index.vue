<template>
  user
  {{ count }}
  <el-button @click="add">增加</el-button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
const add = () => {
  count.value++;
};
</script>

<style></style>
