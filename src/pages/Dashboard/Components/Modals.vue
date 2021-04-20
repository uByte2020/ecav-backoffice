<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Model De Marcação</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Formador</label>
                    <md-input
                      v-model="formador.name"
                      type="text"
                      
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Formação</label>
                    <md-input
                      v-model="formador.formacao"
                      type="text"
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Categoria</label>
                    <md-input
                      v-model="formador.categoria"
                      type="text"
                      
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Lição</label>
                    <md-input
                      v-model="formador.aula"
                      type="text"
                      
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      v-model="formador.data"
                      type="date"
                      
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      v-model="formador.hora"
                      type="time"
                      
                    ></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-success" @click="$emit('hide-dialog', false)"
          >Close</md-button
        >
        <md-button class="md-success" @click="getMarcar"
          >Criar Marcação</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import marcacaoformador from "../Tables/marcacaoformador";
export default {
  name: "Modals",
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
      formador:marcacaoformador,
      showDialog: this.showDialogProp,
    };
  },
  methods: {
    getMarcar(){
       this.formador.push({name:this.formador.name, 
                          formacao: this.formador.formacao,
                          aula: this.formador.aula,
                          data: this.formador.data,
                          hora:this.formador.hora,
                          icon1: "person",
                          icon2: "edit",
                          icon3: "close",
                          categoria:this.formador.categoria,
                          })
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
  },
  computed: {
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
    },
    clienteStore(value) {
      this.setClientData(value);
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
