<template>
  <ul class="nav nav-mobile-menu">
    <hr>
    <li>
      <a @click="logout" data-toggle="dropdown" class="dropdown-toggle"
        ><i class="material-icons">logout</i>
        <p>Sair</p></a
      >
    </li>
  </ul>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("userModule");

export default {
  data() {
    return {
      search: null,
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ]
    };
  },
    methods: {
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
};
</script>
