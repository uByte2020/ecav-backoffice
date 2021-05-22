<template>
  <div ref="marcacaoModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Registrar Utilizador</md-dialog-title>
      <md-dialog-content>
        <div class="md-layout">
          <div class="md-layout-item">
              <div
                class="md-layout-item md-size-100 md-medium-size-100 md-small-size-100 mr-auto"
                slot="content-center"
              >
                <registrar-user-form :loggedInProp="true" @close="closeModel"  @is-add="userRegistered"/>
              </div>
          </div>
        </div>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import { RegitrarUserForm } from "@/pages";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "add-user-model",
  components: {
    "registrar-user-form": RegitrarUserForm,
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
    };
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    ...mapActions({
      getUsers: "userModule/getAll",
    }),
    
    closeModel(status){
      this.$emit('hide-dialog',!status);
    },
    userRegistered(status){
      this.getUsers();
      this.$emit('hide-dialog',!status);
    },
  },
  computed: {
    
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
