<template>
  <div ref="licalModel">
    <md-dialog
      :md-active.sync="showDialog"
      :md-click-outside-to-close="false"
      :md-close-on-esc="false"
    >
      <md-dialog-title>Add Horário</md-dialog-title>
      <md-dialog-content>
        <!-- <form> -->
        <!-- <md-card>
            <md-card-content> -->
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label for="diaDaSemana">Dia da Semana</label>
              <md-select
                v-model="diaSemana"
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
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field
              ><vue-timepicker
                close-on-complete
                drop-direction="auto"
                append-to-body
                :hour-range="hourRange" 
                :minute-range="minuteRange"
                hide-disabled-items
                v-model="timepicker"
                @change="hourChange"
                @error="onTimepickerError"
                :disabled="isTimepickerDisable"
              ></vue-timepicker
            ></md-field>
          </div>
          <!-- <div class="md-layout-item md-small-size-100 md-size-33">
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
                </div> -->
        </div>
        <!-- </md-card-content>
          </md-card> -->
        <!-- </form> -->
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="addHorario" :disabled="isAddBtnDisable">Adicionar</md-button>
        <md-button
          class="md-warning"
          @click="$emit('hide-dialog', { horario: null, modalStatus: false })"
          >Cancelar</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import diaSemana from "@/utils/diaSemana";
import VueTimepicker from "vue2-timepicker/src/vue-timepicker.vue";
export default {
  name: "add-horario-model",
  components: {
    VueTimepicker,
  },
  props: {
    horariosProp: {
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
      timepicker:null,
      hasTimepickerError:false,
      hourRange: [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],
      minuteRange:['0','30'],
      diaSemana: null,
      hora: null,
      duracao: 15,
      diasDaSemana: diaSemana.diasSemana,
    };
  },
  methods: {
    hourChange(){
      if(this.horariosProp.length<=0) return ;
      const minutes = this.horariosProp.filter(el=>el.diaSemana===this.diaSemana && this.timepicker.HH === el.hora.split(':')[0]).map(el=>el.hora.split(':')[1]);
      this.minuteRange = ['0','30'].filter(el=>!minutes.includes(el));
      this.hasTimepickerError = false;
    },
    onTimepickerError(eventData){
      if(eventData.includes('minute')) this.timepicker.mm="";
      if(eventData.includes('hour')) this.timepicker.HH="";
      this.hasTimepickerError = true;
    },
    addHorario() {
      this.hora = `${this.timepicker.HH}:${this.timepicker.mm}`
      const horario = { diaSemana: this.diaSemana, hora:this.hora };
      this.$emit("hide-dialog", { horario: horario, modalStatus: false });
    },
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
  },
  computed: {
    ...mapGetters({
      currentUser: "userModule/getUser",
    }),
    isTimepickerDisable(){
      return !this.diaSemana;
    },
    isAddBtnDisable(){
      return !(this.diaSemana && this.timepicker && this.timepicker.HH!=="" && this.timepicker.mm!=="" && !this.hasTimepickerError);
    }
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
      if (!this.showDialog) {
        this.diaSemana = null;
        this.hora = null;
        this.timepicker = null
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
.vue__time-picker-dropdown {
  z-index: 5000;
}
</style>
