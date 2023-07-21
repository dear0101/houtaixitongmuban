import { defineStore, createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const state = {
  isFullScreen: false, //是否全屏
  language: "zh",
  isshowDrawer: false, //是否显示抽屉
};
export const useBasicStore = defineStore("basic", {
  state: () => state,
  getters: {},
  actions: {
    updateFullScreen(curState) {
      this.$patch((state) => {
        state.isFullScreen = curState;
      });
    },
    updateLanguage(curState) {
      this.$patch((state) => {
        state.language = curState;
      });
    },
    updateShowDrawer(curState) {
      this.$patch((state) => {
        state.isshowDrawer = curState;
      });
    },
  },
});
export const usekeepAliveComponent = defineStore("keepAliveComponent", {
  state: () => {
    return {
      keepAliveComp: [],
    };
  },
  getters: {
    keepAliveCompLen() {
      return this.keepAliveComp.length;
    },
  },
  actions: {
    AddKeepAliveComp(curState) {
      this.$patch((state) => {
        let isExist = state.keepAliveComp.findIndex(
          (item) => item.name == curState.name
        );
        if (isExist !== -1) return;
        //当tag的数量大于4就删除第一个
        if (state.keepAliveComp.length > 4) {
          state.keepAliveComp.shift();
          state.keepAliveComp.push(curState);
          return;
        }
        state.keepAliveComp.push(curState);
        console.log(state.keepAliveComp.length);
      });
    },
    DelKeepAliveComp(curState) {
      this.$patch((state) => {
        let index = state.keepAliveComp.findIndex(
          (item) => item.name === curState.name
        );
        if (index == -1) return;
        state.keepAliveComp.splice(index, 1);
      });
    },
    clearKeepAliveComp() {
      this.$patch((state) => {
        state.keepAliveComp = [];
      });
    },
    CloseOthersKeepAliveComp(curState) {
      this.$patch((state) => {
        state.keepAliveComp = state.keepAliveComp.filter(
          (item) => item.name == curState.name
        );
      });
    },
  },
  persist: {
    storage: localStorage,
  },
});
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
