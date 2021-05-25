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
        getAll({ commit }, queryParams) {
            const url = requestURL.FORMACOES.concat(queryParams ? "?" : "").concat(
                queryParams || ""
            );
            return new Promise((resolve, reject) => {
                axios.get(url).then(
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
        updateHorario({ rootGetters }, { formacaoId, horarios }) {
            const jwt = rootGetters["userModule/getToken"];
            const wrapper = { horarios: horarios };
            return new Promise((resolve, reject) => {
                axios
                    .patch(`${requestURL.FORMACOES}/${formacaoId}`, wrapper, {
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
        deleteFormacao({ rootGetters }, { formacaoId, formacao }) {
            const jwt = rootGetters["userModule/getToken"];
            return new Promise((resolve, reject) => {
                axios
                    .delete(`${requestURL.FORMACOES}/${formacaoId}`, formacao, {
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