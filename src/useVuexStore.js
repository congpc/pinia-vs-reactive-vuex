import { createStore } from "vuex";

export const vuexStore = createStore({
  state() {
    const count = 0;
    const countReactive = { key: 0 };
    return { count, countReactive };
  },
});
