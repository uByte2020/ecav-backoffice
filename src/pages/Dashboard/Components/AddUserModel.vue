<template>
  <div ref="marcacaoModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Registrar Utilizador</md-dialog-title>
      <md-dialog-content>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
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
                name="perfil"
                rules="required"
                v-slot="{ passed, failed }"
              >
                <md-field
                  class="md-form-group"
                  :class="[{ 'md-error': failed }, { 'md-valid': passed }]"
                >
                  <md-icon>person</md-icon>
                  <label for="perfil">Perfis</label>
                  <md-select v-model="user.role" name="perfil">
                    <md-option
                      v-for="item in getPerfis"
                      :key="item.perfilCode"
                      :label="item.perfil"
                      :value="item.perfilCode"
                    >
                      {{ item.perfil }}
                    </md-option>
                  </md-select>
                </md-field>
              </ValidationProvider>
              <div class="button-container">
                <md-button
                  href
                  class="md-success mt-4"
                  type="submit"
                  slot="footer"
                  >Registrar</md-button
                >
                <md-button
                  slot="footer"
                  class="md-warning  mt-4"
                  @click="$emit('hide-dialog', false)"
                  >Cancelar</md-button
                >
              </div>
            </div>
          </form>
        </ValidationObserver>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import User from "@/model/user";
// import { createNamespacedHelpers } from "vuex";
// const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
import { mapGetters, mapActions } from "vuex";
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("confirmed", confirmed);
export default {
  name: "add-user-model",
  components: {
    SlideYDownTransition,
  },
  props: {
    showDialogProp: {
      type: Boolean,
      default: true,
    },
    headerColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      showDialog: this.showDialogProp,
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      boolean: false,
    };
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    ...mapActions({
      register: "userModule/register",
    }),
    submit() {
      this.message = "";
      this.submitted = true;
      this.user.passwordConfirm = 123;
      this.user.password = 123;

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
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      perfis: "perfilModule/getAll",
    }),
    getPerfis() {
      return this.perfis;
    },
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
      if (!this.showDialog) {
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
