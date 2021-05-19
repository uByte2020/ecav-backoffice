<template>
  <div ref="licalModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Add Horário</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-50">
                  <md-field>
                    <label for="diaDaSemana">Dia da Semana</label>
                    <md-select
                      v-model="horario.diaSemana"
                      name="diaDaSemana"
                      id="diaDaSemana"
                    >
                      <md-option
                        v-for="item in diasDaSemana"
                        :value="item.dia"
                        :key="item.nome"
                        >{{ item.nome }}</md-option
                      >
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="hora">Horário</label>
                    <md-input
                      name="hora"
                      id="hora"
                      v-model="horario.hora"
                      type="time"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="duracao">Duração(min)</label>
                    <md-input
                      name="duracao"
                      id="duracao"
                      v-model="horario.duracao"
                      type="number"
                      max="60"
                      min="15"
                      step="15"
                      maxlength="60"
                      minlength="15"
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="addHorario">Adicionar</md-button>
        <md-button class="md-warning" @click="$emit('hide-dialog', {horario: null, modalStatus: false})"
          >Cancelar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import diaSemana from "@/utils/diaSemana";
export default {
  name: "add-horario-model",
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
      horario: {
        diaSemana: null,
        hora: null,
        duracao: 15,
      },
      diasDaSemana:diaSemana.diasSemana,
    };
  },
  methods: {
    addHorario() {
      const horario = { ...this.horario };
      this.$emit("hide-dialog", {horario: horario, modalStatus: false});
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
  },
  computed: {
    ...mapGetters({
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
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
.md-dialog .md-dialog-container {
  max-width: 768px;
}
</style>
