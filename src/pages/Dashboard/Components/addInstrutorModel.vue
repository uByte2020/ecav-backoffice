<template>
  <div ref="licalModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Adicionar Formador</md-dialog-title>
      <md-dialog-content>
        <form>
          <div class="md-layout">
            <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
                <label for="fomadores">Formadores</label>
                <md-select
                  v-model="fomadores"
                  name="fomadores"
                  id="fomadores"
                  multiple
                >
                  <md-option
                    v-for="item in getFormadores"
                    :value="item._id"
                    :key="item._id"
                    >{{ item.name }}</md-option
                  >
                </md-select>
              </md-field>
            </div>
          </div>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="addFormadores"
          >Adicionar</md-button
        >
        <md-button
          class="md-warning"
          @click="
            $emit('hide-dialog', { formadores: null, modalStatus: false })
          "
          >Cancelar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "add-instrutor-model",
  props: {
    formadoresProp: {
      type: Array,
      default: () => {
        return [];
      },
    },
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
      fomadores: [],
    };
  },
  methods: {
    addFormadores() {
      this.$emit("hide-dialog", { fomadores: this.fomadores, modalStatus: false });
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "userModule/getUser",
      getFormadoresAction: "userModule/getFormadores",
    }),
    getFormadores(){
      return this.getFormadoresAction.filter(f=>!this.formadoresProp.includes(f._id));
    }
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
      if (!this.showDialog) {
        this.fomadores= [];
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
