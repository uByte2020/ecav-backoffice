<template>
  <div class="md-layout da-layout">
    <div class="md-layout-item">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <signup-card>
            <h2 class="title text-center" slot="title">Registrar-se</h2>

            <div
              class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
              slot="content-center"
            >
              <ValidationProvider
                name="first_last_name"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>person</md-icon>
                  <label>Primeiro e Ultimo Nome</label>
                  <md-input v-model="user.name" type="text"></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

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
                  <label>Email</label>
                  <md-input v-model="user.email" type="text"></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <ValidationProvider
                name="telemovel"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>phone</md-icon>
                  <label>Telemóvel</label>
                  <md-input v-model="user.telemovel" type="text"></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <ValidationProvider
                name="endereco"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>home</md-icon>
                  <label>Endereço</label>
                  <md-input v-model="user.endereco" type="text"></md-input>

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
                rules="required|confirmed:confirmation"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>lock</md-icon>
                  <label>Password</label>
                  <md-input v-model="user.password" type="password"></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <ValidationProvider
                vid="confirmation"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>lock</md-icon>
                  <label>Confirmar Password</label>
                  <md-input
                    v-model="user.passwordConfirm"
                    type="password"
                  ></md-input>

                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>

              <!-- @click="handleRegister()" -->
              <div class="button-container">
                <md-button
                  href
                  class="md-success md-round mt-4"
                  slot="footer"
                  type="submit"
                  >Registrar</md-button
                >
              </div>
            </div>
          </signup-card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { SignupCard } from "@/components";
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
    SignupCard,
  },
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      boolean: false,
    };
  },
  methods: {
    ...mapActions({
      register: "register",
    }),
    submit() {
      this.message = "";
      this.submitted = true;
      this.user.role = 2;

      this.register(this.user).then(
        (data) => {
          this.successful = true;
          this.$router.push("/");
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.notifyVue(this.message, "danger");
          this.successful = false;
        }
      );
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
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({ loggedIn: "loggedIn" }),
  },
};
</script>
<style>
.da-layout {
  width: 50% !important;
}
</style>
