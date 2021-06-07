<template>
  <div class="md-layout text-center">
    <notifications></notifications>
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Redefinir palavra-passe</h4>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>email</md-icon>
          <label>E-mail</label>
          <md-input v-model="email" type="email"></md-input>
        </md-field>
        <md-field id="da-sign" class="md-form-group da-sign" slot="footer">
          <md-button
            @click="sendEmail()"
            id="da-button"
            class="md-success md-round"
            >Enviar</md-button
          >
        </md-field>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
export default {
  components: {
    LoginCard,
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
          this.email = '';
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
