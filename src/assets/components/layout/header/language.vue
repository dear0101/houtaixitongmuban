<template>
  <el-dropdown type="primary" @command="handleSetLang">
    <el-icon size="20"><SwitchFilled /></el-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.value"
          :command="item.value"
          :disabled="language === item.value"
        >
          <span style="margin: 10px 0">{{ item.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { ref } from "vue";
import { useBasicStore } from "@/store/index";
let useBasic = useBasicStore();
let language = ref(useBasic.language);
let langOptions = ref([
  { label: "中文", value: "zh" },
  { label: "英文", value: "en" },
]);

const handleSetLang = (val) => {
  language.value = val;
  useBasic.updateLanguage(val);
};
</script>

<style></style>
