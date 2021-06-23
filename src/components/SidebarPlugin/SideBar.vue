<template>
  <div
    class="sidebar"
    :data-color="activeColor"
    :data-image="backgroundImage"
    :data-background-color="backgroundColor"
    :style="sidebarStyle"
  >
    <div class="logo">
      <router-link to="/dashboard" class="simple-text logo-mini">
        <div class="logo-img">
          <img id="logotipo-img" :src="logo" />
        </div>
      </router-link>
      <router-link to="/dashboard" class="simple-text logo-normal">
        <template>{{ title }}</template>
      </router-link>
      <div class="navbar-minimize">
        <md-button
          id="minimizeSidebar"
          class="md-round md-just-icon md-transparent"
          @click="minimizeSidebar"
        >
          <i class="material-icons text_align-center visible-on-sidebar-regular"
            >more_vert</i
          >
          <i
            class="material-icons design_bullet-list-67 visible-on-sidebar-mini"
            >view_list</i
          >
        </md-button>
      </div>
    </div>
    <div class="sidebar-wrapper" ref="sidebarScrollArea">
      <slot></slot>
      <md-list class="nav">
        <slot name="links">
          <sidebar-item
            v-for="(link, index) in sidebarLinks"
            :key="link.name + index"
            :link="link"
          >
            <sidebar-item
              v-for="(subLink, index) in link.children"
              :key="subLink.name + index"
              :link="subLink"
            >
            </sidebar-item>
          </sidebar-item>
        </slot>
      </md-list>
    </div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userModule");
export default {
  name: "sidebar",
  props: {
    title: {
      type: String,
      default: "ECAV",
    },
    activeColor: {
      type: String,
      default: "green",
      validator: (value) => {
        let acceptedValues = [
          "",
          "purple",
          "azure",
          "green",
          "orange",
          "danger",
          "rose",
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    /*backgroundImage: {
      type: String,
      default: "./img/sidebar-2.jpg",
    },*/
    backgroundColor: {
      type: String,
      default: "black",
      validator: (value) => {
        let acceptedValues = ["", "black", "white", "red"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    logo: {
      type: String,
      default: "./img/Ecav50anos.jpg",
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
    };
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
    ...mapActions({
      logoutStore: "logout",
    }),
    logout() {
      this.logoutStore()
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((err) => {
          this.$router.push("/login");
        });
    },
  },
  computed: {
    sidebarStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
      };
    },
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>
<style>
#logotipo-img {
  width: 100%;
  top: 0;
}
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
}
.da-divider {
  border-color: rgb(71, 71, 71);
  height: 0.5px;
  margin: 10px 10px;
}
</style>
