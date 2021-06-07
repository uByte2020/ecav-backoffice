<template>
  <div class="md-layout da-layout">
    <notifications></notifications>
    <div class="md-layout-item">
      <login-card header-color="green">
       <h4 slot="title" class="title">Resgistar-se</h4>
        <div slot="inputs">
          <registrar-user-form @is-add="userRegistered"/>
          <md-field id="da-sign" class="md-form-group da-sign" slot="inputs">
          <div class="md-layout-item md-small-size-100 md-size-100">
            <p>
              Já tem uma conta?
              <router-link to="/login">Iniciar sessão</router-link>
            </p>
          </div>
        </md-field>
        </div>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
import { mapGetters, mapActions } from "vuex";
import { RegitrarUserForm } from "@/pages";
export default {
  components: {
    LoginCard,
    "registrar-user-form": RegitrarUserForm,
    
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
