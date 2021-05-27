import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import DashboardPlugin from "./material-dashboard";

// Plugins
import App from "./App.vue";
// import Chartist from "chartist";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

// router setup
import routes from "./routes/routes";

//store setup
import storeSetup from "./store";

axios.defaults.withCredentials = true;

// plugin setup
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(DashboardPlugin);
Vue.use(VueLoading);

window.axios = axios;
// configure router
const router = new VueRouter({
  mode: "history",
  routes, // short for routes: routes
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
  linkExactActiveClass: "nav-item active",
});

router.beforeEach(async (to, from, next) => {
  // const publicPages = ['/login', '/register'];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');

  // // trying to access a restricted page + not logged in
  // // redirect to login page
  // if (authRequired && !loggedIn) {
  //   next('/login');
  // } else {
  //   if(to.path==='/login' && loggedIn) next('/');
  //   else next();
  // }
  let loggedIn = store.getters["userModule/loggedIn"];
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  if (!loggedIn) {
    try {
      await store.dispatch("userModule/isLogged");
      loggedIn = store.getters["userModule/loggedIn"];
    } catch (err) {
      if (authRequired) next("/login");
    }
  }

  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    if(!authRequired && loggedIn) next('/');
    else next();
  }
});

//configure Vuex
const store = new Vuex.Store(storeSetup);

// global library setup
// Vue.prototype.$Chartist = Chartist;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
  store,
});
