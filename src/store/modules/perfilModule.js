import requestURL from "../../utils/apiRequestURL";

const perfilModule = {
  namespaced: true,
  state: {
    perfis: [],
  },
  mutations: {
    setPerfis(state, perfis) {
      state.perfis = perfis;
    },
  },
  actions: {
    getAll({ commit }) {
      return new Promise((resolve, reject) => {
        axios.get(requestURL.PERFIS).then(
          (response) => {
            if (response.data.data)
              commit("setPerfis", response.data.data.docs);
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
      return state.perfis;
    },
  },
};

export default perfilModule;
