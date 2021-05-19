<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-100">
        <form>
          <md-card>
            <md-card-header
              class="md-card-header-icon"
              :class="getClass(headerColor)"
            >
              <div class="card-icon">
                <md-icon>assignment</md-icon>
              </div>
              <h4 class="title"></h4>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Formação</label>
                    <md-input v-model="formacao.nome" disabled></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Quantidade Max de Alunos</label>
                    <md-input v-model="formacao.quantidadeAlunoMax" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Horários</label>
                    <md-input v-model="formacao.horarios.length" type="text"></md-input>
                  </md-field>
                  <md-button class="md-raised md-success mt-4"
                    >Add</md-button
                  >
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Instrutores</label>
                    <md-input :value="formacao.formadores.length" disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Categorias</label>
                    <md-input v-model="formacao.categorias.length" disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Lições</label>
                    <md-input v-model="formacao.licoes.length" disabled type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100 md-size-33">
                  <md-field>
                    <label>Estado</label>
                    <md-input v-model="formacao.estado" type="text"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100">
                  <md-field maxlength="5">
                    <label>Descrição</label>
                    <md-textarea v-model="formacao.descricao"></md-textarea>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-100 text-right">
                  <md-button class="md-raised md-success mt-4"
                    >Actualizar</md-button
                  >
                </div>
              </div>
            </md-card-content>
          </md-card>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import { EditProfileForm, UserCard } from "@/pages";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["formacaoId"],
  components: {},
  data() {
    return {
      headerColor: "green",
      formacao: {
        nome: null,
        descricao: null,
        quantidadeAlunoMax: null,
        formadores: [],
        categorias: [],
        horarios: [],
        licoes: [],
        estado: null,
      },
    };
  },
  computed: {
    ...mapGetters({
      restricao: "userModule/restrictTo",
      formacoes: "formacaoModule/getAll",
    }),
    // getFormacao(){

    // }
  },
  methods: {
    getClass: function(headerColor) {
      return "md-card-header-" + headerColor + "";
    },
    setFormacaoById(formacaoId) {
      const formacaoTemp = this.formacoes.find((el) => el._id == formacaoId);
      if (formacaoTemp) {
        this.formacao.nome = formacaoTemp.nome;
        this.formacao.descricao = formacaoTemp.descricao;
        this.formacao.quantidadeAlunoMax = formacaoTemp.quantidadeAlunoMax;
        this.formacao.formadores = formacaoTemp.formadores || [];
        this.formacao.categorias = formacaoTemp.categorias || [];
        this.formacao.horarios = formacaoTemp.horarios || [];
        this.formacao.licoes = formacaoTemp.licoes || [];
        this.formacao.estado = formacaoTemp.estado.estado;
      }
    },
  },
  watch: {
    formacaoId(value) {
      if (value) this.setFormacaoById(value);
    },
  },
  mounted() {
    if (this.formacaoId) this.setFormacaoById(this.formacaoId);
  },
};
</script>
<style lang="scss">
.text-right {
  display: flex;
}
</style>
