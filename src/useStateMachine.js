import { shallowRef } from "vue";
import { createMachine, assign, createActor } from 'xstate';
const countMachine = createMachine({
  context: {
    count: 0,
  },
  on: {
    INC: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    DEC: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    SET: {
      actions: assign({
        count: ({ event }) => event.value,
      }),
    },
  },
});
const state = shallowRef(countMachine.context?.count ?? 0);
const countActor = createActor(countMachine).start();
countActor.subscribe((state) => {
  console.log(state.context.count)
})
export { state, countActor };
