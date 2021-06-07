<template>
  <div class="md-layout text-center">
    <notifications></notifications>
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Redefinir palavra-passe</h4>
        <div slot="inputs">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(sendEmail)">
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
                  <md-input v-model="email" type="email"></md-input>
                  <slide-y-down-transition>
                    <md-icon class="error" v-show="failed">close</md-icon>
                  </slide-y-down-transition>
                  <slide-y-down-transition>
                    <md-icon class="success" v-show="passed">done</md-icon>
                  </slide-y-down-transition>
                </md-field>
              </ValidationProvider>
              <md-field id="da-sign" class="md-form-group da-sign">
                <md-button
                  type="submit"
                  id="da-button"
                  class="md-success md-round"
                  >Enviar</md-button
                >
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
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);

export default {
  components: {
    LoginCard,
    SlideYDownTransition,
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      loading: false,
      email: "",
      message: "",
    };
  },
  methods: {
    ...mapActions({
      forgotPassword: "forgotPassword",
    }),
    sendEmail() {
      let loader = this.$loading.show({
        container: this.$refs.registerForm,
        onCancel: this.onCancel,
        background: "transparent",
      });
      this.forgotPassword(this.email).then(
        (response) => {
          this.message = response?.message || response.toString();
          this.notifyVue(this.message, "success");
          loader.hide();
          this.email = "";
        },
        (error) => {
          this.loading = false;
          this.message =
            error.response?.data?.message || error.message || error.toString();
          this.notifyVue(this.message, "danger");
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
