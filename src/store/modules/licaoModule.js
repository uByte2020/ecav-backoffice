import requestURL from "./../../utils/apiRequestURL";

const licaoModule = {
  namespaced: true,
  state: {
    licoes: [],
  },
  mutations: {
    setLicoes(state, licoes) {
      state.licoes = licoes;
    },
  },
  actions: {
    getAll({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.LICOES).then(
          (response) => {
            if (response.data.data)
              commit("setLicoes", response.data.data.docs);
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    criarLicao({ commit, rootGetters }, licao) {
      const jwt = rootGetters["userModule/getToken"];
      return new Promise((resolve, reject) => {
        axios
          .post(requestURL.LICOES, licao, {
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
  },
  getters: {
    getAll: (state) => {
      return state.licoes;
    },
  },
};

export default licaoModule;
