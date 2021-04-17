import userModule from "./modules/userModule";

const store = {
  modules: {
    userModule,
  },
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
};

export default store;