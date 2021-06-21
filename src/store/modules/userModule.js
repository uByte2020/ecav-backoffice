import AuthService from "./../../service/auth.service";
import UserService from "./../../service/user.service";
import requestURL from "./../../utils/apiRequestURL";

// const user = JSON.parse(localStorage.getItem("user"));
// const token = JSON.parse(localStorage.getItem("token"));
const initialState = {
    status: { loggedIn: false },
    user: null,
    token: null,
    users: [],
};

const userModule = {
    namespaced: true,
    state: initialState,
    mutations: {
        loginSuccess(state, response) {
            state.status.loggedIn = true;
            state.user = response.user;
            state.token = response.token;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.token = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.token = null;
        },
        registerSuccess(state, response) {
            state.status.loggedIn = true;
            state.user = response.user;
            state.token = response.token;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.token = null;
        },
        setUsers(state, users) {
            state.users = users;
        },
        setUser(state, user) {
            state.user = user;
        },
    },
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                (response) => {
                    commit("loginSuccess", response);
                    return Promise.resolve(response.user);
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },
        isLogged: ({ commit }) => {
            return AuthService.isLogged().then(
                (response) => {
                    commit("loginSuccess", response);
                    return Promise.resolve(response.user);
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },
        setAuthStatus({ commit }) {
            const userAuth = JSON.parse(localStorage.getItem("user"));
            if (userAuth) commit("loginSuccess", userAuth);
            else commit("loginFailure");
        },
        logout({ commit, dispatch }) {
            commit("logout");
            commit("setUsers", []);
            dispatch("formacaoModule/reset", null, { root: true });
            dispatch("licaoModule/reset", null, { root: true });
            dispatch("marcacaoModule/reset", null, { root: true });
            dispatch("perfilModule/reset", null, { root: true });
            return AuthService.logout().then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },
        register({ commit }, user) {
            return AuthService.register(user).then(
                (response) => {
                    commit("registerSuccess", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },
        updateMe({ commit }, user) {
            return AuthService.updateMe(user).then(
                (response) => {
                    commit("setUser", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        getAll({ commit }) {
            return UserService.getAll().then(
                (response) => {
                    if (response) commit("setUsers", response);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        createUser({ commit }, user) {
            return UserService.createUser(user).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        updateUserState({ rootGetters }, { id, state }) {
            const jwt = rootGetters["userModule/getToken"];
            const wrapper = { isBloqued: state };
            return new Promise((resolve, reject) => {
                axios
                    .patch(requestURL.USERS + `/${id}`, wrapper, {
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
        forgotPassword: ({ commit }, email) => {
            return AuthService.forgotPassword(email).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        resetPassword: ({ commit }, { password, passwordConfirm, token }) => {
            const wrapper = { password: password, passwordConfirm: passwordConfirm };
            return new Promise((resolve, reject) => {
                axios.patch(requestURL.RESET_PASSWORD + `/${token}`, wrapper).then(
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
            commit("logout");
            commit("setUsers", []);
        },
    },
    getters: {
        loggedIn: (state) => {
            return state.status.loggedIn;
        },
        getToken: (state) => {
            return state.user ? `Bearer ${state.token}` : "";
        },
        getUser: (state) => {
            return state.user ? state.user : null;
        },
        restrictTo: (state) => (...role) => {
            return (
                state.user &&
                state.user.role &&
                role.includes(state.user.role.perfilCode)
            );
        },
        getAll: (state) => {
            return state.users;
        },
        getFormadores: (state) => {
            return state.users.filter((u) => u.role.perfilCode == 1);
        },
        getUserPhoto: (state) => {
            return `${requestURL.PROFILE_PHOTO}/${state.user.photo}`;
        },
    },
};

export default userModule;