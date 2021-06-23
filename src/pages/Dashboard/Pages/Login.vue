<template>
  <div class="md-layout text-center">
    <notifications></notifications>
    <div
      class="
        md-layout-item
        md-size-33
        md-medium-size-50
        md-small-size-70
        md-xsmall-size-100
      "
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Login</h4>
        <div slot="inputs" ref="logincard">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(handleLogin())">
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>email</md-icon>
                  <label>E-mail</label>
                  <md-input v-model="user.email" type="email"></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
              <ValidationProvider
                name="password"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                  v-show="!loggedIn"
                >
                  <md-icon>lock</md-icon>
                  <label>Palavra-passe</label>
                  <md-input v-model="user.password" type="password"></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
              <p class="forget-password">
                <router-link to="/reset-password"
                  >Esqueceu a sua palavra-passe?</router-link
                >
              </p>
              <md-field id="da-sign" class="md-form-group da-sign">
                <md-button
                  id="da-button"
                  href
                  class="md-success md-round"
                  type="submit"
                  >Entrar</md-button
                >
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <p>
                    Não tem uma conta?
                    <router-link to="/register">Regista-se já!</router-link>
                  </p>
                </div>
              </md-field>
            </form>
          </ValidationObserver>
        </div>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
import User from "@/model/user";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("confirmed", confirmed);
export default {
  components: {
    LoginCard,
    SlideYDownTransition,
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      user: new User("", "", ""),
      message: "",
    };
  },
  methods: {
    ...mapActions({
      login: "login",
    }),
    handleLogin() {
      let loader = this.$loading.show({
        container: this.$refs.logincard,
        onCancel: this.onCancel,
        background: "transparent",
      });
      const router = this.$router;

      if (this.user.email && this.user.password) {
        this.login(this.user).then(
          () => {
            loader.hide();
            router.push("/");
          },
          (error) => {
            loader.hide();
            this.message =
              error.response?.data?.message ||
              error.message ||
              error.toString();
            this.notifyVue(
              this.message.status === 403
                ? "Credenciais Inválidas"
                : this.message,
              "danger"
            );
          }
        );
      } else {
        loader.hide();
      }
    },
    notifyVue(message, type) {
      this.$notify({
        timeout: 2500,
        message,
        icon: "add_alert",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: type,
      });
    },
  },
  computed: {
    ...mapGetters({ loggedIn: "loggedIn" }),
  },
  mounted() {
    // this.loggedIn
  },
};
</script>

<style>
.social-line {
  display: none;
}
#da-sign::after {
  background-color: transparent !important;
}
.da-sign {
  display: flex;
  flex-direction: column;
}
#da-button {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
.forget-password {
  padding: 0 !important;
  margin: 0 !important;
  float: right;
}
</style>
