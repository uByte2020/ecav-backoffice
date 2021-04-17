<template>
  <div class="md-layout text-center">
    <notifications></notifications>
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Login</h4>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>Email...</label>
          <md-input v-model="user.email" type="email"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Password</label>
          <md-input v-model="user.password" type="password" v-on:keyup.enter="handleLogin()"></md-input>
        </md-field>
        <md-button href class="md-success md-round mt-4" slot="footer" @click="handleLogin()"
            >Entrar</md-button
        >
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components"; 
import User from '@/model/user'
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");

export default {
  components: {
    LoginCard,
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      user: new User('','',''),
      loading: false,
      message: ''
    };
  },
  methods:{
    ...mapActions({
      login: "login",
    }),
    handleLogin() {
      this.loading = true;
      const router = this.$router;

      if (this.user.email && this.user.password) {
        this.login(this.user).then(
          () => {
            router.push('/');
          },
          error => {
            console.log(error)
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
              this.notifyVue(this.message.status===403 ? 'Credenciais Inválidas':this.message.message, 'danger');
          }
        );
      }
    },
    notifyVue(message, type) {
      this.$notify({
        timeout: 2500,
        message,
        icon: "add_alert",
        horizontalAlign: 'right',
        verticalAlign: 'top',
        type: type
      });
    },
  },
  computed:{
    ...mapGetters({ loggedIn: "loggedIn" }),
  },
  mounted(){
    // this.loggedIn
  }
};
</script>

<style>
.social-line {
  display: none;
}
</style>
