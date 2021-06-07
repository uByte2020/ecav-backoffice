<template>
  <div class="md-layout text-center">
    <notifications></notifications>
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Criar nova palavra-passe</h4>
        <div slot="inputs">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(resetPassword)">
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
                  <label>Palavra-passe</label>
                  <md-input v-model="password" type="password"></md-input>

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
                  <label>Confirmar palavra-passe</label>
                  <md-input
                    v-model="confirmPassword"
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
              <md-field id="da-sign" class="md-form-group da-sign">
                <md-button
                  type="submit"
                  id="da-button"
                  class="md-success md-round"
                  >Redefinir palavra-passe</md-button
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
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { confirmed } from "vee-validate/dist/rules";

extend("confirmed", confirmed);

export default {
  components: {
    LoginCard,
    SlideYDownTransition
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      message: "",
    };
  },
  methods: {
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
    resetPassword() {
      alert("oi");
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
