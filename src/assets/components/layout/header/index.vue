<template>
  <div class="header_content">
    <div class="header_box">
      <div class="logo"><span>LOGO</span></div>
      <div class="title">VUE3+WEBPACK+PININA</div>
    </div>
    <div class="header_tool">
      <div class="item fullscreen_icon">
        <el-tooltip :content="fullScreenText" placement="top" effect="light">
          <el-icon size="20" color="" @click="handlerClickUpDateFullScreen"
            ><FullScreen
          /></el-icon>
        </el-tooltip>
      </div>
      <div class="item">
        <Language />
      </div>
      <div class="item userInfo">
        <img src="~@/assets/img/huitailang.png" alt="" />
        <span>{{ userName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useBasicStore } from "@/store/index";
import Language from "./language.vue";
import screenfull from "screenfull";
onMounted(() => {
  window.addEventListener("keydown", KeyDown, true);
});
const userName = computed(() => "userName");
let useBasic = useBasicStore();
const fullScreen = ref(useBasic.isFullScreen);
const fullScreenText = computed(() =>
  useBasic.isFullScreen ? "退出全屏" : "进入全屏"
);
const KeyDown = (event) => {
  if (event.keyCode === 122) {
    //禁用f11
    event.returnValue = false;
    //触发全屏的按钮
    handlerClickUpDateFullScreen();
  }
};
const handlerClickUpDateFullScreen = () => {
  if (!screenfull.isEnabled) {
    ElMessage({
      message: "you browser can not work",
      type: "warning",
    });
    return false;
  }
  screenfull.toggle();
};
</script>

<style lang="scss" scoped>
.header_content {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header_box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;

    .logo {
      margin-right: 20px;
      position: relative;
      span {
        font-size: 24px;
        position: relative;
        text-shadow: 2px 2px 2px #ccc;
        z-index: 3;
      }
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: 1;
        background-color: #f1f5ce;
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px #f1f5ce;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .title {
      font-size: 30px;
    }
  }

  .header_tool {
    display: flex;
    margin-left: 5px;
    justify-content: flex-end;
    align-items: center;
    .item {
      margin-right: 10px;
    }
    .fullscreen_icon {
      height: 20px;
      .el-icon {
        cursor: pointer;
      }
    }
    .userInfo {
      @include flexCenter();
      img {
        width: 28px;
        height: 28px;
        margin-right: 10px;
        border: none;
        display: inline-block;
        border-radius: 50%;
      }
      span {
      }
    }
  }
}
</style>
