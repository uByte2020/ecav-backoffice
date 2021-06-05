<template>
  <div ref="licalModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Nova Lição</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="formacao">Formação</label>
                    <md-select
                      v-model="licao.formacao"
                      name="formacao"
                      id="formacao"
                    >
                      <md-option
                        v-for="(formacao, formacaoIdx) in formacoes"
                        :value="formacao._id"
                        :key="formacaoIdx"
                        >{{ formacao.nome }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="categoria">Categoria</label>
                    <md-select
                      v-model="licao.categoria"
                      name="categoria"
                      id="categoria"
                    >
                      <md-option
                        v-for="(categoria, categoriaIdx) in getCategories"
                        :key="categoriaIdx"
                        :value="categoria._id"
                        >{{ categoria.categoria }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      type="search"
                      class="mb-3"
                      clearable
                      style="width: 200px"
                      placeholder="Lição"
                      v-model="licao.nome"
                    >
                    </md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      type="search"
                      class="mb-3"
                      clearable
                      style="width: 200px"
                      placeholder="Descrição"
                      v-model="licao.descricao"
                    >
                    </md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="criarLicao"
          >Add Lição</md-button
        >
        <md-button class="md-warning" @click="$emit('hide-dialog', false)"
          >Cancelar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "add-licao-model",
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
      licao: {
        nome: null,
        categoria: null,
        descricao: null,
        formacao: null,
        estado: 1,
      },
      formacoes: [],
    };
  },
  methods: {
    criarLicao() {
      const licao = { ...this.licao };
      let loader = this.$loading.show({
        container: this.$refs.licalModel,
        onCancel: this.onCancel,
        background: "transparent",
      });
      this.criarLicaoAction(licao)
        .then((response) => {
          this.notifyVue("Lição Inserida com Sucesso", "success");
          loader.hide();
          this.$emit("hide-dialog", false);
          this.getAll();
        })
        .catch((error) => {
          const message =error.response?.data?.message ||
              error.message ||
              error.toString();
          loader.hide();
          this.notifyVue(message, "danger");
        });
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
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
    ...mapActions({
      criarLicaoAction: "licaoModule/criarLicao",
      getAll: "licaoModule/getAll",
    }),
  },
  computed: {
    ...mapGetters({
      getAllFormacoes: "formacaoModule/getAll",
      currentUser: "userModule/getUser",
    }),
    minDate() {
      const currentDate = new Date();
      const monthAux = currentDate.getMonth() + 1;
      const month = monthAux <= 9 ? "0" + monthAux : monthAux;
      const dayAux = currentDate.getDate();
      const day = dayAux <= 9 ? "0" + dayAux : dayAux;
      return `${new Date().getFullYear()}-${month}-${day}`;
    },
    getCategories() {
      if (this.licao.formacao)
        return this.formacoes.find((el) => el._id === this.licao.formacao)
          .categorias;
      return [];
    },
    getCategoria() {
      return this.licao.categoria;
    },
    getFormacao() {
      return this.licao.formacao;
    },
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
      if (!this.showDialog) {
        this.licao = {
          nome: null,
        categoria: null,
        descricao: null,
        formacao: null,
        estado: 1,
        };
      }
    },
    getAllFormacoes(values) {
      this.formacoes = values;
    },
  },
  mounted() {
    this.formacoes = this.getAllFormacoes;
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
