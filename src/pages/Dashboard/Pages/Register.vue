<template>
  <div class="md-layout da-layout">
    <div class="md-layout-item">
      <signup-card>
        <h2 class="title text-center" slot="title">Registrar-se</h2>
        <div
          class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
          slot="content-center"
        >
          <md-field
            class="md-form-group"
          >
            <md-icon>person</md-icon>
            <label>Primeiro e Ultimo Nome</label>
            <md-input v-model="user.name" type="text"></md-input>
          </md-field>
          <md-field
            class="md-form-group"
          >
            <md-icon>email</md-icon>
            <label>Email</label>
            <md-input v-model="user.email" type="text"></md-input>
          </md-field>
          <md-field
            class="md-form-group"
          >
            <md-icon>phone</md-icon>
            <label>Telemóvel</label>
            <md-input v-model="user.telemovel" type="text"></md-input>
          </md-field>
          <md-field
            class="md-form-group"
          >
            <md-icon>home</md-icon>
            <label>Endereço</label>
            <md-input v-model="user.endereco" type="text"></md-input>
          </md-field>
          <md-field
            class="md-form-group"
          >
            <md-icon>lock</md-icon>
            <label>Password</label>
            <md-input v-model="user.password" type="password"></md-input>
          </md-field>
          <md-field
            class="md-form-group"
          >
            <md-icon>lock</md-icon>
            <label>Confirmar Password</label>
            <md-input v-model="user.passwordConfirm" type="password"></md-input>
          </md-field>
          <div class="button-container">
            <md-button href class="md-success md-round mt-4" slot="footer" @click="handleRegister()"
              >Registrar</md-button
            >
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
import User from '@/model/user'
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");

export default {
  components: {
    SignupCard
  },
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: '',
      boolean: false,
    };
  },
  methods:{
    ...mapActions({
      register: "register",
    }),
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.user.role = 2;
      
      this.register(this.user).then(
        data => {
          this.successful = true;
          this.$router.push('/');
        },
        error => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.notifyVue(this.message, 'danger');
          this.successful = false;
        }
      );
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
   mounted() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  computed:{
    ...mapGetters({ loggedIn: "loggedIn" }),
  },
};
</script>
<style>
.da-layout{
  width: 50%!important;
}
</style>
