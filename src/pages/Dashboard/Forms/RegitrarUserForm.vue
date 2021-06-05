<template>
  <div ref="registerForm">
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
            v-show="!loggedIn"
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
            v-show="!loggedIn"
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
          <md-field
            v-show="loggedIn && restrictTo(0, 1)"
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
          <md-button
            v-show="loggedIn"
            slot="footer"
            class="md-warning  mt-4"
            @click="$emit('close', true)"
            >Cancelar</md-button
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import User from "@/model/user";
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
  props: {
    loggedInProp: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
      message: "",
      boolean: false,
      loggedIn: false
    };
  },
  methods: {
    ...mapActions({
      register: "userModule/register",
      createUser: "userModule/createUser",
    }),
    submit() {
      this.message = "";
      this.submitted = true;

      let loader = this.$loading.show({
        container: this.$refs.registerForm,
        onCancel: this.onCancel,
        background: "transparent",
      });

      const request = this.loggedIn ? this.createUser(this.user):this.register(this.user);
      
      request.then(
        (data) => {
          this.successful = true;
          loader.hide();
          this.$emit('is-add', true);
          if(this.loggedIn) this.notifyVue('Utilizador Registrado com Sucesso', "success");
        }).catch(
        (error) => {
          this.message == error.response?.data?.message ||
              error.message ||
              error.toString();
            loader.hide();
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
    this.loggedIn = this.loggedInProp;
    if (!this.loggedIn) {
      this.user.role = 2;
    }else{
      this.user.password = "ecav123";
      this.user.passwordConfirm = "ecav123";
    }
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      perfis: "perfilModule/getAll",
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
  watch:{
    loggedInProp(value){
      this.loggedIn = value;
    }
  }
};
</script>
<style>
.da-layout {
  width: 50% !important;
}
</style>
