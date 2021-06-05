<template>
  <div class="md-layout text-center">
    <notifications></notifications>
    <div
      class="md-layout-item md-size-33 md-medium-size-50 md-small-size-70 md-xsmall-size-100"
    >
      <login-card header-color="green">
        <h4 slot="title" class="title">Criar nova palavra-passe</h4>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Palavra-passe</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
        <md-field class="md-form-group" slot="inputs">
          <md-icon>lock_outline</md-icon>
          <label>Confirmar palavra-passe</label>
          <md-input v-model="confirmPassword" type="password"></md-input>
        </md-field>
        <md-field id="da-sign" class="md-form-group da-sign" slot="footer">
          <md-button id="da-button" class="md-success md-round"
            >Redefinir palavra-passe</md-button
          >
        </md-field>
      </login-card>
    </div>
  </div>
</template>
<script>
import { LoginCard } from "@/components";

export default {
  components: {
    LoginCard,
  },
  data() {
    return {
      type: ["", "info", "success", "warning", "danger"],
      email: "",
      password:"",
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
