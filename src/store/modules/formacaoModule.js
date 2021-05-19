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
    update({ commit, rootGetters }, { formacao, formacaoId }) {
      const jwt = rootGetters["userModule/getToken"];
      console.log(formacao, formacaoId);
      return new Promise((resolve, reject) => {
        axios
          .patch(`${requestURL.FORMACOES}/${formacaoId}`, formacao, {
            headers: { Authorization: jwt },
          })
          .then(
            (response) => {
              resolve(response.data);
            },
            (error) => {
              reject(error);
            }
          );
      });
    },
    reset({ commit }) {
      commit("setFormacoes", []);
    },
  },
  getters: {
    getAll: (state) => {
      return state.formacoes;
    },
  },
};

export default formacaoModule;
