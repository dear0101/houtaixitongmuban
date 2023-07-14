import { useBasicStore } from "@/store/index";
import screenfull from "screenfull";

let useBasic = useBasicStore();
export const useOnFullscreen = () => {
  if (screenfull.isEnabled) {
    screenfull.on("change", changeFullScreen);
  }
};
export const useOffFullscreen = () => {
  screenfull.off("change", changeFullScreen);
};
const changeFullScreen = () => {
  console.log("changeFullScreen");
  useBasic.updateFullScreen(screenfull.isFullscreen);
};
