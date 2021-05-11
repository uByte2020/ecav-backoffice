import AuthService from "./../../service/auth.service";

const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));
const initialState = user && token
  ? { status: { loggedIn: true }, user, token }
  : { status: { loggedIn: false }, user: null, token: null };

const userModule = {
  namespaced: true,
  state: initialState,
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
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
    logout({ commit }) {
      commit("logout");
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
  },
};

export default userModule;