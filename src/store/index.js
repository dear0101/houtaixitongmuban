import { defineStore, createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
const pinia = createPinia();
pinia.use(piniaPluginPersist);

const state = {
  isFullScreen: false,
};
export const useBasicStore = defineStore("basic", {
  state: () => state,
  getters: {},
  actions: {
    updateFullScreen: (state, curState) => {},
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
        state.keepAliveComp.push(curState);
      });
    },
    DelKeepAliveComp(curState) {
      this.$patch((state) => {
        let index = state.keepAliveComp.findIndex(
          (item) => item.name === curState
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
    enabled: true,
  },
});
export default pinia;
