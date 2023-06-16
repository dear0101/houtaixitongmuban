<template>
  <i :class="['iconfont', 'icon-' + iconClass]"></i>
</template>

<script setup>
const props = defineProps({
  iconClass: {
    type: String,
    default: "",
  },
});
</script>
