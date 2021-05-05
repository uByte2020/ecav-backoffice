<template>
  <div ref="marcacaoModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Realizar Marcação</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="formacao">Formação</label>
                    <md-select
                      v-model="marcacao.formacao"
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
                      v-model="marcacao.categoria"
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
                    <label for="licao">Lição</label>
                    <md-select v-model="marcacao.licao" name="licao" id="licao">
                      <md-option
                        v-for="(licao, licaoIdx) in getLicoes"
                        :key="licaoIdx"
                        :value="licao._id"
                        >{{ licao.nome }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="formador">Formador</label>
                    <md-select
                      v-model="marcacao.formador"
                      name="formador"
                      id="formador"
                    >
                      <md-option
                        v-for="(formador, formadorIdx) in getFormadores"
                        :key="formadorIdx"
                        :value="formador._id"
                        >{{ formador.name }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      v-model="marcacao.data"
                      type="date"
                      :min="minDate"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <!-- <md-input v-model="marcacao.hora" type="time" min="12:00 AM" step="600" ></md-input> -->
                    <label for="hora">Hora</label>
                    <md-select v-model="marcacao.hora" name="hora" id="hora">
                      <md-option
                        v-for="(time, timeIdx) in availibleTimes"
                        :key="timeIdx"
                        :value="time"
                        >{{ time }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="criarMarcacao"
          >Criar Marcação</md-button
        >
        <md-button class="md-warning" @click="$emit('hide-dialog', false)"
          >Cancelar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import marcacaoformador from "../Tables/marcacaoformador";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "marcacao-model",
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
      formador: marcacaoformador,
      showDialog: this.showDialogProp,
      marcacao: {
        formador: null,
        categoria: null,
        licao: null,
        formacao: null,
        data: null,
        hora: null,
      },
      minTime: "10:00",
      formacoes: [],
      licoes: [],
    };
  },
  methods: {
    criarMarcacao() {
      const marcacao = { ...this.marcacao };
      marcacao.data = `${marcacao.data}T${marcacao.hora}:00.00Z`;
      let loader = this.$loading.show({
        container: this.$refs.marcacaoModel,
        onCancel: this.onCancel,
        background: "transparent",
      });
      this.criarMarcacaoAction(marcacao)
        .then((response) => {
          this.notifyVue("Marcação Realizada com Sucesso", "success");
          loader.hide();
          this.$emit("hide-dialog", false);
          this.getMyMarcacoes();
        })
        .catch((err) => {
          console.log(err)
          loader.hide();
          this.notifyVue("Erro", "warning");
        });
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    setClientData(formador) {
      Object.keys(formador).forEach((key) => {
        if (key in formador) {
          this.formador[key] = formador[key];
        }
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
    ...mapActions({
      criarMarcacaoAction: "marcacaoModule/criarMarcacao",
      getMyMarcacoes: "marcacaoModule/getMyMarcacoes",
    }),
  },
  computed: {
    ...mapGetters({
      getAllFormacoes: "formacaoModule/getAll",
      getAllLicoes: "licaoModule/getAll",
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
    availibleTimes() {
      if(!this.marcacao.data) return [];
      if(!this.marcacao.formador) return [];
      const formador = this.getFormadores.find(el=>el._id===this.marcacao.formador);
      const unAvailibleTime = formador.indisponibilidade.find(el=>el.startsWith(this.marcacao.data));
      const times = [
        "06:00",
        "06:30",
        "07:00",
        "07:30",
        "08:00",
        "08:30",
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
      ];
      if(unAvailibleTime) return times.filter(el=>unAvailibleTime.search(el)<0)
      return times;
    },
    getCategories() {
      if (this.marcacao.formacao)
        return this.formacoes.find((el) => el._id === this.marcacao.formacao)
          .categorias;
      return [];
    },
    getFormadores() {
      if (this.marcacao.formacao)
        return this.formacoes.find((el) => el._id === this.marcacao.formacao)
          .formadores;
      return [];
    },
    getLicoes() {
      if (this.marcacao.categoria)
        return this.licoes.filter(
          (el) => el.categoria._id === this.marcacao.categoria
        );
      return [];
    },
    getFormador(){
      return this.marcacao.formador;
    },
    getCategoria(){
      return this.marcacao.categoria;
    },
    getFormacao(){
      return this.marcacao.formacao;
    },
    getData(){
      return this.marcacao.data;
    }
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
      if(!this.showDialog){
        this.marcacao = {
          formador: null,
          categoria: null,
          licao: null,
          formacao: null,
          data: null,
          hora: null,
        };
      }
    },
    clienteStore(value) {
      this.setClientData(value);
    },
    getAllFormacoes(values) {
      this.formacoes = values;
    },
    getAllLicoes(values) {
      this.licoes = values;
    },
    getFormador(value){
      this.marcacao.data = null;
      this.marcacao.hora = null;
    },
    getCategoria(value){
      this.marcacao.licao=null;
    },
    getFormacao(value){
      this.marcacao.data= null;
      this.marcacao.hora = null;
    },
    getData(value){
      this.marcacao.hora = null;
    }
  },
  mounted() {
    this.formacoes = this.getAllFormacoes;
    this.licoes = this.getAllLicoes;
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
