import userModule from "./modules/userModule";
import formacaoModule from "./modules/formacaoModule";
import licaoModule from "./modules/licaoModule";
import marcacaoModule from "./modules/marcacaoModule";
import perfilModule from "./modules/perfilModule";

const store = {
  namespaced: true,
  modules: {
    userModule,
    formacaoModule,
    licaoModule,
    marcacaoModule,
    perfilModule,
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