import AuthService from "./../../service/auth.service";
import UserService from "./../../service/user.service";
 
const user = JSON.parse(localStorage.getItem('user'));
const token = JSON.parse(localStorage.getItem('token'));
const initialState =
  user && token
    ? { status: { loggedIn: true }, user, token, users: [] }
    : { status: { loggedIn: false }, user: null, token: null, users: [] };

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
    updateMe({ commit }, user)  {
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
  },
};

export default userModule;