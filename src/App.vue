<script setup>
import { reactive, ref } from "vue";
import { useTestStore } from "./useTestStore";
import { vuexStore as testStoreVuex } from "./useVuexStore";

const testStore = useTestStore();

const refVar = ref(0);
const reactiveVar = reactive({ key: 0 });

const time = reactive({
  ref: 0,
  reactive: 0,
  piniaRef: 0,
  piniaReactive: 0,
  vuexRef: 0,
  vuexReactive: 0,
});
const counter = 1000000;

let startTime = Date.now();
for (let i = 0; i < counter; i++) {
  refVar.value = i;
}
time.ref = `Ref time: ${Date.now() - startTime}ms`;
console.log(time.ref);
console.log(refVar.value);

startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStore.count = i;
}
time.piniaRef = `Pinia ref time: ${Date.now() - startTime}ms`;
console.log(time.piniaRef);
console.log(testStore.count);

startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStoreVuex.state.count = i;
}
time.vuexRef = `Vuex ref time: ${Date.now() - startTime}ms`;
console.log(time.vuexRef);
console.log(testStore.count);
// ------
// Native vue reactive
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  reactiveVar.key = i;
}
time.reactive = `Reactive time: ${Date.now() - startTime}ms`;
console.log(time.reactive);
console.log(reactiveVar.key);
// Pinia
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStore.countReactive.key = i;
}
time.piniaReactive = `Pinia reactive time: ${Date.now() - startTime}ms`;
console.log(time.piniaReactive);
console.log(testStore.countReactive.key);
// Vuex
startTime = Date.now();
for (let i = 0; i < counter; i++) {
  testStoreVuex.state.countReactive.key = i;
}
time.vuexReactive = `Vuex reactive time: ${Date.now() - startTime}ms`;
console.log(time.vuexReactive);
console.log(testStoreVuex.state.countReactive.key);
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
    {{ time.piniaReactive }}
  </div>
  <div>
    {{ time.vuexReactive }}
  </div>
</template>

<style scoped>
</style>
