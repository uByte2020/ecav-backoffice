<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Realizar Marcação</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-card>
            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="formacao">Formação</label>
                    <md-select v-model="marcacao.formacao" name="formacao" id="formacao">
                      <md-option v-for="(formacao, formacaoIdx) in formacoes" :value="formacao._id" :key="formacaoIdx">{{formacao.nome}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="categoria">Categoria</label>
                    <md-select v-model="marcacao.categoria" name="categoria" id="categoria">
                      <md-option v-for="(categoria, categoriaIdx) in getCategories" :key="categoriaIdx" :value="categoria._id">{{categoria.categoria}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="licao">Lição</label>
                    <md-select v-model="marcacao.licao" name="licao" id="licao">
                      <md-option v-for="(licao, licaoIdx) in getLicoes" :key="licaoIdx" :value="licao._id">{{licao.nome}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label for="formador">Formador</label>
                    <md-select v-model="marcacao.formador" name="formador" id="formador">
                      <md-option v-for="(formador, formadorIdx) in getFormadores" :key="formadorIdx" :value="formador._id">{{formador.name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      v-model="marcacao.data"
                      type="date"
                      
                    ></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <md-input
                      v-model="marcacao.hora"
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
        <md-button class="md-success" @click="criarMarcacao"
          >Criar Marcação</md-button
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
      formador:marcacaoformador,
      showDialog: this.showDialogProp,
      marcacao:{
        formador: null,
        categoria: null,
        licao:null,
        formacao: null,
        data: null,
        hora:null
      },
      formacoes: [],
      licoes: []
    };
  },
  methods: {
    criarMarcacao(){
       const marcacao = {...this.marcacao}
       marcacao.data = `${marcacao.data}T${marcacao.hora}:00.00Z`;
      this.criarMarcacaoAction(marcacao).then(response=>{
        console.log(response)
      }).catch(err=>{
        console.log(err)
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
    ...mapActions({criarMarcacaoAction: "marcacaoModule/criarMarcacao"})
  },
  computed: {
    ...mapGetters({
      getAllFormacoes: "formacaoModule/getAll",
      getAllLicoes: "licaoModule/getAll"
    }),
    getCategories(){
      if(this.marcacao.formacao) return this.formacoes.find(el=>el._id===this.marcacao.formacao).categorias;
      return [];
    },
    getFormadores(){
      if(this.marcacao.formacao) return this.formacoes.find(el=>el._id===this.marcacao.formacao).formadores;
      return [];
    }, 
    getLicoes(){
      if(this.marcacao.categoria) return this.licoes.filter(el=>el.categoria._id===this.marcacao.categoria);
      return [];
    }
  },
  watch: {
    showDialogProp(value) {
      this.showDialog = value;
    },
    clienteStore(value) {
      this.setClientData(value);
    },
    getAllFormacoes(values){
      this.formacoes = values;
    },
    getAllLicoes(values){
      this.licoes = values;
    },
    // 'marcacao.formador':(value)=>{
    //   this.marcacao.categoria = null;
    //   this.marcacao.licao = null;
    //   this.marcacao.formacao = null;
    // }
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
