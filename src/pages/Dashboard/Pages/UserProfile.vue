<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form header-color="green"> </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card @update-user="updateMe()" button-color="success">
        </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import { EditProfileForm, UserCard } from "@/pages";
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("userModule");
export default {
  components: {
    EditProfileForm,
    UserCard,
  },

  methods: {
    ...mapActions({
      userUpdateMe: "updateMe",
    }),
    async updateMe(user) {
      await this.userUpdateMe(user)
        .then((response) => {
          this.notifyVue("Operação Realizada com Sucesso", "success");
          this.$emit("hide-dialog", false);
        })
        .catch((error) => {
          const message =
            error.response?.data?.message || error.message || error.toString();
          this.notifyVue(message, "danger");
        });
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
<style lang="scss">
.text-right {
  display: flex;
}
</style>
