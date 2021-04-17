<template>
  <md-toolbar
    md-elevation="0"
    class="md-transparent"
    :class="{
      'md-toolbar-absolute md-white md-fixed-top': $route.meta.navbarAbsolute
    }"
  >
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ $route.name }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-round md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <md-list>
            <md-list-item @click="logout()">
              <i class="material-icons">logout</i>
              <p>Sair</p>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>

import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userModule");

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      logoutStore: "logout",
    }),
    logout(){
      this.logoutStore();
      this.$router.push('/login');
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
  computed:{
  },
};
</script>
