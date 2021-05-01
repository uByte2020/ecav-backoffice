import requestURL from "./../../utils/apiRequestURL";

const licaoModule = {
  namespaced: true,
  state: {
    marcacoes: [],
  },
  mutations: {
    setMarcacoes(state, marcacoes) {
      state.marcacoes = marcacoes;
    },
  },
  actions: {
    getAll({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.MARCACOES).then(
          (response) => {
            if (response.data.data)
              commit("setMarcacoes", response.data.data.docs);
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    getByAluno({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.MARCACOES).then(
          (response) => {
            if (response.data.data)
              commit("setMarcacoes", response.data.data.docs);
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    getByFormador({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.MARCACOES).then(
          (response) => {
            if (response.data.data)
              commit("setMarcacoes", response.data.data.docs);
            resolve(response.data);
          },
          (error) => {
            reject(error);
          }
        );
      });
    },
    criarMarcacao({ commit }, marcacao) {
      return new Promise((resolve, reject) => {
        axios.post(requestURL.MARCACOES, marcacao).then(
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
      return state.marcacoes;
    },
  },
};

export default licaoModule;
