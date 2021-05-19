<template>
  <form>
    <md-card>
      <md-card-header
        class="md-card-header-icon"
        :class="getClass(headerColor)"
      >
        <div class="card-icon">
          <md-icon>perm_identity</md-icon>
        </div>
        <h4 class="title">Perfil - <small>Complete o seu perfil</small></h4>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>First Name</label>
              <md-input v-model="user.firstName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Last Name</label>
              <md-input v-model="user.lastName" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Email</label>
              <md-input v-model="user.email" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-33">
            <md-field>
              <label>Telemóvel</label>
              <md-input v-model="user.telemovel" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Endereço</label>
              <md-input v-model="user.endereco" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success mt-4" @click="updateUser()"
              >Actualizar Perfil</md-button
            >
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
export default {
  name: "edit-profile-form",
  props: {
    headerColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        name: null,
        email: null,
        role: null,
        telemovel: null,
        endereco: null,
      },
    };
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    setNames(nome) {
      // console.log(nome);
      if (nome !== null) {
        const names = nome.split(" ");
        this.user.firstName = names[0];
        this.user.lastName = names[1];
      }
    },
    updateUser() {
      let loader = this.$loading.show({
        container: this.$refs.marcacaoModel,
        onCancel: this.onCancel,
        background: "transparent",
      });

      const user = {};
      user.name = `${this.user.firstName} ${this.user.lastName}`;
      user.email = this.user.email;
      user.role = this.user.role;
      user.telemovel = this.user.telemovel;
      user.endereco = this.user.endereco;
      
      this.userUpdateMe(user)
        .then((response) => {
          this.notifyVue("Operação Realizada com Sucesso", "success");
          loader.hide();
          this.$emit("hide-dialog", false);
        })
        .catch((error) => {
          const message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
          loader.hide();
          this.notifyVue(message, "danger");
        });
    },
    notifyVue(message, status) {
      this.$notify({
        message: message,
        icon: "add_alert",
        horizontalAlign: "right",
        verticalAlign: "top",
        type: status,
      });
    },
    ...mapActions({
      userUpdateMe: "updateMe",
    }),
  },
  computed: {
    ...mapGetters({ getUser: "getUser" }),
  },
  mounted() {
    this.user.name = this.getUser.name;
    this.user.email = this.getUser.email;
    this.user.role = this.getUser.role;
    this.user.telemovel = this.getUser.telemovel;
    this.user.endereco = this.getUser.endereco;
    this.setNames(this.user.name);
  },
  watch: {
    getUser(value) {
      this.user.name = value.name;
      this.user.email = value.email;
      this.user.role = value.role;
      this.user.telemovel = value.telemovel;
      this.user.endereco = value.endereco;
      this.setNames(this.user.name);
    },
  },
};
</script>
<style></style>
