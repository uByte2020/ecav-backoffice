import requestURL from "./../../utils/apiRequestURL";

const formacaoModule = {
  namespaced: true,
  state: {
    formacoes: [],
  },
  mutations: {
    setFormacoes(state, formacoes) {
      state.formacoes = formacoes;
    },
  },
  actions: {
    getAll({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.FORMACOES).then(
          (response) => {
            if (response.data.data)
              commit("setFormacoes", response.data.data.docs);
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
  },
  getters: {
    getAll: (state) => {
      return state.formacoes;
    },
  },
};

export default formacaoModule;
