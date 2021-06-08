<template>
  <div ref="marcacaoModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Realizar Marcação</md-dialog-title>
      <md-dialog-content>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(criarMarcacao)">
            <md-card>
              <md-card-content>
                <div class="md-layout">
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <ValidationProvider
                      name="formacao"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
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
                    </ValidationProvider>
                  </div>

                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <ValidationProvider
                      name="categoria"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
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
                          <md-option v-if="!marcacao.formacao" disabled>Selecione uma formação primeiro</md-option>
                          <md-option v-if="marcacao.formacao && getCategories.length===0" disabled>Não existem categorias para está formação</md-option>
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <ValidationProvider
                      name="licao"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label for="licao">Lição</label>
                        <md-select
                          v-model="marcacao.licao"
                          name="licao"
                          id="licao"
                        >
                          <md-option
                            v-for="(licao, licaoIdx) in getLicoes"
                            :key="licaoIdx"
                            :value="licao._id"
                            >{{ licao.nome }}</md-option
                          >
                          <md-option v-if="!marcacao.categoria" disabled>Selecione uma categoria primeiro</md-option>
                          <md-option v-if="marcacao.categoria && getLicoes.length===0" disabled>Não existem lições para está formação</md-option>
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <ValidationProvider
                      name="instrutor"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label for="Instrutor">Instrutor</label>
                        <md-select
                          v-model="marcacao.formador"
                          name="Instrutor"
                          id="Instrutor"
                        >
                          <md-option
                            v-for="(formador, formadorIdx) in getFormadores"
                            :key="formadorIdx"
                            :value="formador._id"
                            >{{ formador.name }}</md-option
                          >
                          <md-option v-if="!marcacao.formacao" disabled>Selecione primeiro uma formação</md-option>
                          <md-option v-if="marcacao.formacao && getFormadores.length===0" disabled>Não existem formadores para está formação</md-option>
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <md-datepicker
                      v-model="marcacao.data"
                      md-immediately
                      :md-disabled-dates="disabled_dates"
                    >
                    <label>Data</label>
                    </md-datepicker>
                  </div>
                  <div class="md-layout-item md-small-size-100 md-size-33">
                    <ValidationProvider
                      name="hora"
                      rules="required"
                      v-slot="{ passed, failed }"
                    >
                      <md-field
                        :class="[
                          { 'md-error': failed },
                          { 'md-valid': passed },
                        ]"
                      >
                        <label for="hora">Hora</label>
                        <md-select
                          v-model="marcacao.hora"
                          name="hora"
                          id="hora"
                        >
                          <md-option
                            v-for="(time, timeIdx) in availibleTimes"
                            :key="timeIdx"
                            :value="time"
                            >{{ time }}</md-option
                          >
                          <md-option v-if="!marcacao.data" disabled>Selecione primeiro uma data</md-option>
                          <md-option v-if="marcacao.data && availibleTimes.length===0">Não existe um horário disponível para está data</md-option>
                        </md-select>
                      </md-field>
                    </ValidationProvider>
                  </div>
                </div>
              </md-card-content>
            </md-card>
            <div class="button-container" style="justify-content: flex-end;">
              <md-button class="md-success" type="submit"
                >Criar Marcação</md-button
              >
              <md-button class="md-warning" @click="$emit('hide-dialog', false)"
                >Cancelar</md-button
              >
            </div>
          </form>
        </ValidationObserver>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import marcacaoformador from "../Tables/marcacaoformador";
import { mapGetters, mapActions } from "vuex";
import format from "date-fns/format";
import moment from "moment";
import { extend } from "vee-validate";
import { required, email, confirmed } from "vee-validate/dist/rules";

extend("email", email);
extend("required", required);
extend("confirmed", confirmed);
export default {
  name: "marcacao-model",
  components: {},
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
      format: format,
    };
  },
  methods: {
    criarMarcacao() {
      const marcacao = { ...this.marcacao };
      marcacao.data = `${this.getData}T${marcacao.hora}:00.00Z`;
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
    disabled_dates(date) {
      return !this.getAvailableDates.includes(
        moment(date).format("YYYY-MM-DD")
      );
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
      if (!this.getData) return [];
      if (!this.getHorarios) return [];
      const diaSemana = moment(this.getData, "YYYY-MM-DD").day() + 1;
      const times = this.getHorarios
        .filter((el) => el.diaSemana === diaSemana)
        .map((el) => el.hora);
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
    getFormador() {
      return this.marcacao.formador;
    },
    getCategoria() {
      return this.marcacao.categoria;
    },
    getFormacao() {
      return this.marcacao.formacao;
    },
    getData() {
      return this.marcacao.data
        ? this.format(this.marcacao.data, "yyyy-MM-dd")
        : null;
    },
    getHorarios() {
      if (this.marcacao.formacao)
        return this.formacoes.find((el) => el._id === this.marcacao.formacao)
          .horarios;
      return [];
    },
    getDateFromTo() {
      const dates = [];
      const startDate = moment();
      const endDate = moment()
        .add(1, "w")
        .endOf("week");
      let dayCursor = startDate;
      while (dayCursor <= endDate) {
        dates.push(dayCursor.toDate());
        dayCursor = dayCursor.clone().add(1, "d");
      }
      return dates;
    },
    getAvailableDates() {
      const dates = this.getDateFromTo;
      const diasSemana = this.getHorarios.map((h) => h.diaSemana);
      const datesResultAux = dates.filter((date) => {
        const diaSemana = moment(date).day() + 1;
        return diasSemana.includes(diaSemana);
      });
      const datesResult =
        datesResultAux.length > 0
          ? datesResultAux.map((el) => moment(el).format("YYYY-MM-DD"))
          : datesResultAux;
      return datesResult;
    },
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
      if (!this.showDialog) {
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
    getFormador(value) {
      this.marcacao.data = null;
      this.marcacao.hora = null;
    },
    getCategoria(value) {
      this.marcacao.licao = null;
    },
    getFormacao(value) {
      this.marcacao.data = null;
      this.marcacao.hora = null;
      this.marcacao.categoria = null;
      this.marcacao.formador = null;
    },
    getData(value) {
      this.marcacao.hora = null;
    },
    getAvailableDates(value) {},
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

#md-field-datepicker:after {
  background-color: transparent !important;
}

#md-field-datepicker {
  margin-top: 0 !important;
}
</style>
