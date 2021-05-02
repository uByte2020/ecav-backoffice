import requestURL from "./../../utils/apiRequestURL";

const marcacaoModule = {
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
    getMyMarcacoes({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.MYMARCACOES).then(
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
    criarMarcacao({ commit, rootGetters }, marcacao) {
      const jwt = rootGetters["userModule/getToken"];
      return new Promise((resolve, reject) => {
        axios.post(requestURL.MARCACOES, marcacao,{headers: {"Authorization": jwt}}).then(
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

export default marcacaoModule;
