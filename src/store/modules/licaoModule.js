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
  },
  getters: {
    getAll: (state) => {
      return state.licoes;
    },
  },
};

export default licaoModule;
