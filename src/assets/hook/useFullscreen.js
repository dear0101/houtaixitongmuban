import { onMounted, onUnmounted } from "vue";
import { useBasicStore } from "@/store/index";
onMounted(() => {
  document.addEventListener("webkitfullscreenchange", Fullscreenchange);
});
onUnmounted(() => {
  document.removeEventListener("webkitfullscreenchange", Fullscreenchange);
});
let useBasic = useBasicStore();
const Fullscreenchange = () => {
  const isFullScreen =
    document.fullScreen ||
    document.mozFullScreen ||
    document.webkitIsFullScreen;
  if (isFullScreen) {
    //  进入全屏
    useBasic.updateFullScreen.updateFullScreen(true);
    console.log("进入全屏");
  } else {
    //  退出全屏
    useBasic.updateFullScreen.updateFullScreen(false);
    console.log("退出全屏");
  }
};
