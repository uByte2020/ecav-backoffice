import userModule from "./modules/userModule";
import formacaoModule from "./modules/formacaoModule";
import licaoModule from "./modules/licaoModule";
import marcacaoModule from "./modules/marcacaoModule";

const store = {
  modules: {
    userModule,
    formacaoModule,
    licaoModule,
    marcacaoModule,
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