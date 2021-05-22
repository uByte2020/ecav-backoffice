<template>
  <div class="md-layout da-layout">
    <notifications></notifications>
    <div class="md-layout-item">
      <signup-card>
        <h2 class="title text-center" slot="title">Registrar-se</h2>
        <div
          class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
          slot="content-center"
        >
          <registrar-user-form @is-add="userRegistered"/>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
import { mapGetters, mapActions } from "vuex";
import { RegitrarUserForm } from "@/pages";
export default {
  components: {
    "registrar-user-form": RegitrarUserForm,
    SignupCard,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      register: "userModule/register",
      getPerfis: "perfilModule/getAll",
    }),
    userRegistered(status){
      if (status) {
      this.$router.push("/");
    }
    },
  },
  mounted() {
    this.getPerfis();
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({ loggedIn: "userModule/loggedIn" }),
  },
};
</script>
<style>
@media (min-width: 600px)
{
  .da-layout {
  width: 50% !important;
  }
}
@media (max-width: 600px)
{
  .da-layout {
    width: 100% !important;
  }
}


</style>
