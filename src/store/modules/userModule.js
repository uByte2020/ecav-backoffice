import AuthService from "./../../service/auth.service";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

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
  },
  actions: {
    login({ commit }, user) {
      
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    setAuthStatus({commit}){
      const userAuth = JSON.parse(localStorage.getItem('user'));
      if(userAuth) commit('loginSuccess', userAuth);
      else commit('loginFailure');
    },
    logout({commit}){
      commit('logout');
      AuthService.logout();
    }
  },
  getters: {
    loggedIn: (state) => {
      return state.status.loggedIn;
    },
    getToken: (state) => {
      return state.user ? state.user.token:'';
    },
    getUser: (state) => {
      return state.user ? state.user.data : null;
    },
  },
};

export default userModule;