<script setup>
import { reactive, ref, shallowReactive, shallowRef } from "vue";
import { useTestStore as usePiniaStore } from "./usePiniaStore";
import { vuexStore as testStoreVuex } from "./useVuexStore";
import { useImmerStore } from "./useImmerStore";
// import { state as xStateRef, countActor } from "./useStateMachine";

const testStorePinia = usePiniaStore();

// Native type (deeply reactive)
const refVar = ref(0);
const reactiveVar = reactive({ key: 0 });

// Shallow type
// Ref: https://vuejs.org/api/reactivity-advanced.html#shallowref
// https://vuejs.org/guide/best-practices/performance#reduce-reactivity-overhead-for-large-immutable-structures
const shallowRefVar = shallowRef(0);
const shallowReactiveVar = shallowReactive({ key: 0 });
const shallowTriggerReactiveVar = shallowReactive({ key: 0 });
// Immer: https://vuejs.org/guide/extras/reactivity-in-depth#integration-with-external-state-systems
const [immerRefVar, updateImmerRefVar] = useImmerStore(0);
const [immerReactiveVar, updateImmerReactiveVar] = useImmerStore({ key: 0 });

const time = reactive({
  ref: 0,
  reactive: 0,
  shallowRef: 0,
  shallowReactive: 0,
  shallowTriggerReactive: 0,
  // shallowXState: 0,
  immerRef: 0,
  immerReactive: 0,
  piniaRef: 0,
  piniaReactive: 0,
  vuexRef: 0,
  vuexReactive: 0,
});
const counter = 1000000;

// Native vue ref
let startTime = Date.now();
for (let i = 0; i < counter; i++) {
  refVar.value = i;
}
time.ref = `Ref time: ${Date.now() - startTime}ms`;
console.log(refVar.value, time.ref);
// Shallow vue ref
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  shallowRefVar.value = i;
}
time.shallowRef = `Shallow Ref time: ${Date.now() - startTime}ms`;
console.log(shallowRefVar.value, time.shallowRef);
// Immer
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  updateImmerRefVar(i);
}
time.immerRef = `Shallow Immer Ref time: ${Date.now() - startTime}ms`;
console.log(immerRefVar.value, time.immerRef);
// XState
// startTime = Date.now();
// for (let i = 0; i < counter; i++) {
//   countActor.send({ type: 'SET', value: i });
// }
// time.shallowXState = `Shallow XState Ref time: ${Date.now() - startTime}ms`;
// console.log(xStateRef.value, time.shallowXState);
// Pinia
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStorePinia.count = i;
}
time.piniaRef = `Pinia ref time: ${Date.now() - startTime}ms`;
console.log(testStorePinia.count, time.piniaRef);
// Vuex
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStoreVuex.state.count = i;
}
time.vuexRef = `Vuex ref time: ${Date.now() - startTime}ms`;
console.log(testStoreVuex.state.count, time.vuexRef);
// ------
// Native vue reactive
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  reactiveVar.key = i;
}
time.reactive = `Reactive time: ${Date.now() - startTime}ms`;
console.log(reactiveVar.key, time.reactive);
// Native vue shallow reactive (won't trigger)
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  shallowReactiveVar.key = i;
}
time.shallowReactive = `Shallow Reactive time: ${Date.now() - startTime}ms`;
console.log(shallowReactiveVar.key, time.shallowReactive);
// Native vue shallow trigger reactive
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  shallowTriggerReactiveVar.value = { ...{ key: i } };
}
time.shallowTriggerReactive = `Shallow Trigger Reactive time: ${Date.now() - startTime}ms`;
console.log(shallowTriggerReactiveVar.value.key, time.shallowTriggerReactive);
// Native vue shallow immer reactive
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  updateImmerReactiveVar({ key: i });
}
time.immerReactive = `Shallow Immer Reactive time: ${Date.now() - startTime}ms`;
console.log(immerReactiveVar.value.key, time.immerReactive);
// Pinia
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStorePinia.countReactive.key = i;
}
time.piniaReactive = `Pinia reactive time: ${Date.now() - startTime}ms`;
console.log(testStorePinia.countReactive.key, time.piniaReactive);
console.log();
// Vuex
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStoreVuex.state.countReactive.key = i;
}
time.vuexReactive = `Vuex reactive time: ${Date.now() - startTime}ms`;
console.log(testStoreVuex.state.countReactive.key, time.vuexReactive);
</script>

<template>
  <div>
    {{ counter }} "reactive" write operations
  </div>
  <div>--- Ref ---</div>
  <div>
    {{ time.ref }}
  </div>
  <div>
    {{ time.shallowRef }}
  </div>
  <div>
    {{ time.immerRef }}
  </div>
  <div>
    {{ time.piniaRef }}
  </div>
  <div>
    {{ time.vuexRef }}
  </div>
  <div>--- Reactive ---</div>
  <div>
    {{ time.reactive }}
  </div>
  <div>
    {{ time.shallowReactive }}
  </div>
  <div>
    {{ time.shallowTriggerReactive }}
  </div>
  <div>
    {{ time.immerReactive }}
  </div>
  <div>
    {{ time.piniaReactive }}
  </div>
  <div>
    {{ time.vuexReactive }}
  </div>
</template>

<style scoped>
</style>
