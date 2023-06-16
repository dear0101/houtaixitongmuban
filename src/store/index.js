import { defineStore } from "pinia";

const state = {
  isFullScreen: false,
};
export const useBasicStore = defineStore("basic", {
  state: () => state,
  getters: {
    isFullScreen: () => state.isFullScreen,
  },
  actions: {
    updateFullScreen: (state, curState) => {},
  },
});
