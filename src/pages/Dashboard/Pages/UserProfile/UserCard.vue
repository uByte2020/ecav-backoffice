<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar" ref="profilePhoto">
      <img class="img" :src="getUserPhoto" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">{{ getUser.role.perfil }}</h6>
      <h4 class="card-title">{{ getUser.name }}</h4>
      <input
        type="file"
        style="display: none"
        accept="image/jpeg, image/png,
      image/jpg"
        ref="fileInput"
        @change="updateProfilePhoto($event)"
      />
      <md-button
        class="md-round"
        :class="getColorButton(buttonColor)"
        @click="$refs.fileInput.click()"
        >Alterar Foto</md-button
      >
    </md-card-content>
  </md-card>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: "./img/default.png",
    },
    buttonColor: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  methods: {
    getColorButton: function (buttonColor) {
      return "md-" + buttonColor + "";
    },
    updateProfilePhoto(event) {
      let loader = this.$loading.show({
        container: this.$refs.profilePhoto,
        onCancel: this.onCancel,
        background: "transparent",
      });
      const files = event.currentTarget.files;
      const user = new FormData();
      user.append("photo", files[0]);

      this.userUpdateMe(user)
        .then((response) => {
          loader.hide();
          this.notifyVue("Operação Realizada com Sucesso", "success");
          this.$emit("hide-dialog", false);
        })
        .catch((error) => {
          loader.hide();
          const message =
            error.response?.data?.message || error.message || error.toString();
          this.notifyVue(message, "danger");
        });
    },
    ...mapActions({
      userUpdateMe: "updateMe",
    }),
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
    ...mapGetters({ getUser: "getUser", getUserPhoto: "getUserPhoto" }),
  },
};
</script>
<style></style>
