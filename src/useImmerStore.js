import { produce } from "immer";
import { shallowRef } from "vue";

export function useImmerStore(baseState) {
  const state = shallowRef(baseState);
  const update = (updater) => {
    // console.log("state.value before", state.value, " - updater", updater);
    state.value = produce(state.value, () => updater);
    // console.log("state.value after", state.value);
  };

  return [state, update];
}
