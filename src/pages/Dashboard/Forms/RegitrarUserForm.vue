<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(submit)">
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
            <md-input v-model="user.passwordConfirm" type="password"></md-input>

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
          <md-field v-show="loggedIn && restrictTo(0,1)"
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
        <!-- @click="handleRegister()" -->
        <div class="button-container">
          <md-button href class="md-success mt-4" slot="footer" type="submit"
            >Registrar</md-button
          >
        </div>
      </form>
    </ValidationObserver>
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
  name: "registrar-user-form",
  components: {
    SlideYDownTransition,
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
      register: "userModule/register",
    }),
    submit() {
      this.message = "";
      this.submitted = true;

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
    if (!this.loggedIn) this.user.role = 2;
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      perfis: "perfilModule/getAll",
      restricao: "userModule/restrictTo",
      loggedIn: "userModule/loggedIn",
    }),
    getPerfis() {
      return this.loggedIn
        ? this.perfis
        : this.perfis.filter((p) => ![0, 1].includes(p.perfilCode));
    },
    restrictTo() {
      return this.restricao;
    },
  },
};
</script>
<style>
.da-layout {
  width: 50% !important;
}
</style>
